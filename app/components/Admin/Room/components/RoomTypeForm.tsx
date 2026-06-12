"use client";

import { useState, useEffect } from "react";
import { X, Plus, Minus, Save } from "lucide-react";
import {RoomType} from "@/types/room.types"

import {
  Crown,
  BedDouble,
  Users,
  UserRound,
  Building2,
  Star,
  House,
  Moon,
  Sun,
  Target,
} from "lucide-react";

const ICONS = [
  { id: "crown", icon: <Crown size={30} /> },
  { id: "bed", icon: <BedDouble /> },
  { id: "userRound", icon: <UserRound /> },
  { id: "users", icon: <Users /> },
  { id: "building", icon: <Building2 /> },
  { id: "star", icon: <Star /> },
  { id: "house", icon: <House /> },
  { id: "moon", icon: <Moon /> },
  { id: "sun", icon: <Sun /> },
  { id: "target", icon: <Target /> },
];
function uid() {
  return "t" + Math.random().toString(36).slice(2, 8);
}



type RoomTypeFormProps = {
  existingType?: RoomType | null;
  onSave: (type: RoomType) => void;
  onCancel?: () => void;
};

export default function RoomTypeForm({
  existingType = null,
  onSave,
  onCancel,
}: RoomTypeFormProps) {
  const [name, setName] = useState("");
  const [icon, setIcon] = useState<string>("bed");
  const [maxGuests, setMaxGuests] = useState(2);
  const [features, setFeatures] = useState([""]);
  const [desc, setDesc] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (existingType) {
      setName(existingType.name || "");
      setIcon("bed");
      setMaxGuests(existingType.maxGuests || 2);
      setFeatures(
        existingType.features?.length ? existingType.features : [""]
      );
      setDesc(existingType.desc || "");
    }
  }, [existingType]);

  const isEdit = !!existingType;

  function validate() {
    const errs: any = {};
    if (!name.trim()) errs.name = "Name is required";
    if (maxGuests < 1 || maxGuests > 30)
      errs.maxGuests = "Must be between 1–30";
    if (features.filter((f) => f.trim()).length === 0)
      errs.features = "Add at least one feature";

    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function handleSave() {
    if (!validate()) return;

    onSave({
      id: existingType?.id || uid(),
      name: name.trim(),
      icon,
      maxGuests: maxGuests,
      features: features.filter((f) => f.trim()),
      desc: desc.trim(),
    });
  }

  function addFeature() {
    setFeatures((p) => [...p, ""]);
  }

  function removeFeature(i: number) {
    setFeatures((p) => p.filter((_, idx) => idx !== i));
  }

  function updateFeature(i: number, val: string) {
    setFeatures((p) => p.map((f, idx) => (idx === i ? val : f)));
  }

  return (
    <div className="card">
      {/* HEADER */}
      <div className="header">
        <h2 className="title">
          {isEdit ? `Edit: ${existingType.name}` : "Add room type"}
        </h2>

        {onCancel && (
          <button className="closeBtn" onClick={onCancel}>
            <X size={16} />
          </button>
        )}
      </div>

      <div className="body">
        {/* NAME */}
        <div className="iconRow">
          <label className="label">Room type name *</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`input ${errors.name ? "error" : ""}`}
          />
          {errors.name && <p className="errorText">{errors.name}</p>}
        </div>

        {/* ICON */}
        <div className="field">
          <label className="label">Icon</label>

          <div className="iconRow">
           {ICONS.map((item) => (
  <button
    key={item.id}
    onClick={() => setIcon(item.id)}
    className={`iconBtn ${icon === item.id ? "active" : ""}`}
  >
    {item.icon}
  </button>
))}

            <input
              value={icon}
              onChange={(e) => setIcon(e.target.value)}
              className="iconInput"
              maxLength={2}
            />
          </div>
        </div>

        {/* MAX GUESTS */}
        <div className="field">
          <label className="label">Max guests *</label>

          <div className="counter">
            <button
              className="counterBtn"
              onClick={() => setMaxGuests((p) => Math.max(1, p - 1))}
            >
              <Minus size={14} />
            </button>

            <span className="counterValue">{maxGuests}</span>

            <button
              className="counterBtn"
              onClick={() => setMaxGuests((p) => Math.min(30, p + 1))}
            >
              <Plus size={14} />
            </button>

            <span className="hint">
              guest{maxGuests !== 1 ? "s" : ""}
            </span>
          </div>

          {errors.maxGuests && (
            <p className="errorText">{errors.maxGuests}</p>
          )}
        </div>

        {/* FEATURES */}
        <div className="field">
          <label className="label">Features *</label>

          {features.map((f, i) => (
            <div key={i} className="featureRow">
              <input
                value={f}
                onChange={(e) => updateFeature(i, e.target.value)}
                className="input"
              />

              {features.length > 1 && (
                <button
                  className="removeBtn"
                  onClick={() => removeFeature(i)}
                >
                  <X size={14} />
                </button>
              )}
            </div>
          ))}

          <button className="addFeature" onClick={addFeature}>
            <Plus size={12} /> Add feature
          </button>

          {errors.features && (
            <p className="errorText">{errors.features}</p>
          )}
        </div>

        {/* DESCRIPTION */}
        <div className="iconRow">
          <label className="label">Description</label>
          <textarea
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            className="textarea"
          />
        </div>
      </div>

      {/* PREVIEW */}
      {name && (
        <div className="preview">
          <p className="previewTitle">Preview</p>

          <div className="previewRow">
            <span className="previewIcon">{icon}</span>
            <div>
              <p className="previewName">{name}</p>
              <p className="previewDesc">
                Max {maxGuests} guest{maxGuests !== 1 ? "s" : ""} ·{" "}
                {features.filter(Boolean).join(", ")}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ACTIONS */}
      <div className="actions">
        {onCancel && (
          <button className="cancelBtn" onClick={onCancel}>
            Cancel
          </button>
        )}

        <button className="saveBtn" onClick={handleSave}>
          <Save size={14} />
          {isEdit ? "Save changes" : "Add type"}
        </button>
      </div>

      <style jsx>{`
        .card {
          background: #1e1c19;
          border: 1px solid rgba(200,169,110,0.12);
          border-radius: 18px;
          padding: 20px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.04);
          max-width: 550px;
        }

        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }

        .title {
          font-size: 16px;
          font-weight: 600;
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
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .field {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .label {
          font-size: 13px;
          font-weight: 500;
          color: #374151;
        }

        .input,
        .textarea,
        .iconInput {
          padding: 10px;
          border-radius: 12px;
          border: 1px solid rgba(200,169,110,0.15);
          background: rgba(255,255,255,0.03);
          font-size: 14px;
          outline: none;
          width:100%;
        }

        .textarea {
          resize: none;
          min-height: 80px;
        }

        .error {
          border-color: #ef4444;
        }

        .errorText {
          font-size: 12px;
          color: #ef4444;
        }

        .iconRow {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }

        .iconBtn {
          margin-top: 1.5rem;
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

        .iconBtn.active {
          border: 1px solid #111827;
        }

        .counter {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .counterBtn {
          width: 30px;
          height: 30px;
          border-radius: 8px;
          border: 1px solid #e5e7eb;
          background: white;
          cursor: pointer;
        }

        .counterValue {
          font-weight: 600;
        }

        .hint {
          font-size: 12px;
          color: #9ca3af;
        }

        .featureRow {
          display: flex;
          gap: 8px;
        }

        .removeBtn {
          border: none;
          background: transparent;
          cursor: pointer;
          color: #ef4444;
        }

        .addFeature {
          font-size: 12px;
          color: #6b7280;
          background: none;
          border: none;
          cursor: pointer;
        }

        .preview {
          margin-top: 16px;
          padding: 12px;
          background: #f9fafb;
          border-radius: 12px;
          border: 1px solid #f3f4f6;
        }

        .previewTitle {
          font-size: 11px;
          text-transform: uppercase;
          color: #9ca3af;
          margin-bottom: 8px;
        }

        .previewRow {
          display: flex;
          gap: 10px;
          align-items: center;
        }

        .previewIcon {
          font-size: 22px;
        }

        .previewName {
          font-weight: 600;
          font-size: 14px;
        }

        .previewDesc {
          font-size: 12px;
          color: #6b7280;
        }

        .actions {
          display: flex;
          justify-content: flex-end;
          gap: 10px;
          margin-top: 18px;
        }

        .cancelBtn {
          padding: 10px 14px;
          border-radius: 12px;
          border: 1px solid #e5e7eb;
          background: white;
          cursor: pointer;
        }

        .saveBtn {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 10px 16px;
          border-radius: 12px;
          border: none;
          background: #111827;
          color: white;
          cursor: pointer;
        }

        .saveBtn:hover {
          background: #374151;
        }
      `}</style>
    </div>
  );
}