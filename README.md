<div align="center">
  <h1 align="center">Beanstick</h1>
  <p align="center">
    <strong>The autonomous fiat-to-crypto settlement network.</strong><br/>
    No operators. No custodians. No centralized exchanges.
  </p>
</div>

---

## 🏆 HackHazards Hackathon

**Beanstick** was proudly built by **Ayush Kumar** for the **HackHazards Hackathon**. 
This project aims to revolutionize decentralized finance by creating a trustless, agentic fiat-crypto onramp powered by artificial intelligence, zero-knowledge proofs, and highly scalable databases.

---

## 📸 Project Showcase

Here is a look at the premium, fintech-grade interface built for Beanstick:

<div align="center">
  <img src="public/ss1beanstick.png" alt="Beanstick Landing Page" width="800" />
  <br/><br/>
  <img src="public/ss2beanstick.png" alt="Beanstick Dashboard" width="800" />
  <br/><br/>
  <img src="public/ss3beanstick.png" alt="Beanstick Trade Terminal" width="800" />
</div>

---

## 🌟 About Beanstick

Today, moving money between traditional banking and crypto is broken. It requires centralized custodians, invasive KYC, high fees, and days of waiting. 

Beanstick solves this by acting as a decentralized network of autonomous Liquidity Provider (LP) agents. When you want to buy crypto, you trade with a decentralized network of agents competing to give you the best rate. 

### Key Features
- **Fully Automated:** Smart agents handle the quoting, locking, and releasing of escrow funds automatically.
- **Zero Counterparty Risk:** Smart contracts ensure your crypto is only released upon cryptographically verified proof of fiat transfer.
- **zkTLS Verification:** Bank transfers are verified securely and privately in real-time.
- **Premium Fintech UI:** A sleek, user-friendly interface designed for mass adoption.

---

## 🚀 Powered by Neo4j AuraDB

A critical component of Beanstick's architecture is its ability to map, analyze, and route complex liquidity graphs in real-time. 

To achieve this, Beanstick utilizes **Neo4j AuraDB** as its core graph database engine.

### How we use Neo4j AuraDB:
1. **Agent Reputation Graph:** We model every LP agent, user, and historical transaction as nodes and relationships. AuraDB allows us to instantly calculate trust scores and reputation metrics by traversing the transaction history graph.
2. **Liquidity Routing:** When a user requests a fiat-to-crypto quote, AuraDB executes lightning-fast graph algorithms to find the most optimal, low-fee liquidity paths across thousands of active agents.
3. **Fraud Detection:** By analyzing patterns in the network (e.g., linked wallets, rapid failed transactions), our graph queries detect and flag suspicious agent rings in real-time, protecting the ecosystem from malicious actors.

Neo4j AuraDB's fully managed cloud infrastructure ensures that Beanstick's agent swarm can query these complex relationships with sub-millisecond latency, providing a seamless user experience.

---

## ⚙️ Technical Documentation & Workflow

Beanstick operates on a cutting-edge **Agentic Swarm Protocol** and leverages **zkTLS Verification** to achieve completely trustless, non-custodial fiat-to-crypto settlements. By anchoring state to **0G Data Availability (DA)** and executing via **ZK-SNARKs**, we eliminate counterparty risk.

### Architectural Workflow

The following diagram illustrates the lifecycle of a Decentralized Settlement Network (DSN) transaction:

```mermaid
sequenceDiagram
    participant U as User (Buyer)
    participant S as Swarm (Neo4j AuraDB)
    participant LP as Liquidity Provider Agent
    participant SC as Escrow Smart Contract
    participant 0G as 0G Data Availability
    participant B as Fiat Bank (Web2)
    participant A as Attestor Agent (zkTLS)

    U->>S: Request Fiat-to-Crypto Quote (e.g. USD -> ETH)
    S->>LP: Graph Traversal for Optimal Routing
    LP-->>U: Propose Rate & Escrow Terms
    U->>SC: Lock Crypto (Initiate Non-Custodial Escrow)
    SC-->>0G: Publish Escrow State Hash
    U->>B: Execute Fiat Transfer (Venmo, SEPA, UPI)
    B-->>U: Generate Bank Receipt
    A->>B: Intercept TLS Session (zkTLS Generation)
    A->>SC: Submit ZK-SNARK Proof of Payment
    SC->>SC: Cryptographically Verify Proof
    SC->>U: Auto-Release Crypto (Trustless Execution)
    SC-->>0G: Finalize Settlement State
```

### Core Mechanisms Explained
- **Non-Custodial Escrow**: Crypto assets are locked in immutable smart contracts. They are only released when a deterministic cryptographic proof is validated on-chain.
- **Agentic Swarm**: Instead of a central order book, a decentralized network of autonomous AI agents compete for order flow.
- **Neo4j AuraDB Routing**: We utilize high-speed graph traversal to map agent reputation nodes and compute the lowest-latency, lowest-fee settlement route across the swarm.
- **zkTLS (Zero-Knowledge Transport Layer Security)**: Allows Attestor agents to securely verify data from Web2 banking endpoints without exposing sensitive PII, generating a SNARK proof of the fiat transfer.

---

## 🛠 Tech Stack

- **Frontend:** React, Next.js, Tailwind CSS, Framer Motion
- **Blockchain / Smart Contracts:** Solidity, 0G Network, Sepolia Testnet
- **Database / Analytics:** Neo4j AuraDB
- **Agents:** Custom AI swarm architecture

---

## 💻 Getting Started

### Prerequisites
- Node.js (v18+)
- pnpm
- A valid Neo4j AuraDB URI and credentials

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/ayushkumar2601/beanstick.git
   cd beanstick
   ```
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Setup environment variables:
   Create a `.env` file and add your configuration (including your Neo4j credentials).
4. Run the development server:
   ```bash
   pnpm --filter web run dev
   ```
5. Open `http://localhost:3000` to view the application.

---

<div align="center">
  <p>Built with ❤️ by Ayush Kumar for HackHazards</p>
</div>
