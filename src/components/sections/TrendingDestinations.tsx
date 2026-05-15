import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import Modal from '../ui/Modal';
import { MapPin, Sun, Calendar, Info } from 'lucide-react';

const DESTINATIONS = [
  { id: 'amalfi', name: 'Amalfi Coast', country: 'Italy', price: 'from $3,500', img: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?q=80&w=1000&auto=format&fit=crop', season: 'Summer', rating: '4.9', highlight: 'Cliffside villages & limoncello' },
  { id: 'kyoto', name: 'Kyoto', country: 'Japan', price: 'from $4,200', img: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1000&auto=format&fit=crop', season: 'Spring/Autumn', rating: '4.8', highlight: 'Ancient temples & cherry blossoms' },
  { id: 'santorini', name: 'Santorini', country: 'Greece', price: 'from $2,800', img: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=1000&auto=format&fit=crop', season: 'Summer', rating: '4.9', highlight: 'Stunning sunsets & white architecture' },
  { id: 'bora', name: 'Bora Bora', country: 'French Polynesia', price: 'from $6,500', img: 'https://images.unsplash.com/photo-1542385151-efd9000785a0?q=80&w=1000&auto=format&fit=crop', season: 'Dry Season', rating: '5.0', highlight: 'Overwater bungalows & coral reefs' },
  { id: 'banff', name: 'Banff', country: 'Canada', price: 'from $2,100', img: 'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?q=80&w=1000&auto=format&fit=crop', season: 'Summer/Winter', rating: '4.8', highlight: 'Turquoise lakes & Rocky Mountains' },
];

export default function TrendingDestinations() {
  const [selectedDest, setSelectedDest] = useState<typeof DESTINATIONS[0] | null>(null);

  return (
    <>
      <section className="py-24 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12 mb-12 flex justify-between items-end">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Trending <span className="font-serif italic text-accent">Escapes</span></h2>
            <p className="text-text-muted max-w-xl">Highly sought-after locations for the current season, hand-picked by our specialists.</p>
          </div>
          <button 
            onClick={() => document.getElementById('destinations')?.scrollIntoView({behavior: 'smooth'})}
            className="hidden md:block uppercase tracking-widest text-sm font-semibold hover:text-accent transition-colors border-b border-transparent hover:border-accent pb-1 cursor-pointer"
          >
            View All
          </button>
        </div>

        <div className="w-full">
          <Swiper
            effect={'coverflow'}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={'auto'}
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 100,
              modifier: 2.5,
              slideShadows: true,
            }}
            loop={true}
            modules={[EffectCoverflow, Pagination, Navigation]}
            className="w-full py-10"
          >
            {DESTINATIONS.map((dest, i) => (
              <SwiperSlide key={i} className="max-w-[300px] md:max-w-[400px] h-[400px] md:h-[500px]">
                <div 
                  className="w-full h-full rounded-3xl overflow-hidden relative group cursor-pointer"
                  onClick={() => setSelectedDest(dest)}
                >
                  <img src={dest.img} alt={dest.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-accent">
                    ★ {dest.rating}
                  </div>
                  <div className="absolute bottom-0 left-0 p-8 w-full">
                    <span className="text-accent text-sm tracking-widest uppercase font-semibold block mb-2">{dest.country}</span>
                    <h3 className="text-3xl font-serif text-white mb-2">{dest.name}</h3>
                    <div className="flex justify-between items-center opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                      <span className="text-white/80">{dest.price}</span>
                      <button className="px-4 py-2 bg-white text-black text-xs font-bold uppercase rounded-full hover:bg-accent hover:text-white transition-colors cursor-pointer">
                        Details
                      </button>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      <Modal isOpen={!!selectedDest} onClose={() => setSelectedDest(null)} title={selectedDest?.name}>
        {selectedDest && (
          <div>
            <div className="h-64 md:h-96 w-full rounded-2xl overflow-hidden mb-8 relative">
              <img src={selectedDest.img} alt={selectedDest.name} className="w-full h-full object-cover" />
              <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md px-4 py-2 rounded-xl flex items-center gap-2">
                <MapPin className="w-4 h-4 text-accent" />
                <span className="font-semibold">{selectedDest.country}</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="glass p-6 rounded-2xl flex flex-col items-center text-center">
                <Sun className="w-6 h-6 text-accent mb-2" />
                <span className="text-xs text-text-muted uppercase tracking-wider mb-1">Best Season</span>
                <span className="font-semibold">{selectedDest.season}</span>
              </div>
              <div className="glass p-6 rounded-2xl flex flex-col items-center text-center">
                <Calendar className="w-6 h-6 text-accent mb-2" />
                <span className="text-xs text-text-muted uppercase tracking-wider mb-1">Suggested Duration</span>
                <span className="font-semibold">7-10 Days</span>
              </div>
              <div className="glass p-6 rounded-2xl flex flex-col items-center text-center">
                <Info className="w-6 h-6 text-accent mb-2" />
                <span className="text-xs text-text-muted uppercase tracking-wider mb-1">Highlight</span>
                <span className="font-semibold">{selectedDest.highlight}</span>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-6 border border-white/10 rounded-3xl bg-black/20">
              <div>
                <p className="text-text-muted text-sm uppercase tracking-widest mb-1">Starting from</p>
                <h4 className="text-3xl font-bold text-accent">{selectedDest.price} <span className="text-lg text-white font-normal">/ person</span></h4>
              </div>
              <button onClick={() => { alert(`Booking request started for ${selectedDest.name}`); setSelectedDest(null); }} className="w-full md:w-auto px-8 py-4 bg-accent text-bg font-bold uppercase tracking-widest rounded-xl hover:opacity-90 transition-opacity cursor-pointer">
                Request Itinerary
              </button>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}
