"use client";

import { SetStateAction, useState } from "react";
import {
  FaBed,
  FaEnvelope,
  FaCalendarAlt,
  FaPenNib,
  FaBars,
  FaTimes,
} from "react-icons/fa";

const Sidebar = ({setTabs}:{setTabs:React.Dispatch<SetStateAction<string>>}) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="sidebar-container">
      {/* Toggle Button (Mobile) */}
      <button className="menu-btn" onClick={() => setOpen(!open)}>
        {open ? <FaTimes /> : <FaBars />}
      </button>

      <div className={`sidebar ${open ? "active" : ""}`}>
        <div className="logo">
          DreamLand
        </div>

        <nav className="nav">
          <a href="#" className="nav-item" onClick={() => setTabs("Rooms")}>
            <FaBed className="icon" />
            Rooms
          </a>

          <a href="#" className="nav-item" onClick={() => setTabs("Reservation")}>
            <FaCalendarAlt className="icon" />
            Reservations
          </a>

          <a href="#" className="nav-item" onClick={() => setTabs("Contacts")}>
            <FaEnvelope className="icon" />
            Contacts
          </a>

          <a href="#" className="nav-item" onClick={() => setTabs("Blog")}>
            <FaPenNib className="icon" />
            Blog
          </a>
        </nav>
      </div>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600&family=DM+Sans:wght@300;400;500&display=swap');

        :root {
          --gold: #c8a96e;
          --gold-light: #e4c48b;
          --ink: #0f0e0c;
          --text: #f0e8da;
          --muted: #9c8d7a;
          --border: rgba(200,169,110,0.14);
        }
        .menu-btn {
          position: fixed;
          top: 20px;
          left: 20px;
          z-index: 2000;
          background: rgba(15,14,12,0.6);
          border: 1px solid var(--border);
          color: var(--text);
          padding: 10px;
          border-radius: 12px;
          cursor: pointer;
          backdrop-filter: blur(20px);
        }

      .sidebar {
  position: fixed;
  top: 0;
  left: 0;
  width: 280px;
  height: 100vh;

  background: rgba(15,14,12,0.85);
  backdrop-filter: blur(25px);

  border-right: 1px solid rgba(228,196,139,0.25); /* FIX HERE */

  padding: 2rem 1.5rem;
  transform: translateX(-100%);
  transition: 0.4s ease;
  z-index: 1500;
}

        .sidebar.active {
          transform: translateX(0);
        }

        .logo {
          font-family: "Cormorant Garamond", serif;
          font-size: 2rem;
          color: var(--gold);
          margin-bottom: 3rem;
          letter-spacing: 2px;
        }

        .nav {
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 14px;
          border-radius: 14px;
          color: var(--text);
          text-decoration: none;
          font-family: "DM Sans", sans-serif;
          font-size: 0.95rem;
          letter-spacing: 0.5px;
          transition: 0.3s ease;
          border: 1px solid transparent;
        }

        .nav-item:hover {
          background: rgba(200,169,110,0.08);
          border: 1px solid var(--border);
          color: var(--gold-light);
          transform: translateX(5px);
        }

        .icon {
          color: var(--gold);
        }

        @media (min-width: 768px) {
          .menu-btn {
            display: none;
          }

          .sidebar {
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
};

export default Sidebar;