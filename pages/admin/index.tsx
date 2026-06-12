import Sidebar from "@/app/components/Admin/Sidebar";
import LoginForm from "@/app/components/Admin/login";
import { useState } from "react";
import RoomManagementDashboard from "@/app/components/Admin/Room";
import Modal from "@/app/components/Admin/Room/components/Modal";
import Reservation from "@/app/components/Admin/Reservation";
import Contact from "@/app/components/Admin/Contact";
import Blog from "@/app/components/Admin/Blog";

const AdminPage = () => {
  const [login, setLogin] = useState(true);
  const [modal, showModal] = useState(false);
  const [tabs, setTabs] = useState("Rooms");

  if (login) {
    return <LoginForm setLogin={setLogin} />;
  }

  return (
    <>
      <style jsx global>{`
        html,
        body {
          margin: 0;
          padding: 0;
          height: 100%;
          overflow: hidden;           /* Important */
          background: #0f0e0c;
          color: #f0e8da;
        }

        .admin-layout {
          height: 100vh;
          display: flex;
          overflow: hidden;           /* Important */
          position: relative;
        }

        .content {
          flex: 1;
          overflow-y: auto;           /* Only this should scroll */
          padding: 2rem;
          margin-left: 340px;
          background: #0f0e0c;
        }

        @media (max-width: 768px) {
          .content {
            margin-left: 0;
            padding: 1.5rem;
          }
        }
      `}</style>

      <div className="admin-layout">
        <Sidebar setTabs={setTabs} />

        <main className="content">
          {tabs === "Rooms" && (
            <RoomManagementDashboard showModal={showModal} />
          )}
          {tabs === "Reservation" && <Reservation fullName="Samuel Kebede" phone="+251 911 234 567" email="samuel.k@email.com" startDate="2025-06-14" endDate="2025-06-18"  roomNumber="214"roomCategory="Executive Family"/>}
          {tabs === "Contacts" && <Contact />}
          {tabs === "Blog" && <Blog />}
        </main>

        {modal && <Modal showModal={showModal} />}
      </div>
    </>
  );
};

export default AdminPage;