"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("idle");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      const response = await fetch(`${API_URL}/api/register/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password })
      });

      if (response.ok) {
        setStatus("success");
        setTimeout(() => window.location.href = '/login', 2000);
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
        <h1 className="text-4xl font-serif mb-8 leading-tight">Join <br/><span className="italic">core pink.</span></h1>
        
        {status === "error" && <p className="text-red-500 text-xs mb-4">Registration failed. Username may exist.</p>}
        {status === "success" && <p className="text-green-600 text-xs mb-4">Account created. Proceed to login.</p>}

        <form onSubmit={handleRegister} className="space-y-6">
          <div>
            <label className="text-[0.65rem] uppercase tracking-[0.2em] opacity-50 block mb-2 font-medium">Username</label>
            <input required value={username} onChange={e => setUsername(e.target.value)} type="text" className="w-full bg-transparent border-b border-[#3c3029]/20 py-3 focus:outline-none focus:border-[#3c3029] transition-colors" />
          </div>
          <div>
            <label className="text-[0.65rem] uppercase tracking-[0.2em] opacity-50 block mb-2 font-medium mt-6">Email</label>
            <input required value={email} onChange={e => setEmail(e.target.value)} type="email" className="w-full bg-transparent border-b border-[#3c3029]/20 py-3 focus:outline-none focus:border-[#3c3029] transition-colors" />
          </div>
          <div>
            <label className="text-[0.65rem] uppercase tracking-[0.2em] opacity-50 block mb-2 font-medium mt-6">Password</label>
            <input required value={password} onChange={e => setPassword(e.target.value)} type="password" className="w-full bg-transparent border-b border-[#3c3029]/20 py-3 focus:outline-none focus:border-[#3c3029] transition-colors" />
          </div>
          
          <button type="submit" disabled={status === 'loading'} className="w-full bg-[#3c3029] text-white py-4 text-[0.65rem] uppercase tracking-[0.2em] hover:bg-[#3c3029]/80 transition-colors mt-8 font-medium disabled:opacity-50">
            {status === 'loading' ? 'Processing...' : 'Create Account'}
          </button>
        </form>
        <div className="mt-8 flex justify-between text-xs opacity-50">
           <a href="/" className="hover:underline">Return to Core Pink</a>
           <a href="/login" className="hover:underline">Already a member? Log In.</a>
        </div>
      </motion.div>
    </div>
  );
}
