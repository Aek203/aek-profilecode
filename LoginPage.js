import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './LoginPage.css';

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError(null); // รีเซ็ต error ก่อน
    try {
      const response = await fetch("http://localhost/api/login.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log("Login Response:", data);

      if (data.success) {
        localStorage.setItem("user", JSON.stringify(data.user)); // เก็บข้อมูล User
        navigate("/profile"); // ไปหน้าโปรไฟล์
      } else {
        setError(data.error);
      }
    } catch (err) {
      console.error("Login Error:", err);
      setError("เกิดข้อผิดพลาดในการเชื่อมต่อ API");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        {error && <p className="error-message">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          className="input-field"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="input-field"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="login-button" onClick={handleLogin}>Login</button>
        <p className="register-link">
          ยังไม่มีบัญชี? <a href="/register">สมัครสมาชิก</a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;

