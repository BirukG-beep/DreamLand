"use client";
<style>{`
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600&family=DM+Sans:wght@300;400;500&display=swap');
`}</style>
import { useEffect, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
} from "lucide-react";
import Image from "next/image";
import { FaStar } from "react-icons/fa";

const images = [
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?q=80&w=1600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1511300636408-a63a89df3482?q=80&w=1600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop",
];

export default function ImageSlider() {
  const [current, setCurrent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrent((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  // Auto slide
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 4000);

    return () => clearInterval(interval);
  }, [isPlaying]);

  
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600&family=DM+Sans:wght@300;400;500&display=swap');

      
        .home-subtitle {
          font-family: 'Cormorant Garamond', serif;
        }

     
      `}</style>
    <div className="group relative sm:w-[calc(100vw-1rem)] h-[700px]  overflow-hidden  bg-gradient-to-b from-black/20 via-transparent to-black/70 overflow-x-hidden relative" id="home">
       

  <div className="absolute top-28 left-8 sm:left-6 z-40 text-white/80 text-sm tracking-[0.3em] uppercase font-light  sm:ml-16 bg-white flex items-center gap-2 p-2 rounded-full">
    <Image 
      src="/Google.png"
      width={20}
      height={10}
      alt="Hero Image"
      className=""
    />
    <div className="flex items-center">
    <FaStar className="text-yellow-400 mx-1" size={15}/>
    <FaStar className="text-yellow-400 mx-1" size={15}/>
    <FaStar className="text-yellow-400 mx-1" size={15}/>
    <FaStar className="text-yellow-400 mx-1" size={15}/>
    <FaStar className="text-yellow-400 mx-1" size={15}/>
    </div>
    <div className="text-black tracking-[0.1em] text-xs font-bold text-[#333] ">
      Over <span className="text-green-600 text-sm font-bold">100</span> Five-Star Reviews
    </div>
  </div>
  <div className="absolute top-36 right-24  z-40 hidden sm:block bg-black/80 border border-[#bfb09d]/20 rounded-md p-6 max-w-xs backdrop-blur-2xl overflow-hidden">
  {/* Top accent line */}
  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#bfb09d] to-transparent" />

  <p className="text-[#bfb09d]/50 text-[9px] tracking-[0.3em] uppercase font-light mb-4">
    Location &amp; Proximity
  </p>

  {[
    { dist: "12km",   name: "Lake Bishoftu",        sub: "Scenic crater lake"    },
    { dist: "Near",   name: "Bishoftu Bus Station",  sub: "Meneharia — city centre" },
    { dist: "40km",   name: "Addis Ababa",           sub: "Capital city"          },
    { dist: "50km",   name: "Bole International",    sub: "Airport — direct access" },
  ].map((item, i) => (
    <div
      key={i}
      className="flex items-center gap-3 py-3 border-b border-[#bfb09d]/10 last:border-0"
    >
      <span className="font-serif text-2xl text-[#bfb09d] min-w-[3rem] text-right leading-none">
        {item.dist}
      </span>
      <div className="w-px h-7 bg-[#bfb09d]/20 shrink-0" />
      <div className="flex flex-col gap-0.5">
        <span className="text-[#f0e8db] font-serif text-base tracking-wide">
          {item.name}
        </span>
        <span className="text-[9px] tracking-[0.18em] uppercase text-[#bfb09d]/40">
          {item.sub}
        </span>
      </div>
    </div>
  ))}
</div>
      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/70 z-10" />

      {/* Slides */}
      <div
        className="flex h-full transition-transform duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{
          transform: `translateX(-${current * 100}%)`,
        }}
      >
        {images.map((image, index) => (
          <div
            key={index}
            className="relative min-w-full h-full overflow-hidden"
          >
            <img
              src={image}
             alt="Hotel Rosmery exterior view in Bishoftu, Ethiopia"
              className="w-full h-full object-cover scale-110 animate-[slowZoom_10s_linear_infinite]"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/30 " />

            {/* Text Content */}
            <div className="absolute bottom-24 left-10 md:left-20 z-20 text-white max-w-2xl">
              <p className="uppercase tracking-[0.3em] text-sm text-white/70 mb-3 home-subtitle">
                Luxury Hotel
              </p>

              <h1 className="text-5xl md:text-7xl font-black leading-tight mb-6 home-subtitle">
                Explore <br />
                Beautiful Worlds
              </h1>

              <p className="text-white/80 text-lg max-w-lg mb-8 home-subtitle">
             Conveniently located near Bishoftu Bus Station (Meneharia), surrounded by beautiful lakes, lush landscapes, and stunning natural scenery. Enjoy comfortable accommodation with modern amenities in one of Bishoftu&apos;s most attractive locations.
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Left Button */}
      <button
        onClick={prevSlide}
        className="absolute z-30 top-1/2 left-6 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition duration-500"
      >
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 hover:bg-white/20 text-white p-4 rounded-full shadow-2xl">
          <ChevronLeft size={30} />
        </div>
      </button>

      {/* Right Button */}
      <button
        onClick={nextSlide}
        className="absolute z-30 top-1/2 right-6 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition duration-500"
      >
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 hover:bg-white/20 text-white p-4 rounded-full shadow-2xl">
          <ChevronRight size={30} />
        </div>
      </button>

      {/* Bottom Controls */}
      <div className="absolute z-30 bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-6">
        
        {/* Dots */}
        <div className="flex items-center gap-3 backdrop-blur-xl bg-white/10 border border-white/20 px-5 py-3 rounded-full">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`relative transition-all duration-500 ${
                current === index
                  ? "w-10 bg-white"
                  : "w-3 bg-white/40 hover:bg-white/70"
              } h-3 rounded-full`}
            />
          ))}
        </div>

        {/* Play Pause */}
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="backdrop-blur-xl bg-white/10 border border-white/20 hover:bg-white/20 text-white p-4 rounded-full transition"
        >
          {isPlaying ? (
            <Pause size={20} />
          ) : (
            <Play size={20} />
          )}
        </button>
      </div>

      {/* Slide Counter */}
      <div className="absolute top-8 right-8 z-30 text-white backdrop-blur-xl bg-white/10 border border-white/20 px-5 py-2 rounded-full font-medium tracking-widest">
        {String(current + 1).padStart(2, "0")} /{" "}
        {String(images.length).padStart(2, "0")}
      </div>

      {/* Custom Animation */}
      <style jsx>{`
        @keyframes slowZoom {
          0% {
            transform: scale(1.08);
          }
          100% {
            transform: scale(1.18);
          }
        }
      `}</style>
    </div>
    </>
  );
}