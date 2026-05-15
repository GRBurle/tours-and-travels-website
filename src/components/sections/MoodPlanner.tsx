import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTheme } from '../../context/ThemeContext';
import { Sparkles, ArrowRight, X } from 'lucide-react';
import Modal from '../ui/Modal';

const MOODS = [
  { id: 'luxury', label: 'Luxury', theme: 'luxury', image: 'https://images.unsplash.com/photo-1542314831-c533f5451611?q=80&w=2000&auto=format&fit=crop' },
  { id: 'nature', label: 'Nature', theme: 'nature', image: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?q=80&w=2000&auto=format&fit=crop' },
  { id: 'future', label: 'Adventure', theme: 'future', image: 'https://images.unsplash.com/photo-1522199755839-a2bacb67c546?q=80&w=2000&auto=format&fit=crop' },
  { id: 'romance', label: 'Couples', theme: 'romance', image: 'https://images.unsplash.com/photo-1516738901171-8eb4fc13bd20?q=80&w=2000&auto=format&fit=crop' },
];

const DESTINATIONS = {
  luxury: [
    { name: 'Dubai', desc: 'Burj Al Arab & Desert Safari', img: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1000' },
    { name: 'Monaco', desc: 'Yacht Rentals & Casinos', img: 'https://images.unsplash.com/photo-1543886524-7123aa128eeb?q=80&w=1000' },
    { name: 'Maldives', desc: 'Overwater Bungalows', img: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=1000' },
  ],
  nature: [
    { name: 'Costa Rica', desc: 'Rainforest & Volcanoes', img: 'https://images.unsplash.com/photo-1518182170546-076616fd4ed7?q=80&w=1000' },
    { name: 'Iceland', desc: 'Glaciers & Northern Lights', img: 'https://images.unsplash.com/photo-1476610182048-b716b8518aae?q=80&w=1000' },
    { name: 'New Zealand', desc: 'Fjords & Hiking', img: 'https://images.unsplash.com/photo-1469521669194-babbdf9ff9cb?q=80&w=1000' },
  ],
  future: [
    { name: 'Tokyo', desc: 'Neon Cityscapes & Tech', img: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=1000' },
    { name: 'Singapore', desc: 'Gardens by the Bay', img: 'https://images.unsplash.com/photo-1525625299374-140d0d1f1038?q=80&w=1000' },
    { name: 'Seoul', desc: 'Modern Culture & Innovation', img: 'https://images.unsplash.com/photo-1538485399081-7191377e8241?q=80&w=1000' },
  ],
  romance: [
    { name: 'Paris', desc: 'Eiffel Tower & Seine River', img: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1000' },
    { name: 'Santorini', desc: 'Sunsets & Wine', img: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=1000' },
    { name: 'Venice', desc: 'Gondola Rides & History', img: 'https://images.unsplash.com/photo-1514890547357-a9ee288728e0?q=80&w=1000' },
  ],
};

export default function MoodPlanner() {
  const { theme, setTheme } = useTheme();
  const [activeMood, setActiveMood] = useState(MOODS.find(m => m.theme === theme) || MOODS[0]);
  const [selectedDest, setSelectedDest] = useState<any>(null);

  const handleMoodChange = (mood: typeof MOODS[0]) => {
    setActiveMood(mood);
    setTheme(mood.theme as any);
  };

  return (
    <>
      <section className="py-32 relative overflow-hidden transition-colors duration-1000" id="experiences">
        {/* Dynamic Background Image overlay for section */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeMood.id}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 0.15, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 z-0"
          >
            <img src={activeMood.image} alt="mood bg" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-bg via-transparent to-bg" />
          </motion.div>
        </AnimatePresence>

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="flex flex-col items-center text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
              <Sparkles className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium tracking-widest uppercase">AI Mood Planner</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              How do you want to <span className="font-serif italic text-accent">feel?</span>
            </h2>
            <p className="text-text-muted max-w-2xl text-lg">
              Select your desired state of mind, and our AI will curate the perfect destinations, palettes, and experiences for you.
            </p>
          </div>

          {/* Mood Selectors */}
          <div className="flex flex-wrap justify-center gap-4 mb-20">
            {MOODS.map((mood) => (
              <button
                key={mood.id}
                onClick={() => handleMoodChange(mood)}
                className={`px-8 py-4 rounded-full text-sm uppercase tracking-widest font-semibold transition-all duration-500 cursor-pointer ${
                  activeMood.id === mood.id
                    ? 'bg-accent text-bg scale-105 shadow-[0_0_30px_rgba(var(--accent),0.5)]'
                    : 'glass text-text hover:bg-white/10'
                }`}
              >
                {mood.label}
              </button>
            ))}
          </div>

          {/* Dynamic Recommendations */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <AnimatePresence mode="wait">
              {DESTINATIONS[activeMood.id as keyof typeof DESTINATIONS].map((dest, i) => (
                <motion.div
                  key={`${activeMood.id}-${i}`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  onClick={() => setSelectedDest(dest)}
                  className="glass p-8 rounded-3xl group cursor-pointer hover:bg-white/5 transition-colors flex flex-col relative overflow-hidden"
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500">
                    <img src={dest.img} alt={dest.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="relative z-10 flex-1">
                    <h3 className="text-2xl font-bold mb-2 group-hover:text-accent transition-colors">{dest.name}</h3>
                    <p className="text-text-muted mb-8">{dest.desc}</p>
                  </div>
                  <div className="relative z-10 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider group-hover:text-accent transition-colors mt-auto">
                    Explore <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      <Modal isOpen={!!selectedDest} onClose={() => setSelectedDest(null)} title={`Experience ${selectedDest?.name}`}>
        {selectedDest && (
          <div>
            <div className="h-64 md:h-80 w-full rounded-2xl overflow-hidden mb-8 relative">
              <img src={selectedDest.img} alt={selectedDest.name} className="w-full h-full object-cover" />
            </div>
            <p className="text-lg text-text-muted mb-8 leading-relaxed">
              Immerse yourself in the perfect {activeMood.label.toLowerCase()} getaway to {selectedDest.name}. 
              Experience {selectedDest.desc.toLowerCase()} in a tailored journey curated specifically to match your mood.
            </p>
            <button 
              onClick={() => { alert('Mood-based itinerary requested!'); setSelectedDest(null); }}
              className="w-full py-4 bg-accent text-bg font-bold uppercase tracking-widest rounded-xl hover:opacity-90 transition-opacity cursor-pointer"
            >
              Plan This Mood
            </button>
          </div>
        )}
      </Modal>
    </>
  );
}
