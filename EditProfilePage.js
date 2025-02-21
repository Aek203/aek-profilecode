import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../UserContext";
import './EditProfilePage.css';

const EditProfilePage = () => {
  const { user, setUser } = useUser();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (user === null) {
      // ใช้ setTimeout เพื่อรอโหลดข้อมูล user จาก Context
      setTimeout(() => {
        if (!localStorage.getItem("user")) {
          navigate("/login");
        }
      }, 500); // รอ 0.5 วินาทีเพื่อให้มีเวลาโหลดข้อมูล
    } else {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user, navigate]);

  const handleSaveChanges = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await fetch("http://localhost/api/editProfile.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();
      if (data.success) {
        const updatedUser = { ...user, name, email };
        if (password) {
          updatedUser.password = password;
        }
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setUser(updatedUser);
        navigate("/profile");
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      setError("เกิดข้อผิดพลาดในการเชื่อมต่อ API");
    }
  };

  return (
    <div className="edit-profile-container">
      <div className="edit-profile-box">
        <h2>แก้ไขข้อมูลโปรไฟล์</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSaveChanges}>
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
            placeholder="รหัสผ่านใหม่ (ถ้ามี)"
            className="input-field"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="save-button">บันทึกการเปลี่ยนแปลง</button>
        </form>
      </div>
    </div>
  );
};

export default EditProfilePage;
