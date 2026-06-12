"use client";

import { motion } from "framer-motion";
import { Wifi, Utensils, Car, Sparkles } from "lucide-react";

const services = [
  {
    title: "Free High-Speed WiFi",
    desc: "Stay connected anywhere in the lodge with fast and stable internet.",
    icon: Wifi,
  },
  {
    title: "Restaurant & Food Service",
    desc: "Fresh meals prepared daily with local and international options.",
    icon: Utensils,
  },
  {
    title: "Transport & Pickup",
    desc: "We offer airport pickup and city transport for guests.",
    icon: Car,
  },
  {
    title: "Daily Cleaning Service",
    desc: "Rooms cleaned every day for a fresh and comfortable stay.",
    icon: Sparkles,
  },
];

export default function ServicesPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600&family=DM+Sans:wght@300;400;500&display=swap');

        .services-section {
          background: #ffffff;
          padding: 5rem 1.5rem 6rem;
          font-family: 'DM Sans', sans-serif;
          color: #1a1814;
        }

        .services-inner {
          max-width: 1280px;
          margin: 0 auto;
        }

        .services-header {
          text-align: center;
          margin-bottom: 4rem;
        }

        .services-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2.4rem, 5vw, 3.6rem);
          font-weight: 300;
        }

        .services-subtitle {
          color: #7a7066;
          max-width: 600px;
          margin: 1rem auto 0;
          line-height: 1.7;
        }

        .services-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 3rem;
          align-items: center;
        }

        @media (min-width: 768px) {
          .services-grid {
            grid-template-columns: 1fr 1fr;
          }
        }

        /* IMAGE SIDE */
        .services-image {
          position: relative;
          height: 520px;
          border-radius: 24px;
          overflow: hidden;
          border: 1px solid rgba(180,140,80,0.18);
        }

        .services-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: brightness(0.97);
        }

        .services-badge {
          position: absolute;
          bottom: -20px;
          right: -20px;
          width: 180px;
          height: 180px;
          border-radius: 20px;
          overflow: hidden;
          border: 2px solid rgba(180,140,80,0.3);
          box-shadow: 0 20px 60px rgba(0,0,0,0.12);
        }

        .services-badge img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        /* LIST SIDE */
        .service-item {
          display: flex;
          gap: 1rem;
          padding: 1.4rem;
          border-radius: 18px;
          background: #faf8f4;
          border: 1px solid rgba(180,140,80,0.15);
          transition: 0.3s ease;
        }

        .service-item:hover {
          background: #f5f1e9;
          transform: translateX(5px);
          border-color: rgba(180,140,80,0.35);
        }

        .service-icon {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: rgba(180,140,80,0.08);
          border: 1px solid rgba(180,140,80,0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #a8895f;
          flex-shrink: 0;
        }

        .service-title {
          font-size: 1.1rem;
          font-weight: 500;
          color: #1a1814;
        }

        .service-desc {
          font-size: 0.9rem;
          color: #7a7066;
          margin-top: 0.3rem;
          line-height: 1.6;
        }
      `}</style>

      <section className="services-section" id="services">
        <div className="services-inner">

          {/* HEADER */}
          <div className="services-header">
            <h2 className="services-title">
              Our <span style={{ color: "#a8895f" }}>Services</span>
            </h2>
            <p className="services-subtitle">
              Everything you need for a comfortable and relaxing stay at DreamLand Hotel.
            </p>
          </div>

          {/* CONTENT */}
          <div className="services-grid">

            {/* LEFT IMAGE */}
            <div className="services-image">
              <img
                src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=1200&auto=format&fit=crop"
                alt="Services in Rosmery Hotel, Bishoftu, Ethiopia"
              />

              <div className="services-badge">
                <img
                  src="https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?q=80&w=800&auto=format&fit=crop"
                  alt="Service highlight in Rosmery Hotel, Bishoftu, Ethiopia"
                />
              </div>
            </div>

            {/* RIGHT LIST */}
            <div className="space-y-5">
              {services.map((service, i) => (
                <motion.div
                  key={i}
                  className="service-item"
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="service-icon">
                    <service.icon size={20} />
                  </div>

                  <div>
                    <div className="service-title">{service.title}</div>
                    <div className="service-desc">{service.desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>

          </div>
        </div>
      </section>
    </>
  );
}