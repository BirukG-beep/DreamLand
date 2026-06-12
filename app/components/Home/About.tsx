"use client";
import { motion } from "framer-motion";
import {
  Building2,
  Trees,
  BedDouble,
  Target,
  Rocket,
} from "lucide-react";

const cards = [
  {
    title: "About DreamLand Hotel",
    icon: <Building2 className="w-6 h-6" />,
    content:
      "DreamLand Hotel is located on the outskirts of Bishoftu/Debre Zeit, 42 km from Addis Ababa. Once a family farm, it became part of the town during the late 1980s. As Bishoftu grew into a popular tourism and leisure destination, DreamLand Hotel emerged as a modest yet reliable hospitality provider.",
  },
  {
    title: "Facilities",
    icon: <BedDouble className="w-6 h-6" />,
    content:
      "The hotel offers 42 rooms across four categories: Executive Family, Quality Single, Double, and Group Bunk rooms. Guests enjoy in-room hot water showers (except bunk rooms), a 300-seat hall, and two syndicate rooms accommodating 40 guests each.",
  },
  {
    title: "Uniqueness",
    icon: <Trees className="w-6 h-6" />,
    content:
      "Surrounded by lush gardens, DreamLand Hotel provides a peaceful retreat ideal for relaxation, writing, reflection, and group escapes. Guests can use the open kitchen or pre-order personalized meals while enjoying professional hospitality from an experienced management team.",
  },
  {
    title: "Who We Are",
    icon: <Target className="w-6 h-6" />,
    content:
      "DreamLand Hotel is a sanctuary for rest and renewal. Built on strong values, it focuses on guests' mental, emotional, and spiritual wellbeing through disciplined service, comfort, quality, and genuine hospitality.",
  },
  {
    title: "Future Vision",
    icon: <Rocket className="w-6 h-6" />,
    content:
      "With Bishoftu rapidly growing as a tourism destination and the planned construction of Africa's largest airport nearby, DreamLand Hotel plans to double its capacity within five years to meet increasing hospitality demand.",
  },
];

export default function RosmeryHotelCards() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');

        .Rosmery-section {
          background: #ffffff;
          padding: 5rem 1.5rem 6rem;
          font-family: 'DM Sans', sans-serif;
          font-weight: 300;
          -webkit-font-smoothing: antialiased;
        }

        .Rosmery-inner {
          max-width: 1280px;
          margin: 0 auto;
        }

        .Rosmery-header {
          text-align: center;
          margin-bottom: 4rem;
        }

        .Rosmery-label {
          display: inline-block;
          font-size: 0.68rem;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: #a8895f;
          margin-bottom: 1rem;
        }

        .Rosmery-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2.4rem, 5vw, 3.8rem);
          font-weight: 300;
          line-height: 1.1;
          color: #1a1814;
          margin-bottom: 1.2rem;
        }

        .Rosmery-title em {
          font-style: italic;
          color: #b1813f;
        }

        .Rosmery-subtitle {
          font-size: 0.92rem;
          color: #7a7066;
          max-width: 520px;
          margin: 0 auto;
          line-height: 1.8;
        }

        .Rosmery-grid {
          display: grid;
          gap: 1rem;
          grid-template-columns: repeat(1, 1fr);
        }

        @media (min-width: 768px) {
          .Rosmery-grid { grid-template-columns: repeat(2, 1fr); }
        }

        @media (min-width: 1280px) {
          .Rosmery-grid { grid-template-columns: repeat(3, 1fr); }
        }

        .Rosmery-card {
          background: #faf8f4;
          border: 1px solid rgba(180,140,80,0.15);
          border-radius: 20px;
          padding: 2.2rem 2rem;
          transition: border-color 0.25s ease, transform 0.25s ease, background 0.25s ease;
          cursor: default;
        }

        .Rosmery-card:hover {
          border-color: rgba(180,140,80,0.35);
          background: #f5f1e9;
          transform: translateY(-3px);
        }

        .Rosmery-card-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          border: 1px solid rgba(180,140,80,0.2);
          background: rgba(180,140,80,0.06);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #a8895f;
          margin-bottom: 1.6rem;
          transition: background 0.2s, border-color 0.2s;
        }

        .Rosmery-card:hover .Rosmery-card-icon {
          background: rgba(180,140,80,0.12);
          border-color: rgba(180,140,80,0.4);
        }

        .Rosmery-card-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.45rem;
          font-weight: 400;
          color: #1a1814;
          margin-bottom: 0.9rem;
          line-height: 1.2;
        }

        .Rosmery-card-body {
          font-size: 0.875rem;
          color: #7a7066;
          line-height: 1.85;
        }

        .Rosmery-divider {
          height: 1px;
          background: linear-gradient(to right, transparent, rgba(180,140,80,0.25), transparent);
          margin: 0 auto 4rem;
          max-width: 320px;
        }
      `}</style>

      <section className="Rosmery-section" id="about">
        <div className="Rosmery-inner">

          <div className="Rosmery-header">
            <span className="Rosmery-label">Bishoftu · Ethiopia</span>
            <h2 className="Rosmery-title">
              Welcome to <em>DreamLand Hotel</em>
            </h2>
            <div className="Rosmery-divider" />
            <p className="Rosmery-subtitle">
              A peaceful retreat offering comfort, hospitality, greenery, and a
              refreshing experience for travellers, families, conferences, and group stays.
            </p>
          </div>

          <div className="Rosmery-grid">
            {cards.map((card, index) => (
              <motion.div
                key={index}
                className="Rosmery-card"
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true }}
              >
                <div className="Rosmery-card-icon">{card.icon}</div>
                <h3 className="Rosmery-card-title">{card.title}</h3>
                <p className="Rosmery-card-body">{card.content}</p>
              </motion.div>
            ))}
          </div>

        </div>
      </section>
    </>
  );
}