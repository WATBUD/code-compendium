'use client';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import rehypeHighlight from 'rehype-highlight';

const ReactMarkdown = dynamic(() => import('react-markdown'), { ssr: false });

type LogLevel = 'log' | 'info' | 'warn' | 'error' | 'debug';
type LogEntry = { level: LogLevel; text: string };

const MESSAGE_TAG = '__html_note_console__';

// Injected before any of the note's own scripts so every console call is forwarded to the parent.
const CONSOLE_BRIDGE = `<script>
(function () {
  var TAG = '${MESSAGE_TAG}';
  function fmt(v) {
    if (typeof v === 'string') return v;
    if (typeof v === 'function') return v.toString();
    if (v instanceof Error) return v.name + ': ' + v.message;
    if (v === undefined) return 'undefined';
    try {
      var seen = new WeakSet();
      return JSON.stringify(v, function (k, val) {
        if (typeof val === 'function') return '[Function ' + (val.name || 'anonymous') + ']';
        if (typeof val === 'object' && val !== null) {
          if (seen.has(val)) return '[Circular]';
          seen.add(val);
        }
        return val;
      }, 2);
    } catch (e) {
      return String(v);
    }
  }
  function send(level, args) {
    try {
      parent.postMessage({ tag: TAG, level: level, text: Array.prototype.map.call(args, fmt).join(' ') }, '*');
    } catch (e) {}
  }
  ['log', 'info', 'warn', 'error', 'debug'].forEach(function (level) {
    var orig = console[level];
    console[level] = function () {
      send(level, arguments);
      return orig.apply(console, arguments);
    };
  });
  window.addEventListener('error', function (e) {
    send('error', ['Uncaught ' + (e.error ? fmt(e.error) : e.message)]);
  });
  window.addEventListener('unhandledrejection', function (e) {
    send('error', ['Unhandled rejection: ' + fmt(e.reason)]);
  });
})();
</script>`;

function injectBridge(html: string) {
  const headMatch = html.match(/<head[^>]*>/i);
  if (headMatch && headMatch.index !== undefined) {
    const at = headMatch.index + headMatch[0].length;
    return html.slice(0, at) + CONSOLE_BRIDGE + html.slice(at);
  }
  return CONSOLE_BRIDGE + html;
}

// True when the body has nothing to look at besides scripts (a console-only demo).
function isScriptOnly(html: string) {
  const body = html.match(/<body[^>]*>([\s\S]*)<\/body>/i)?.[1] ?? html;
  const visible = body
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<[^>]+>/g, '')
    .trim();
  return visible.length === 0;
}

const levelStyles: Record<LogLevel, string> = {
  log: 'text-gray-800',
  info: 'text-blue-700',
  debug: 'text-gray-500',
  warn: 'bg-yellow-50 text-yellow-800',
  error: 'bg-red-50 text-red-700',
};

export default function HtmlNote({ path, html }: { path: string; html: string }) {
  const [tab, setTab] = useState<'preview' | 'source'>('preview');
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [consoleOpen, setConsoleOpen] = useState(false);
  const [runId, setRunId] = useState(0);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const srcDoc = useMemo(() => injectBridge(html), [html]);

  useEffect(() => {
    setLogs([]);
  }, [path, runId]);

  useEffect(() => {
    setTab('preview');
    setConsoleOpen(isScriptOnly(html));
  }, [path, html]);

  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      if (e.source !== iframeRef.current?.contentWindow) return;
      const data = e.data;
      if (!data || data.tag !== MESSAGE_TAG) return;
      setLogs((prev) => [...prev, { level: data.level, text: data.text }]);
    };
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, []);

  // Open the untouched HTML as its own page: exactly what opening the file directly would show.
  const openInNewTab = () => {
    const url = URL.createObjectURL(new Blob([html], { type: 'text/html' }));
    window.open(url, '_blank', 'noopener');
    setTimeout(() => URL.revokeObjectURL(url), 60_000);
  };

  const hasErrors = logs.some((l) => l.level === 'error');
  const btn =
    'rounded-md px-2.5 py-1 text-xs text-gray-700 hover:bg-gray-100 data-[active=true]:bg-blue-500 data-[active=true]:text-white';

  return (
    <div className="flex h-full flex-col">
      <div className="relative min-h-0 flex-1">
        {/* Keep the iframe mounted on the source tab so its console output stays live. */}
        <iframe
          ref={iframeRef}
          key={`${path}-${runId}`}
          title={path}
          srcDoc={srcDoc}
          sandbox="allow-scripts allow-forms allow-modals allow-popups allow-popups-to-escape-sandbox"
          className={`h-full w-full border-0 bg-white ${tab === 'preview' ? '' : 'hidden'}`}
        />

        {tab === 'source' && (
          <article className="prose prose-pre:bg-gray-900 prose-pre:text-gray-100 h-full max-w-none overflow-auto p-4">
            <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
              {`~~~~~html\n${html}\n~~~~~`}
            </ReactMarkdown>
          </article>
        )}

        {/* Small floating toolbar in the corner so the note fills the area like a real page. */}
        <div className="absolute right-5 bottom-3 z-10 flex items-center gap-1 rounded-lg border border-gray-200 bg-white/90 p-1 opacity-60 shadow-sm backdrop-blur transition-opacity hover:opacity-100">
          <button
            className={btn}
            data-active={tab === 'source'}
            onClick={() => setTab(tab === 'source' ? 'preview' : 'source')}
            title={tab === 'source' ? '回到頁面' : '查看原始碼'}
          >
            {tab === 'source' ? '頁面' : '原始碼'}
          </button>
          <button className={btn} onClick={() => setRunId((n) => n + 1)} title="重新載入頁面">
            重新執行
          </button>
          <button className={btn} onClick={openInNewTab} title="以獨立頁面開啟原始 HTML">
            新分頁開啟
          </button>
        </div>
      </div>

      {/* Console only appears once the page actually logs something, collapsed by default. */}
      {logs.length > 0 && (
        <div className="flex max-h-[40%] flex-col border-t border-gray-200">
          <div className="flex items-center justify-between bg-gray-50 px-3 py-1 text-xs text-gray-600">
            <button
              className={`hover:text-gray-900 ${hasErrors ? 'text-red-600' : ''}`}
              onClick={() => setConsoleOpen((o) => !o)}
            >
              {consoleOpen ? '▼' : '▶'} Console（{logs.length}）
            </button>
            <button className="hover:text-gray-900" onClick={() => setLogs([])}>
              清除
            </button>
          </div>
          {consoleOpen && (
            <div className="overflow-auto font-mono text-xs">
              {logs.map((l, i) => (
                <pre
                  key={i}
                  className={`m-0 border-b border-gray-100 px-3 py-1 whitespace-pre-wrap ${levelStyles[l.level] ?? ''}`}
                >
                  {l.text}
                </pre>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
