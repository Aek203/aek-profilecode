import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ProfilePage.css";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate("/login"); // ถ้าไม่มีข้อมูล ให้กลับไปหน้า Login
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user"); // ลบข้อมูลออก
    navigate("/login"); // กลับไปหน้า Login
  };

  const handleDeleteAccount = async () => {
    if (!window.confirm("คุณแน่ใจหรือไม่ว่าต้องการลบบัญชีนี้?")) return;

    try {
      const response = await fetch("http://localhost/api/delete_user.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: user.email }),
      });

      const data = await response.json();
      if (data.success) {
        localStorage.removeItem("user"); // ลบข้อมูลออกจาก Local Storage
        alert("บัญชีของคุณถูกลบเรียบร้อยแล้ว");
        navigate("/register"); // ส่งไปที่หน้า Register
      } else {
        alert("เกิดข้อผิดพลาด: " + data.error);
      }
    } catch (error) {
      console.error("Delete Error:", error);
      alert("ไม่สามารถลบบัญชีได้");
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-box">
        <h2>โปรไฟล์</h2>
        {user ? (
          <div className="profile-details">
            <p><strong>ชื่อ:</strong> {user.name}</p>
            <p><strong>อีเมล:</strong> {user.email}</p>
            <button className="logout-button" onClick={handleLogout}>ออกจากระบบ</button>
            <button className="delete-button" onClick={handleDeleteAccount}>ลบบัญชี</button>
          </div>
        ) : (
          <p className="error-message">ไม่พบข้อมูลผู้ใช้</p>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
