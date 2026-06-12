"use client";
import toast from "react-hot-toast";
import { FaTimes } from "react-icons/fa";
const Form = ({ setShowForm }: { setShowForm: React.Dispatch<React.SetStateAction<boolean>> }) => {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert("Your reservation has been submitted!");
        setShowForm(false);
      };
  return (
    <>
      <div className="map-page">
                <button className="times" onClick={() => setShowForm(false)}><FaTimes /></button>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600&family=DM+Sans:wght@300;400;500&display=swap');

          :root {
            --gold: #a8895f;
            --gold-light: #b1813f;
            --ink: #ffffff;
            --text: #1a1814;
            --muted: #7a7066;
            --border: rgba(180,140,80,0.18);
          }

          * {
            box-sizing: border-box;
          }

        .times {
  position: absolute;
  top: 20px;
  right: 20px;

  z-index: 10000;

  cursor: pointer;
  background: none;
  border: none;

  color: var(--text);
  font-size: 1.5rem;
}
          .map-page {
            width: 100%;
            height: 100vh;
            position: fixed;
           inset: 0;
             z-index: 9999;
           top: 50%;
           left: 50%;
           pointer-events: auto;
           transform: translate(-50%, -50%);
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 40px 20px;

            background:
              radial-gradient(
                circle at top,
                rgba(180,140,80,0.08),
                transparent 30%
              ),
              #ffffff;

            font-family: 'DM Sans', sans-serif;
          }

          .booking-panel {
         

            width: 100%;
            max-width: 520px;

            background:
              rgba(255,255,255,0.85);

            border:
              1px solid var(--border);

            backdrop-filter: blur(28px);

            border-radius: 32px;

            overflow: hidden;

            box-shadow:
              0 15px 60px rgba(0,0,0,0.10);
          }

          .booking-top {
            padding:
              2rem 2rem 1.5rem;

            border-bottom:
              1px solid rgba(180,140,80,0.15);
          }

          .booking-label {
            color: var(--muted);

            text-transform: uppercase;

            letter-spacing: 0.3em;

            font-size: 0.7rem;

            margin-bottom: 0.9rem;
          }

          .booking-title {
            font-family:
              'Cormorant Garamond',
              serif;

            font-size: 3rem;

            line-height: 1;

            color: var(--gold);
          }

          .booking-subtitle {
            margin-top: 1rem;

            color: var(--text);

            font-size: 0.95rem;

            line-height: 1.8;
          }

          .booking-form {
            padding: 2rem;
          }

          .form-group {
            margin-bottom: 1.2rem;
          }

          .form-group label {
            display: block;

            margin-bottom: 0.7rem;

            color: var(--gold-light);

            font-size: 0.76rem;

            letter-spacing: 0.15em;

            text-transform: uppercase;
          }

          .form-group input {
            width: 100%;

            padding: 1rem 1.1rem;

            border-radius: 18px;

            border:
              1px solid rgba(180,140,80,0.18);

            background:
              #ffffff;

            color: var(--text);

            outline: none;

            font-size: 0.95rem;

            transition: 0.35s ease;
          }

          .form-group input:focus {
            border-color: var(--gold);

            background:
              #ffffff;

            box-shadow:
              0 0 0 4px rgba(180,140,80,0.1);
          }

          .form-group input::placeholder {
            color: #b0a594;
          }

          .date-grid {
            display: grid;

            grid-template-columns: 1fr 1fr;

            gap: 1rem;
          }

          .booking-btn {
            width: 100%;

            margin-top: 1rem;

            padding: 1rem;

            border: none;

            border-radius: 18px;

            background: var(--gold);

            color: #ffffff;

            cursor: pointer;

            font-size: 0.82rem;

            letter-spacing: 0.18em;

            text-transform: uppercase;

            transition: 0.35s ease;
          }

          .booking-btn:hover {
            background: var(--gold-light);

            transform: translateY(-2px);
          }

          @media (max-width: 768px) {
            .booking-title {
              font-size: 2.2rem;
            }

            .booking-form,
            .booking-top {
              padding: 1.5rem;
            }

            .date-grid {
              grid-template-columns: 1fr;
            }
          }
        `}</style>

        <div className="booking-panel">
    
          <div className="booking-top">
            <div className="booking-label">
              Reservation
            </div>

            <div className="booking-title">
              Luxury Stay
            </div>

            <div className="booking-subtitle">
              Reserve your premium
              experience with elegant
              modern booking.
            </div>
          </div>

          <form className="booking-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>
                Full Name
              </label>

              <input
                type="text"
                placeholder="John Doe"
              />
            </div>

            <div className="form-group">
              <label>
                Phone
              </label>

              <input
                type="tel"
                placeholder="+251 9..."
              />
            </div>

            <div className="form-group">
              <label>
                Email
              </label>

              <input
                type="email"
                placeholder="hello@email.com"
              />
            </div>

            <div className="date-grid">
              <div className="form-group">
                <label>
                  First Date
                </label>

                <input type="date" />
              </div>

              <div className="form-group">
                <label>
                  Last Date
                </label>

                <input type="date" />
              </div>
            </div>

            <button
              type="submit"
              className="booking-btn"
            >
              Reserve Now
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Form;