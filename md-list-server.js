// server.js
const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 6543;
const baseDir = path.join(__dirname, '.');
const ignoreDirs = ['.git', 'node_modules'];

// 遞迴取得 md 檔案列表
function getFiles(dir, prefix = '') {
  let results = [];
  const list = fs.readdirSync(dir, { withFileTypes: true });

  list.forEach(file => {
    if (file.isDirectory()) {
      if (!ignoreDirs.includes(file.name)) {
        results = results.concat(getFiles(path.join(dir, file.name), path.join(prefix, file.name)));
      }
    } else {
      if (file.name.toLowerCase().endsWith('.md')) {
        results.push(path.join(prefix, file.name).replace(/\\/g, '/'));
      }
    }
  });
  return results;
}

// 提供 md 檔案列表 API
app.get('/api/files', (req, res) => {
  const files = getFiles(baseDir);
  res.json(files);
});

// 提供讀取 md 檔案內容 API
app.get('/api/file', (req, res) => {
  const filePath = req.query.path;
  if (!filePath) {
    return res.status(400).send('Missing path parameter');
  }

  // 安全檢查：確保路徑在 baseDir 下
  const fullPath = path.join(baseDir, filePath);
  if (!fullPath.startsWith(baseDir)) {
    return res.status(403).send('Access denied');
  }

  fs.readFile(fullPath, 'utf8', (err, data) => {
    if (err) {
      return res.status(404).send('File not found');
    }
    res.send(data);
  });
});

// 提供前端靜態頁面
app.get('/', (req, res) => {
  res.send(`
<!DOCTYPE html>
<html lang="zh-TW">
<head>
<meta charset="UTF-8" />
<title>Markdown 動態閱讀器</title>
<script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
<style>
  body { font-family: Arial, sans-serif; margin: 20px; }
  #file-list-container {
    float: left;
    width: 25%;
    max-height: 90vh;
    border-right: 1px solid #ccc;
    padding-right: 10px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
  }
  #search {
    width: 100%;
    padding: 6px 8px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 14px;
    box-sizing: border-box;
  }
  #file-list {
    flex: 1 1 auto; /* 讓檔案列表撐滿剩餘空間 */
    overflow-y: auto;
  }
  a {
    cursor: pointer;
    color: blue;
    text-decoration: underline;
    display: block;
    margin-bottom: 5px;
  }
  #md-content {
    margin-left: 28%;
    padding-left: 20px;
    max-width: 70%;
  }
</style>
</head>
<body>

<h1>Markdown 檔案列表</h1>

<div id="file-list-container">
  <input type="text" id="search" placeholder="搜尋檔案名稱..." />
  <div id="file-list">
    載入中...
  </div>
</div>

<div id="md-content">
  <h2>請點選左邊檔案閱讀內容</h2>
</div>

<script>
  let allFiles = [];

  async function loadFileList() {
    const res = await fetch('/api/files');
    allFiles = await res.json();
    renderFileList(allFiles);
  }

  function renderFileList(files) {
    const container = document.getElementById('file-list');
    container.innerHTML = '';
    if(files.length === 0) {
      container.textContent = '找不到檔案';
      return;
    }
    files.forEach(f => {
      const a = document.createElement('a');
      a.textContent = f;
      a.href = '#';
      a.onclick = (e) => {
        e.preventDefault();
        loadMd(f);
      };
      container.appendChild(a);
    });
  }

  function filterFiles(keyword) {
    const filtered = allFiles.filter(f => f.toLowerCase().includes(keyword.toLowerCase()));
    renderFileList(filtered);
  }

  async function loadMd(filePath) {
    const res = await fetch('/api/file?path=' + encodeURIComponent(filePath));
    if (!res.ok) {
      document.getElementById('md-content').innerHTML = '<p style="color:red">讀取失敗: ' + res.status + '</p>';
      return;
    }
    const text = await res.text();
    document.getElementById('md-content').innerHTML = marked.parse(text);
  }

  window.onload = () => {
    loadFileList();

    const searchInput = document.getElementById('search');
    searchInput.addEventListener('input', (e) => {
      filterFiles(e.target.value);
    });
  }
</script>

</body>
</html>
  `);
});


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
