import React, { useEffect, Suspense, lazy } from 'react';
import ReactLenis from 'lenis/react';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/layout/Navbar';
import HeroSection from './components/sections/HeroSection';

const MoodPlanner = lazy(() => import('./components/sections/MoodPlanner'));
const GlobeSection = lazy(() => import('./components/sections/GlobeSection'));
const TrendingDestinations = lazy(() => import('./components/sections/TrendingDestinations'));
const TripCustomizer = lazy(() => import('./components/sections/TripCustomizer'));
const TimelineExperience = lazy(() => import('./components/sections/TimelineExperience'));
const FeaturesSection = lazy(() => import('./components/sections/FeaturesSection'));
const Footer = lazy(() => import('./components/layout/Footer'));

export default function App() {
  return (
    <ReactLenis root options={{ lerp: 0.05, smoothWheel: true }}>
      <ThemeProvider>
        <div className="min-h-screen">
          <Navbar />
          <HeroSection />
          
          <Suspense fallback={<div className="min-h-[50vh] flex items-center justify-center text-accent">Loading...</div>}>
            <MoodPlanner />
            <GlobeSection />
            <TrendingDestinations />
            <TripCustomizer />
            <TimelineExperience />
            <FeaturesSection />
            <Footer />
          </Suspense>
        </div>
      </ThemeProvider>
    </ReactLenis>
  );
}


