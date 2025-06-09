# asymmetric-encryption(非對稱加密)

- **公鑰**：公鑰（Public Key）就像是鎖，任何人都可以使用這把鎖來加密數據。
- **私鑰**：私鑰（Private Key）則像是鑰匙，只有擁有私鑰的人才能解開這把鎖，也就是解密加密的數據。
- 比喻：公開的信箱和私人的鑰匙
- 假設你想讓某人向你發送保密的信息，而你又不想讓其他人看到這些信息。這時，你可以設置一個公開的信箱（公鑰）來實現非對稱加密。

# 常見的非對稱加密算法
- 常見的非對稱加密算法：
1. **RSA (Rivest-Shamir-Adleman)** - RSA（利維斯特-沙米爾-阿德曼）
2. **ECC (Elliptic Curve Cryptography)** - 橢圓曲線密碼學
3. **ElGamal** - 艾爾加馬爾
4. **DSA (Digital Signature Algorithm)** - 數位簽名算法
5. **DH (Diffie-Hellman)** - 狄菲-赫爾曼
6. **Lattice-based Cryptography** - 格基密碼學
7. **Post-Quantum Cryptography** - 後量子密碼學

## 範例：RSA 非對稱加密（JavaScript）

### 步驟
1. 生成 RSA 密鑰對（公鑰和私鑰）。
2. 使用公鑰加密數據。
3. 使用私鑰解密數據。

### 完整範例代碼
```javascript
const crypto = require('crypto');

// 生成 RSA 密鑰對
const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
    modulusLength: 2048,  // 密鑰長度
    publicKeyEncoding: {
        type: 'spki',     // 公鑰格式
        format: 'pem',    // 使用 PEM 格式
    },
    privateKeyEncoding: {
        type: 'pkcs8',    // 私鑰格式
        format: 'pem',    // 使用 PEM 格式
    },
});

// 公鑰加密函數
function encryptWithPublicKey(text) {
    return crypto.publicEncrypt(publicKey, Buffer.from(text)).toString('base64');
}

// 私鑰解密函數
function decryptWithPrivateKey(encryptedText) {
    return crypto.privateDecrypt(privateKey, Buffer.from(encryptedText, 'base64')).toString();
}

// 測試加解密
const message = "Hello, Asymmetric Encryption!";
const encryptedMessage = encryptWithPublicKey(message);
const decryptedMessage = decryptWithPrivateKey(encryptedMessage);

console.log(`Encrypted with Public Key: ${encryptedMessage}`);
console.log(`Decrypted with Private Key: ${decryptedMessage}`);
