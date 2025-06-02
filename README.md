# Wallet-Application

A modern, user-friendly crypto wallet web application built with Next.js and TypeScript. Effortlessly create and manage your crypto wallet, transfer and receive funds, connect existing wallets, and monitor your balances securely—all with a seamless interface.

---

## 🚀 Features

- **Sign Up with Google**  
  Create your crypto wallet effortlessly with your Google Account. No complex setup, just quick and secure access.

- **Connect Your Existing Wallet**  
  Already have a wallet? Simply connect it to our platform and manage your crypto with ease.

- **Transfer and Receive Crypto**  
  Send and receive cryptocurrency easily and securely, all from within our platform.

- **View Balance**  
  Keep track of your crypto assets in real-time with a clear, user-friendly dashboard.

- **Secure and Reliable**  
  Security is a top priority. We leverage encryption and privacy best practices to keep your assets safe.

- **Works Across All Blockchains**  
  Designed to be interoperable, supporting multiple blockchain ecosystems.

---

## 🖥️ Tech Stack

- **Frontend:** [Next.js](https://nextjs.org/) (App Router), React, TypeScript
- **Auth:** [next-auth](https://next-auth.js.org/) (Google authentication)
- **UI:** Custom React components, TailwindCSS, React Icons

---

## ⚡ Getting Started

### Prerequisites

- Node.js (v18.x or later)
- npm, yarn, or pnpm

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/saurabhsagar99/Wallet-Application.git
   cd Wallet-Application
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```
   or
   ```bash
   yarn install
   ```
   or
   ```bash
   pnpm install
   ```

3. **Configure environment variables:**  
   Create a `.env.local` file in the root directory and add any required environment variables (such as Google OAuth credentials for next-auth).

   Example:
   ```ini
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   NEXTAUTH_URL=http://localhost:3000
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```
   or
   ```bash
   yarn dev
   ```
   or
   ```bash
   pnpm dev
   ```

5. **Open your browser:**  
   Visit [http://localhost:3000](http://localhost:3000) to view the app.

---

## 🛠️ Project Structure

- `/src/app/` – Next.js app directory (main pages and routing)
- `/src/components/` – Reusable React components (NavigationBar, CreateWallet, FeaturesOverview, etc.)
- `/src/components/landing/` – Landing page sections and UI blocks
- `/pages/api/` – API routes (e.g., `/api/createWallet`)

---

## 🌐 Deployment

This app can be easily deployed on Vercel, Netlify, or any platform supporting Next.js.  
For best practices and environment setup for deployment, see [Next.js Deployment Docs](https://nextjs.org/docs/deployment).

---



## 📄 License

This project is currently unlicensed. Please add a license if you intend to make it open-source.

---
