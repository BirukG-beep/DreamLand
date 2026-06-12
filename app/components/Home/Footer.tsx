"use client";

import { Wifi, MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600&family=DM+Sans:wght@300;400;500&display=swap');

        .footer {
          background: #ffffff;
          color: #1a1814;
          padding: 5rem 1.5rem 2rem;
          font-family: 'DM Sans', sans-serif;
          border-top: 1px solid rgba(180,140,80,0.15);
        }

        .footer-inner {
          max-width: 1200px;
          margin: 0 auto;
        }

        .footer-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2.5rem;
        }

        @media (min-width: 768px) {
          .footer-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }

        .brand-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.8rem;
          font-weight: 300;
        }

        .brand-desc {
          color: #7a7066;
          margin-top: 1rem;
          line-height: 1.7;
        }

        .section-title {
          font-size: 0.85rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #a8895f;
          margin-bottom: 1rem;
        }

        .link {
          color: #7a7066;
          font-size: 0.95rem;
          margin-bottom: 0.6rem;
          cursor: pointer;
          transition: 0.2s;
        }

        .link:hover {
          color: #b1813f;
          transform: translateX(3px);
        }

        .contact-item {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          color: #7a7066;
          margin-bottom: 0.8rem;
          font-size: 0.95rem;
        }

        .bottom {
          margin-top: 4rem;
          border-top: 1px solid rgba(180,140,80,0.18);
          padding-top: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          text-align: center;
          color: #7a7066;
          font-size: 0.85rem;
        }

        @media (min-width: 768px) {
          .bottom {
            flex-direction: row;
            justify-content: space-between;
            text-align: left;
          }
        }

        .footer-accent {
          color: #a8895f;
        }
      `}</style>

      <footer className="footer">
        <div className="footer-inner">

          {/* GRID */}
          <div className="footer-grid">

            {/* Brand */}
            <div>
              <h2 className="brand-title">
                DreamLand <span className="footer-accent">Hotel</span>
              </h2>
              <p className="brand-desc">
                Comfortable stays with modern services, peaceful environment,
                and affordable luxury in Bishoftu, Ethiopia.
              </p>
            </div>

            {/* Links */}
            <div>
              <div className="section-title">Quick Links</div>
              <div className="link">Home</div>
              <div className="link">Rooms</div>
              <div className="link">Services</div>
              <div className="link">Blog</div>
            </div>

            {/* Services */}
            <div>
              <div className="section-title">Services</div>

              <div className="contact-item">
                <Wifi size={16} />
                Free WiFi
              </div>

              <div className="contact-item">Restaurant</div>
              <div className="contact-item">Transport</div>
              <div className="contact-item">Room Cleaning</div>
            </div>

            {/* Contact */}
            <div>
              <div className="section-title">Contact</div>

              <div className="contact-item">
                <MapPin size={16} />
                Bishoftu, Ethiopia
              </div>

              <div className="contact-item">
                <Phone size={16} />
                +251 900 000 000
              </div>

              <div className="contact-item">
                <Mail size={16} />
                info@rosmeryhotel.com
              </div>
            </div>

          </div>

          {/* BOTTOM */}
          <div className="bottom">
            <p>
              © {new Date().getFullYear()}{" "}
              <span className="footer-accent">DreamLand Hotel</span>. All rights reserved. <a
  href="https://t.me/nathan2127g"
  target="_blank"
  rel="noopener noreferrer"
  className="footer-accent"
  style={{
    textDecoration: 'none',
    transition: 'all 0.2s ease',
  }}
  onMouseOver={(e) => {
    e.currentTarget.style.textDecoration = 'underline';
    e.currentTarget.style.opacity = '0.9';
  }}
  onMouseOut={(e) => {
    e.currentTarget.style.textDecoration = 'none';
    e.currentTarget.style.opacity = '1';
  }}
> Developed By
  <span className="text-orange-500">Nathnael Getachew</span>
</a>
            </p>

            <div style={{ display: "flex", gap: "1.5rem" }}>
              <span className="link">Privacy Policy</span>
              <span className="link">Terms</span>
            </div>
          </div>

        </div>
      </footer>
    </>
  );
}