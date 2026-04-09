"use client";

import { motion, AnimatePresence, Variants } from "framer-motion";
import { useEffect, useState } from "react";

interface PilatesClass {
  id: number;
  title: string;
  description: string;
  date_time: string;
  duration_minutes: number;
  capacity: number;
  price: string;
  instructor_name: string;
}

const getClassImage = (title: string) => {
  if (title.includes("Reformer")) return "/images/reformer_pink.png";
  if (title.includes("Curated")) return "/images/curated_pink.png";
  if (title.includes("Mat")) return "/images/mat_pink.png";
  if (title.includes("Cadillac")) return "/images/cadillac_pink.png";
  if (title.includes("Ark Barrel") || title.includes("Tower") && title.includes("Ark")) return "/images/ark_barrel_pink.png";
  if (title.includes("Tower Integration") || title === "Tower") return "/images/tower_pink.png"; 
  if (title.includes("Circuit")) return "/images/circuit_pink.png"; 
  if (title.includes("Stability Chair") || title.includes("Chair")) return "/images/chair_pink.png"; 
  
  return "/images/hero_pink.png"; 
};

const textFade: Variants = {
  initial: { opacity: 0, scale: 0.98 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
  exit: { opacity: 0, scale: 0.98, transition: { duration: 0.4 } }
};

export default function Home() {
  const [classes, setClasses] = useState<PilatesClass[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [bookingStatus, setBookingStatus] = useState<Record<number, string>>({});

  const handleReserve = async (classId: number) => {
    setBookingStatus(prev => ({...prev, [classId]: 'loading'}));
    const username = localStorage.getItem("core_user") || "Guest";
    
    try {
      const response = await fetch("/api/secure/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
           class_id: classId, 
           customer_name: username, 
           customer_email: `${username}@example.com` 
        })
      });

      if (response.status === 401) {
          alert("Unauthorized. You must Sign In to reserve a class.");
          window.location.href = '/login';
          return;
      }

      if (response.ok) {
          setBookingStatus(prev => ({...prev, [classId]: 'success'}));
      } else {
          setBookingStatus(prev => ({...prev, [classId]: 'error'}));
      }
    } catch {
      setBookingStatus(prev => ({...prev, [classId]: 'error'}));
    }
  }

  useEffect(() => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
    fetch(`${API_URL}/api/classes/`)
      .then((res) => res.json())
      .then((data) => {
        setClasses(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching classes:", error);
        setIsLoading(false);
      });
  }, []);

  const activeClass = classes[activeIndex];
  const date = activeClass ? new Date(activeClass.date_time) : null;

  return (
    <div className="bg-background text-[#3c3029] font-sans selection:bg-foreground selection:text-[#3c3029] relative">
      
      {/* HEADER NAV - Added Sign In / Log In */}
      <nav className="absolute top-0 w-full z-50 text-white p-8 md:p-12 flex justify-between items-center mix-blend-difference">
          <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{duration: 1.5}} className="text-xl md:text-2xl tracking-[0.2em] font-serif italic font-light">
            core pink.
          </motion.div>
          <div className="flex items-center gap-16">
            <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{duration: 1.5, delay: 0.2}} className="space-x-8 text-[0.65rem] uppercase tracking-[0.2em] hidden md:block">
              <a href="#" className="hover:opacity-70 transition-opacity">Home</a>
              <a href="#about" className="hover:opacity-70 transition-opacity">About</a>
              <a href="/contact" className="hover:opacity-70 transition-opacity">Contact</a>
            </motion.div>
            <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{duration: 1.5, delay: 0.4}} className="space-x-6 text-[0.65rem] uppercase tracking-[0.2em] hidden md:flex items-center">
              <a href="/login" className="hover:opacity-70 transition-opacity font-medium">Sign In</a>
              <a href="/login" className="border border-white px-8 py-3 rounded-full hover:bg-white hover:text-[#3c3029] transition-colors font-medium">Log In</a>
            </motion.div>
          </div>
      </nav>

      {/* HERO SECTION */}
      <section className="h-screen relative flex flex-col justify-end p-8 md:p-16">
        <div className="absolute inset-0 z-0 bg-[#3c3029]">
          <motion.img 
            initial={{ scale: 1.05, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.8 }}
            transition={{ duration: 2, ease: "easeOut" }}
            src="/images/hero_pink.png" 
            className="w-full h-full object-cover" 
            alt="hero" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#3c3029]/80 to-transparent opacity-80" />
        </div>

        <div className="z-10 relative text-background flex flex-col items-start pb-12 overflow-hidden mix-blend-difference">
          <motion.h1 
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1.5, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="text-[14vw] leading-[0.85] font-serif tracking-tighter text-white"
          >
            unleash<br/>
            <span className="italic ml-[15vw] font-light text-foreground">your power.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 1.2 }}
            className="mt-16 max-w-xs uppercase tracking-[0.2em] text-[0.65rem] leading-loose opacity-70 text-white"
          >
            A sanctuary for mindful realignment. Return to the classic method.
          </motion.p>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="py-40 px-8 xl:px-24 bg-background text-[#3c3029]">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-5xl mx-auto flex flex-col md:flex-row gap-16 md:gap-32 items-center"
        >
          <div className="w-full md:w-1/2">
            <h2 className="text-4xl md:text-6xl font-serif leading-tight">Elevating<br />the classical<br /><span className="italic">pilates approach.</span></h2>
          </div>
          <div className="w-full md:w-1/2">
            <p className="text-sm leading-loose opacity-80 mb-8 font-light">
              Core Pink is a luxury athletic sanctuary dedicated exclusively to the authentic art of body alignment. We believe that true power is built from the inside out. By combining high-end boutique environments with extremely focused instruction, we guide our clients to completely reshape their posture, core strength, and natural grace.
            </p>
            <p className="text-sm leading-loose opacity-80 font-light">
              Whether you are engaging your deepest abdominals on the Mat, or defying gravity on the Cadillac Trapeze, our intimate classes ensure you are continually pushed beyond your perceived limits softly, safely, and beautifully in an all-pink, incredibly serene atmosphere.
            </p>
          </div>
        </motion.div>
      </section>

      {/* STICKY SCROLL COLLECTION SECTION WITH CONTRAST CORRECTION */}
      <section className="bg-foreground text-[#3c3029]">
        <div className="p-8 xl:p-24 pb-0">
          <motion.div 
              initial={{opacity: 0, y: 50}} 
              whileInView={{opacity: 1, y:0}} 
              viewport={{once:true, margin: "-100px"}} 
              transition={{duration: 1}}
              className="flex justify-between items-end border-b border-[#3c3029]/20 pb-12 w-full"
            >
              <h2 className="text-6xl md:text-8xl font-serif">the <span className="italic font-light">collection</span></h2>
              <p className="hidden md:block uppercase tracking-[0.2em] text-[0.65rem] opacity-70">Scroll To Explore</p>
          </motion.div>
        </div>

        {isLoading ? (
          <div className="text-center opacity-50 uppercase tracking-[0.2em] text-[0.65rem] animate-pulse py-32">Loading collection...</div>
        ) : (
          <div className="flex flex-col md:flex-row relative w-full items-start px-8 xl:px-24">
            
            {/* LEFT COLUMN: Sticky Information */}
            <div className="w-full md:w-1/2 md:sticky md:top-0 h-auto md:h-screen flex flex-col justify-center py-20 md:py-0 md:pr-12 md:pl-0 z-10 pointers-events-none">
              
              <AnimatePresence mode="wait">
                {activeClass && (
                  <motion.div
                    key={activeClass.id}
                    variants={textFade}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="pointers-events-auto"
                  >
                    <p className="text-[0.65rem] uppercase tracking-[0.2em] opacity-60 mb-8 flex gap-6 font-medium">
                        <span>{date?.toLocaleDateString('en-US', { month: 'long', day: 'numeric'})}</span>
                        <span>{date?.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit'})}</span>
                    </p>
                    
                    <h3 className="text-5xl md:text-7xl font-serif mb-12 leading-[1.1]">{activeClass.title}</h3>
                    
                    <div className="text-sm opacity-80 leading-loose max-w-md mb-16 font-light md:min-h-[140px]">
                      {activeClass.description}
                    </div>

                    <div className="flex flex-col sm:flex-row border-t border-[#3c3029]/20 pt-8 items-start sm:items-center justify-between max-w-md gap-8 sm:gap-0">
                      <div className="flex gap-12">
                        <div>
                          <p className="text-[0.55rem] uppercase tracking-[0.2em] opacity-50 mb-2 font-medium">Instructor</p>
                          <p className="text-sm font-light">{activeClass.instructor_name}</p>
                        </div>
                        <div>
                          <p className="text-[0.55rem] uppercase tracking-[0.2em] opacity-50 mb-2 font-medium">Investment</p>
                          <p className="text-sm font-light">₹{activeClass.price}</p>
                        </div>
                      </div>
                      
                      {/* High Contrast Reserve Button */}
                      <div className="flex flex-col items-start sm:items-end w-full sm:w-auto mt-6 sm:mt-0">
                        <button 
                          onClick={() => handleReserve(activeClass.id)}
                          disabled={bookingStatus[activeClass.id] === 'loading' || bookingStatus[activeClass.id] === 'success'}
                          className="bg-[#3c3029] text-white px-8 py-4 rounded-full text-[0.65rem] uppercase tracking-[0.2em] hover:bg-[#3c3029]/80 transition-colors relative group font-medium disabled:opacity-50 w-full"
                        >
                          {bookingStatus[activeClass.id] === 'loading' ? 'Confirming...' : 
                           bookingStatus[activeClass.id] === 'success' ? 'Spot Reserved' : 
                           bookingStatus[activeClass.id] === 'error' ? 'Error' : 'Reserve'}
                        </button>
                        <p className="text-[0.55rem] uppercase tracking-[0.2em] opacity-40 mt-3 text-center sm:text-right w-full">Payment Collected In-Studio</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* RIGHT COLUMN: Scrolling Images */}
            <div className="w-full md:w-1/2 flex flex-col pt-[10vh] pb-[50vh] space-y-[30vh]">
              {classes.map((cls, index) => {
                const imgSrc = getClassImage(cls.title);
                
                return (
                  <motion.div 
                    key={`img-${cls.id}`} 
                    className="w-full h-[60vh] md:h-[80vh] overflow-hidden relative"
                    onViewportEnter={() => setActiveIndex(index)}
                    viewport={{ amount: 0.5, margin: "-10% 0px -10% 0px" }}
                  >
                    <motion.img 
                      src={imgSrc} 
                      alt={cls.title} 
                      className={`absolute inset-0 w-full h-full object-cover transition-all duration-[1000ms] ease-out shadow-xl ${activeIndex !== index ? "opacity-40 grayscale scale-100" : "opacity-100 grayscale-0 scale-105"}`}
                    />
                  </motion.div>
                )
              })}
            </div>

          </div>
        )}
      </section>

      {/* FOOTER SECTION WITH CONTRAST CORRECTION */}
      <footer id="contact" className="bg-foreground text-[#3c3029] pt-32 pb-8 border-t border-[#3c3029]/10 px-8 xl:px-24">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-start mb-32">
          
          <div className="w-full md:w-1/3 mb-16 md:mb-0">
            <h4 className="text-2xl font-serif italic mb-8">core pink.</h4>
            <p className="text-sm opacity-70 font-light leading-relaxed max-w-xs mb-8">
              A private athletic sanctuary providing authentic classical alignment and modern luxury.
            </p>
            <div className="text-[0.65rem] uppercase tracking-[0.2em] opacity-50 space-y-1">
              <p>128 Elysium Avenue</p>
              <p>Koregaon Park</p>
              <p>Pune, Maharashtra 411001</p>
            </div>
          </div>

          <div className="w-full md:w-2/3 flex flex-col sm:flex-row gap-16 justify-end">
            <div className="flex flex-col gap-4 text-[0.65rem] uppercase tracking-[0.2em] font-medium">
              <span className="opacity-40 mb-2">Navigation</span>
              <a href="#" className="hover:opacity-70 transition-opacity">Home</a>
              <a href="#about" className="hover:opacity-70 transition-opacity">About</a>
              <a href="/contact" className="hover:opacity-70 transition-opacity">Contact</a>
            </div>
            
            <div className="flex flex-col gap-4 text-[0.65rem] uppercase tracking-[0.2em] font-medium">
              <span className="opacity-40 mb-2">Connect</span>
              <a href="/dashboard" className="hover:opacity-70 transition-opacity">Admin Portal</a>
              <a href="#" className="hover:opacity-70 transition-opacity">Instagram</a>
              <a href="#" className="hover:opacity-70 transition-opacity">WhatsApp</a>
              <a href="#" className="hover:opacity-70 transition-opacity">Privacy Policy</a>
            </div>
          </div>
        </div>
        
        {/* Massive Brand Watermark */}
        <div className="w-full flex justify-center items-center overflow-hidden border-t border-[#3c3029]/10 pt-16">
          <h1 className="text-[18vw] leading-none font-serif tracking-tighter opacity-[0.03]">CORE PINK</h1>
        </div>
      </footer>

    </div>
  );
}
