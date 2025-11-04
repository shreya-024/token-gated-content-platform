# Token-Gated Content Access (Stellar Soroban + Freighter)
```md
A minimal **token-gated access** system built on **Stellar Soroban smart contracts**.  
Only users holding a specific token on Stellar Testnet can view gated content.  
Wallet authentication and contract interaction are handled via **Freighter Wallet** and **Soroban CLI**.
```
---

## 🧩 Project Structure

````
token-gated-content-access/
│
├── access_contract/          # Soroban contract (WASM + deployment commands)
├── backend/                  # Node.js backend server
│   └── index.js              # Executes Soroban CLI commands via REST API
├── frontend/                 # React frontend (Vite)
│   ├── src/
│   │   ├── Home.jsx          # Wallet connect + token verification
│   │   ├── Dashboard.jsx     # Protected content
│   │   ├── NoAccess.jsx      # Fallback screen for denied users
│   │   └── App.jsx           # Routing setup
│   └── package.json
└── README.md
````

---

## ⚙️ Prerequisites

1. **Node.js** (>=18)
2. **Soroban CLI** installed  
   ```bash
   cargo install --locked soroban-cli
   ```

3. **Freighter Wallet** browser extension
4. **Testnet Account** created at [Stellar Laboratory](https://laboratory.stellar.org/#account-creator?network=test)
5. **WASM Contract deployed** on Stellar Testnet

   Example contract ID:

   ```
   CDVBQS4QEX3Z3RHIMGG3JDKL2SRPG7WXOP4YOKAGTEHMA2YSFJSEKQDT
   ```

---

## 🚀 Setup Instructions

### 1. Clone Repository

```bash
git clone https://github.com/shreya-024/token-gated-content-access.git
cd token-gated-content-access
```

### 2. Configure Environment

Create `.env` file inside `backend/`:

```
PORT=5000
```

Ensure your Soroban CLI has a key identity:

```bash
soroban keys generate admin
soroban keys ls
```

---

## 🖥️ Backend Setup

```bash
cd backend
npm install
```

Edit `index.js` if needed:

```js
const CONTRACT_ID = "CDVBQS4QEX3Z3RHIMGG3JDKL2SRPG7WXOP4YOKAGTEHMA2YSFJSEKQDT";
```

Start backend:

```bash
node index.js
```

Expected output:

```
Backend running on port 5000
```

---

## 🌐 Frontend Setup

```bash
cd ../frontend
npm install
npm run dev
```

Access frontend at:

```
http://localhost:5173/
```

---

## 🔐 How It Works

1. User connects their **Freighter Wallet**.
2. Frontend requests wallet address and sends it to backend:

   ```http
   GET /api/has-access/:address
   ```
3. Backend invokes Soroban contract to check token balance:

   ```bash
   soroban contract invoke \
   --id <CONTRACT_ID> \
   --source admin \
   --network-passphrase "Test SDF Network ; September 2015" \
   --rpc-url https://soroban-testnet.stellar.org \
   -- balance_of --id <address>
   ```
4. If balance > 0 → access granted (`/dashboard`), else → `/no-access`.

---

## 🧪 Testing with Multiple Wallets

1. Open the site in **Wallet A** (has token).
2. Open the site in **Wallet B** (no token).
3. Connect Freighter:

   * ✅ `/dashboard` → Token holder
   * ❌ `/no-access` → Non-holder

---

## 🧰 Troubleshooting

| Issue                                         | Cause                  | Fix                                       |
| --------------------------------------------- | ---------------------- | ----------------------------------------- |
| `error: unrecognized subcommand 'balance_of'` | Wrong contract command | Verify contract supports `balance_of`     |
| `404 RPC error`                               | Wrong `--rpc-url`      | Use `https://soroban-testnet.stellar.org` |
| Freighter not connecting                      | Wrong network          | Switch Freighter to **TESTNET**           |

---

## 🎥 Demo

<video src="demo video.mp4" controls width="700"></video>

---

## 📄 Smart Contract Details

| Field             | Value                                                    |
| ----------------- | -------------------------------------------------------- |
| **Contract Name** | access_contract                                          |
| **Language**      | Rust (Soroban)                                           |
| **Network**       | Stellar Testnet                                          |
| **Contract ID**   | CDVBQS4QEX3Z3RHIMGG3JDKL2SRPG7WXOP4YOKAGTEHMA2YSFJSEKQDT |

![Contract Details](image.png)

