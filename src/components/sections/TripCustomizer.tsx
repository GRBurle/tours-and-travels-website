import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plane, Hotel, Coffee, Map, ChevronDown, Check } from 'lucide-react';

const OPTIONS = {
  destination: [
    { label: 'Europe (Multi-city)', price: 1500 },
    { label: 'Maldives', price: 2500 },
    { label: 'Japan', price: 1800 },
    { label: 'New Zealand', price: 2200 },
  ],
  hotel: [
    { label: 'Boutique (4-Star)', multiplier: 1 },
    { label: 'Luxury (5-Star)', multiplier: 1.5 },
    { label: 'Ultra-Luxury (Villa)', multiplier: 2.5 },
  ],
  transport: [
    { label: 'Economy Flight', price: 800 },
    { label: 'Business Flight', price: 3500 },
    { label: 'First Class', price: 8000 },
  ],
  experiences: [
    { label: 'Standard Tours', price: 500 },
    { label: 'Private Guides', price: 1500 },
    { label: 'Exclusive/VIP Access', price: 3000 },
  ],
};

export default function TripCustomizer() {
  const [budget, setBudget] = useState(5000);
  const [duration, setDuration] = useState(7);
  const [travelers, setTravelers] = useState(2);
  
  const [selections, setSelections] = useState({
    destination: 0,
    hotel: 1,
    transport: 1,
    experiences: 1,
  });

  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  // Calculate live total based on selections
  const baseCost = OPTIONS.destination[selections.destination].price 
                 + OPTIONS.transport[selections.transport].price 
                 + OPTIONS.experiences[selections.experiences].price;
  
  // Calculate per person per day roughly, multiply by duration and hotel multiplier
  const dailyHotelCost = 250 * OPTIONS.hotel[selections.hotel].multiplier;
  const calculatedTotal = (baseCost * travelers) + (dailyHotelCost * duration * 0.5 * travelers);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(price);
  };

  const currentSettings = [
    { id: 'destination', icon: Map, title: 'Destination', value: OPTIONS.destination[selections.destination].label },
    { id: 'hotel', icon: Hotel, title: 'Accommodation', value: OPTIONS.hotel[selections.hotel].label },
    { id: 'transport', icon: Plane, title: 'Transport', value: OPTIONS.transport[selections.transport].label },
    { id: 'experiences', icon: Coffee, title: 'Experiences', value: OPTIONS.experiences[selections.experiences].label },
  ];

  return (
    <section className="py-24 bg-secondary relative z-20" id="build">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Craft Your <span className="font-serif italic text-accent">Journey</span></h2>
          <p className="text-text-muted">Design a bespoke experience tailored to your exact preferences.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Controls */}
          <div className="lg:col-span-2 space-y-4">
            {currentSettings.map((item, i) => (
              <div key={item.id} className="relative">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => setActiveDropdown(activeDropdown === item.id ? null : item.id)}
                  className="glass p-6 rounded-2xl flex items-center justify-between cursor-pointer hover:bg-white/5 transition-colors relative z-10"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-accent">
                      <item.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm text-text-muted uppercase tracking-wider">{item.title}</h4>
                      <p className="text-lg font-semibold">{item.value}</p>
                    </div>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-accent transition-transform duration-300 ${activeDropdown === item.id ? 'rotate-180' : ''}`} />
                </motion.div>

                {/* Dropdown Content */}
                <AnimatePresence>
                  {activeDropdown === item.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0, y: -10 }}
                      animate={{ opacity: 1, height: 'auto', y: 0 }}
                      exit={{ opacity: 0, height: 0, y: -10 }}
                      className="absolute top-full left-0 right-0 mt-2 glass rounded-2xl overflow-hidden z-20"
                    >
                      {OPTIONS[item.id as keyof typeof OPTIONS].map((opt: any, index: number) => (
                        <div 
                          key={index}
                          onClick={() => {
                            setSelections(prev => ({...prev, [item.id]: index}));
                            setActiveDropdown(null);
                          }}
                          className="px-6 py-4 hover:bg-white/10 cursor-pointer flex justify-between items-center transition-colors"
                        >
                          <span>{opt.label}</span>
                          {selections[item.id as keyof typeof selections] === index && <Check className="w-4 h-4 text-accent" />}
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}

            {/* Range Sliders */}
            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               className="glass p-6 rounded-2xl mt-8 grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              <div>
                <div className="flex justify-between mb-4">
                  <h4 className="text-sm text-text-muted uppercase tracking-wider">Duration</h4>
                  <p className="text-xl font-semibold">{duration} Days</p>
                </div>
                <input 
                  type="range" 
                  min="3" 
                  max="30" 
                  step="1"
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                  className="w-full h-2 bg-primary rounded-lg appearance-none cursor-pointer accent-accent"
                />
              </div>
              <div>
                <div className="flex justify-between mb-4">
                  <h4 className="text-sm text-text-muted uppercase tracking-wider">Travelers</h4>
                  <p className="text-xl font-semibold">{travelers}</p>
                </div>
                <input 
                  type="range" 
                  min="1" 
                  max="10" 
                  step="1"
                  value={travelers}
                  onChange={(e) => setTravelers(Number(e.target.value))}
                  className="w-full h-2 bg-primary rounded-lg appearance-none cursor-pointer accent-accent"
                />
              </div>
            </motion.div>
          </div>

          {/* Summary Card */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass rounded-3xl p-8 sticky top-32 h-fit flex flex-col mt-8 lg:mt-0"
          >
            <h3 className="text-2xl font-serif italic mb-6">Live Itinerary Summary</h3>
            
            <div className="space-y-6 mb-8 flex-1">
              <div className="flex justify-between border-b border-white/10 pb-4">
                <span className="text-text-muted">Duration</span>
                <span className="font-semibold">{duration} Days</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-4">
                <span className="text-text-muted">Travelers</span>
                <span className="font-semibold">{travelers} {travelers === 1 ? 'Adult' : 'Adults'}</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-4">
                <span className="text-text-muted">Estimated Total</span>
                <span className="text-3xl font-bold text-accent">{formatPrice(calculatedTotal)}</span>
              </div>
            </div>

            <button 
              onClick={() => alert(`Custom Tour Request Sent for ${formatPrice(calculatedTotal)}.\nWe will contact you shortly!`)}
              className="w-full py-4 bg-accent text-bg font-bold uppercase tracking-widest rounded-xl hover:opacity-90 transition-opacity cursor-pointer shadow-[0_0_20px_rgba(var(--accent),0.3)]"
            >
              Request Itinerary
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
