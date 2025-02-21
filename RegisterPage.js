import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './RegisterPage.css';

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await fetch("http://localhost/api/register.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();
      if (data.success) {
        alert("สมัครสมาชิกสำเร็จ!");
        navigate("/login");
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      setError("เกิดข้อผิดพลาดในการเชื่อมต่อ API");
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2>สมัครสมาชิก</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="ชื่อเต็ม"
            className="input-field"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="อีเมล"
            className="input-field"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="รหัสผ่าน"
            className="input-field"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="register-button">สมัครสมาชิก</button>
        </form>
        <p className="login-link">
          มีบัญชีอยู่แล้ว? <a href="/login">เข้าสู่ระบบ</a>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
