### 📂 **pnpm / npm / yarn 安裝機制與路徑對比**  

| 特性              | **pnpm** | **npm** | **yarn** |
|------------------|---------|---------|---------|
| **安裝方式**     | 硬連結 + 全域快取 | 每個專案獨立安裝 | 快取後仍完整複製 |
| **依賴存放路徑** | `node_modules` 內部使用 symlink 指向 **全域儲存庫** | `node_modules` 內完整存放所有套件 | `node_modules` 內完整存放所有套件 |
| **全域快取位置** | `~/.pnpm-store`（共用快取） | 無全域快取 | `~/.yarn/cache`（仍會複製到專案） |
| **專案內部結構** | `node_modules` 內部是 symlink，指向 `~/.pnpm-store` | `node_modules` 內完整存放所有依賴 | `node_modules` 內完整存放所有依賴 |

---

### 📌 **細節解釋**
#### ✅ **pnpm**
- **全域快取**：所有下載的套件都存放在 `~/.pnpm-store`，不同專案透過 **symlink（符號連結）** 指向這個快取，節省磁碟空間。
- **專案內部**：`node_modules` 內的套件實際上是指向 `~/.pnpm-store` 的連結，而不是獨立存放完整的檔案。

📂 **pnpm 範例**
```
~/.pnpm-store/v3
└── registry.npmjs.org
    ├── react@18.2.0
    ├── express@4.18.2

/my-project
└── node_modules
    ├── react -> ~/.pnpm-store/v3/registry.npmjs.org/react@18.2.0
    ├── express -> ~/.pnpm-store/v3/registry.npmjs.org/express@4.18.2
```

---

#### 🛠️ **npm**
- **無全域快取**：每個專案的 `node_modules` 內都存放一份完整的套件，佔用較多磁碟空間。
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
- **全域快取**：快取於 `~/.yarn/cache`，但每個專案的 `node_modules` 內 **仍然會存放完整的副本**。
- **專案內部**：和 `npm` 類似，`node_modules` 內存放完整的依賴。

📂 **yarn 範例**
```
~/.yarn/cache
└── react-18.2.0.zip
└── express-4.18.2.zip

/my-project
└── node_modules
    ├── react
    ├── express
```

即使有快取，仍然會完整複製到 `node_modules`。

---

### 🏆 **結論**
| 方案   | 優勢 | 劣勢 |
|--------|------|------|
| **pnpm** ✅ | 最快、最省空間（共用快取 + symlink） | 需要適應不同的 `node_modules` 結構 |
| **npm** 🛠️ | 最通用，無需額外適應 | 速度較慢，磁碟占用大 |
| **yarn** ⚡ | 比 `npm` 快一些，有快取 | 仍然會複製完整的套件，磁碟占用大 |

**👉 如果想要快又省空間，推薦使用 `pnpm`！** 🚀