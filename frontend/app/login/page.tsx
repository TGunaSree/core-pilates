"use client";

import { motion } from "framer-motion";

import { useState } from "react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("idle");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      const response = await fetch(`${API_URL}/api/token/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });

      if (response.ok) {
        const data = await response.json();
        // Securely store token in cookies for Middleware to read
        document.cookie = `auth_token=${data.access}; path=/; max-age=86400`;
        // Store username locally for the frontend visuals
        localStorage.setItem("core_user", username);
        setStatus("success");
        setTimeout(() => window.location.href = '/', 1000);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="bg-foreground text-[#3c3029] min-h-screen flex items-center justify-center p-8 selection:bg-background selection:text-foreground">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="w-full max-w-md bg-background p-12 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-[#3c3029]/20" />
        <h1 className="text-4xl font-serif mb-8 leading-tight">Welcome <br/><span className="italic">back.</span></h1>
        
        {status === "error" && <p className="text-red-500 text-xs mb-4">Mismatched credentials. Please try again.</p>}
        {status === "success" && <p className="text-green-600 text-xs mb-4">Authentication successful. Redirecting...</p>}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="text-[0.65rem] uppercase tracking-[0.2em] opacity-50 block mb-2 font-medium">Username</label>
            <input value={username} onChange={e => setUsername(e.target.value)} type="text" className="w-full bg-transparent border-b border-[#3c3029]/20 py-3 focus:outline-none focus:border-[#3c3029] transition-colors" placeholder="sophia" />
          </div>
          <div>
            <label className="text-[0.65rem] uppercase tracking-[0.2em] opacity-50 block mb-2 font-medium mt-6">Password</label>
            <input value={password} onChange={e => setPassword(e.target.value)} type="password" className="w-full bg-transparent border-b border-[#3c3029]/20 py-3 focus:outline-none focus:border-[#3c3029] transition-colors" placeholder="••••••••" />
          </div>
          
          <button type="submit" className="w-full bg-[#3c3029] text-white py-4 text-[0.65rem] uppercase tracking-[0.2em] hover:bg-[#3c3029]/80 transition-colors mt-8 font-medium">
            Authenticate
          </button>
        </form>
        <div className="mt-8 flex justify-between text-xs opacity-50">
           <a href="/" className="hover:underline">Return to Core Pink</a>
           <a href="/register" className="hover:underline">Create Account</a>
        </div>
      </motion.div>
    </div>
  );
}
