## symmetric-encryption(對稱式加密)
- **定義**：對稱式加密使用相同的密鑰進行加密和解密。
- **密鑰管理**：加密和解密過程中使用相同的密鑰，密鑰的安全性至關重要。如果密鑰泄漏，數據可能被解密。
- **使用場景**：對稱式加密速度較快，適合加密大量數據。

### 範例：AES
```javascript
const crypto = require('crypto');

// 生成對稱密鑰
const key = crypto.randomBytes(32);  // 256位密鑰
const iv = crypto.randomBytes(16);   // 初始向量

// 加密函數
function encrypt(text) {
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
}

// 解密函數
function decrypt(encryptedText) {
    const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

const text = "Hello, Symmetric Encryption!";
const encryptedText = encrypt(text);
const decryptedText = decrypt(encryptedText);

console.log(`Encrypted: ${encryptedText}`);
console.log(`Decrypted: ${decryptedText}`);
