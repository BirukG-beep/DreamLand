"use client";
import { useState } from "react";
import Footer from "@/app/components/Home/Footer";
import {useRouter} from 'next/navigation';

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(form);
    alert("Message sent (demo)");
  };

  return (
    <>

      <style>{`
        :root {
          --gold: #a8895f;
          --ink: #ffffff;
          --surface: #faf8f4;
          --border: rgba(180,140,80,0.18);
          --text: #1a1814;
          --muted: #7a7066;
        }

        body {
          background: var(--ink);
          color: var(--text);
          font-family: 'DM Sans', sans-serif;
        }

        .contact-hero {
          padding: 8rem 2rem 4rem;
          text-align: center;
        }

        .label {
          letter-spacing: 0.3em;
          text-transform: uppercase;
          font-size: 0.7rem;
          color: var(--gold);
        }

        .title {
          font-size: clamp(2.5rem, 5vw, 4.5rem);
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300;
          margin-top: 1rem;
        }

        .subtitle {
          margin-top: 1rem;
          color: var(--muted);
          font-size: 0.95rem;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
          line-height: 1.7;
        }

        .wrap {
          max-width: 1100px;
          margin: 0 auto;
          padding: 3rem 2rem 8rem;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
        }

        @media (max-width: 900px) {
          .wrap {
            grid-template-columns: 1fr;
          }
        }

        .card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 20px;
          padding: 2rem;
        }
        
        .card form {
        padding-right: 2rem;}

        .input {
          width: 100%;
          padding: 1rem;
          margin-bottom: 1rem;
          background: #ffffff;
          border: 1px solid var(--border);
          border-radius: 10px;
          color: var(--text);
          outline: none;
        }

        .input:focus {
          border-color: var(--gold);
        }

        textarea.input {
          min-height: 140px;
          resize: none;
        }

        .btn {
          width: 100%;
          padding: 1rem;
          background: var(--gold);
          color: #fff;
          border: none;
          border-radius: 10px;
          font-weight: 500;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          cursor: pointer;
          transition: 0.2s;
        }

        .btn:hover {
          transform: translateY(-2px);
        }

        .info {
          margin-bottom: 1.2rem;
        }

        .info h3 {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300;
          margin-bottom: 0.4rem;
          color: var(--text);
        }

        .info p {
          color: var(--muted);
          font-size: 0.9rem;
        }

        .divider {
          height: 1px;
          background: var(--border);
          margin: 1.5rem 0;
        }
      `}</style>

      {/* HERO */}
      <div className="contact-hero">
       <nav className="nav-wrap">
  <button
    onClick={() => router.push("/")}
    className="nav-link"
  >
    Home
  </button>

  <button
    onClick={() => router.push("/map")}
    className="nav-link ml-8"
  >
    Map
  </button>

  <style jsx>{`
    .nav-wrap {
      padding: 0.2rem 1.2rem;
      border: 1px solid rgba(180, 140, 80, 0.18);
      border-radius: 999px;
      background: rgba(255, 255, 255, 0.7);
      backdrop-filter: blur(18px);
      width: fit-content;
      margin: 0 auto 2rem;
      position: absolute;
      top: 2rem;
      left: 50%;
      transform: translateX(-50%);
      z-index: 10;
      box-shadow: 0 4px 16px rgba(0,0,0,0.06);
    }

    .nav-link {
      position: relative;
      font-size: 0.78rem;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: rgba(26, 24, 20, 0.65);
      transition: all 0.25s ease;
      cursor: pointer;
      background: none;
      border: none;
      padding: 0;
      padding-right: 1rem;
      padding-left: 1rem;
    }

    .nav-link:hover {
      color: #a8895f;
      transform: translateY(-1px);
    }

    .nav-link::after {
      content: "";
      position: absolute;
      left: 0;
      bottom: -6px;
      width: 0%;
      height: 1px;
      background: #a8895f;
      transition: width 0.3s ease;
    }

    .nav-link:hover::after {
      width: 100%;
    }
  `}</style>
</nav>
        <div className="label">Contact</div>
        <h1 className="title">Get in touch</h1>
        <p className="subtitle">
          We’re here to help you plan your stay, answer questions, or assist
          with special requests. Expect a response within 24 hours.
        </p>
      </div>

      {/* CONTENT */}
      <div className="wrap">
        {/* FORM */}
        <div className="card">
          <form onSubmit={handleSubmit}>
            <input
              className="input"
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
            />
            <input
              className="input"
              name="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
            />
            <input
              className="input"
              name="subject"
              placeholder="Subject"
              value={form.subject}
              onChange={handleChange}
            />
            <textarea
              className="input"
              name="message"
              placeholder="Your Message"
              value={form.message}
              onChange={handleChange}
            />

            <button className="btn" type="submit">
              Send Message
            </button>
          </form>
        </div>

        {/* INFO */}
        <div className="card">
          <div className="info">
            <h3>Email</h3>
            <p>support@luxestay.com</p>
          </div>

          <div className="info">
            <h3>Phone</h3>
            <p>+251 900 000 000</p>
          </div>

          <div className="info">
            <h3>Location</h3>
            <p>Addis Ababa, Ethiopia</p>
          </div>

          <div className="divider" />

          <div className="info">
            <h3>Support Hours</h3>
            <p>24/7 concierge assistance</p>
          </div>

          <div className="info">
            <h3>Response Time</h3>
            <p>Within 24 hours</p>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}