"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";

const links = [
  "Home",
  "About",
  "Rooms",
  "Services",
  "Blog",
  "Guest Say",
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
     <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600&family=DM+Sans:wght@300;400;500&display=swap');

      
        .nav-font {
          color: #bfb09d;
          font-family: 'Cormorant Garamond', serif;
        }

     
      `}</style>
     
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/30 backdrop-blur-2xl border-b border-white/10 nav-font">
      
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-5">

        {/* Logo */}
        <div className="text-white text-2xl tracking-[0.3em] uppercase nav-font">
          DreamLand
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-10 text-white/70 font-[DM_Sans] text-sm tracking-widest">
          {links.map((item) => (
            <Link
              key={item}
              href={`#${item.toLowerCase().replace(" ", "-")}`}
              className="relative group hover:text-white transition"
            >
              {item}

              {/* underline effect */}
              <span className="absolute left-0 -bottom-1 w-0 h-[1px] bg-white/80 group-hover:w-full transition-all duration-300"></span>
            </Link>
          ))}
            <Link
              href='/contact'
              className="relative group hover:text-white transition"
            >
              Contact

              {/* underline effect */}
              <span className="absolute left-0 -bottom-1 w-0 h-[1px] bg-white/80 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link
              href='/map'
              className="relative group hover:text-white transition"
            >
              Map

              {/* underline effect */}
              <span className="absolute left-0 -bottom-1 w-0 h-[1px] bg-white/80 group-hover:w-full transition-all duration-300"></span>
            </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-white"
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-black/80 backdrop-blur-2xl border-t border-white/10 px-6 py-6 space-y-5 font-[DM_Sans] tracking-widest">
          {links.map((item) => (
            <Link
              key={item}
              href={`#${item.toLowerCase().replace(" ", "-")}`}
              className="block text-white/70 hover:text-white transition"
              onClick={() => setOpen(false)}
            >
              {item}
            </Link>
          ))}
            <Link
              href='/contact'
              className="block text-white/70 hover:text-white transition"
              onClick={() => setOpen(false)}
            >
              Contact
            </Link>
            <Link
              href='/map'
              className="block text-white/70 hover:text-white transition"
              onClick={() => setOpen(false)}
            >
              Map
            </Link>
        </div>
      )}
    </nav>
     </>
  );
}