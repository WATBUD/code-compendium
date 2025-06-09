"use client";
import React, { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";

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
        {nodes.map((node) => (
          <li key={node.fullPath || node.path}>
            {node.type === "file" ? (
              node.name.endsWith('.md') && (
                <Link
                  href={`/?file=${encodeURIComponent(node.path)}`}
                  className={`text-blue-600 underline hover:text-blue-800 ${selected === node.path ? "font-bold" : ""}`}
                  onClick={() => setShowPopup(false)}
                >
                  {node.name}
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
                  <span className="font-semibold">📁 {node.name}</span>
                </div>
                {expandedFolders.has(node.path) && renderTree(node.children)}
              </>
            )}
          </li>
        ))}
      </ul>
    );
  }

  const filtered = search
    ? flat.filter((n) => 
        n.name.toLowerCase().includes(search.toLowerCase()) && 
        n.type === "file" && 
        n.name.endsWith('.md')
      )
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
      <aside className={`md:w-1/4 border-r p-4 bg-gray-50 ${showPopup ? "block" : "hidden md:block"} md:mt-0 mt-12`}>
        <input
          className="w-full mb-2 p-2 border rounded"
          placeholder="搜尋檔名..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {search ? (
          <ul>
            {filtered.map((node) => (
              <li key={node.fullPath}>
                <Link
                  href={`/?file=${encodeURIComponent(node.path)}`}
                  className={`text-blue-600 underline hover:text-blue-800 ${selected === node.path ? "font-bold" : ""}`}
                  onClick={() => setShowPopup(false)}
                >
                  {node.name}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          renderTree(tree)
        )}
      </aside>
      <main className="flex-1 p-4 overflow-auto md:mt-0 mt-12">
        {md ? (
          <article className="prose max-w-none">
            <ReactMarkdown>{md}</ReactMarkdown>
          </article>
        ) : (
          <div className="text-gray-400">請點選左側檔案以顯示內容</div>
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
