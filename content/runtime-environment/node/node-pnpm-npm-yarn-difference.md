### 📂 **pnpm / npm / yarn 安裝機制與路徑對比**  

| 特性              | **pnpm** | **npm** | **yarn** |
|------------------|---------|---------|---------|
| **安裝方式**     | 內容定址儲存庫（store）+ 硬連結 + symlink | 從全域快取解壓，每個專案各自完整安裝 | Classic：從快取完整複製；Berry：預設 PnP（無 `node_modules`） |
| **依賴存放路徑** | 檔案從 store **硬連結**到 `node_modules/.pnpm/`，再以 **symlink** 組成依賴結構 | `node_modules` 內完整存放所有套件（扁平化） | Classic：`node_modules` 內完整存放；Berry PnP：直接從 zip 快取讀取 |
| **全域快取位置** | store（路徑依版本/OS 而異，用 `pnpm store path` 查看） | `~/.npm/_cacache`（只存下載的壓縮包，安裝時仍會解壓複製） | Classic：`yarn cache dir` 查看；Berry：`.yarn/cache` 或全域 `~/.yarn/berry/cache` |
| **專案內部結構** | `node_modules/<pkg>` 是 symlink → `node_modules/.pnpm/<pkg>@<ver>/node_modules/<pkg>`（其檔案硬連結自 store） | `node_modules` 內完整存放所有依賴 | Classic：同 npm；Berry PnP：`.pnp.cjs` 映射表 |

---

### 📌 **細節解釋**
#### ✅ **pnpm**
- **全域儲存庫（content-addressable store）**：所有下載的檔案依內容雜湊存放在 store 中，同一個檔案在整台機器只存一份。store 路徑依 pnpm 版本與 OS 而異（例如 macOS 常見 `~/Library/pnpm/store/v3`、Linux `~/.local/share/pnpm/store/v3`，較新版本目錄可能是 `v10`），可用 `pnpm store path` 查看。
- **專案內部**：檔案是從 store **硬連結（hard link）** 到專案的 `node_modules/.pnpm/` 中（所以不佔額外磁碟空間）；`node_modules` 頂層只放 `package.json` 直接宣告的依賴，它們是指向 `.pnpm/` 裡對應資料夾的 **symlink（符號連結）**，並不是直接 symlink 到 store。
- 這種結構是「非扁平」的，程式只能 `require` 自己宣告過的依賴，可避免「幽靈依賴（phantom dependency）」。

📂 **pnpm 範例**
```
<store>/v3/files            # 依內容雜湊存放的檔案（每個檔案只存一份）
└── 00/ 01/ ... ff/

/my-project
└── node_modules
    ├── react -> .pnpm/react@18.2.0/node_modules/react        # symlink
    ├── express -> .pnpm/express@4.18.2/node_modules/express  # symlink
    └── .pnpm
        ├── react@18.2.0/node_modules/react       # 檔案硬連結自 store
        └── express@4.18.2/node_modules/express   # 檔案硬連結自 store
```

---

#### 🛠️ **npm**
- **有全域快取，但安裝時會複製**：npm 會把下載的套件壓縮包快取在 `~/.npm/_cacache`（可用 `npm config get cache` 查看），重複安裝時可免下載；但每個專案的 `node_modules` 內仍會解壓存放一份完整的套件，佔用較多磁碟空間。
- **專案內部**：所有依賴都完整存放在 `node_modules`，**沒有使用 symlink**。

📂 **npm 範例**
```
/my-project
└── node_modules
    ├── react
    ├── express

/another-project
└── node_modules
    ├── react
    ├── express
```
即使 `my-project` 和 `another-project` 使用相同的 `react` 版本，也會重複存放，佔用更多磁碟空間。

---

#### ⚡ **yarn**
- **Yarn Classic（v1）**：全域快取位置依 OS 而異（可用 `yarn cache dir` 查看，例如 macOS 為 `~/Library/Caches/Yarn`），但每個專案的 `node_modules` 內 **仍然會存放完整的副本**；`node_modules` 結構和 `npm` 類似。
- **Yarn Berry（v2+）**：預設使用 **Plug'n'Play（PnP）**，不產生 `node_modules`，套件以 zip 形式存在快取（專案內 `.yarn/cache` 或全域 `~/.yarn/berry/cache`），由 `.pnp.cjs` 告訴 Node 去哪裡載入每個套件，安裝快、省空間；但部分工具不相容 PnP 時，可設定 `nodeLinker: node-modules`（或 `pnpm` 模式）改回傳統結構。

📂 **yarn Classic 範例**
```
<yarn cache dir>
└── npm-react-18.2.0-<hash>
└── npm-express-4.18.2-<hash>

/my-project
└── node_modules
    ├── react
    ├── express
```

Yarn Classic 即使有快取，仍然會完整複製到 `node_modules`。

📂 **yarn Berry（PnP）範例**
```
/my-project
├── .pnp.cjs          # 套件位置映射表
└── .yarn/cache
    ├── react-npm-18.2.0-<hash>.zip
    └── express-npm-4.18.2-<hash>.zip
```

---

### 🏆 **結論**
| 方案   | 優勢 | 劣勢 |
|--------|------|------|
| **pnpm** ✅ | 快、最省空間（內容定址 store + 硬連結 + symlink） | 需要適應不同的 `node_modules` 結構 |
| **npm** 🛠️ | 最通用，無需額外適應 | 速度較慢，磁碟占用大 |
| **yarn** ⚡ | 比 `npm` 快一些，有快取；Berry PnP 不需 `node_modules` | Classic 仍會複製完整的套件，磁碟占用大；PnP 有部分工具相容性問題 |

**👉 如果想要快又省空間，推薦使用 `pnpm`！** 🚀