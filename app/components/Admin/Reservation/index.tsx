"use client";
import { motion } from "framer-motion";
import { Phone, Mail, Calendar, BedDouble, ArrowRight, Leaf } from "lucide-react";

export interface BookingDetailsProps {
  fullName: string;
  phone: string;
  email: string;
  startDate: string;
  endDate: string;
  roomNumber: string;
  roomCategory?: string;
}

function getInitials(name?: string) {
  if (!name) return "--";

  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function nightsBetween(start: string, end: string) {
  const diff =
    new Date(end).getTime() - new Date(start).getTime();
  const nights = Math.round(diff / (1000 * 60 * 60 * 24));
  return nights > 0 ? `${nights} night${nights !== 1 ? "s" : ""}` : "—";
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

const  ReservationPage = ({
  fullName,
  phone,
  email,
  startDate,
  endDate,
  roomNumber,
  roomCategory = "Standard",
}: BookingDetailsProps) => {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');

         :root {
          --gold: #c8a96e;
          --ink: #0f0e0c;
          --surface: #1e1c19;
          --border: rgba(200,169,110,0.15);
          --text: #f0e8da;
          --muted: #9c8d7a;
        }

        body {
          background: var(--ink);
          color: var(--text);
          font-family: 'DM Sans', sans-serif;
          margin: 0;
        }
          
        .rh-booking-wrap {
          background: #0f0e0c;
          padding: 3rem 1.5rem;
          font-family: 'DM Sans', sans-serif;
          font-weight: 300;
          -webkit-font-smoothing: antialiased;
          border-radius: 20px;
        }

        .rh-booking-label {
          display: block;
          font-size: 0.68rem;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: #7a6142;
          margin-bottom: 0.6rem;
          text-align: center;
        }

        .rh-booking-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.8rem, 4vw, 2.4rem);
          font-weight: 300;
          color: #f0e8da;
          text-align: center;
          margin: 0 0 0.4rem;
        }

        .rh-booking-title em {
          font-style: italic;
          color: #e2c99a;
        }

        .rh-booking-divider {
          height: 1px;
          background: linear-gradient(to right, transparent, rgba(200,169,110,0.18), transparent);
          margin: 1.2rem auto 2rem;
          max-width: 280px;
        }

        .rh-booking-card {
          background: #1e1c19;
          border: 1px solid rgba(200,169,110,0.13);
          border-radius: 20px;
          padding: 2rem 2rem 1.5rem;
          max-width: 640px;
          margin: 0 auto;
        }

        .rh-booking-avatar {
          width: 52px;
          height: 52px;
          border-radius: 50%;
          background: rgba(200,169,110,0.08);
          border: 1px solid rgba(200,169,110,0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.2rem;
          font-weight: 400;
          color: #c8a96e;
          flex-shrink: 0;
        }

        .rh-booking-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.55rem;
          font-weight: 400;
          color: #f0e8da;
          margin: 0;
          line-height: 1.2;
        }

        .rh-booking-status-tag {
          display: inline-block;
          font-size: 0.65rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #7a6142;
          background: rgba(200,169,110,0.06);
          border: 1px solid rgba(200,169,110,0.15);
          padding: 3px 10px;
          border-radius: 20px;
          margin-top: 4px;
        }

        .rh-booking-sep {
          height: 1px;
          background: rgba(200,169,110,0.1);
          margin: 1.4rem 0;
        }

        .rh-booking-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem 1.5rem;
        }

        .rh-booking-field-label {
          font-size: 0.67rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #5e5244;
          margin-bottom: 5px;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .rh-booking-field-value {
          font-size: 0.9rem;
          color: #c8b898;
          font-weight: 300;
        }

        .rh-booking-dates-row {
          display: flex;
          align-items: flex-start;
          gap: 0.8rem;
        }

        .rh-booking-date-block {
          flex: 1;
        }

        .rh-booking-date-sublabel {
          font-size: 0.67rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #5e5244;
          margin-bottom: 4px;
        }

        .rh-booking-arrow {
          color: #5e5244;
          flex-shrink: 0;
          margin-top: 18px;
        }

        .rh-booking-room-badge {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          background: rgba(200,169,110,0.07);
          border: 1px solid rgba(200,169,110,0.2);
          border-radius: 10px;
          padding: 0.55rem 1rem;
          color: #e2c99a;
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.35rem;
          font-weight: 300;
        }

        .rh-booking-footer {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          margin-top: 1.6rem;
          font-size: 0.7rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #3d352a;
        }
      `}</style>

      <section className="rh-booking-wrap">
        <span className="rh-booking-label">Bishoftu · Ethiopia</span>
        <h2 className="rh-booking-title">
          Booking <em>Details</em>
        </h2>
        <div className="rh-booking-divider" />

        <motion.div
          className="rh-booking-card"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Guest header */}
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: "1.4rem" }}>
            <div className="rh-booking-avatar">{getInitials(fullName)}</div>
            <div>
              <p className="rh-booking-name">{fullName}</p>
              <span className="rh-booking-status-tag">confirmed reservation</span>
            </div>
          </div>

          <div className="rh-booking-sep" />

          {/* Contact info */}
          <div className="rh-booking-grid">
            <div>
              <div className="rh-booking-field-label">
                <Phone size={13} color="#7a6142" />
                Phone
              </div>
              <div className="rh-booking-field-value">{phone}</div>
            </div>
            <div>
              <div className="rh-booking-field-label">
                <Mail size={13} color="#7a6142" />
                Email
              </div>
              <div className="rh-booking-field-value">{email}</div>
            </div>
          </div>

          <div className="rh-booking-sep" />

          {/* Stay period */}
          <div className="rh-booking-field-label" style={{ marginBottom: "0.8rem" }}>
            <Calendar size={13} color="#7a6142" />
            Stay period
          </div>
          <div className="rh-booking-dates-row">
            <div className="rh-booking-date-block">
              <div className="rh-booking-date-sublabel">Check-in</div>
              <div className="rh-booking-field-value">{formatDate(startDate)}</div>
            </div>
            <div className="rh-booking-arrow">
              <ArrowRight size={18} />
            </div>
            <div className="rh-booking-date-block">
              <div className="rh-booking-date-sublabel">Check-out</div>
              <div className="rh-booking-field-value">{formatDate(endDate)}</div>
            </div>
            <div style={{ textAlign: "right", flexShrink: 0 }}>
              <div className="rh-booking-date-sublabel">Duration</div>
              <div className="rh-booking-field-value">{nightsBetween(startDate, endDate)}</div>
            </div>
          </div>

          <div className="rh-booking-sep" />

          {/* Room */}
          <div className="rh-booking-field-label" style={{ marginBottom: "0.8rem" }}>
            <BedDouble size={13} color="#7a6142" />
            Room
          </div>
          <div className="rh-booking-room-badge">
            <BedDouble size={16} color="#7a6142" />
            Room {roomNumber} — {roomCategory}
          </div>

          {/* Footer */}
          <div className="rh-booking-footer">
            <Leaf size={13} />
            DreamLand Hotel · Peaceful retreat since 1989
          </div>
        </motion.div>
      </section>
    </>
  );
}

export default ReservationPage;