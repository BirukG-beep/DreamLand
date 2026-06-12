"use client";

import { useState, useEffect } from "react";
import { X, Trash2, Save, AlertCircle } from "lucide-react";

const STATUSES = ["available", "occupied", "reserved", "maintenance"];
type Room = {
  id: string;
  number: string;
  typeId: string;
  status: string;
  beds: number;
  notes?: string;
  floor?: string;
};

type RoomType = {
  id: string;
  name: string;
  icon?: string;
  maxGuests?: number;
  features?: string[];
};

type Props = {
  room: Room;
  types: RoomType[];
  rooms: Room[];
  onSave: (room: Room) => void;
  onDelete: (id: string) => void;
  onClose: () => void;
};


const STATUS_LABELS: any = {
  available: "Available",
  occupied: "Occupied",
  reserved: "Reserved",
  maintenance: "Maintenance",
};

export default function EditRoomModal({
  room,
  types,
  rooms,
  onSave,
  onDelete,
  onClose,
}:Props) {
  const [number, setNumber] = useState("");
  const [typeId, setTypeId] = useState("");
  const [status, setStatus] = useState("available");
  const [beds, setBeds] = useState(1);
  const [notes, setNotes] = useState("");
  const [floor, setFloor] = useState("");
  const [errors, setErrors] = useState<{ number?: string; typeId?: string; beds?: string }>({});
  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(() => {
    if (room) {
      setNumber(room.number || "");
      setTypeId(room.typeId || types[0]?.id || "");
      setStatus(room.status || "available");
      setBeds(room.beds || 1);
      setNotes(room.notes || "");
      setFloor(room.floor || "");
      setErrors({});
      setConfirmDelete(false);
    }
  }, [room]);

  if (!room) return null;

  function validate() {
    const errs: any = {};

    if (!number.trim()) errs.number = "Room number is required";
    else if (
      rooms.find((r) => r.number === number.trim() && r.id !== room.id)
    )
      errs.number = "Room number already in use";

    if (!typeId) errs.typeId = "Select a room type";
    if (beds < 1 || beds > 30) errs.beds = "Beds must be 1–30";

    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function handleSave() {
    if (!validate()) return;

    onSave({
      ...room,
      number: number.trim(),
      typeId,
      status,
      beds,
      notes,
      floor,
    });
  }

  function handleDelete() {
    if (!confirmDelete) {
      setConfirmDelete(true);
      return;
    }
    onDelete(room.id);
  }

  const currentType = types.find((t) => t.id === typeId);

  return (
    <>
      <div className="overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
        <div className="modal">

          {/* HEADER */}
          <div className="header">
            <div className={`statusBadge ${status}`}>
              Room {room.number}
            </div>

            <div className="spacer" />

            <button className="closeBtn" onClick={onClose}>
              <X size={16} />
            </button>
          </div>

          {/* BODY */}
          <div className="body">

            {/* Room number */}
            <div className="field">
              <label className="label">Room number *</label>
              <input
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                className={`input ${errors.number ? "error" : ""}`}
              />
              {errors.number && (
                <p className="errorText">
                  <AlertCircle size={10} /> {errors.number}
                </p>
              )}
            </div>

            {/* Room type */}
            <div className="field">
              <label className="label">Room type *</label>
              <select
                value={typeId}
                onChange={(e) => setTypeId(e.target.value)}
                className={`input ${errors.typeId ? "error" : ""}`}
              >
                {types.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.icon} {t.name}
                  </option>
                ))}
              </select>

              {currentType && (
                <p className="hint">
                  Max {currentType.maxGuests} guest(s) ·{" "}
                  {currentType.features?.join(", ")}
                </p>
              )}

              {errors.typeId && (
                <p className="errorText">
                  <AlertCircle size={10} /> {errors.typeId}
                </p>
              )}
            </div>

            {/* STATUS */}
            <div className="field">
              <label className="label">Status</label>

              <div className="statusGrid">
                {STATUSES.map((s) => (
                  <button
                    key={s}
                    onClick={() => setStatus(s)}
                    className={`statusBtn ${
                      status === s ? "active" : ""
                    } ${s}`}
                  >
                    {STATUS_LABELS[s]}
                  </button>
                ))}
              </div>
            </div>

            {/* beds + floor */}
            <div className="twoCols">
              <div className="field">
                <label className="label">Beds</label>
                <input
                  type="number"
                  value={beds}
                  onChange={(e) => setBeds(Number(e.target.value))}
                  className={`input ${errors.beds ? "error" : ""}`}
                />
                {errors.beds && (
                  <p className="errorText">{errors.beds}</p>
                )}
              </div>

              <div className="field">
                <label className="label">Floor</label>
                <input
                  value={floor}
                  onChange={(e) => setFloor(e.target.value)}
                  className="input"
                />
              </div>
            </div>

            {/* notes */}
            <div className="field">
              <label className="label">Notes</label>
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="textarea"
              />
            </div>

            {/* attributes */}
            <div className="box">
              <p className="boxTitle">Room attributes</p>

              <div className="grid">
                <span>ID</span>
                <span>{room.id}</span>

                <span>Type</span>
                <span>{currentType?.name}</span>

                <span>Capacity</span>
                <span>{currentType?.maxGuests}</span>

                <span>Beds</span>
                <span>{beds}</span>
              </div>
            </div>
          </div>

          {/* FOOTER */}
          <div className="footer">
            <button
              className={`deleteBtn ${
                confirmDelete ? "danger" : ""
              }`}
              onClick={handleDelete}
            >
              <Trash2 size={14} />
              {confirmDelete ? "Confirm delete" : "Delete"}
            </button>

            {confirmDelete && (
              <button
                className="cancelSmall"
                onClick={() => setConfirmDelete(false)}
              >
                Cancel
              </button>
            )}

            <div className="spacer" />

            <button className="cancelBtn" onClick={onClose}>
              Cancel
            </button>

            <button className="saveBtn" onClick={handleSave}>
              <Save size={14} /> Save
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.45);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 16px;
          z-index: 50;
        }

        .modal {
          width: 100%;
          max-width: 520px;
          background: white;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
        }

        .header {
          display: flex;
          align-items: center;
          padding: 16px;
          border-bottom: 1px solid #eee;
        }

        .statusBadge {
          padding: 4px 10px;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 600;
        }

        .available {
          background: #c8a96e;
          color: #047857;
        }

        .occupied {
          background: #c8a96e;
          color: #b91c1c;
        }

        .reserved {
          background: #fef3c7;
          color: #b45309;
        }

        .maintenance {
          background: #f3f4f6;
          color: #374151;
        }

        .spacer {
          flex: 1;
        }

        .closeBtn {
          border: none;
          background: transparent;
          cursor: pointer;
          padding: 6px;
          border-radius: 8px;
        }

        .closeBtn:hover {
          background: #f3f4f6;
        }

        .body {
          padding: 16px;
          max-height: 70vh;
          overflow-y: auto;
        }

        .field {
          margin-bottom: 14px;
        }

        .label {
          font-size: 13px;
          font-weight: 500;
          display: block;
          margin-bottom: 6px;
        }

        .input,
        .textarea {
          width: 100%;
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 10px;
          font-size: 14px;
          background: #fafafa;
        }

        .error {
          border-color: red;
        }

        .errorText {
          font-size: 12px;
          color: red;
          margin-top: 4px;
          display: flex;
          gap: 4px;
          align-items: center;
        }

        .hint {
          font-size: 12px;
          color: #888;
          margin-top: 4px;
        }

        .statusGrid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
        }

        .statusBtn {
          padding: 8px;
          border: 1px solid #ddd;
          border-radius: 10px;
          background: white;
          cursor: pointer;
        }

        .statusBtn.active {
          outline: 2px solid #bbb;
        }

        .twoCols {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }

        .box {
          background: #f9fafb;
          padding: 12px;
          border-radius: 12px;
          border: 1px solid #eee;
        }

        .boxTitle {
          font-size: 11px;
          text-transform: uppercase;
          color: #666;
          margin-bottom: 8px;
        }

        .grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          font-size: 12px;
          gap: 4px;
        }

        .footer {
          display: flex;
          gap: 8px;
          padding: 14px;
          border-top: 1px solid #eee;
          align-items: center;
        }

        .deleteBtn {
          display: flex;
          gap: 6px;
          align-items: center;
          padding: 8px 10px;
          border-radius: 10px;
          border: 1px solid #ddd;
          background: white;
          color: red;
        }

        .danger {
          background: red;
          color: white;
        }

        .cancelBtn {
          padding: 8px 12px;
          border: 1px solid #ddd;
          background: white;
          border-radius: 10px;
        }

        .cancelSmall {
          font-size: 12px;
          color: gray;
          background: none;
          border: none;
        }

        .saveBtn {
          display: flex;
          gap: 6px;
          align-items: center;
          padding: 8px 14px;
          background: #111827;
          color: white;
          border-radius: 10px;
          border: none;
        }
      `}</style>
    </>
  );
}