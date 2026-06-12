

const Modal = ({showModal}:{showModal:React.Dispatch<React.SetStateAction<boolean>>}) => {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400&family=DM+Sans:wght@300;400;500&display=swap');

        .wrapper {
          position: fixed; inset: 0;
          background: rgba(15, 14, 12, 0.7);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          display: flex; align-items: center; justify-content: center;
          z-index: 2000;
        }

        .delete-modal {
          width: 360px;
          background: rgba(200, 169, 110, 0.06);
          border: 0.5px solid rgba(200, 169, 110, 0.25);
          border-radius: 16px;
          padding: 32px 28px 24px;
          position: relative;
          overflow: hidden;
        }

        .delete-modal::before {
          content: '';
          position: absolute; inset: 0;
          background: radial-gradient(ellipse at 50% -20%, rgba(200,169,110,0.12) 0%, transparent 70%);
          pointer-events: none;
        }

        .modal-icon {
          width: 48px; height: 48px;
          border-radius: 50%;
          background: rgba(200, 169, 110, 0.1);
          border: 0.5px solid rgba(200, 169, 110, 0.3);
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 20px;
          font-size: 22px;
          color: #c8a96e;
        }

        .modal-title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 22px; font-weight: 400;
          color: #e6d5b0;
          margin: 0 0 8px;
          letter-spacing: 0.01em; line-height: 1.3;
        }

        .modal-body {
          font-family: 'DM Sans', sans-serif;
          font-size: 14px; font-weight: 300;
          color: rgba(200, 169, 110, 0.6);
          margin: 0 0 28px; line-height: 1.6;
        }

        .modal-actions {
          display: flex; gap: 10px;
        }

        .btn-cancel, .btn-delete {
          padding: 11px 0;
          border-radius: 8px;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .btn-cancel {
          flex: 1;
          border: 0.5px solid rgba(200, 169, 110, 0.2);
          background: transparent;
          color: rgba(200, 169, 110, 0.55);
          font-size: 14px; font-weight: 400;
        }
        .btn-cancel:hover {
          background: rgba(200, 169, 110, 0.08);
          color: rgba(200, 169, 110, 0.8);
        }

        .btn-delete {
          flex: 1.6;
          border: 0.5px solid rgba(200, 169, 110, 0.4);
          background: rgba(200, 169, 110, 0.14);
          color: #c8a96e;
          font-size: 12px; font-weight: 500;
          letter-spacing: 0.04em; text-transform: uppercase;
        }
        .btn-delete:hover {
          background: rgba(200, 169, 110, 0.24);
          border-color: rgba(200, 169, 110, 0.6);
        }
      `}</style>

      <div className="wrapper">
        <div className="delete-modal">
          <div className="modal-icon">🗑</div>
          <p className="modal-title">Delete application?</p>
          <p className="modal-body">
            This action cannot be undone. The app and all its associated data
            will be permanently removed.
          </p>
          <div className="modal-actions">
            <button className="btn-cancel" onClick={() => showModal(false)}>Cancel</button>
            <button className="btn-delete">Delete</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;