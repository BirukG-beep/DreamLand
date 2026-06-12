"use client";

import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Sarah M.",
    role: "Traveler",
    text: "Amazing experience! The rooms were clean, staff was friendly, and the service was excellent.",
  },
  {
    name: "Daniel K.",
    role: "Business Guest",
    text: "Perfect place for work trips. Fast WiFi and quiet environment helped me focus.",
  },
  {
    name: "Amina T.",
    role: "Family Visitor",
    text: "We stayed as a family and everything was comfortable. Highly recommended!",
  },
];

export default function Testimonial() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600&family=DM+Sans:wght@300;400;500&display=swap');

        .testimonials {
          background: #ffffff;
          padding: 5rem 1.5rem 6rem;
          font-family: 'DM Sans', sans-serif;
          color: #1a1814;
        }

        .testimonials-inner {
          max-width: 1200px;
          margin: 0 auto;
        }

        .testimonials-header {
          text-align: center;
          margin-bottom: 3.5rem;
        }

        .testimonials-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2.4rem, 5vw, 3.6rem);
          font-weight: 300;
        }

        .testimonials-subtitle {
          color: #7a7066;
          margin-top: 1rem;
        }

        .scroll-row {
          display: flex;
          gap: 1.5rem;
          overflow-x: auto;
          padding-bottom: 1rem;
          scroll-snap-type: x mandatory;
        }

        .scroll-row::-webkit-scrollbar {
          height: 6px;
        }

        .scroll-row::-webkit-scrollbar-thumb {
          background: rgba(180,140,80,0.35);
          border-radius: 10px;
        }

        .testimonial-card {
          min-width: 320px;
          max-width: 360px;
          scroll-snap-align: start;

          background: #faf8f4;
          border: 1px solid rgba(180,140,80,0.15);
          border-radius: 22px;
          padding: 1.8rem;

          backdrop-filter: blur(12px);
          transition: 0.3s ease;
        }

        .testimonial-card:hover {
          transform: translateY(-4px);
          border-color: rgba(180,140,80,0.35);
          background: #f5f1e9;
        }

        .testimonial-text {
          color: #5c5349;
          line-height: 1.8;
          font-size: 0.95rem;
        }

        .testimonial-name {
          margin-top: 1.5rem;
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.2rem;
          color: #1a1814;
        }

        .testimonial-role {
          font-size: 0.85rem;
          color: #7a7066;
        }
      `}</style>

      <section className="testimonials" id="guest-say">
        <div className="testimonials-inner">

          {/* HEADER */}
          <div className="testimonials-header">
            <h2 className="testimonials-title">
              What Our <span style={{ color: "#a8895f" }}>Guests Say</span>
            </h2>
            <p className="testimonials-subtitle">
              Real experiences from people who stayed at DreamLand Hotel.
            </p>
          </div>

          {/* SCROLL ROW */}
          <div className="scroll-row">
            {testimonials.map((item, index) => (
              <motion.div
                key={index}
                className="testimonial-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <p className="testimonial-text">
                  “{item.text}”
                </p>

                <div>
                  <div className="testimonial-name">
                    {item.name}
                  </div>
                  <div className="testimonial-role">
                    {item.role}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>
    </>
  );
}