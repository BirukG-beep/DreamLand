"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const recentBookings = [
  { id: "#BK-4821", guest: "Amara Tesfaye", room: "Suite 12 – Deluxe", check_in: "Jun 3", check_out: "Jun 7", status: "Confirmed" },
  { id: "#BK-4820", guest: "Lena Hoffmann", room: "Room 5 – Standard", check_in: "Jun 2", check_out: "Jun 4", status: "Checked In" },
  { id: "#BK-4819", guest: "James Okafor", room: "Penthouse – Royal", check_in: "Jun 1", check_out: "Jun 6", status: "Checked Out" },
  { id: "#BK-4818", guest: "Sofia Reyes", room: "Suite 8 – Ocean", check_in: "Jun 5", check_out: "Jun 9", status: "Pending" },
  { id: "#BK-4817", guest: "Yuki Nakamura", room: "Room 3 – Classic", check_in: "Jun 4", check_out: "Jun 5", status: "Confirmed" },
];

const statusColor: Record<string, string> = {
  Confirmed: "#c8a96e",
  "Checked In": "#7ec8a9",
  "Checked Out": "#9c8d7a",
  Pending: "#c8956e",
};

export default function AdminPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("Overview");
  const tabs = ["Overview", "Bookings", "Guests", "Reports"];

  return (
    <>
      <style>{`
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

        .admin-nav {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 50;
          padding: 0.9rem 2.5rem;
          background: rgba(15,14,12,0.85);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .brand {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.35rem;
          font-weight: 400;
          letter-spacing: 0.12em;
          color: var(--gold);
        }

        .pill-nav {
          display: flex;
          gap: 0.2rem;
          padding: 0.25rem;
          border: 1px solid var(--border);
          border-radius: 999px;
          background: rgba(255,255,255,0.02);
        }

        .pill-btn {
          background: none;
          border: none;
          color: rgba(240,232,218,0.55);
          font-family: 'DM Sans', sans-serif;
          font-size: 0.75rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          padding: 0.45rem 1.1rem;
          border-radius: 999px;
          cursor: pointer;
          transition: all 0.22s;
        }

        .pill-btn.active {
          background: var(--gold);
          color: #000;
        }

        .pill-btn:not(.active):hover { color: var(--text); }

        .nav-avatar {
          width: 34px; height: 34px;
          border-radius: 50%;
          border: 1px solid var(--border);
          background: var(--surface);
          display: flex; align-items: center; justify-content: center;
          font-size: 0.8rem;
          color: var(--gold);
          cursor: pointer;
        }
.admin-page {
  padding: 2rem 2.5rem 5rem;
  max-width: 1000px;
  margin: 0 auto;

  background-color:white;

  /* Firefox */
  scrollbar-width: none;

  /* IE and old Edge */
  -ms-overflow-style: none;
}

/* Chrome, Edge, Safari */
.admin-page::-webkit-scrollbar {
  display: none;
}

        .admin-hero { margin-bottom: 2.5rem; }

        .label {
          letter-spacing: 0.3em;
          text-transform: uppercase;
          font-size: 0.7rem;
          color: var(--gold);
        }

        .title {
          font-size: clamp(2rem, 4vw, 3.5rem);
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300;
          margin: 0.5rem 0 0.4rem;
          line-height: 1.15;
        }

        .subtitle {
          color: var(--muted);
          font-size: 0.9rem;
        }

        .card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 20px;
          padding: 1.8rem 2rem;
        }

        .card-header {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          margin-bottom: 1.5rem;
        }

        .card-title {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300;
          font-size: 1.3rem;
        }

        .card-action {
          font-size: 0.72rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--gold);
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
        }

        .booking-table {
          width: 100%;
          border-collapse: collapse;
        }

        .booking-table th {
          font-size: 0.68rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--muted);
          text-align: left;
          padding-bottom: 0.8rem;
          border-bottom: 1px solid var(--border);
        }

        .booking-table td {
          padding: 1rem 0;
          font-size: 0.85rem;
          border-bottom: 1px solid rgba(200,169,110,0.07);
          color: var(--text);
          vertical-align: middle;
        }

        .booking-table tr:last-child td { border-bottom: none; }

        .booking-table .mono {
          color: var(--muted);
          font-size: 0.78rem;
          font-family: 'DM Mono', monospace;
        }

        .status-pill {
          display: inline-block;
          padding: 0.25rem 0.75rem;
          border-radius: 999px;
          font-size: 0.7rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }
      `}</style>

      {/* PAGE */}
      <div className="admin-page">

        <div className="admin-hero">
          <div className="label">Dashboard</div>
          <h1 className="title">&quot;Good morning, Admin&quot;</h1>
          <p className="subtitle">Here&apos;s what&apos;s happening at LuxeStay today.</p>
        </div>

        {/* BOOKINGS TABLE ONLY */}
        <div className="card">
          <div className="card-header">
            <span className="card-title">Recent Bookings</span>
            <button className="card-action">View All →</button>
          </div>

          <table className="booking-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Guest</th>
                <th>Room</th>
                <th>Check-in</th>
                <th>Check-out</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentBookings.map((b) => (
                <tr key={b.id}>
                  <td className="mono">{b.id}</td>
                  <td>{b.guest}</td>
                  <td style={{ color: "var(--muted)", fontSize: "0.8rem" }}>{b.room}</td>
                  <td style={{ color: "var(--muted)", fontSize: "0.8rem" }}>{b.check_in}</td>
                  <td style={{ color: "var(--muted)", fontSize: "0.8rem" }}>{b.check_out}</td>
                  <td>
                    <span
                      className="status-pill"
                      style={{
                        color: statusColor[b.status],
                        background: `${statusColor[b.status]}18`,
                        border: `1px solid ${statusColor[b.status]}33`,
                      }}
                    >
                      {b.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </>
  );
}