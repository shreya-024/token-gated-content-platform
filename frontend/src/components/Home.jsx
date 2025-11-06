import React, { useState } from "react";
import { isConnected, requestAccess, getNetworkDetails } from "@stellar/freighter-api";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Home.css";

export default function Home() {
  const [publicKey, setPublicKey] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const connectWallet = async () => {
    try {
      setLoading(true);
      const isExtConnected = await isConnected();
      if (!isExtConnected) return alert("Freighter not detected");

      const { network } = await getNetworkDetails();
      if (network !== "TESTNET") return alert("Switch Freighter to TESTNET");

      const { address } = await requestAccess();
      setPublicKey(address);

      const res = await axios.get(`http://localhost:5000/api/has-access/${address}`);
      res.data.hasAccess ? navigate("/dashboard") : navigate("/no-access");
    } catch (err) {
      alert("Wallet connection failed");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home-body">
      <img
        src="/download.png"
        alt="Stellar"
        style={{
          position: "fixed",
          top: "20px",
          left: "20px",
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          border: "2px solid #80ed99",
          boxShadow: "0 0 12px #80ed9966",
          backgroundColor: "#0a0f0d",
          objectFit: "cover",
          zIndex: 1000,
        }}
      />
      <img
        src="/risein.png"
        alt="RiseIn"
        style={{
          position: "fixed",
          top: "20px",
          right: "20px",
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          border: "2px solid #80ed99",
          boxShadow: "0 0 12px #80ed9966",
          backgroundColor: "#0a0f0d",
          objectFit: "cover",
          zIndex: 1000,
        }}
      />
      <div className="home-container">
        <h1 className="home-title">Token Gated Content Platform</h1>
        <p className="home-subtext">
          Connect your wallet to verify token ownership and unlock content.
        </p>

        {!publicKey ? (
          <button
            onClick={connectWallet}
            disabled={loading}
            className={`home-btn ${loading ? "loading" : ""}`}
          >
            {loading ? "Connecting..." : "Connect Freighter Wallet"}
          </button>
        ) : (
          <div className="home-wallet">
            <p>Connected Wallet</p>
            <span className="wallet-address">{publicKey}</span>
          </div>
        )}
      </div>

      <footer>
        Powered by <span>Stellar Soroban</span>
      </footer>
    </div>
  );
}
