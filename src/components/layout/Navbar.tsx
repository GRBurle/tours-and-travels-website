import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Globe, User, Search, Send } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import Modal from '../ui/Modal';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isBookOpen, setIsBookOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      const top = element.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  const navLinks = [
    { name: 'Destinations', href: '#destinations' },
    { name: 'Experiences', href: '#experiences' },
    { name: 'Build Tour', href: '#build' },
    { name: 'Timeline', href: '#timeline' },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'py-4 glass' : 'py-6 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <div 
            className="flex items-center gap-2 cursor-pointer" 
            onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
          >
            <Globe className={`w-8 h-8 text-accent`} />
            <span className="text-2xl font-bold tracking-tight">AURA</span>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleScrollTo(e, link.href)}
                className="text-sm font-medium tracking-wide hover:text-accent transition-colors uppercase"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="p-2 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
            >
              <Search className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setIsLoginOpen(true)}
              className="p-2 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
            >
              <User className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setIsBookOpen(true)}
              className="px-6 py-2 bg-accent text-bg font-medium rounded-full cursor-pointer hover:opacity-90 transition-opacity"
            >
              Book Now
            </button>
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden flex items-center gap-4">
            <button className="cursor-pointer" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: '100vh' }}
              exit={{ opacity: 0, height: 0 }}
              className="absolute top-full left-0 right-0 bg-bg md:hidden flex flex-col items-center justify-start pt-20 gap-8 h-screen border-t border-white/10"
            >
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleScrollTo(e, link.href)}
                  className="text-2xl font-serif italic hover:text-accent transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <div className="flex gap-4 mt-4">
                <button 
                  onClick={() => {setMobileMenuOpen(false); setIsSearchOpen(true);}}
                  className="p-4 glass rounded-full"
                >
                  <Search className="w-6 h-6" />
                </button>
                <button 
                  onClick={() => {setMobileMenuOpen(false); setIsLoginOpen(true);}}
                  className="p-4 glass rounded-full"
                >
                  <User className="w-6 h-6" />
                </button>
              </div>
              <button 
                onClick={() => {setMobileMenuOpen(false); setIsBookOpen(true);}}
                className="px-12 py-4 mt-4 bg-accent text-bg font-medium rounded-full cursor-pointer"
              >
                Book Now
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Modals */}
      <Modal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} title="Search Destinations">
        <div className="relative">
          <input 
            type="text" 
            placeholder="Where do you want to go?" 
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-lg focus:outline-none focus:border-accent transition-colors"
            autoFocus
          />
          <button className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-accent text-bg rounded-xl cursor-pointer">
            <Search className="w-5 h-5" />
          </button>
        </div>
        <div className="mt-8">
          <h4 className="text-sm font-semibold tracking-widest uppercase text-text-muted mb-4">Popular Searches</h4>
          <div className="flex flex-wrap gap-2">
            {['Maldives', 'Swiss Alps', 'Kyoto', 'Amalfi Coast'].map(tag => (
              <span key={tag} className="px-4 py-2 glass rounded-full text-sm cursor-pointer hover:bg-white/10 transition-colors">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </Modal>

      <Modal isOpen={isBookOpen} onClose={() => setIsBookOpen(false)} title="Start Your Journey">
        <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert('Inquiry Sent! Our concierge will contact you shortly.'); setIsBookOpen(false); }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2 text-text-muted">First Name</label>
              <input required type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-accent" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-text-muted">Last Name</label>
              <input required type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-accent" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 text-text-muted">Email Address</label>
            <input required type="email" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-accent" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 text-text-muted">Destination / Ideas</label>
            <textarea rows={4} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-accent custom-scrollbar"></textarea>
          </div>
          <button type="submit" className="w-full py-4 bg-accent text-bg font-bold uppercase tracking-widest rounded-xl hover:opacity-90 transition-opacity flex justify-center items-center gap-2 cursor-pointer">
            Send Inquiry <Send className="w-4 h-4" />
          </button>
        </form>
      </Modal>

      <Modal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} title="Member Access">
        <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert('Login preview mode.'); setIsLoginOpen(false); }}>
          <div>
            <label className="block text-sm font-medium mb-2 text-text-muted">Email</label>
            <input required type="email" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-accent" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 text-text-muted">Password</label>
            <input required type="password" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-accent" />
          </div>
          <button type="submit" className="w-full py-4 bg-white text-black font-bold uppercase tracking-widest rounded-xl hover:bg-accent hover:text-white transition-colors cursor-pointer">
            Sign In
          </button>
        </form>
      </Modal>
    </>
  );
}
