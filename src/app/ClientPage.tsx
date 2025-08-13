'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useSearchParams, useRouter } from 'next/navigation';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeHighlight from 'rehype-highlight';
import {
  FaFolder,
  FaFileAlt,
  FaJs,
  FaPython,
  FaDocker,
  FaGitAlt,
  FaLinux,
  FaDatabase,
  FaCogs,
  FaProjectDiagram,
  FaCloud,
  FaRegFileCode,
  FaGlobe,
  FaNodeJs,
  FaServer,
  FaBolt,
  FaLaptopCode,
  FaMobileAlt,
  FaWindows,
  FaApple,
  FaChartLine,
  FaLeaf,
  FaPills,
  FaHeartbeat,
  FaUserSecret,
  FaBook,
  FaExchangeAlt,
  FaQuestionCircle,
  FaClipboardList,
  FaGraduationCap,
  FaBoxes,
  FaCompressArrowsAlt,
  FaLock,
  FaCheckCircle,
  FaThermometerHalf,
  FaPuzzlePiece,
  FaSearch,
} from 'react-icons/fa';
import { SiTypescript, SiGo } from 'react-icons/si';

const ReactMarkdown = dynamic(() => import('react-markdown'), { ssr: false });

type TreeNode = {
  type: 'file' | 'folder';
  name: string;
  path: string;
  fullPath?: string;
  children?: TreeNode[];
};

type CodeProps = {
  node?: any;
  inline?: boolean;
  className?: string;
  children?: React.ReactNode;
};

const folderIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  javascript: FaJs,
  python: FaPython,
  docker: FaDocker,
  git: FaGitAlt,
  linux: FaLinux,
  database: FaDatabase,
  system: FaCogs,
  architecture: FaProjectDiagram,
  cloud: FaCloud,
  web: FaGlobe,
  nodejs: FaNodeJs,
  server: FaServer,
  performance: FaBolt,
  programming: FaLaptopCode,
  mobile: FaMobileAlt,
  windows: FaWindows,
  apple: FaApple,
  analytics: FaChartLine,
  golang: SiGo,
  typescript: SiTypescript,
};

function getFileIcon(fileName: string) {
  if (fileName.endsWith('.md')) {
    return <FaFileAlt className="text-blue-500" />;
  }
  return <FaRegFileCode className="text-gray-500" />;
}

function flattenTree(nodes: TreeNode[]): TreeNode[] {
  const result: TreeNode[] = [];
  for (const node of nodes) {
    result.push(node);
    if (node.children) {
      result.push(...flattenTree(node.children));
    }
  }
  return result;
}

export default function ClientPage({
  staticContent,
  tree,
}: {
  staticContent: Record<string, string>;
  tree: TreeNode[];
}) {
  const [flat, setFlat] = useState<TreeNode[]>([]);
  const [content, setContent] = useState<string>('');
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set());
  const [sidebarWidth, setSidebarWidth] = useState(300);
  const [isDragging, setIsDragging] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<{ path: string; content: string[] }[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchMode, setSearchMode] = useState<'filename' | 'content'>('filename');
  const [isCollapsed, setIsCollapsed] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();
  const fileParam = searchParams.get('file');

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    setHasMounted(true);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) {
      setSidebarWidth(window.innerWidth);
    } else {
      setSidebarWidth(300);
    }
  }, [isMobile]);

  useEffect(() => {
    const flattened = flattenTree(tree);
    setFlat(flattened);
  }, [tree]);

  useEffect(() => {
    if (fileParam) {
      const content = staticContent[fileParam];
      if (content) {
        setContent(content);
      }
    }
  }, [fileParam, staticContent]);

  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    if (searchMode === 'filename') {
      const filtered = flat.filter(
        (n) =>
          n.name.toLowerCase().includes(query.toLowerCase()) &&
          n.type === 'file' &&
          n.name.endsWith('.md')
      );
      setSearchResults(filtered.map((n) => ({ path: n.path, content: [n.name] })));
      return;
    }

    // 内容搜索
    const results = Object.entries(staticContent)
      .filter(([_, content]) => content.toLowerCase().includes(query.toLowerCase()))
      .map(([path, content]) => {
        const lines = content
          .split('\n')
          .filter((line) => line.toLowerCase().includes(query.toLowerCase()))
          .slice(0, 3); // 只显示前3行匹配内容
        return { path, content: lines };
      });

    setSearchResults(results);
  };

  const handleSearchModeChange = (newMode: 'filename' | 'content') => {
    setSearchMode(newMode);
    if (searchQuery.trim()) {
      handleSearch(searchQuery);
    }
  };

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      handleSearch(searchQuery);
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchQuery, searchMode]);

  const handleResultClick = (filePath: string) => {
    router.push(`/?file=${encodeURIComponent(filePath)}`);
    if (isMobile) {
      setIsCollapsed(true);
    }
  };

  const handleSearchFocus = () => {
    if (isMobile) {
      setIsCollapsed(false);
    }
  };

  function toggleFolder(path: string) {
    setExpandedFolders((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(path)) {
        newSet.delete(path);
      } else {
        newSet.add(path);
      }
      return newSet;
    });
  }

  function renderTree(nodes: TreeNode[]) {
    return (
      <ul className="pl-4">
        {nodes.map((node) => {
          const Icon =
            node.type === 'folder' ? folderIcons[node.name.toLowerCase()] || FaFolder : undefined;
          return (
            <li key={node.fullPath || node.path}>
              {node.type === 'file' ? (
                node.name.endsWith('.md') && (
                  <Link
                    href={`/?file=${encodeURIComponent(node.path)}`}
                    className={`flex items-center gap-2 text-blue-600 hover:text-blue-800 ${fileParam === node.path ? 'font-bold' : ''}`}
                    onClick={() => {
                      if (isMobile) {
                        setIsCollapsed(true);
                      }
                    }}
                  >
                    {getFileIcon(node.name)}
                    <span className="break-all">{node.name}</span>
                  </Link>
                )
              ) : (
                <>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => toggleFolder(node.path)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      {expandedFolders.has(node.path) ? '▼' : '▶'}
                    </button>
                    {Icon && <Icon className="text-yellow-500" />}
                    <span className="font-semibold">{node.name}</span>
                  </div>
                  {expandedFolders.has(node.path) && node.children && renderTree(node.children)}
                </>
              )}
            </li>
          );
        })}
      </ul>
    );
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    if (isMobile) return;
    e.preventDefault();
    setIsDragging(true);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const newWidth = e.clientX;
      if (newWidth > 200 && newWidth < window.innerWidth * 0.8) {
        setSidebarWidth(newWidth);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  // Show loading animation until component has mounted on client side
  if (!hasMounted) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col md:flex-row">
      <div
        className={`fixed border-r border-gray-200 bg-white transition-all md:relative ${
          isMobile ? (isCollapsed ? 'h-16' : 'h-screen') : 'h-screen'
        } overflow-y-auto`}
        style={{ width: isMobile ? '100%' : sidebarWidth }}
      >
        <div className="p-4">
          <div className="mb-4 flex items-center gap-2">
            <input
              type="text"
              placeholder="搜尋..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={handleSearchFocus}
              className="h-10 min-w-0 flex-1 rounded-lg border px-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <button
              onClick={() =>
                handleSearchModeChange(searchMode === 'filename' ? 'content' : 'filename')
              }
              className={`flex h-10 w-10 items-center justify-center rounded-lg border transition-colors ${
                searchMode === 'filename'
                  ? 'bg-blue-500 text-white hover:bg-blue-600'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
              title={searchMode === 'filename' ? '切換到內容搜尋' : '切換到檔案名稱搜尋'}
            >
              {searchMode === 'filename' ? <FaFileAlt /> : <FaSearch />}
            </button>
          </div>
          {(!isCollapsed || !isMobile) && (
            <div
              data-state="expanded-area"
              className="flex h-screen flex-col md:flex-row"
              onClick={(e) => {
                console.log('auto isCollapsed click', isCollapsed, e);
                if ((e.target as HTMLElement)?.dataset?.state === 'expanded-area') {
                  if (!isCollapsed && isMobile) {
                    setIsCollapsed(true);
                  }
                }
              }}
            >
              {searchQuery ? (
                <div className="space-y-2">
                  {isSearching ? (
                    <div className="text-gray-500">搜尋中...</div>
                  ) : searchResults.length > 0 ? (
                    searchResults.map((result, index) => (
                      <div
                        key={index}
                        onClick={(e) => {
                          handleResultClick(result.path);
                        }}
                        className="cursor-pointer rounded p-2 hover:bg-gray-100"
                      >
                        <div className="flex items-center gap-2 font-medium">
                          <FaFileAlt className="text-blue-500" />
                          {result.path}
                        </div>
                        {result.content.map((line, i) => (
                          <div key={i} className="pl-6 text-sm text-gray-600">
                            {line}
                          </div>
                        ))}
                      </div>
                    ))
                  ) : (
                    <div className="text-gray-500">找不到結果</div>
                  )}
                </div>
              ) : (
                renderTree(tree)
              )}
            </div>
          )}
        </div>
        {!isMobile && (
          <div
            className="absolute top-0 right-0 bottom-0 w-2 cursor-col-resize bg-gray-200 hover:bg-blue-500"
            onMouseDown={handleMouseDown}
          />
        )}
      </div>

      <main
        className={`flex-1 overflow-y-auto p-4 md:mt-0 ${
          isMobile ? (isCollapsed ? 'mt-16' : 'mt-0') : 'mt-0'
        } h-[calc(100vh-3rem)] md:h-screen`}
      >
        {content ? (
          <article className="prose prose-slate dark:prose-invert prose-headings:font-bold prose-headings:tracking-tight prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-img:rounded-lg prose-pre:bg-gray-900 prose-pre:text-gray-100 max-w-none">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw, rehypeHighlight]}
              components={{
                code: ({ node, inline, className, children, ...props }: CodeProps) => {
                  const match = /language-(\w+)/.exec(className || '');
                  return !match ? (
                    <code className="rounded bg-gray-100 px-1 py-0.5 text-sm" {...props}>
                      {children}
                    </code>
                  ) : (
                    <code
                      className="my-4 block overflow-x-auto rounded-lg bg-gray-900 p-4 text-gray-100"
                      {...props}
                    >
                      {children}
                    </code>
                  );
                },
              }}
            >
              {content}
            </ReactMarkdown>
          </article>
        ) : (
          <div className="mt-8 text-center text-gray-400">請點選左側檔案以顯示內容</div>
        )}
      </main>
    </div>
  );
}
