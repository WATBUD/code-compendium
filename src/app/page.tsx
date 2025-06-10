"use client";
import React, { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import type { Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeHighlight from 'rehype-highlight';
import { FaFolder, FaFileAlt, FaJs, FaPython, FaDocker, FaGitAlt, FaLinux, FaDatabase, FaCogs, FaProjectDiagram, FaCloud, FaRegFileCode, FaGlobe, FaNodeJs, FaServer, FaBolt, FaLaptopCode, FaMobileAlt, FaWindows, FaApple, FaChartLine, FaLeaf, FaPills, FaHeartbeat, FaUserSecret, FaBook, FaExchangeAlt, FaQuestionCircle, FaClipboardList, FaGraduationCap, FaBoxes, FaCompressArrowsAlt, FaLock, FaCheckCircle, FaThermometerHalf, FaPuzzlePiece } from 'react-icons/fa';
import { SiTypescript, SiGo } from 'react-icons/si';

const ReactMarkdown = dynamic(() => import('react-markdown'), { ssr: false });

type FileNode = {
  type: 'file';
  name: string;
  path: string;
  fullPath?: string;
}

type FolderNode = {
  type: 'folder';
  name: string;
  path: string;
  fullPath?: string;
  children: (FileNode | FolderNode)[];
}

type TreeNode = FileNode | FolderNode;

function flattenTree(tree: TreeNode[], prefix = ""): TreeNode[] {
  let result: TreeNode[] = [];
  for (const node of tree) {
    if (node.type === "file" && node.name.endsWith('.md')) {
      result.push({ ...node, fullPath: prefix + node.path });
    } else if (node.type === "folder") {
      result.push({ ...node, fullPath: prefix + node.path });
      result = result.concat(flattenTree(node.children, prefix));
    }
  }
  return result;
}

function HomeContent() {
  const searchParams = useSearchParams();
  const fileParam = searchParams.get("file");
  const [tree, setTree] = useState<TreeNode[]>([]);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<string>(fileParam || "");
  const [md, setMd] = useState<string>("");
  const [flat, setFlat] = useState<TreeNode[]>([]);
  const [showPopup, setShowPopup] = useState(false);
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set());
  const [sidebarWidth, setSidebarWidth] = useState(300); // Initial width in pixels

  // Icon mappings for folders
  const folderIcons: { [key: string]: React.ElementType } = {
    'javascript': FaJs,
    'python': FaPython,
    'docker-integration': FaDocker,
    'git-tutorial': FaGitAlt,
    'linux': FaLinux,
    'database': FaDatabase,
    'design-pattern': FaCogs,
    'algorithm': FaPuzzlePiece,
    'architecture-pattern': FaProjectDiagram,
    'cloud-computing': FaCloud,
    'coding-style': FaRegFileCode,
    'web': FaGlobe,
    'typeScript': SiTypescript,
    'golang': SiGo,
    'node': FaNodeJs,
    'network': FaServer,
    'performance': FaBolt,
    'basics-of-computing': FaLaptopCode,
    'mobile-app': FaMobileAlt,
    'windows-system': FaWindows,
    'mac': FaApple,
    'stock-guide': FaChartLine,
    'life': FaLeaf,
    'medication': FaPills,
    'human-body': FaHeartbeat,
    'token': FaUserSecret,
    'singing-practice-notes': FaBook,
    'statistical-analysis': FaChartLine,
    'rabbit-mq': FaExchangeAlt,
    'regular-expression': FaQuestionCircle,
    'rental-documents': FaClipboardList,
    'job-guide': FaGraduationCap,
    'bundlers': FaBoxes,
    'compression': FaCompressArrowsAlt,
    'crypto': FaLock,
    'data-validation': FaCheckCircle,
    'cache': FaThermometerHalf,
  };

  // Function to get file icon based on file name
  const getFileIcon = (fileName: string) => {
    if (fileName.endsWith('.md')) {
      return <FaFileAlt className="text-blue-500" />;
    }
    return <FaRegFileCode className="text-gray-500" />;
  };

  useEffect(() => {
    fetch("/api/list")
      .then((res) => res.json())
      .then((data) => {
        setTree(data);
        setFlat(flattenTree(data));
      });
  }, []);

  useEffect(() => {
    if (selected) {
      fetch(`/api/md/${selected}`)
        .then((res) => res.json())
        .then((data) => setMd(data.content || ""));
    }
  }, [selected]);

  useEffect(() => {
    if (fileParam) {
      setSelected(fileParam);
    }
  }, [fileParam]);

  function toggleFolder(path: string) {
    setExpandedFolders(prev => {
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
          const Icon = node.type === "folder" ? folderIcons[node.name.toLowerCase()] || FaFolder : undefined;
          return (
            <li key={node.fullPath || node.path}>
              {node.type === "file" ? (
                node.name.endsWith('.md') && (
                  <Link
                    href={`/?file=${encodeURIComponent(node.path)}`}
                    className={`flex items-center gap-2 text-blue-600 hover:text-blue-800 ${selected === node.path ? "font-bold" : ""}`}
                    onClick={() => setShowPopup(false)}
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
                      {expandedFolders.has(node.path) ? "▼" : "▶"}
                    </button>
                    {Icon && <Icon className="text-yellow-500" />}
                    <span className="font-semibold">{node.name}</span>
                  </div>
                  {expandedFolders.has(node.path) && renderTree(node.children)}
                </>
              )}
            </li>
          );
        })}
      </ul>
    );
  }

  const filtered = search
    ? flat.filter((n) => n.name.toLowerCase().includes(search.toLowerCase()) && n.type === "file" && n.name.endsWith('.md'))
    : [];

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <div className="md:hidden fixed top-0 left-0 right-0 h-12 bg-white border-b flex items-center px-4 z-10">
        <button
          className="bg-blue-500 text-white p-2 rounded opacity-75 hover:opacity-100"
          onClick={() => setShowPopup(!showPopup)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
      </div>
      <aside
        className={`border-r bg-gray-50 md:mt-0 mt-12 h-[calc(100vh-3rem)] md:h-screen overflow-y-auto ${showPopup ? "block fixed inset-0 z-20" : "hidden md:block"}`}
        style={{ width: showPopup ? 'auto' : (window.innerWidth >= 768 ? `${sidebarWidth}px` : '100%') }}
      >
        <div className="p-4 sticky top-0 bg-gray-50 z-10 border-b">
          <input
            className="w-full p-2 border rounded"
            placeholder="搜尋檔名..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="p-4">
          {search ? (
            <ul>
              {filtered.map((node) => (
                <li key={node.fullPath}>
                  <Link
                    href={`/?file=${encodeURIComponent(node.path)}`}
                    className={`flex items-center gap-2 text-blue-600 hover:text-blue-800 ${selected === node.path ? "font-bold" : ""}`}
                    onClick={() => setShowPopup(false)}
                  >
                    {getFileIcon(node.name)}
                    <span className="break-all">{node.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            renderTree(tree)
          )}
        </div>
      </aside>
      <div
        className="hidden md:block w-2 cursor-ew-resize"
        onMouseDown={(e) => {
          if (window.innerWidth < 768) return; // Only enable resize on desktop
          const startX = e.clientX;
          const startWidth = sidebarWidth;

          const handleMouseMove = (mouseMoveEvent: MouseEvent) => {
            const newWidth = startWidth + (mouseMoveEvent.clientX - startX);
            setSidebarWidth(Math.max(200, Math.min(newWidth, window.innerWidth * 0.5))); // Min 200px, Max 50% of screen width
          };

          const handleMouseUp = () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
          };

          window.addEventListener('mousemove', handleMouseMove);
          window.addEventListener('mouseup', handleMouseUp);
        }}
      ></div>
      <main className="flex-1 p-4 overflow-y-auto md:mt-0 mt-12 h-[calc(100vh-3rem)] md:h-screen">
        {md ? (
          <article className="prose prose-slate max-w-none dark:prose-invert prose-headings:font-bold prose-headings:tracking-tight prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-img:rounded-lg prose-pre:bg-gray-900 prose-pre:text-gray-100">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw, rehypeHighlight]}
              components={{
                code: ({node, inline, className, children, ...props}) => {
                  const match = /language-(\w+)/.exec(className || '');
                  return !match ? (
                    <code className="bg-gray-100 rounded px-1 py-0.5 text-sm" {...props}>
                      {children}
                    </code>
                  ) : (
                    <code className="block bg-gray-900 text-gray-100 p-4 rounded-lg my-4 overflow-x-auto" {...props}>
                      {children}
                    </code>
                  );
                },
              }}
            >
              {md}
            </ReactMarkdown>
          </article>
        ) : (
          <div className="text-gray-400 text-center mt-8">請點選左側檔案以顯示內容</div>
        )}
      </main>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomeContent />
    </Suspense>
  );
}
