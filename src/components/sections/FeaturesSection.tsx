import React from 'react';
import { motion } from 'motion/react';
import { Shield, Clock, Star, Heart } from 'lucide-react';

const FEATURES = [
  { icon: Shield, title: 'Secure & Insured', desc: 'Every journey is fully protected with premium travel insurance.' },
  { icon: Clock, title: '24/7 Concierge', desc: 'A dedicated team available around the clock, anywhere in the world.' },
  { icon: Star, title: 'VIP Access', desc: 'Exclusive access to sold-out events and private landmarks.' },
  { icon: Heart, title: 'Carbon Neutral', desc: 'We offset 100% of the carbon emissions for all our curated trips.' },
];

export default function FeaturesSection() {
  return (
    <section className="py-24 bg-bg relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Why <span className="font-serif italic text-accent">Aura?</span></h2>
          <p className="text-text-muted">Unparalleled service for the discerning traveler.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {FEATURES.map((feature, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass p-8 rounded-3xl text-center group hover:-translate-y-2 transition-transform duration-300"
            >
              <div className="w-16 h-16 mx-auto bg-primary rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <feature.icon className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
              <p className="text-text-muted text-sm">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
