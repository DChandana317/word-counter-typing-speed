# ⚡ SpeedTyper Pro — Full-Stack Typing Performance Analytics Engine

SpeedTyper Pro is a full-stack production-ready web application built using the MERN stack. The platform decouples dynamic typing simulation mechanics from database tracking to calculate Words Per Minute (WPM) and input precision analytics in real-time. User history and performance telemetry metrics are securely synchronized and persisted via a centralized Express API layer to a MongoDB database.

---

## 🚀 Technical Highlights & Key Features

- **Decoupled Real-Time Analytics Engine**: Programmatically tracks user key-down velocities and metrics using standard JavaScript event-driven architectures.
- **Asynchronous Prompt Streaming**: Integrates asynchronous third-party REST API orchestration to dynamically fetch paragraph contexts, eliminating static text caching.
- **Secure State-Driven Session Logging**: Features robust stateless user authentication powered by JSON Web Tokens (JWT) and encrypted database password hashing via `bcryptjs`.
- **Persistent Telemetry Storage**: Implements schema-driven Mongoose object data modeling (ODM) with complex data persistence structures tracking performance histories over time.

---

## 🛠️ Technology Stack & System Topology

### Frontend Architecture
- **Framework**: React.js (Vite Runtime Environment)
- **State Integration**: React Functional Hooks (`useState`, `useEffect`, `useRef`)
- **HTTP Client**: Axios (Asynchronous Request Bundling)
- **Presentation Layer**: Custom Semantic CSS3 Layouts

### Backend Infrastructure
- **Server Runtime**: Node.js & Express.js Application Framework
- **Database Engine**: MongoDB Atlas Cloud Architecture / Local Engine Instance
- **Data Modeling Layer**: Mongoose ODM (Object Document Mapper)
- **Security Protocols**: JSON Web Tokens (JWT) & Cross-Origin Resource Sharing (CORS) Configuration

---

## ⚙️ Project Installation & Local Execution

Follow these deployment instructions to spin up the local environment sandbox.

### Prerequisites
- Node.js installed on your machine
- Active local MongoDB daemon service instance executing in the background

### 1. Repository Clonation & Preparation
```bash
git clone https://github.com
cd WORD_COUNTER-TYPING_SPEED
```

### 2. Backend Environment Infrastructure Configuration
Navigate to the server directory, install native dependencies, and create a localized secrets file:
```bash
cd backend
npm install
```
Create a file named `.env` inside the `backend` directory and add the following keys:
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/typingspeed
JWT_SECRET=your_cryptographic_secret_passphrase
```
Initialize the backend runtime listener server:
```bash
node server.js
```

### 3. Frontend Development Web Sandbox Orchestration
Open an independent parallel terminal prompt inside the project root workspace directory:
```bash
cd frontend
npm install
npm run dev
```
Open your local web browser interface using the port address compiled by your Vite execution script to interact with the platform.
