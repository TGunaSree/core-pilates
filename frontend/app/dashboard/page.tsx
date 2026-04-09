"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Dashboard() {
  const [data, setData] = useState<any>({ bookings: [], contacts: [] });
  const [loading, setLoading] = useState(true);
  const [denied, setDenied] = useState(false);

  useEffect(() => {
    fetch("/api/secure/dashboard")
      .then(res => {
        if (res.status === 403) {
           setDenied(true);
           setLoading(false);
           return null;
        }
        return res.json();
      })
      .then(json => {
        if (json) setData(json);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="bg-background text-[#3c3029] min-h-screen p-8 md:p-16">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-end border-b border-[#3c3029]/20 pb-8 mb-16">
           <h1 className="text-4xl md:text-6xl font-serif leading-tight">Admin <br/><span className="italic">dashboard.</span></h1>
           <a href="/" className="text-[0.65rem] uppercase tracking-[0.2em] font-medium hover:opacity-70">&larr; Return to Studio</a>
        </div>

        {loading ? (
             <div className="text-center opacity-50 uppercase tracking-[0.2em] text-[0.65rem] animate-pulse py-32">Syncing with database...</div>
        ) : denied ? (
             <div className="bg-foreground py-24 text-center mt-12 shadow-xl border border-[#3c3029]/10">
                 <h2 className="text-3xl font-serif mb-4 text-red-900/80">Restricted Access</h2>
                 <p className="text-sm opacity-70 uppercase tracking-[0.2em]">Administrative Privileges Required</p>
                 <a href="/" className="inline-block mt-8 border border-[#3c3029] px-8 py-3 text-[0.65rem] uppercase tracking-[0.2em] hover:bg-[#3c3029] hover:text-white transition-colors">Exit Portal</a>
             </div>
        ) : (
            <div className="space-y-24">
                {/* Bookings Section */}
                <section>
                    <h2 className="text-2xl font-serif italic mb-8">Recent Bookings</h2>
                    <div className="bg-foreground p-8 overflow-x-auto shadow-xl">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="text-[0.65rem] uppercase tracking-[0.2em] opacity-40 border-b border-[#3c3029]/10">
                                    <th className="pb-4 font-medium">Customer</th>
                                    <th className="pb-4 font-medium">Email</th>
                                    <th className="pb-4 font-medium">Class Reference</th>
                                    <th className="pb-4 font-medium">Date Booked</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm font-light">
                                {data.bookings?.map((b: any) => (
                                    <tr key={b.id} className="border-b border-[#3c3029]/5 last:border-0 hover:bg-[#3c3029]/5 transition-colors">
                                        <td className="py-4 font-medium">{b.customer_name}</td>
                                        <td className="py-4">{b.customer_email}</td>
                                        <td className="py-4">ID #{b.pilates_class}</td>
                                        <td className="py-4 opacity-70">{new Date(b.created_at).toLocaleDateString()}</td>
                                    </tr>
                                ))}
                                {data.bookings?.length === 0 && (
                                    <tr><td colSpan={4} className="py-8 text-center opacity-50 text-xs">No active bookings yet.</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* Contact Section */}
                <section>
                    <h2 className="text-2xl font-serif italic mb-8">Contact Inquiries</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {data.contacts?.map((c: any) => (
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} key={c.id} className="bg-foreground p-8 shadow-xl">
                                <div className="flex justify-between items-start mb-4">
                                     <div>
                                         <p className="font-serif text-lg">{c.name}</p>
                                         <p className="text-[0.65rem] uppercase tracking-[0.2em] opacity-50 mt-1">{c.email}</p>
                                     </div>
                                     <span className="text-[0.55rem] uppercase tracking-[0.2em] opacity-40">{new Date(c.created_at).toLocaleDateString()}</span>
                                </div>
                                <p className="text-sm font-light leading-relaxed opacity-80 mt-6 pt-6 border-t border-[#3c3029]/10">"{c.message}"</p>
                            </motion.div>
                        ))}
                    </div>
                     {data.contacts?.length === 0 && (
                          <div className="bg-foreground py-16 text-center opacity-50 text-xs w-full shadow-xl">No messages yet.</div>
                     )}
                </section>
            </div>
        )}
      </div>
    </div>
  );
}
