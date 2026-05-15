import React from 'react';
import { motion } from 'motion/react';
import { Globe, ArrowRight, Instagram, Twitter, Facebook } from 'lucide-react';

export default function Footer() {
  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const top = element.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <>
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2000&auto=format&fit=crop" alt="luxury flight" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-bg/80 backdrop-blur-sm" />
        </div>
        
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-bold mb-8"
          >
            Ready for your next <span className="font-serif italic text-accent">Adventure?</span>
          </motion.h2>
          <motion.button 
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.2 }}
             onClick={(e) => scrollToSection(e, 'build')}
             className="px-8 py-4 bg-accent text-bg font-bold uppercase tracking-widest rounded-full hover:scale-105 transition-transform flex items-center gap-4 mx-auto cursor-pointer"
          >
            Start Planning <ArrowRight className="w-5 h-5" />
          </motion.button>
        </div>
      </section>

      <footer className="bg-bg py-16 border-t border-white/5 relative z-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-6 cursor-pointer" onClick={scrollToTop}>
              <Globe className="w-6 h-6 text-accent" />
              <span className="text-xl font-bold tracking-tight">AURA</span>
            </div>
            <p className="text-text-muted text-sm leading-relaxed mb-6">
              Exclusive journeys and bespoke travel experiences for the modern explorer. Redefining what it means to travel in luxury.
            </p>
            <div className="flex gap-4">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="p-2 glass rounded-full hover:bg-accent transition-colors"><Instagram className="w-4 h-4" /></a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="p-2 glass rounded-full hover:bg-accent transition-colors"><Twitter className="w-4 h-4" /></a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="p-2 glass rounded-full hover:bg-accent transition-colors"><Facebook className="w-4 h-4" /></a>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold mb-6 tracking-widest uppercase text-sm">Destinations</h4>
            <ul className="space-y-4 text-text-muted text-sm">
              <li><a href="#destinations" onClick={(e) => scrollToSection(e, 'destinations')} className="hover:text-accent transition-colors cursor-pointer">Europe</a></li>
              <li><a href="#destinations" onClick={(e) => scrollToSection(e, 'destinations')} className="hover:text-accent transition-colors cursor-pointer">Asia</a></li>
              <li><a href="#destinations" onClick={(e) => scrollToSection(e, 'destinations')} className="hover:text-accent transition-colors cursor-pointer">Americas</a></li>
              <li><a href="#destinations" onClick={(e) => scrollToSection(e, 'destinations')} className="hover:text-accent transition-colors cursor-pointer">Africa</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 tracking-widest uppercase text-sm">Experiences</h4>
            <ul className="space-y-4 text-text-muted text-sm">
              <li><a href="#experiences" onClick={(e) => scrollToSection(e, 'experiences')} className="hover:text-accent transition-colors cursor-pointer">Luxury Resorts</a></li>
              <li><a href="#experiences" onClick={(e) => scrollToSection(e, 'experiences')} className="hover:text-accent transition-colors cursor-pointer">Private Villas</a></li>
              <li><a href="#experiences" onClick={(e) => scrollToSection(e, 'experiences')} className="hover:text-accent transition-colors cursor-pointer">Yacht Charters</a></li>
              <li><a href="#experiences" onClick={(e) => scrollToSection(e, 'experiences')} className="hover:text-accent transition-colors cursor-pointer">Expeditions</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 tracking-widest uppercase text-sm">Newsletter</h4>
            <p className="text-text-muted text-sm mb-4">Subscribe for exclusive offers and travel inspiration.</p>
            <form className="flex gap-2" onSubmit={(e) => { e.preventDefault(); alert('Subscribed successfully!'); }}>
              <input required type="email" placeholder="Your email" className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 w-full text-sm focus:outline-none focus:border-accent" />
              <button type="submit" className="bg-accent text-bg px-4 py-2 rounded-lg font-bold text-sm hover:opacity-90 transition-opacity cursor-pointer">
                Join
              </button>
            </form>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 md:px-12 mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs tracking-wider text-text-muted">
          <p>&copy; {new Date().getFullYear()} AURA TRAVELS. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <button className="hover:text-white transition-colors uppercase tracking-widest text-xs cursor-pointer">PRIVACY POLICY</button>
            <button className="hover:text-white transition-colors uppercase tracking-widest text-xs cursor-pointer">TERMS OF SERVICE</button>
          </div>
        </div>
      </footer>
    </>
  );
}
