"use client";

import { useState } from "react";

const LoginForm = ({setLogin}: {setLogin: React.Dispatch<React.SetStateAction<boolean>>}) => {
  const [form, setForm] = useState({
    phone: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Login data:", form);
    setLogin(false);
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h1 className="title">Welcome Back</h1>
        <p className="subtitle">Sign in to access your admin dashboard</p>

        <form onSubmit={handleSubmit} className="form">

          <div className="field">
            <label>Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="+251 9..."
              required
            />
          </div>

          <div className="field">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
            />
          </div>

          <button type="submit" className="btn">
            Login
          </button>
        </form>
      </div>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600&family=DM+Sans:wght@300;400;500&display=swap');

        .login-wrapper {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: #0f0e0c;
          color: #f0e8da;
          font-family: "DM Sans", sans-serif;
          padding: 2rem;
          margin:-8px;
        }

        .login-card {
          width: 100%;
          max-width: 420px;
          background: rgba(15,14,12,0.75);
          border: 1px solid rgba(200,169,110,0.2);
          backdrop-filter: blur(25px);
          border-radius: 18px;
          padding: 2rem;
          box-shadow: 0 20px 60px rgba(0,0,0,0.6);
        }

        .title {
          font-family: "Cormorant Garamond", serif;
          font-size: 2rem;
          color: #c8a96e;
          margin-bottom: 0.5rem;
        }

        .subtitle {
          color: #9c8d7a;
          margin-bottom: 2rem;
          font-size: 0.9rem;
        }

        .form {
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
        }

        .field {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        label {
          font-size: 0.75rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #e4c48b;
        }

        input {
          padding: 12px;
          border-radius: 12px;
          border: 1px solid rgba(200,169,110,0.15);
          background: rgba(255,255,255,0.03);
          color: #f0e8da;
          outline: none;
          transition: 0.3s ease;
        }

        input:focus {
          border-color: #c8a96e;
          box-shadow: 0 0 0 3px rgba(200,169,110,0.1);
        }

        .btn {
          margin-top: 1rem;
          padding: 12px;
          border: none;
          border-radius: 12px;
          background: #c8a96e;
          color: #0f0e0c;
          font-weight: bold;
          cursor: pointer;
          transition: 0.3s ease;
        }

        .btn:hover {
          background: #e4c48b;
          transform: translateY(-2px);
        }
      `}</style>
    </div>
  );
};

export default LoginForm;