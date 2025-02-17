import { useState } from "react";
import AuthLogo from "../assets/14680406.png";
import "../styles/Auth.css";
import { useNavigate } from "react-router-dom";

const Auth_Page = () => {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const navigate = useNavigate();
  return (
    <div className="auth_page">
      <div className="auth_page_container">
        <div className="auth_page_top">
          <div className="auth_logo">
            <img src={AuthLogo} alt="Auth Logo" />
          </div>
          <div className="auth_main_text">
            <h2>PassKey</h2>
            <p>Frictionless Security</p>
          </div>
        </div>

        <div className="auth_page_form_container">
          <div className="auth_form_top">
            <button
              className={isLogin ? "" : "active"}
              onClick={() => setIsLogin(false)}
            >
              Register
            </button>
            <button
              className={isLogin ? "active" : ""}
              onClick={() => setIsLogin(true)}
            >
              Login
            </button>
          </div>
          <p className="form_title">Personal details</p>
          <div className="auth_form_fields">
            <input type="text" placeholder="Enter username" />
            <input type="email" placeholder="Enter email address" />
            <input type="password" placeholder="Enter password" />
            {!isLogin && (
              <input type="password" placeholder="Confirm your password" />
            )}
          </div>
        </div>
      </div>

      {/* 🔹 Fixed Login Button at Bottom */}
      <div className="auth_page_btn action_btn">
        <button
          onClick={() => {
            navigate("/");
          }}
        >
          {isLogin ? "Login" : "Register"}
        </button>
      </div>
    </div>
  );
};

export default Auth_Page;
