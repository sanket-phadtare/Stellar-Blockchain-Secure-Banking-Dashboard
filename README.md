# 🚀 Stellar Blockchain Secure Banking Dashboard

![Stellar](https://img.shields.io/badge/Blockchain-Stellar-black?style=for-the-badge&logo=stellar)
![React](https://img.shields.io/badge/Frontend-React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Tailwind](https://img.shields.io/badge/Styling-Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

A modern, high-performance **Stellar Testnet Wallet Dashboard** built with a premium fintech UI/UX approach. This project demonstrates seamless wallet interaction, transaction handling, and a production-grade interface design.

---

## ✨ Features

### 🔐 Wallet Integration
- **Connect & Disconnect:** Seamlessly link with the Freighter wallet.
- **Automatic Detection:** Built-in network detection for Stellar Testnet.
- **Real-time Display:** Instant wallet address visibility upon connection.

### 💰 Balance Management
- **Live Data:** Fetch real-time XLM balances via Stellar SDK.
- **Dynamic UI:** Balance cards update automatically without page refreshes.

### 💸 Transaction System
- **Secure Sending:** Transfer XLM to any valid Stellar address.
- **Validation:** Robust client-side validation for addresses and amounts.
- **Live Feedback:** Real-time success/error notifications with transaction hashes.

### 🎨 Advanced UI/UX
- **Glassmorphism:** Layered UI with frosted glass effects.
- **Visual Depth:** Subtle grid patterns and smooth animations using **Framer Motion**.
- **Fintech Aesthetic:** Clean, high-contrast black-and-white design optimized for single-screen use.

---

## 🧱 Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | React + Vite |
| **Styling** | Tailwind CSS |
| **Animation** | Framer Motion |
| **Icons** | Lucide React |
| **Blockchain** | Stellar SDK |
| **Wallet API** | Freighter |

---

## 📁 Project Structure

```text
stellar-wallet-app/
├── src/
│   ├── services/
│   │   ├── freighter.js   # Wallet connection logic
│   │   └── stellar.js     # Horizon server interactions
│   ├── App.jsx            # Main dashboard component
│   ├── main.jsx
│   └── index.css          # Tailwind & Global styles
├── public/
├── package.json
└── README.md
```

---

## 📸 Screenshots

<img width="1920" height="1020" alt="1" src="https://github.com/user-attachments/assets/7c76744f-88a6-49ab-be16-3d71b0ea03d5" />
<img width="1918" height="1020" alt="2" src="https://github.com/user-attachments/assets/c3b88b38-020c-47f8-a2d6-27f4db711be6" />
<img width="1918" height="1020" alt="3" src="https://github.com/user-attachments/assets/803f60ee-d1dd-4aca-abc8-35a4d0141ee6" />
<img width="1918" height="1020" alt="4" src="https://github.com/user-attachments/assets/7461e86b-e3dc-4581-99f4-a1db86d01c65" />
<img width="1918" height="1018" alt="5" src="https://github.com/user-attachments/assets/9c4e7ba5-a198-4a22-aa56-528ce7ecf8cc" />
<img width="1918" height="1017" alt="6" src="https://github.com/user-attachments/assets/be0cabf4-4a84-4465-9815-e21f2c320f9a" />
<img width="1918" height="1020" alt="7" src="https://github.com/user-attachments/assets/b126c3a2-1d9b-44f1-b807-9236e134e602" />
<img width="447" height="547" alt="8" src="https://github.com/user-attachments/assets/9b884d6e-1d53-4fbd-aedd-7e465e3c9fc1" />
<img width="1918" height="1018" alt="9" src="https://github.com/user-attachments/assets/89ea4ac5-461e-45f7-b328-b896cfa05bf4" />
<img width="1918" height="1018" alt="10" src="https://github.com/user-attachments/assets/cc640678-f571-43cf-b704-1099d9e1e66f" />











---

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/stellar-wallet-app.git
cd stellar-wallet-app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Install Required Packages *(if starting from scratch)*

```bash
npm install framer-motion lucide-react @stellar/stellar-sdk @stellar/freighter-api
```

### 4. Run the Application

```bash
npm run dev
```

---

## 🧪 Usage

1. **Connect Wallet** — Click the **Connect** button and approve the request in your Freighter browser extension.
2. **Send XLM** — Enter the recipient's public key and the amount.
3. **Approve** — Confirm the transaction in the Freighter popup.
4. **View Status** — Monitor the dashboard for the transaction hash and updated balance.

---

## 🎯 Design Philosophy

- **Micro-interactions:** Small visual cues that provide immediate feedback.
- **Typography Hierarchy:** Clear font scaling for optimal readability.
- **Security First:** No private keys are ever stored or handled by the app — all signing happens within Freighter.

---

## 🚀 Future Enhancements

- **Transaction History:** A detailed table of past activities.
- **QR Integration:** Scan to receive XLM.
- **Analytics:** Visual charts for spending/receiving trends.
- **Dark/Light Mode:** Full theme toggle support.
- **Explorer Links:** Direct links to Stellar.expert for every transaction.

---

## 🧑‍💻 Author

**Sanket**
*M.Tech – Computer & Information Technology*
Blockchain Developer

---

## 📜 License

This project is licensed under the **MIT License**.

---

## 🔗 Useful Links

- [Stellar Documentation](https://developers.stellar.org/)
- [Freighter Wallet](https://www.freighter.app/)
- [Stellar Explorer](https://stellar.expert/)
