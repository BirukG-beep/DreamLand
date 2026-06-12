// pages/rooms/[slug].tsx
// Enhanced UI — Luxury Editorial Aesthetic (White Version)

import { useRouter } from "next/router";
import { ArrowLeft, Users, Wifi, Star, CheckCircle, Clock, Shield, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import Form from "./form";
import ClientOnly from "@/app/components/ClientOnly";

const rooms = {
  presidential: {
    title: "Presidential Suite",
    subtitle: "The pinnacle of luxury",
    description:
      "An enclave of uncompromising refinement. Private terrace, panoramic city views, and butler service — every detail curated to exceed expectation.",
    guests: "1–2 Guests",
    price: "450",
    rating: 4.9,
    reviews: 128,
    size: "120 m²",
    image: "/roomsample.png",
    tag: "Most Exclusive",
  },
  "single-family": {
    title: "Family Sanctuary",
    subtitle: "Spacious by design",
    description:
      "Thoughtfully arranged for families and longer stays. Generous proportions, warm lighting, and spaces that make everyone feel at home.",
    guests: "1–4 Guests",
    price: "180",
    rating: 4.7,
    reviews: 84,
    size: "75 m²",
    image: "/roomsample.png",
    tag: "Family Favourite",
  },
  "single-twin": {
    title: "Deluxe Twin",
    subtitle: "Elegance for two",
    description:
      "Refined interiors crafted for couples and solo voyagers alike. Quiet, considered, and achingly comfortable.",
    guests: "1–2 Guests",
    price: "120",
    rating: 4.6,
    reviews: 61,
    size: "45 m²",
    image: "/roomsample.png",
    tag: "Best Value",
  },
  groups: {
    title: "Collective Suite",
    subtitle: "Together, in style",
    description:
      "Multiple configurations, shared living spaces, and private sleeping zones. Perfect for groups who want comfort without compromise.",
    guests: "4–6 Guests",
    price: "280",
    rating: 4.5,
    reviews: 47,
    size: "95 m²",
    image: "/roomsample.png",
    tag: "Group Ready",
  },
};

const amenities = [
  { icon: "✦", label: "High-Speed WiFi" },
  { icon: "✦", label: "King / Twin Beds" },
  { icon: "✦", label: "Rainfall Shower" },
  { icon: "✦", label: "Climate Control" },
  { icon: "✦", label: "4K Smart TV" },
  { icon: "✦", label: "Nespresso Station" },
  { icon: "✦", label: "24h Room Service" },
  { icon: "✦", label: "Soundproof Walls" },
];

export default function RoomPage() {
  const router = useRouter();
  const { slug } = router.query;
  const [scrolled, setScrolled] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!slug || typeof slug !== "string") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#ffffff] text-[#a8895f]">
        <span className="tracking-[0.3em] text-sm uppercase">Loading…</span>
      </div>
    );
  }

  const room = rooms[slug as keyof typeof rooms];
  if (!room) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#ffffff] text-[#a8895f] text-xl">
        Room not found
      </div>
    );
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');

        :root {
          --gold: #a8895f;
          --gold-light: #b1813f;
          --gold-dim: #c9a876;
          --ink: #ffffff;
          --ink-2: #fbfaf8;
          --ink-3: #f5f1e9;
          --surface: #faf8f4;
          --surface-2: #f5f1e9;
          --border: rgba(180,140,80,0.15);
          --border-hover: rgba(180,140,80,0.35);
          --text-primary: #1a1814;
          --text-secondary: #7a7066;
          --text-muted: #a39a8e;
        }

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          background: var(--ink);
          color: var(--text-primary);
          font-family: 'DM Sans', sans-serif;
          font-weight: 300;
          -webkit-font-smoothing: antialiased;
        }

        .display { font-family: 'Cormorant Garamond', serif; }

        /* NAV */
        .nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          padding: 1.5rem 2rem;
          display: flex; align-items: center; justify-content: space-between;
          transition: all 0.4s ease;
        }
        .nav.scrolled {
          background: rgba(255,255,255,0.85);
          backdrop-filter: blur(24px);
          border-bottom: 1px solid var(--border);
          padding: 1rem 2rem;
        }

        .back-btn {
          display: flex; align-items: center; gap: 0.6rem;
          padding: 0.6rem 1.4rem;
          border: 1px solid var(--border);
          border-radius: 100px;
          background: rgba(0,0,0,0.02);
          color: var(--text-secondary);
          font-size: 0.78rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.25s ease;
        }
        .back-btn:hover {
          border-color: var(--border-hover);
          color: var(--gold-light);
          background: rgba(180,140,80,0.06);
        }

        .nav-tag {
          font-size: 0.7rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--gold-light);
          padding: 0.4rem 1rem;
          border: 1px solid var(--border);
          border-radius: 100px;
        }

        /* HERO */
        .hero {
          position: relative;
          height: 100vh;
          min-height: 640px;
          overflow: hidden;
        }

        .hero-img {
          width: 100%; height: 100%;
          object-fit: cover;
          transform: scale(1.08);
          transition: transform 8s ease-out, opacity 0.8s ease;
          opacity: 0;
        }
        .hero-img.loaded {
          opacity: 1;
          transform: scale(1.02);
        }

        .hero-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(
            to bottom,
            rgba(255,255,255,0.15) 0%,
            rgba(255,255,255,0.1) 35%,
            rgba(255,255,255,0.7) 65%,
            rgba(255,255,255,0.98) 100%
          );
        }

        .hero-grain {
          position: absolute; inset: 0;
          opacity: 0.035;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
          pointer-events: none;
        }

        .hero-content {
          position: absolute; bottom: 0; left: 0; right: 0;
          padding: 4rem 3rem 5rem;
          max-width: 900px;
        }

        .room-tag-badge {
          display: inline-flex; align-items: center; gap: 0.5rem;
          font-size: 0.7rem;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: var(--gold);
          margin-bottom: 1.4rem;
        }
        .room-tag-badge::before {
          content: '';
          width: 24px; height: 1px;
          background: var(--gold);
          opacity: 0.6;
        }

        .hero-title {
          font-size: clamp(3.5rem, 8vw, 7rem);
          font-weight: 300;
          line-height: 0.92;
          letter-spacing: -0.02em;
          color: var(--text-primary);
          margin-bottom: 0.5rem;
        }
        .hero-title em {
          font-style: italic;
          color: var(--gold-light);
          font-weight: 300;
        }

        .hero-subtitle {
          font-size: 1rem;
          color: var(--text-secondary);
          letter-spacing: 0.1em;
          margin-bottom: 1.8rem;
        }

        .hero-meta {
          display: flex; gap: 2.5rem; align-items: center;
        }
        .hero-meta-item {
          font-size: 0.8rem;
          color: var(--text-secondary);
          display: flex; align-items: center; gap: 0.4rem;
        }
        .hero-meta-item strong {
          color: var(--text-primary);
          font-weight: 400;
        }
        .hero-meta-divider {
          width: 1px; height: 18px;
          background: var(--border);
        }

        /* RATING CHIP */
        .rating-chip {
          position: absolute; top: 6.5rem; right: 2.5rem;
          background: rgba(255,255,255,0.85);
          backdrop-filter: blur(20px);
          border: 1px solid var(--border);
          border-radius: 20px;
          padding: 1rem 1.4rem;
          text-align: center;
          box-shadow: 0 8px 24px rgba(0,0,0,0.06);
        }
        .rating-score {
          font-size: 2rem;
          font-weight: 600;
          font-family: 'Cormorant Garamond', serif;
          color: var(--gold);
          line-height: 1;
        }
        .rating-label {
          font-size: 0.65rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--text-muted);
          margin-top: 0.3rem;
        }
        .rating-stars {
          font-size: 0.65rem;
          color: var(--gold);
          margin-top: 0.2rem;
          letter-spacing: 2px;
        }

        /* BODY LAYOUT */
        .body-wrap {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 2rem 8rem;
        }

        .columns {
          display: grid;
          grid-template-columns: 1fr 380px;
          gap: 5rem;
          padding-top: 5rem;
        }

        @media (max-width: 1024px) {
          .columns { grid-template-columns: 1fr; }
          .booking-card { position: static !important; }
        }

        /* SECTION HEADERS */
        .section-label {
          font-size: 0.68rem;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: var(--gold-light);
          margin-bottom: 1.2rem;
        }
        .section-title {
          font-size: clamp(1.8rem, 3vw, 2.6rem);
          font-weight: 300;
          line-height: 1.15;
          color: var(--text-primary);
          margin-bottom: 1.4rem;
        }
        .section-body {
          font-size: 0.95rem;
          color: var(--text-secondary);
          line-height: 1.85;
          max-width: 560px;
        }

        /* DIVIDER */
        .divider {
          height: 1px;
          background: linear-gradient(to right, transparent, var(--border), transparent);
          margin: 4rem 0;
        }

        /* AMENITIES */
        .amenities-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0.75rem;
          margin-top: 2rem;
        }

        .amenity-item {
          display: flex; align-items: center; gap: 1rem;
          padding: 1rem 1.2rem;
          border: 1px solid var(--border);
          border-radius: 12px;
          background: rgba(0,0,0,0.012);
          transition: all 0.2s ease;
          cursor: default;
        }
        .amenity-item:hover {
          border-color: var(--border-hover);
          background: rgba(180,140,80,0.06);
          transform: translateY(-1px);
        }
        .amenity-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: var(--gold);
          opacity: 0.7;
          flex-shrink: 0;
        }
        .amenity-label {
          font-size: 0.85rem;
          color: var(--text-secondary);
          font-weight: 400;
        }

        /* HIGHLIGHTS */
        .highlights {
          display: grid; grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
          margin-top: 2rem;
        }
        .highlight-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 1.6rem 1.4rem;
          transition: border-color 0.2s;
        }
        .highlight-card:hover { border-color: var(--border-hover); }
        .highlight-icon {
          font-size: 1.4rem;
          margin-bottom: 0.8rem;
        }
        .highlight-title {
          font-size: 0.78rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--text-muted);
          margin-bottom: 0.3rem;
        }
        .highlight-value {
          font-size: 1.1rem;
          color: var(--text-primary);
          font-weight: 400;
        }

        /* BOOKING CARD */
        .booking-card {
          position: sticky;
          top: 7rem;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 24px;
          overflow: hidden;
        }

        .booking-card-top {
          padding: 2.2rem 2rem;
          border-bottom: 1px solid var(--border);
          background: linear-gradient(135deg, rgba(180,140,80,0.08) 0%, transparent 60%);
        }

        .price-label {
          font-size: 0.65rem;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: var(--gold-light);
          margin-bottom: 0.5rem;
        }
        .price-amount {
          font-family: 'Cormorant Garamond', serif;
          font-size: 4rem;
          font-weight: 300;
          color: var(--text-primary);
          line-height: 1;
        }
        .price-amount sup {
          font-size: 1.6rem;
          vertical-align: super;
          color: var(--gold);
        }
        .price-per {
          font-size: 0.8rem;
          color: var(--text-muted);
          margin-top: 0.3rem;
        }

        .booking-card-body { padding: 1.8rem 2rem; }

        .booking-row {
          display: flex; justify-content: space-between; align-items: center;
          padding: 0.85rem 0;
          border-bottom: 1px solid var(--border);
          font-size: 0.85rem;
        }
        .booking-row:last-of-type { border-bottom: none; }
        .booking-row-label { color: var(--text-muted); }
        .booking-row-value { color: var(--text-secondary); }
        .booking-row-value.accent { color: var(--gold); }

        .book-btn {
          display: block; width: 100%;
          margin-top: 1.8rem;
          padding: 1.1rem;
          border-radius: 12px;
          border: none;
          background: var(--gold);
          color: #ffffff;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.82rem;
          font-weight: 500;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.25s ease;
          position: relative;
          overflow: hidden;
        }
        .book-btn::after {
          content: '';
          position: absolute; inset: 0;
          background: rgba(255,255,255,0);
          transition: background 0.2s;
        }
        .book-btn:hover {
          background: var(--gold-light);
          transform: translateY(-1px);
          box-shadow: 0 8px 32px rgba(180,140,80,0.25);
        }
        .book-btn:active { transform: translateY(0); }

        .book-note {
          text-align: center;
          font-size: 0.72rem;
          color: var(--text-muted);
          margin-top: 1rem;
          letter-spacing: 0.04em;
        }
        .book-note span { color: var(--gold-light); }

        /* FOOTER STRIP */
        .trust-strip {
          display: flex; gap: 2rem; align-items: center;
          padding: 1.4rem 2rem;
          border-top: 1px solid var(--border);
          background: rgba(0,0,0,0.008);
        }
        .trust-item {
          display: flex; align-items: center; gap: 0.5rem;
          font-size: 0.72rem;
          color: var(--text-muted);
          letter-spacing: 0.04em;
        }
        .trust-item-dot {
          width: 4px; height: 4px; border-radius: 50%;
          background: var(--gold-light); opacity: 0.6;
        }
      `}</style>
<div
  style={{
    background: "var(--ink)",
    minHeight: "100vh",
    height: showForm ? "100vh" : "auto",
    overflow: showForm ? "hidden" : "visible",
    position: "relative",
  }}
>

        {/* NAV */}
        <nav className={`nav ${scrolled ? "scrolled" : ""}`}>
          <button className="back-btn" onClick={() => router.back()}>
            <ArrowLeft size={14} />
            Back
          </button>
          <span className="nav-tag">{room.tag}</span>
        </nav>

        {/* HERO */}
        <div className="hero">
          <img
            src={room.image}
            alt={room.title}
            className={`hero-img ${imgLoaded ? "loaded" : ""}`}
            onLoad={() => setImgLoaded(true)}
          />
          <div className="hero-overlay" />
          <div className="hero-grain" />

          {/* Rating chip */}
          <div className="rating-chip">
            <div className="rating-score display">{room.rating}</div>
            <div className="rating-stars">★★★★★</div>
            <div className="rating-label">{room.reviews} reviews</div>
          </div>

          <div className="hero-content">
            <div className="room-tag-badge">{room.subtitle}</div>
            <h1 className="hero-title display">
              {room.title.split(" ").map((word, i) =>
                i === room.title.split(" ").length - 1
                  ? <em key={i}>{word}</em>
                  : <span key={i}>{word} </span>
              )}
            </h1>
            <div className="hero-meta" style={{ marginTop: "1.5rem" }}>
              <div className="hero-meta-item">
                <Users size={14} />
                <strong>{room.guests}</strong>
              </div>
              <div className="hero-meta-divider" />
              <div className="hero-meta-item">
                <span>{room.size}</span>
              </div>
              <div className="hero-meta-divider" />
              <div className="hero-meta-item">
                <Wifi size={14} />
                <span>Complimentary WiFi</span>
              </div>
            </div>
          </div>
        </div>

        {/* BODY */}
        <div className="body-wrap">
          <div className="columns">

            {/* LEFT */}
            <div>
              {/* ABOUT */}
              <p className="section-label">About this room</p>
              <h2 className="section-title display">
                A stay crafted<br />
                <em style={{ fontStyle: "italic", color: "var(--gold-light)" }}>
                  around you
                </em>
              </h2>
              <p className="section-body">{room.description}</p>
              <p className="section-body" style={{ marginTop: "1rem" }}>
                Every element — from the thread count to the ambient lighting — 
                has been considered with care. We believe a room is more than a place to sleep; 
                it is an experience that stays with you.
              </p>

              {/* HIGHLIGHTS */}
              <div className="divider" />
              <p className="section-label">At a glance</p>
              <div className="highlights">
                {[
                  { icon: "⊹", label: "Room Size", value: room.size },
                  { icon: "⊹", label: "Capacity", value: room.guests },
                  { icon: "⊹", label: "Rating", value: `${room.rating} / 5.0` },
                ].map((h) => (
                  <div className="highlight-card" key={h.label}>
                    <div className="highlight-icon">{h.icon}</div>
                    <div className="highlight-title">{h.label}</div>
                    <div className="highlight-value display">{h.value}</div>
                  </div>
                ))}
              </div>

              {/* AMENITIES */}
              <div className="divider" />
              <p className="section-label">Included amenities</p>
              <h3 className="section-title display" style={{ fontSize: "1.8rem" }}>
                Everything you need,<br />
                <em style={{ fontStyle: "italic", color: "var(--gold-light)" }}>nothing you Don&apos;t</em>
              </h3>
              <div className="amenities-grid">
                {amenities.map((a, i) => (
                  <div className="amenity-item" key={i}>
                    <div className="amenity-dot" />
                    <span className="amenity-label">{a.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT — BOOKING CARD */}
            <div>
              <div className="booking-card">
                <div className="booking-card-top">
                  <div className="price-label">Starting from</div>
                  <div className="price-amount display">
                    <sup>$</sup>{room.price}
                  </div>
                  <div className="price-per">per night, before taxes</div>
                </div>

                <div className="booking-card-body">
                  <div className="booking-row">
                    <span className="booking-row-label">Guests</span>
                    <span className="booking-row-value">{room.guests}</span>
                  </div>
                  <div className="booking-row">
                    <span className="booking-row-label">Room size</span>
                    <span className="booking-row-value">{room.size}</span>
                  </div>
                  <div className="booking-row">
                    <span className="booking-row-label">WiFi</span>
                    <span className="booking-row-value accent">Complimentary</span>
                  </div>
                  <div className="booking-row">
                    <span className="booking-row-label">Cancellation</span>
                    <span className="booking-row-value accent">Free · 48h</span>
                  </div>
                  <div className="booking-row">
                    <span className="booking-row-label">Rating</span>
                    <span className="booking-row-value">★ {room.rating} ({room.reviews})</span>
                  </div>

                  <button className="book-btn" onClick={() => setShowForm(true)}>
                    Reserve this Room
                  </button>

                  <p className="book-note">
                    <span>Secure payment</span> · No charge until check-in
                  </p>
                </div>

                <div className="trust-strip">
                  {["Verified property", "Best price guaranteed", "24h support"].map((t) => (
                    <div className="trust-item" key={t}>
                      <div className="trust-item-dot" />
                      {t}
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
      <ClientOnly>
      {showForm && (<Form setShowForm={setShowForm} />)}
     </ClientOnly>
    </>
  );
}