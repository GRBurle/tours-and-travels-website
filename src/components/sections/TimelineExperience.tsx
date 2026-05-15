import React from 'react';
import { motion } from 'motion/react';
import { Download } from 'lucide-react';

const ITINERARY = [
  { day: 1, title: 'Arrival in Paradise', desc: 'Private helicopter transfer to your overwater villa. Unwind with a sunset dinner.' },
  { day: 2, title: 'Ocean Exploration', desc: 'Guided scuba diving session exploring pristine coral reefs.' },
  { day: 3, title: 'Cultural Immersion', desc: 'Private tour of local heritage sites followed by a culinary masterclass.' },
  { day: 4, title: 'Relaxation & Spa', desc: 'Full day access to the world-renowned holistic spa wellness center.' },
  { day: 5, title: 'Farewell', desc: 'Morning yacht cruise. Private jet transfer for departure.' },
];

export default function TimelineExperience() {
  return (
    <section className="py-24 relative" id="timeline">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">The Aura <span className="font-serif italic text-accent">Experience</span></h2>
          <p className="text-text-muted">A glimpse into a perfectly curated 5-day journey.</p>
        </div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[1px] bg-white/10 -translate-x-1/2"></div>
          
          <div className="space-y-12">
            {ITINERARY.map((item, i) => (
              <motion.div 
                key={item.day}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className={`flex flex-col md:flex-row items-start md:items-center relative w-full ${
                  i % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Center Node */}
                <div className="absolute left-8 md:left-1/2 top-0 md:top-1/2 -translate-x-1/2 md:-translate-y-1/2 w-4 h-4 rounded-full bg-accent z-10 shadow-[0_0_15px_rgba(var(--accent),0.6)]"></div>

                {/* Content */}
                <div className={`w-full md:w-1/2 pl-20 md:pl-0 ${
                  i % 2 === 0 ? 'md:pl-16' : 'md:pr-16 text-left md:text-right'
                }`}>
                  <div className="glass p-8 rounded-3xl hover:bg-white/5 transition-colors cursor-pointer group">
                    <span className="text-accent text-sm font-semibold tracking-widest uppercase mb-2 block group-hover:text-white transition-colors">
                      Day {item.day}
                    </span>
                    <h3 className="text-2xl font-serif mb-4">{item.title}</h3>
                    <p className="text-text-muted">{item.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 flex justify-center"
        >
          <button 
             onClick={() => alert('Downloading Sample Itinerary Brochure (PDF)...')}
             className="px-8 py-4 bg-transparent border border-accent text-accent font-bold uppercase tracking-widest rounded-full hover:bg-accent hover:text-bg transition-colors flex items-center gap-3 cursor-pointer"
          >
            <Download className="w-5 h-5" />
            Download Brochure
          </button>
        </motion.div>
      </div>
    </section>
  );
}
