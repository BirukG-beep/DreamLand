"use client";
import { useState, useRef } from "react";

interface Item {
  id: string;
  image: string | null;
  title: string;
  description: string;
}

const SAMPLE_ITEMS: Item[] = [
  { id: "1", image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=80", title: "Deluxe Suite", description: "Spacious suite with ocean view, king bed, and private balcony overlooking the Addis skyline." },
  { id: "2", image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&q=80", title: "Penthouse Royal", description: "The crown jewel of LuxeStay — floor-to-ceiling windows, butler service, and a rooftop terrace." },
  { id: "3", image: "https://images.unsplash.com/photo-1595576508898-0ad5c879a061?w=600&q=80", title: "Classic Room", description: "Intimate and refined. Perfect for solo travelers seeking comfort without excess." },
];

type Mode = "list" | "create" | "read" | "edit" | "delete";

export default function ItemManager() {
  const [items, setItems] = useState<Item[]>(SAMPLE_ITEMS);
  const [mode, setMode] = useState<Mode>("list");
  const [selected, setSelected] = useState<Item | null>(null);
  const [form, setForm] = useState({ title: "", description: "" });
  const [preview, setPreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [deleteAnim, setDeleteAnim] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2800);
  };

  const openCreate = () => {
    setForm({ title: "", description: "" });
    setPreview(null);
    setImageFile(null);
    setMode("create");
  };

  const openRead = (item: Item) => { setSelected(item); setMode("read"); };

  const openEdit = (item: Item) => {
    setSelected(item);
    setForm({ title: item.title, description: item.description });
    setPreview(item.image);
    setMode("edit");
  };

  const openDelete = (item: Item) => { setSelected(item); setDeleteAnim(false); setMode("delete"); };

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) return;
    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleCreate = () => {
    if (!form.title.trim()) return;
    const newItem: Item = {
      id: Date.now().toString(),
      image: preview,
      title: form.title,
      description: form.description,
    };
    setItems([newItem, ...items]);
    showToast("Item created successfully");
    setMode("list");
  };

  const handleEdit = () => {
    if (!selected || !form.title.trim()) return;
    setItems(items.map(i => i.id === selected.id
      ? { ...i, title: form.title, description: form.description, image: preview ?? i.image }
      : i
    ));
    showToast("Item updated successfully");
    setMode("list");
  };

  const handleDelete = () => {
    if (!selected) return;
    setDeleteAnim(true);
    setTimeout(() => {
      setItems(items.filter(i => i.id !== selected.id));
      showToast("Item deleted");
      setMode("list");
    }, 380);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500&family=DM+Sans:wght@300;400;500&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --gold: #c8a96e;
          --ink: #0f0e0c;
          --surface: #1e1c19;
          --surface2: #252320;
          --border: rgba(200,169,110,0.15);
          --text: #f0e8da;
          --muted: #9c8d7a;
          --danger: #c86e6e;
          --success: #7ec8a9;
        }

        .im-root {
          background: var(--ink);
          min-height: 100vh;
          font-family: 'DM Sans', sans-serif;
          color: var(--text);
          padding: 3rem 2rem 5rem;
        }

        /* ── TOAST ── */
        .im-toast {
          position: fixed;
          bottom: 2rem; left: 50%;
          transform: translateX(-50%) translateY(0);
          background: var(--surface2);
          border: 1px solid var(--border);
          border-radius: 999px;
          padding: 0.65rem 1.4rem;
          font-size: 0.78rem;
          letter-spacing: 0.1em;
          color: var(--gold);
          z-index: 100;
          white-space: nowrap;
          animation: slideUp 0.3s ease;
        }

        @keyframes slideUp {
          from { opacity: 0; transform: translateX(-50%) translateY(12px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0); }
        }

        /* ── PAGE HEADER ── */
        .im-header {
          max-width: 1100px;
          margin: 0 auto 2.5rem;
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .im-eyebrow {
          font-size: 0.68rem;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: var(--gold);
          margin-bottom: 0.4rem;
        }

        .im-page-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 300;
          line-height: 1.1;
        }

        .im-page-sub {
          color: var(--muted);
          font-size: 0.85rem;
          margin-top: 0.3rem;
        }

        /* ── BUTTONS ── */
        .btn {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.75rem 1.4rem;
          border-radius: 10px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.75rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.2s;
          border: none;
        }

        .btn-gold {
          background: var(--gold);
          color: #000;
        }

        .btn-gold:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(200,169,110,0.2); }

        .btn-ghost {
          background: transparent;
          border: 1px solid var(--border);
          color: var(--muted);
        }

        .btn-ghost:hover { border-color: rgba(200,169,110,0.35); color: var(--text); }

        .btn-danger {
          background: rgba(200,110,110,0.1);
          border: 1px solid rgba(200,110,110,0.25);
          color: var(--danger);
        }

        .btn-danger:hover { background: rgba(200,110,110,0.18); transform: translateY(-1px); }

        .btn-danger-solid {
          background: var(--danger);
          color: #fff;
          border: none;
        }

        .btn-danger-solid:hover { background: #d47878; transform: translateY(-1px); box-shadow: 0 6px 20px rgba(200,110,110,0.25); }

        .btn-edit {
          background: rgba(200,169,110,0.08);
          border: 1px solid rgba(200,169,110,0.2);
          color: var(--gold);
        }

        .btn-edit:hover { background: rgba(200,169,110,0.14); transform: translateY(-1px); }

        .btn-sm { padding: 0.55rem 1rem; font-size: 0.7rem; }

        /* ── BACK ── */
        .im-back {
          background: none;
          border: none;
          color: var(--muted);
          font-family: 'DM Sans', sans-serif;
          font-size: 0.75rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.4rem;
          margin-bottom: 2rem;
          transition: color 0.2s;
          padding: 0;
        }

        .im-back:hover { color: var(--text); }

        /* ── GRID ── */
        .im-grid {
          max-width: 1100px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.2rem;
        }

        @media (max-width: 900px) { .im-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 560px) { .im-grid { grid-template-columns: 1fr; } }

        /* ── ITEM CARD ── */
        .item-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 18px;
          overflow: hidden;
          transition: border-color 0.22s, transform 0.22s;
        }

        .item-card:hover {
          border-color: rgba(200,169,110,0.3);
          transform: translateY(-3px);
        }

        .item-card-img {
          width: 100%;
          height: 180px;
          object-fit: cover;
          display: block;
          border-bottom: 1px solid var(--border);
        }

        .item-card-placeholder {
          width: 100%;
          height: 180px;
          background: rgba(200,169,110,0.04);
          border-bottom: 1px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(200,169,110,0.15);
          font-size: 2.5rem;
        }

        .item-card-body {
          padding: 1.2rem 1.3rem;
        }

        .item-card-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.2rem;
          font-weight: 400;
          margin-bottom: 0.4rem;
          color: var(--text);
        }

        .item-card-desc {
          font-size: 0.8rem;
          color: var(--muted);
          line-height: 1.6;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .item-card-actions {
          display: flex;
          gap: 0.5rem;
          padding: 0 1.3rem 1.2rem;
        }

        /* ── PANEL (create/edit/read/delete) ── */
        .im-panel {
          max-width: 600px;
          margin: 0 auto;
        }

        .panel-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 20px;
          overflow: hidden;
        }

        .panel-header {
          padding: 1.8rem 2rem 0;
        }

        .panel-eyebrow {
          font-size: 0.68rem;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: var(--gold);
          display: block;
          margin-bottom: 0.35rem;
        }

        .panel-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.9rem;
          font-weight: 300;
          color: var(--text);
        }

        .panel-body {
          padding: 1.6rem 2rem 2rem;
        }

        /* ── DROP ZONE ── */
        .drop-zone {
          border: 1px dashed var(--border);
          border-radius: 14px;
          min-height: 170px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          text-align: center;
          transition: all 0.22s;
          position: relative;
          overflow: hidden;
          margin-bottom: 1.2rem;
          background: rgba(255,255,255,0.01);
        }

        .drop-zone:hover, .drop-zone.dragging {
          border-color: var(--gold);
          background: rgba(200,169,110,0.04);
        }

        .drop-zone img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.8;
        }

        .drop-overlay {
          position: relative;
          z-index: 1;
          pointer-events: none;
        }

        .drop-icon { font-size: 1.8rem; color: var(--muted); margin-bottom: 0.5rem; display: block; }
        .drop-hint { font-size: 0.8rem; color: var(--muted); line-height: 1.6; }
        .drop-hint span { color: var(--gold); text-decoration: underline; text-underline-offset: 3px; }

        .has-preview .drop-overlay {
          background: rgba(15,14,12,0.55);
          padding: 0.6rem 1.2rem;
          border-radius: 8px;
        }

        /* ── FIELD ── */
        .field { margin-bottom: 1.1rem; }

        .field-label {
          display: block;
          font-size: 0.68rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--muted);
          margin-bottom: 0.45rem;
        }

        .field-input {
          width: 100%;
          padding: 0.9rem 1rem;
          background: rgba(255,255,255,0.03);
          border: 1px solid var(--border);
          border-radius: 10px;
          color: var(--text);
          font-family: 'DM Sans', sans-serif;
          font-size: 0.9rem;
          outline: none;
          transition: border-color 0.2s;
        }

        .field-input:focus { border-color: var(--gold); }
        .field-input::placeholder { color: rgba(156,141,122,0.45); }

        textarea.field-input {
          min-height: 120px;
          resize: none;
          line-height: 1.65;
        }

        .panel-footer {
          display: flex;
          gap: 0.75rem;
          padding: 0 2rem 2rem;
        }

        /* ── READ VIEW ── */
        .read-img {
          width: 100%;
          height: 240px;
          object-fit: cover;
          display: block;
        }

        .read-img-placeholder {
          width: 100%;
          height: 240px;
          background: rgba(200,169,110,0.04);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 3rem;
          color: rgba(200,169,110,0.12);
        }

        .read-body { padding: 1.8rem 2rem 2rem; }

        .read-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2rem;
          font-weight: 300;
          margin-bottom: 0.8rem;
          line-height: 1.2;
        }

        .read-desc {
          font-size: 0.9rem;
          color: var(--muted);
          line-height: 1.8;
        }

        .read-divider { height: 1px; background: var(--border); margin: 1.4rem 0; }

        /* ── DELETE PANEL ── */
        .delete-card {
          transition: opacity 0.35s, transform 0.35s;
        }

        .delete-card.out {
          opacity: 0;
          transform: scale(0.97) translateY(8px);
          pointer-events: none;
        }

        .delete-preview-img {
          width: 100%;
          height: 200px;
          object-fit: cover;
          display: block;
        }

        .confirm-box {
          margin: 0 2rem 0;
          background: rgba(200,110,110,0.05);
          border: 1px solid rgba(200,110,110,0.18);
          border-radius: 12px;
          padding: 1.2rem 1.3rem;
          text-align: center;
          margin-bottom: 1.2rem;
        }

        .confirm-box p {
          font-size: 0.85rem;
          color: var(--muted);
          line-height: 1.65;
          margin-bottom: 1rem;
        }

        .confirm-box strong { color: var(--text); }

        .confirm-actions { display: flex; gap: 0.6rem; }
      `}</style>

      {/* TOAST */}
      {toast && <div className="im-toast">✓ {toast}</div>}

      <div className="im-root">

        {/* ══════════════ LIST ══════════════ */}
        {mode === "list" && (
          <>
            <div className="im-header">
              <div>
                <div className="im-eyebrow">Management</div>
                <h1 className="im-page-title">All Items</h1>
                <p className="im-page-sub">{items.length} item{items.length !== 1 ? "s" : ""} total</p>
              </div>
              <button className="btn btn-gold" onClick={openCreate}>＋ &nbsp;New Item</button>
            </div>

            <div className="im-grid">
              {items.map(item => (
                <div className="item-card" key={item.id}>
                  {item.image
                    ? <img className="item-card-img" src={item.image} alt={item.title} />
                    : <div className="item-card-placeholder">⊡</div>
                  }
                  <div className="item-card-body">
                    <div className="item-card-title">{item.title}</div>
                    <div className="item-card-desc">{item.description}</div>
                  </div>
                  <div className="item-card-actions">
                    <button className="btn btn-ghost btn-sm" onClick={() => openRead(item)}>View</button>
                    <button className="btn btn-edit btn-sm" onClick={() => openEdit(item)}>Edit</button>
                    <button className="btn btn-danger btn-sm" onClick={() => openDelete(item)}>Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* ══════════════ CREATE ══════════════ */}
        {mode === "create" && (
          <div className="im-panel">
            <button className="im-back" onClick={() => setMode("list")}>← Back to list</button>
            <div className="panel-card">
              <div className="panel-header">
                <span className="panel-eyebrow">New Entry</span>
                <h2 className="panel-title">Create Item</h2>
              </div>
              <div className="panel-body">
                <div
                  className={`drop-zone ${dragging ? "dragging" : ""} ${preview ? "has-preview" : ""}`}
                  onClick={() => fileRef.current?.click()}
                  onDragOver={e => { e.preventDefault(); setDragging(true); }}
                  onDragLeave={() => setDragging(false)}
                  onDrop={e => { e.preventDefault(); setDragging(false); const f = e.dataTransfer.files[0]; if(f) handleFile(f); }}
                >
                  {preview && <img src={preview} alt="preview" />}
                  <div className="drop-overlay">
                    {!preview && <span className="drop-icon">⊕</span>}
                    <p className="drop-hint">{preview ? "Click or drop to replace" : <><span>Browse</span> or drop image here</>}</p>
                  </div>
                  <input ref={fileRef} type="file" accept="image/*" style={{display:"none"}} onChange={e => e.target.files?.[0] && handleFile(e.target.files[0])} />
                </div>
                <div className="field">
                  <label className="field-label">Title</label>
                  <input className="field-input" placeholder="Enter title" value={form.title} onChange={e => setForm({...form, title: e.target.value})} />
                </div>
                <div className="field">
                  <label className="field-label">Description</label>
                  <textarea className="field-input" placeholder="Write a description…" value={form.description} onChange={e => setForm({...form, description: e.target.value})} />
                </div>
              </div>
              <div className="panel-footer">
                <button className="btn btn-ghost" onClick={() => setMode("list")}>Cancel</button>
                <button className="btn btn-gold" style={{flex:1}} onClick={handleCreate}>Create Item</button>
              </div>
            </div>
          </div>
        )}

        {/* ══════════════ READ ══════════════ */}
        {mode === "read" && selected && (
          <div className="im-panel">
            <button className="im-back" onClick={() => setMode("list")}>← Back to list</button>
            <div className="panel-card">
              {selected.image
                ? <img className="read-img" src={selected.image} alt={selected.title} />
                : <div className="read-img-placeholder">⊡</div>
              }
              <div className="read-body">
                <span className="panel-eyebrow">Item Details</span>
                <h2 className="read-title">{selected.title}</h2>
                <div className="read-divider" />
                <p className="read-desc">{selected.description || "No description provided."}</p>
                <div className="read-divider" />
                <div style={{display:"flex", gap:"0.75rem"}}>
                  <button className="btn btn-ghost" onClick={() => setMode("list")}>← Back</button>
                  <button className="btn btn-edit" onClick={() => openEdit(selected)}>Edit Item</button>
                  <button className="btn btn-danger" onClick={() => openDelete(selected)}>Delete</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ══════════════ EDIT ══════════════ */}
        {mode === "edit" && selected && (
          <div className="im-panel">
            <button className="im-back" onClick={() => setMode("list")}>← Back to list</button>
            <div className="panel-card">
              <div className="panel-header">
                <span className="panel-eyebrow">Editing</span>
                <h2 className="panel-title">Edit Item</h2>
              </div>
              <div className="panel-body">
                <div
                  className={`drop-zone ${dragging ? "dragging" : ""} ${preview ? "has-preview" : ""}`}
                  onClick={() => fileRef.current?.click()}
                  onDragOver={e => { e.preventDefault(); setDragging(true); }}
                  onDragLeave={() => setDragging(false)}
                  onDrop={e => { e.preventDefault(); setDragging(false); const f = e.dataTransfer.files[0]; if(f) handleFile(f); }}
                >
                  {preview && <img src={preview} alt="preview" />}
                  <div className="drop-overlay">
                    {!preview && <span className="drop-icon">⊕</span>}
                    <p className="drop-hint">{preview ? "Click or drop to replace" : <><span>Browse</span> or drop image here</>}</p>
                  </div>
                  <input ref={fileRef} type="file" accept="image/*" style={{display:"none"}} onChange={e => e.target.files?.[0] && handleFile(e.target.files[0])} />
                </div>
                <div className="field">
                  <label className="field-label">Title</label>
                  <input className="field-input" placeholder="Enter title" value={form.title} onChange={e => setForm({...form, title: e.target.value})} />
                </div>
                <div className="field">
                  <label className="field-label">Description</label>
                  <textarea className="field-input" placeholder="Write a description…" value={form.description} onChange={e => setForm({...form, description: e.target.value})} />
                </div>
              </div>
              <div className="panel-footer">
                <button className="btn btn-ghost" onClick={() => setMode("list")}>Cancel</button>
                <button className="btn btn-gold" style={{flex:1}} onClick={handleEdit}>Save Changes</button>
              </div>
            </div>
          </div>
        )}

        {/* ══════════════ DELETE ══════════════ */}
        {mode === "delete" && selected && (
          <div className="im-panel">
            <button className="im-back" onClick={() => setMode("list")}>← Back to list</button>
            <div className={`panel-card delete-card ${deleteAnim ? "out" : ""}`}>
              {selected.image
                ? <img className="delete-preview-img" src={selected.image} alt={selected.title} />
                : <div className="read-img-placeholder" style={{height:"160px"}}>⊡</div>
              }
              <div className="panel-header" style={{paddingBottom:"1.2rem"}}>
                <span className="panel-eyebrow">Danger Zone</span>
                <h2 className="panel-title">{selected.title}</h2>
                <p style={{color:"var(--muted)", fontSize:"0.85rem", marginTop:"0.4rem"}}>{selected.description}</p>
              </div>
              <div className="confirm-box">
                <p>Are you sure you want to permanently delete <strong>&quot;{selected.title}&quot;</strong>?<br />This action cannot be undone.</p>
                <div className="confirm-actions">
                  <button className="btn btn-ghost" style={{flex:1}} onClick={() => setMode("list")}>Keep Item</button>
                  <button className="btn btn-danger-solid" style={{flex:1}} onClick={handleDelete}>Yes, Delete</button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </>
  );
}