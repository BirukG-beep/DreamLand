"use client";

import { BedDouble } from "lucide-react";
 type Room = {
  id: string;
  typeId: string;
  number: string;
  status: Status;
  beds: number;
  notes?: string;
  floor?: string;
};

type RoomType = {
  id: string;
  name: string;
  icon?: React.ReactNode;
  maxGuests?: number;
};

type Props = {
  types: RoomType[];
  rooms: Room[];
  onRoomClick?: (room: Room) => void;
};

type Status = "available" | "occupied" | "reserved" | "maintenance";

const STATUS_LABELS:  Record<Status, string>  = {
  available: "Available",
  occupied: "Occupied",
  reserved: "Reserved",
  maintenance: "Maintenance",
};

type AssignmentRowProps = {
  label: string;
  rooms: Room[];
  onRoomClick?: (room: Room) => void;
};


export default function RoomAssignmentOverview({
  types,
  rooms,
  onRoomClick,
} : Props) {
  function roomsByType(typeId: string) {
    return rooms.filter((r) => r.typeId === typeId);
  }

  const globalAssigned = rooms.length;
  const globalAvailable = rooms.filter((r) => r.status === "available").length;
  const globalOccupied = rooms.filter((r) => r.status === "occupied").length;
  const globalReserved = rooms.filter((r) => r.status === "reserved").length;

  return (
    <>

      {/* TYPES */}
      <div className="typesList">
        {types.map((type) => {
          const typeRooms = roomsByType(type.id);
          const available = typeRooms.filter(
            (r) => r.status === "available"
          );
          const notAvailable = typeRooms.filter(
            (r) => r.status !== "available"
          );

          return (
            <div key={type.id} className="typeCard">
              {/* HEADER */}
              <div className="typeHeader">
                <span className="icon">{type.icon}</span>

                <div className="info">
                  <h3>{type.name}</h3>
                  <p>
                    {typeRooms.length} room(s) ·{" "}
                    {typeRooms.reduce((a, r) => a + (r.beds || 1), 0)} beds ·{" "}
                    {typeRooms.length * (type.maxGuests ?? 0)} max guests
                  </p>
                </div>

                {/* MINI BAR */}
                {typeRooms.length > 0 && (
                  <div className="miniWrap">
                    <div className="miniBar">
                      <div
                        className="greenBar"
                        style={{
                          width: `${
                            (available.length / typeRooms.length) * 100
                          }%`,
                        }}
                      />
                      <div
                        className="redBar"
                        style={{
                          width: `${
                            (notAvailable.filter(
                              (r) => r.status === "occupied"
                            ).length /
                              typeRooms.length) *
                            100
                          }%`,
                        }}
                      />
                      <div
                        className="orangeBar"
                        style={{
                          width: `${
                            (notAvailable.filter(
                              (r) => r.status === "reserved"
                            ).length /
                              typeRooms.length) *
                            100
                          }%`,
                        }}
                      />
                    </div>
                    <span className="freeText">
                      {Math.round(
                        (available.length / typeRooms.length) * 100
                      )}
                      % free
                    </span>
                  </div>
                )}
              </div>

              {/* EMPTY STATE */}
              {typeRooms.length === 0 ? (
                <div className="empty">
                  <BedDouble size={22} />
                  <p>No rooms assigned</p>
                </div>
              ) : (
                <div className="rows">
                  <AssignmentRow
                    label="Available"
                    rooms={available}
                    onRoomClick={onRoomClick}
                  />

                  <div className="divider" />

                  <AssignmentRow
                    label="Not available"
                    rooms={notAvailable}
                    onRoomClick={onRoomClick}
                  />
                </div>
              )}

              {/* FOOT LIST */}
              {typeRooms.length > 0 && (
                <div className="footer">
                  <span>
                    Assigned:{" "}
                    {typeRooms.map((r) => r.number).join(", ")}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <style jsx>{`
        .summaryGrid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
          margin-bottom: 20px;
        }

        .summaryCard {
          background: #1e1c19;
          border: 1px solid rgba(200,169,110,0.12);
          border-radius: 14px;
          padding: 12px;
        }

        .summaryLabel {
          font-size: 11px;
          color: #888;
        }

        .summaryValue {
          font-size: 22px;
          font-weight: 700;
        }

        .dark {
          color: #111827;
        }
        .green {
          color: #10b981;
        }
        .red {
          color: #ef4444;
        }
        .orange {
          color: #f59e0b;
        }

        .typesList {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .typeCard {
          background: #1e1c19;
          border: 1px solid rgba(200,169,110,0.12);
          border-radius: 18px;
          padding: 18px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.04);
        }

        .typeHeader {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 14px;
        }

        .icon {
          font-size: 22px;
        }

        .info {
          flex: 1;
        }

        .info h3 {
          margin: 0;
          font-size: 14px;
          font-weight: 600;
        }

        .info p {
          margin: 2px 0 0;
          font-size: 12px;
          color: #6b7280;
        }

        .miniWrap {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .miniBar {
          width: 100px;
          height: 8px;
          background: #f3f4f6;
          border-radius: 999px;
          overflow: hidden;
          display: flex;
        }

        .greenBar {
          background: #34d399;
          height: 100%;
        }

        .redBar {
          background: #f87171;
          height: 100%;
        }

        .orangeBar {
          background: #fbbf24;
          height: 100%;
        }

        .freeText {
          font-size: 11px;
          color: #9ca3af;
        }

        .empty {
          text-align: center;
          padding: 24px;
          color: #d1d5db;
          font-size: 12px;
        }

        .rows {
          display: flex;
          gap: 20px;
          flex-wrap: wrap;
          align-items: flex-start;
        }

        .divider {
          width: 1px;
          background: #eee;
        }

        .footer {
          margin-top: 12px;
          border-top: 1px solid #f3f4f6;
          padding-top: 10px;
          font-size: 12px;
          color: #6b7280;
        }
      `}</style>
    </>
  );
}

/* ------------------ SUB COMPONENT ------------------ */

function AssignmentRow({ label, rooms, onRoomClick } : AssignmentRowProps) {
  return (
    <div className="row">
      <p className="rowLabel">{label}</p>

      <div className="chips">
        {rooms.length > 0 ? (
          rooms.map((r) => (
            <button
              key={r.id}
              onClick={() => onRoomClick?.(r)}
              className="chip"
              title={`Room ${r.number}`}
            >
              {r.number}
            </button>
          ))
        ) : (
          <span className="emptyText">None</span>
        )}
      </div>

      <style jsx>{`
        .row {
          flex: 1;
          min-width: 180px;
        }

        .rowLabel {
          font-size: 11px;
          font-weight: 600;
          color: #6b7280;
          margin-bottom: 8px;
        }

        .chips {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }

        .chip {
          padding: 6px 8px;
          font-size: 11px;
          border-radius: 8px;
          border: 1px solid #e5e7eb;
          background: #f9fafb;
          cursor: pointer;
          transition: 0.2s;
        }

        .chip:hover {
          transform: scale(1.05);
          background: #f3f4f6;
        }

        .emptyText {
          font-size: 11px;
          color: #d1d5db;
        }
      `}</style>
    </div>
  );
}