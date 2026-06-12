"use client";

import { SetStateAction, useState } from "react";
import { PlusCircle } from "lucide-react";

const STATUSES = ["available", "occupied", "reserved", "maintenance"] as const;
type Status = (typeof STATUSES)[number];

type StatusStyle = {
  chip: string;
  pill: string;
};

type StatusStyles = Record<Status, StatusStyle>;

type StatusLabels = Record<Status, string>;

type Room = {
  id: string;
  typeId: string;
  number: string;
  status: Status;
  beds: number;
  notes?: string;
};

type RoomType = {
  id: string;
  name: string;
  maxGuests: number;
  features: string[];
  icon: React.ReactNode;
};

type Props = {
  types: RoomType[];
  rooms: Room[];
  onEditRoom: (room: Room) => void;
  onEditType: (type: RoomType) => void;
  onDeleteType: (id: string) => void;
  onAddRoom: (room: Room) => void;
  showModal: React.Dispatch<SetStateAction<boolean>>;
};

const STATUS_LABELS: StatusLabels = {
  available: "available",
  occupied: "occupied",
  reserved: "reserved",
  maintenance: "maintenance",
};

const STATUS_STYLES: StatusStyles = {
  available: { chip: "availableChip", pill: "availablePill" },
  occupied: { chip: "occupiedChip", pill: "occupiedPill" },
  reserved: { chip: "reservedChip", pill: "reservedPill" },
  maintenance: { chip: "maintenanceChip", pill: "maintenancePill" },
};

function uid(): string {
  return "r" + Math.random().toString(36).slice(2, 8);
}

/* ---------------- Room Chip ---------------- */

type RoomChipProps = {
  room: Room;
  onClick: (room: Room) => void;
};

function RoomChip({ room, onClick }: RoomChipProps) {
  const s = STATUS_STYLES[room.status];

  return (
    <>
      <button
        onClick={() => onClick(room)}
        className={`chip ${s.chip}`}
        title={`Room ${room.number} — ${room.status}`}
      >
        <span className="num">{room.number}</span>
        <span className="small">{room.status.slice(0, 4)}</span>
      </button>
    </>
  );
}

/* ---------------- Main Component ---------------- */

export default function RoomTypesOverview({
  types,
  rooms,
  onEditRoom,
  onEditType,
  onDeleteType,
  onAddRoom,
  showModal,
}: Props) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [newNum, setNewNum] = useState<Record<string, string>>({});
  const [newStatus, setNewStatus] = useState<Record<string, Status>>({});
  const [newBeds, setNewBeds] = useState<Record<string, string>>({});

  function roomsByType(typeId: string): Room[] {
    return rooms.filter((r) => r.typeId === typeId);
  }

  function countStatus(list: Room[], s: Status): number {
    return list.filter((r) => r.status === s).length;
  }

  function handleAdd(typeId: string) {
    const number = (newNum[typeId] || "").trim();
    if (!number) return;

    if (rooms.find((r) => r.number === number)) {
      alert("Room already exists");
      return;
    }

    const room: Room = {
      id: uid(),
      typeId,
      number,
      status: newStatus[typeId] || "available",
      beds: parseInt(newBeds[typeId] || "1"),
      notes: "",
    };

    onAddRoom(room);

    setNewNum((p) => ({ ...p, [typeId]: "" }));
  }

  return (
    <div className="wrap-card">
              <style jsx>{`
           @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600&family=DM+Sans:wght@300;400;500&display=swap');

              .wrap-card {
                display:flex;
                flex-wrap:wrap;
                gap:20px;
                
              }

              .card {
                background: #1e1c19;
                border: 1px solid rgba(200,169,110,0.12);
                border-radius: 16px;
                padding: 14px;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
              }

              .header {
                display: flex;
                align-items: center;
                gap: 12px;
              }

              .iconBox {
                width: 40px;
                height: 40px;
                border-radius: 10px;
                border: 1px solid rgba(200,169,110,0.12);
                display: flex;
                align-items: center;
                color:#c8a96e;
                justify-content: center;
              }

              .info {
                flex: 1;
                
                 font-family: "DM Sans", sans-serif;
              }

              .titleRow {
                display: flex;
                gap: 8px;
                align-items: center;
              }

              h3 {
                font-size: 12px;
                font-weight:lighter;
                margin: 0;
              }

              p {
                font-size: 12px;
                color: #6b7280;
                margin: 2px 0 0;
              }

              .badge {
                font-size: 11px;
                padding: 2px 6px;
                border-radius: 999px;
              }

              .actions {
                display: flex;
                gap: 6px;
              }

              .pills {
                display: flex;
                gap: 6px;
                margin-top: 10px;
                font-family: "DM Sans", sans-serif;
              }

              .pill {
                font-size: 11px;
                padding: 2px 8px;
                border-radius: 999px;
              }

              .chips {
                display: flex;
                flex-wrap: wrap;
                gap: 8px;
                margin-top: 12px;
              }

              .empty {
                font-size: 12px;
                color: #9ca3af;
              }

              .addRow {
                display: flex;
                gap: 8px;
                margin-top: 12px;
                flex-wrap: wrap;
              }

              input,
              select {
                padding: 0;
                border-radius: 8px;
                font-size: 12px;
                border: 1px solid rgba(200,169,110,0.15);
                background: rgba(255,255,255,0.03);
                color: #f0e8da;
                height:40px;
                padding-x:10px;
              }
                input{
                width:300px;}
                select{
                width:100px;}

              button {
          margin-top: 1.5rem;
          width: 100%;
          padding: 0.9rem;
          border-radius: 14px;
          border: 1px solid rgba(200,169,110,0.25);
          background: rgba(200,169,110,0.08);
          color: #e2c99a;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 0.5rem;
          cursor: pointer;
          transition: 0.25s ease;
              }

              .opps{
              width:50px;}
            `}</style>
            
      {types.map((type) => {
        const typeRooms = roomsByType(type.id);

        const avail = countStatus(typeRooms, "available");
        const occ = countStatus(typeRooms, "occupied");
        const res = countStatus(typeRooms, "reserved");
        const maint = countStatus(typeRooms, "maintenance");

        const open = expanded[type.id] !== false;

        return (
          <div key={type.id} className="card">
            <div className="header">
              <div className="iconBox">{type.icon}</div>

              <div className="info">
                <h3>{type.name}</h3>
                <p>
                  Max {type.maxGuests} guests · {type.features.join(", ")}
                </p>
              </div>

              <div className="actions">
                <button onClick={() => onEditType(type)}>✏️</button>
                <button onClick={() => onDeleteType(type.id)}>🗑</button>
              </div>
            </div>

            <div className="pills">
              {(
                [
                  ["available", avail],
                  ["occupied", occ],
                  ["reserved", res],
                  ["maintenance", maint],
                ] as const
              ).map(([s, count]) =>
                count > 0 ? (
                  <span key={s} className={`pill ${STATUS_STYLES[s].pill}`}>
                    {count} {s}
                  </span>
                ) : null
              )}
            </div>

            {open && (
              <>
                <div className="chips">
                  {typeRooms.map((r) => (
                    <RoomChip key={r.id} room={r} onClick={onEditRoom} />
                  ))}
                </div>

                <div className="addRow">
                  <input
                    type="number"
                    placeholder="Room #"
                    value={newNum[type.id] || ""}
                    onChange={(e) =>
                      setNewNum((p) => ({
                        ...p,
                        [type.id]: e.target.value,
                      }))
                    }
                  />

                  <select
                    value={newStatus[type.id] || "available"}
                    onChange={(e) =>
                      setNewStatus((p) => ({
                        ...p,
                        [type.id]: e.target.value as Status,
                      }))
                    }
                  >
                    {STATUSES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>

                  <button onClick={() => handleAdd(type.id)}>
                    <PlusCircle size={14} /> Add
                  </button>
                </div>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}