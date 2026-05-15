import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Search, MapPin, Calendar, Users, Send } from 'lucide-react';
import gsap from 'gsap';
import Modal from '../ui/Modal';

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    // Mouse parallax effect for the floating card
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth - 0.5) * 20;
      const y = (clientY / window.innerHeight - 0.5) * 20;
      
      gsap.to('.glass-card', {
        x: x,
        y: y,
        duration: 1,
        ease: 'power2.out',
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      <div ref={containerRef} className="relative h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Background Video */}
        <motion.div style={{ y }} className="absolute inset-0 w-full h-full -z-10">
          <div className="absolute inset-0 bg-black/40 z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-transparent z-10" />
          <video 
            autoPlay 
            muted 
            loop 
            playsInline 
            className="w-full h-full object-cover"
          >
            <source src="https://cdn.pixabay.com/video/2020/05/11/38874-419808307_large.mp4" type="video/mp4" />
          </video>
        </motion.div>

        {/* Content */}
        <motion.div 
          style={{ opacity }}
          className="relative z-20 max-w-7xl mx-auto px-6 md:px-12 w-full pt-20"
        >
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <span className="text-accent text-sm md:text-base font-semibold tracking-widest uppercase mb-4 block">
                Redefining Luxury Travel
              </span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.1] tracking-tighter mb-6"
            >
              Experience The <br />
              <span className="font-serif italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-accent to-white">
                Extraordinary
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="text-lg md:text-xl text-text-muted mb-10 max-w-xl"
            >
              Curated cinematic journeys designed for the modern explorer. Escape the ordinary and immerse yourself in pure elegance.
            </motion.p>
          </div>

          {/* Floating Search Card */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="glass-card glass p-4 md:p-6 rounded-3xl max-w-4xl w-full flex flex-col md:flex-row gap-4 justify-between items-center relative z-30"
          >
            <div onClick={() => setIsSearchOpen(true)} className="flex-1 w-full flex items-center gap-4 px-4 py-3 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer">
              <MapPin className="text-accent w-6 h-6" />
              <div className="flex flex-col">
                <span className="text-xs text-text-muted uppercase tracking-wider">Destination</span>
                <span className="text-sm font-medium">Where to?</span>
              </div>
            </div>
            
            <div className="hidden md:block w-[1px] h-12 bg-white/10"></div>
            
            <div onClick={() => setIsSearchOpen(true)} className="flex-1 w-full flex items-center gap-4 px-4 py-3 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer">
              <Calendar className="text-accent w-6 h-6" />
              <div className="flex flex-col">
                <span className="text-xs text-text-muted uppercase tracking-wider">Dates</span>
                <span className="text-sm font-medium">When?</span>
              </div>
            </div>

            <div className="hidden md:block w-[1px] h-12 bg-white/10"></div>
            
            <div onClick={() => setIsSearchOpen(true)} className="flex-1 w-full flex items-center gap-4 px-4 py-3 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer">
              <Users className="text-accent w-6 h-6" />
              <div className="flex flex-col">
                <span className="text-xs text-text-muted uppercase tracking-wider">Guests</span>
                <span className="text-sm font-medium">Who?</span>
              </div>
            </div>

            <button onClick={() => setIsSearchOpen(true)} className="w-full md:w-auto mt-4 md:mt-0 p-4 mx-auto md:p-4 bg-accent text-bg rounded-2xl hover:opacity-90 transition-opacity flex items-center justify-center cursor-pointer">
              <Search className="w-6 h-6" />
            </button>
          </motion.div>
        </motion.div>
      </div>

      <Modal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} title="Plan Your Escape">
        <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert('Journey inquiry sent! A specialist will contact you.'); setIsSearchOpen(false); }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2 text-text-muted">Destination</label>
              <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-accent appearance-none">
                <option value="" className="bg-bg text-text">Anywhere</option>
                <option value="europe" className="bg-bg text-text">Europe</option>
                <option value="asia" className="bg-bg text-text">Asia</option>
                <option value="americas" className="bg-bg text-text">The Americas</option>
                <option value="africa" className="bg-bg text-text">Africa</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-text-muted">Travel Month</label>
              <input type="month" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-text-muted">Number of Guests</label>
              <input type="number" min="1" defaultValue="2" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-accent" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-text-muted">Budget Tier</label>
              <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-accent appearance-none">
                <option value="premium" className="bg-bg text-text">Premium ($5k - $10k)</option>
                <option value="luxury" className="bg-bg text-text">Luxury ($10k - $25k)</option>
                <option value="ultra" className="bg-bg text-text">Ultra-Luxury ($25k+)</option>
              </select>
            </div>
          </div>
          <button type="submit" className="w-full py-4 bg-accent text-bg font-bold uppercase tracking-widest rounded-xl hover:opacity-90 transition-opacity flex justify-center items-center gap-2 cursor-pointer">
            Discover Trips <Send className="w-4 h-4" />
          </button>
        </form>
      </Modal>
    </>
  );
}
