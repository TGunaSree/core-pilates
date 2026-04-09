"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function Contact() {
  const [status, setStatus] = useState("idle");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setStatus("submitting");
    
    // Connect to Django backend
    const formData = new FormData(e.target);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message")
    };
    
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      const response = await fetch(`${API_URL}/api/contact/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      if (response.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="bg-background text-[#3c3029] min-h-screen flex items-center justify-center p-8 md:p-16">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="flex flex-col md:flex-row w-full max-w-6xl">
        <div className="w-full md:w-1/2 md:pr-24 flex flex-col justify-center">
          <h1 className="text-5xl md:text-7xl font-serif mb-8 leading-tight">Let's <br/><span className="italic text-foreground">align.</span></h1>
          <p className="opacity-70 leading-relaxed mb-16 max-w-sm">Reach out to master instructors. Let us know how we can elevate your classical pilates journey before you sign up.</p>
          <a href="/" className="text-[0.65rem] uppercase tracking-[0.2em] hover:opacity-70 mb-16 block">&larr; Back to Studio</a>
        </div>
        
        <div className="w-full md:w-1/2">
          {status === "success" ? (
             <div className="bg-foreground p-12 text-[#3c3029]">
               <h2 className="text-2xl font-serif italic mb-4">Received.</h2>
               <p className="opacity-70">Your message has been securely submitted to the Core Pink database. We will reply shortly.</p>
               <button onClick={() => window.location.href='/'} className="mt-8 border border-[#3c3029] px-6 py-2 text-[0.65rem] uppercase tracking-[0.2em]">Return Home</button>
             </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              <div>
                <label className="text-[0.65rem] uppercase tracking-[0.2em] opacity-50 block mb-2 font-medium">Your Name</label>
                <input name="name" required type="text" className="w-full bg-transparent border-b border-[#3c3029]/20 py-3 focus:outline-none focus:border-[#3c3029] transition-colors" />
              </div>
              <div>
                <label className="text-[0.65rem] uppercase tracking-[0.2em] opacity-50 block mb-2 font-medium mt-6">Email Address</label>
                <input name="email" required type="email" className="w-full bg-transparent border-b border-[#3c3029]/20 py-3 focus:outline-none focus:border-[#3c3029] transition-colors" />
              </div>
              <div>
                <label className="text-[0.65rem] uppercase tracking-[0.2em] opacity-50 block mb-2 font-medium mt-6">Private Message</label>
                <textarea name="message" required rows={4} className="w-full bg-transparent border-b border-[#3c3029]/20 py-3 focus:outline-none focus:border-[#3c3029] transition-colors resize-none"></textarea>
              </div>
              
              <button type="submit" disabled={status === 'submitting'} className="bg-[#3c3029] text-white py-4 px-12 text-[0.65rem] uppercase tracking-[0.2em] hover:bg-[#3c3029]/80 transition-colors mt-8 font-medium disabled:opacity-50">
                {status === 'submitting' ? 'Transmitting...' : 'Send Message'}
              </button>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
}
