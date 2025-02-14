"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="relative w-full bg-black/95 backdrop-blur-xl border-b border-cyan-500/70 shadow-[0_0_20px_rgba(0,255,255,0.3)] neon-border">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4 uppercase tracking-widest">
        
        {/* Logo - More Aggressive Look */}
        <Link href="/" className="text-4xl font-extrabold text-cyan-400 tracking-wide cyber-logo">
          PULSE<span className="text-pink-500">WAVE</span>
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-3 border border-cyan-500/50 rounded-md text-cyan-400 hover:bg-cyan-500/20 transition-all"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Navigation Links */}
        <div
          className={`absolute md:static top-16 left-0 w-full md:w-auto bg-black/95 md:bg-transparent backdrop-blur-lg md:flex md:space-x-10 text-lg font-medium transform transition-transform ${
            isOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 md:opacity-100 md:translate-y-0"
          }`}
        >
          {["Home", "Games", "Genres", "Community", "Live Streams"].map((item, index) => (
            <Link
              key={index}
              href={`/${item.toLowerCase().replace(" ", "")}`}
              className="nav-link cyber-text"
            >
              {item}
            </Link>
          ))}
        </div>

        {/* Login Button - Holographic Cyber Button */}
        <Link
          href="/login"
          className="hidden md:block px-6 py-2 rounded-lg text-lg font-bold text-black bg-gradient-to-r from-cyan-400 to-pink-500 shadow-[0_0_15px_rgba(0,255,255,0.7)] transform transition-all duration-300 hover:scale-105 cyber-button"
        >
          LOGIN
        </Link>
      </div>
    </nav>
  );
}
