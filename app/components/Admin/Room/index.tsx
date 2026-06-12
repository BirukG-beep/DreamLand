"use client";

import { SetStateAction, useState } from "react";
import RoomTypesOverview      from "./components/RoomTypesOverView";
import RoomAssignmentOverview from "./components/RoomAssignmentOverview";
import RoomTypeForm           from "./components/RoomTypeForm";
import EditRoomModal          from "./components/EditRoomModal";
import { FaBed } from "react-icons/fa";
import { MdMeetingRoom } from "react-icons/md";
import { BsBookmarkCheckFill } from "react-icons/bs";
import { IoCheckmarkCircle } from "react-icons/io5";
import { FaCrown } from "react-icons/fa";
import { IoBedOutline } from "react-icons/io5";
import { BedDouble } from "lucide-react";
// ─── seed data ───────────────────────────────────────────────────────────────
const DEFAULT_TYPES = [
  { id: "presidential", name: "Presidential", icon:<FaCrown />, maxGuests: 1, features: ["Wifi", "Private bath", "Balcony"],       desc: "Luxury suite with panoramic views" },
  { id: "single",       name: "Single",       icon: <IoBedOutline />,  maxGuests: 1, features: ["Wifi", "Private bath"],                  desc: "Comfortable single occupancy" },
  { id: "twin",         name: "Twin",         icon:<BedDouble />,  maxGuests: 2, features: ["Wifi", "Private bath"],                  desc: "Two single beds" },
  { id: "family",       name: "Family",       icon: "👨‍👩‍👧", maxGuests: 4, features: ["Wifi", "Private bath", "Extra space"],   desc: "Spacious family room" },
  { id: "group",        name: "Group",        icon: "👥",  maxGuests: 8, features: ["Wifi", "Shared bath", "Bunk beds"],      desc: "Dormitory-style group room" },
];

export type Status =
  | "available"
  | "occupied"
  | "reserved"
  | "maintenance";

export type Room = {
  id: string;
  typeId: string;
  number: string;
  status: Status;
  beds: number;
  notes?: string;
  floor?: string;
};

export type RoomType = {
  id: string;
  name: string;
  icon: React.ReactNode;
  maxGuests: number;
  features: string[];
  desc?: string;
};


const DEFAULT_ROOMS: Room[] = [
  { id: "r1",  typeId: "presidential", number: "101", status: "available",   beds: 1, notes: "", floor: "1" },
  { id: "r2",  typeId: "presidential", number: "102", status: "occupied",    beds: 1, notes: "", floor: "1" },
  { id: "r3",  typeId: "presidential", number: "103", status: "reserved",    beds: 1, notes: "", floor: "1" },
  { id: "r4",  typeId: "single",       number: "201", status: "available",   beds: 1, notes: "", floor: "2" },
  { id: "r5",  typeId: "single",       number: "202", status: "occupied",    beds: 1, notes: "", floor: "2" },
  { id: "r6",  typeId: "single",       number: "203", status: "available",   beds: 1, notes: "", floor: "2" },
  { id: "r7",  typeId: "twin",         number: "301", status: "available",   beds: 2, notes: "", floor: "3" },
  { id: "r8",  typeId: "twin",         number: "302", status: "maintenance", beds: 2, notes: "", floor: "3" },
  { id: "r9",  typeId: "family",       number: "401", status: "available",   beds: 2, notes: "", floor: "4" },
  { id: "r10", typeId: "family",       number: "402", status: "reserved",    beds: 4, notes: "", floor: "4" },
  { id: "r11", typeId: "group",        number: "501", status: "available",   beds: 8, notes: "", floor: "5" },
];

const TABS = [
  { id: "overview", label: "Overview" },
  { id: "assign",   label: "Assign" },
  { id: "addtype",  label: "Add type" },
];


type Props = {
  initialTypes?: RoomType[];
  initialRooms?: Room[];
  showModal: React.Dispatch<React.SetStateAction<boolean>>;
};

type EditingType = RoomType | "new" | null;
type EditingRoom = Room | null;



// ─── toast ────────────────────────────────────────────────────────────────────
function Toast({ message }:{message: string}) {
  if (!message) return null;
  return (
    <div className="fixed bottom-5 right-5 z-[200] bg-gray-900 text-white text-sm px-4 py-2.5 rounded-xl shadow-lg pointer-events-none animate-fade-in">
      {message}
    </div>
  );
}

// ─── main dashboard ───────────────────────────────────────────────────────────
export default function RoomManagementDashboard({
  initialTypes = DEFAULT_TYPES,
  initialRooms = DEFAULT_ROOMS,
  showModal
}:Props) {
  const [types,     setTypes]     = useState(initialTypes);
  const [rooms,     setRooms]     = useState(initialRooms);
  const [activeTab, setActiveTab] = useState("overview");
  const [editingRoom, setEditingRoom]   = useState<EditingRoom>(null);   // room object
  const [editingType, setEditingType]   = useState<EditingType>(null);   // type object | "new"
  const [toast,       setToast]         = useState("");

  function showToast(msg:string) {
    setToast(msg);
    setTimeout(() => setToast(""), 2400);
  }

  // ── room CRUD ──
  function handleAddRoom(room: Room) {
    setRooms((p) => [...p, room]);
    showToast(`Room ${room.number} added`);
  }

  function handleSaveRoom(updated: Room) {
    setRooms((p) => p.map((r) => r.id === updated.id ? updated : r));
    setEditingRoom(null);
    showToast(`Room ${updated.number} updated`);
  }

  function handleDeleteRoom(id: string) {
    const r = rooms.find((x) => x.id === id);
    setRooms((p) => p.filter((x) => x.id !== id));
    setEditingRoom(null);
    showToast(`Room ${r?.number} deleted`);
  }

  // ── type CRUD ──
  function handleSaveType(type: RoomType) {
    if (types.find((t) => t.id === type.id)) {
      setTypes((p) => p.map((t) => t.id === type.id ? type : t));
      showToast(`${type.name} updated`);
    } else {
      setTypes((p) => [...p, type]);
      showToast(`${type.name} type added`);
    }
    setEditingType(null);
    setActiveTab("overview");
  }

  function handleDeleteType(typeId: string) {
    const type  = types.find((t) => t.id === typeId);
    const count = rooms.filter((r) => r.typeId === typeId).length;
    // if (!window.confirm(`Delete "${type?.name}"? This removes ${count} assigned room${count !== 1 ? "s" : ""}.`)) return;
    showModal(true)
    setTypes((p) => p.filter((t) => t.id !== typeId));
    setRooms((p)  => p.filter((r) => r.typeId !== typeId));
    showToast(`${type?.name} deleted`);
  }

  // ── metrics ──
  const total     = rooms.length;
  const available = rooms.filter((r) => r.status === "available").length;
  const occupied  = rooms.filter((r) => r.status === "occupied").length;
  const reserved  = rooms.filter((r) => r.status === "reserved").length;

return (
  <>
  
  <style jsx>{`
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600;700&family=DM+Sans:wght@300;400;500;700&display=swap');

  :root {
    --bg: #0f0e0c;
    --surface: #171512;
    --surface-light: #1f1c18;

    --gold: #c8a96e;
    --gold-light: #e3c58a;

    --text: #f5f1e8;
    --muted: #9f917e;

    --border: rgba(200, 169, 110, 0.15);
  }

  body {
    background:
      radial-gradient(
        circle at top right,
        rgba(200, 169, 110, 0.08),
        transparent 35%
      ),
      radial-gradient(
        circle at left,
        rgba(200, 169, 110, 0.05),
        transparent 30%
      ),
      var(--bg);

    color: var(--text);
    font-family: 'DM Sans', sans-serif;
    margin: 0;
    padding: 0;
  }

  .dashboard {
    min-height: 100vh;
    overflow-x: hidden;
  }

  .dashboard::-webkit-scrollbar {
    width: 8px;
  }

  .dashboard::-webkit-scrollbar-thumb {
    background: rgba(200, 169, 110, 0.25);
    border-radius: 20px;
  }

  .dashboard::-webkit-scrollbar-track {
    background: transparent;
  }

  .container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 2rem;
    position: relative;
  }

  .container::before {
    content: "";

    position: absolute;

    top: -200px;
    right: -200px;

    width: 500px;
    height: 500px;

    background: radial-gradient(
      rgba(200, 169, 110, 0.08),
      transparent
    );

    pointer-events: none;
    z-index: 0;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    padding-bottom: 1.5rem;
    margin-bottom: 2rem;

    border-bottom: 1px solid var(--border);

    position: relative;
    z-index: 2;
  }

  .title {
    margin: 0;

    font-family: 'Cormorant Garamond', serif;

    font-size: 3.2rem;
    font-weight: 600;

    color: var(--text);

    letter-spacing: 0.5px;
    line-height: 1;
  }

  .subtitle {
    margin-top: 0.65rem;

    color: var(--muted);

    font-size: 0.95rem;
    letter-spacing: 0.3px;
  }

  .addBtn {

   font-family: 'DM Sans', sans-serif;

    background: linear-gradient(
      145deg,
      #d6b57b,
      #b89050
    );

    color: #111;

    border: none;

    padding: 0.95rem 1.5rem;

    border-radius: 14px;

    font-weight: 700;
    font-size: 0.95rem;

    cursor: pointer;

    transition: all 0.3s ease;
  }

  .addBtn:hover {
    transform: translateY(-3px);

    box-shadow:
      0 15px 30px rgba(200, 169, 110, 0.25);
  }

  .metrics {
    display: grid;

    grid-template-columns: repeat(4, 1fr);

    gap: 1.25rem;

    margin-bottom: 2rem;

    position: relative;
    z-index: 2;
  }

  .metricCard {
   display:flex;

   gap:10px;

    background: linear-gradient(
      145deg,
      rgba(255, 255, 255, 0.03),
      rgba(255, 255, 255, 0.01)
    );

    border: 1px solid var(--border);

    border-radius: 22px;

    padding: 10px;

    backdrop-filter: blur(16px);

    transition: all 0.3s ease;

    overflow: hidden;
    position: relative;
  }

  .metricCard::before {
    content: "";

    position: absolute;

    top: 0;
    left: 0;

    width: 100%;
    height: 1px;

    background: linear-gradient(
      to right,
      transparent,
      rgba(200, 169, 110, 0.5),
      transparent
    );
  }

  .metricCard:hover {
    transform: translateY(-6px);

    border-color: rgba(200, 169, 110, 0.35);

    box-shadow:
      0 25px 40px rgba(0, 0, 0, 0.35),
      0 0 20px rgba(200, 169, 110, 0.08);
  }

  .card-icon {
    width: 58px;
    height: 58px;

    border-radius: 18px;

    display: flex;
    align-items: center;
    justify-content: center;

    font-size: 26px;

    color: var(--gold);

    background: linear-gradient(
      145deg,
      rgba(200, 169, 110, 0.18),
      rgba(200, 169, 110, 0.06)
    );

    border: 1px solid rgba(200, 169, 110, 0.2);

    margin-bottom: 1rem;
  }

  .metricLabel {
    color: var(--muted);

    font-size: 0.85rem;

    letter-spacing: 0.4px;

    margin-bottom: 0.5rem;
  }

  .metricValue {
    font-size: 3rem;

    line-height: 1;

    font-weight: 700;

    color: var(--gold);

    font-family: 'Cormorant Garamond', serif;

    margin: 10px;
  }

  .dark {
    color: var(--gold);
  }

  .tabs {
    display: inline-flex;

    gap: 0.5rem;

    background: rgba(255, 255, 255, 0.02);

    border: 1px solid var(--border);

    border-radius: 16px;

    padding: 0.45rem;

    margin-bottom: 2rem;

    position: relative;
    z-index: 2;
  }

  .tab {
    border: none;

    background: transparent;

    color: var(--muted);

    padding: 0.85rem 1.4rem;

    border-radius: 12px;

    font-weight: 500;

    cursor: pointer;

    transition: all 0.25s ease;
  }

  .tab:hover {
    color: var(--gold);
  }

  .activeTab {
    color: var(--gold);

    background: linear-gradient(
      145deg,
      rgba(200, 169, 110, 0.22),
      rgba(200, 169, 110, 0.08)
    );

    border: 1px solid rgba(200, 169, 110, 0.2);

    box-shadow:
      0 0 20px rgba(200, 169, 110, 0.12);
  }

  @media (max-width: 992px) {
    .metrics {
      grid-template-columns: repeat(2, 1fr);
    }

    .title {
      font-size: 2.6rem;
    }
  }

  @media (max-width: 768px) {
    .header {
      flex-direction: column;
      align-items: flex-start;
      gap: 1rem;
    }

    .container {
      padding: 1.25rem;
    }

    .title {
      font-size: 2.2rem;
    }
  }

  @media (max-width: 560px) {
    .metrics {
      grid-template-columns: 1fr;
    }

    .tabs {
      width: 100%;
      justify-content: center;
      flex-wrap: wrap;
    }

    .tab {
      flex: 1;
      min-width: 100px;
    }

    .metricValue {
      font-size: 2.5rem;
    }
  }
`}</style>
    
    <div className="dashboard">
      <div className="container">

        <div className="header">
          <div>
            <h1 className="title">Room management</h1>
            <p className="subtitle">
              {types.length} types · {total} rooms · {available} available
            </p>
          </div>

          <button
            className="addBtn"
            onClick={() => {
              setEditingType("new");
              setActiveTab("addtype");
            }}
          >
            + Add type
          </button>
        </div>

        <div className="metrics">
          {[
            { label: "Total rooms", val: total, cls: "dark" , icon : <MdMeetingRoom /> },
            { label: "Available", val: available, cls: "dark" , icon: <IoCheckmarkCircle /> },
            { label: "Occupied", val: occupied, cls: "dark" , icon : <FaBed />},
            { label: "Reserved", val: reserved, cls: "dark" , icon : <BsBookmarkCheckFill /> },
          ].map(({ label, val, cls ,icon }) => (
            <div key={label} className="metricCard">
              <div className="card-icon">
                {icon}
              </div>
              <div>
              <p className="metricLabel">{label}</p>
              <p className={`metricValue ${cls}`}>{val}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="tabs">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`tab ${
                activeTab === tab.id ? "activeTab" : ""
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

      
        {activeTab === "overview" && (
          <RoomTypesOverview
            types={types}
            rooms={rooms}
            onEditRoom={setEditingRoom}
            onEditType={(type) => {
              setEditingType(type);
              setActiveTab("addtype");
            }}
            onDeleteType={handleDeleteType}
            onAddRoom={handleAddRoom}
            showModal={showModal}
          />
        )}

     {activeTab === "assign" && (
  <RoomAssignmentOverview
    types={types}
    rooms={rooms}
    onRoomClick={setEditingRoom}   // You can pass directly now
  />
)}

{activeTab === "addtype" && (
  <RoomTypeForm
    existingType={editingType !== "new" ? editingType : null}
    onSave={handleSaveType}
    onCancel={() => {
      setEditingType(null);
      setActiveTab("overview");
    }}
  />
)}
      </div>
    </div>

  </>
);
}