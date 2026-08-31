import { useState } from "react";
import Register from "./Register";
import "../ComponentStyles/Login.css";
import { showSuccess, showError } from "../utils/toastMessage";

function Login({ onClose, onAuthSuccess }) {

  const [isRegister, setIsRegister] = useState(false);

  // Password visibility
  const [showPassword, setShowPassword] = useState(false);


  // =====================================================
  // LOGIN
  // =====================================================

  const handleLogin = async (e) => {

    e.preventDefault();

    const form = e.target;

    const loginData = {
      email: form.email.value.trim(),
      password: form.password.value,
    };


    // =====================================================
    // EMAIL VALIDATION
    // =====================================================

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(loginData.email)) {

      showError("Invalid email address.");

      return;
    }


    // =====================================================
    // SEND LOGIN REQUEST
    // =====================================================

    try {

      const response = await fetch(
        "https://login-signup-backend-1c1i.onrender.com/login",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(loginData),
        }
      );


      // =====================================================
      // READ RESPONSE
      // =====================================================

      const data = await response.json();


      // =====================================================
      // LOGIN SUCCESSFUL
      // =====================================================

      if (response.ok && data.success) {

        // Show success message
        showSuccess(
          data.message || "Login successful!"
        );


        // Clear form
        form.reset();


        // Reset password visibility
        setShowPassword(false);


        // Send user data to App
        if (onAuthSuccess) {

          onAuthSuccess(data);

        }

        /*
          Do NOT call onClose() here.

          Navbar/App will receive the user data
          through onAuthSuccess() and will switch
          from Home to Dashboard.
        */

      }


      // =====================================================
      // LOGIN FAILED
      // =====================================================

      else {

        showError(
          data.message ||
          data.detail ||
          "Invalid email or password."
        );

      }


    } catch (error) {

      console.error(
        "Login Error:",
        error
      );


      // =====================================================
      // SERVER / DATABASE CONNECTION ERROR
      // =====================================================

      showError(
        "Unable to connect to the server."
      );

    }
  };


  // =====================================================
  // SWITCH TO REGISTER
  // =====================================================

  const handleRegisterClick = () => {

    setIsRegister(true);

    setShowPassword(false);

  };


  // =====================================================
  // SWITCH TO LOGIN
  // =====================================================

  const handleLoginClick = () => {

    setIsRegister(false);

    setShowPassword(false);

  };


  // =====================================================
  // UI
  // =====================================================

  return (

    <div className="auth-overlay">

      <div className="auth-modal">


        {/* =================================================
            CLOSE BUTTON
        ================================================= */}

        <button
          type="button"
          className="close-btn-modal"
          onClick={onClose}
        >
          ×
        </button>


        {/* =================================================
            LOGIN FORM
        ================================================= */}

        {!isRegister && (

          <div className="form-box login">

            <h2>
              Login
            </h2>


            <form onSubmit={handleLogin}>


              {/* =========================
                  EMAIL
              ========================= */}

              <div className="input-box">

                <input
                  type="text"
                  name="email"
                  placeholder="Email"
                  required
                />

                <i className="bx bxs-envelope"></i>

              </div>


              {/* =========================
                  PASSWORD
              ========================= */}

              <div className="input-box">

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  name="password"
                  placeholder="Password"
                  required
                />


                {/* Password Show / Hide Button */}

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >

                  <i
                    className={
                      showPassword
                        ? "bx bx-lock-open"
                        : "bx bxs-lock"
                    }
                  ></i>

                </button>

              </div>


              {/* =========================
                  LOGIN BUTTON
              ========================= */}

              <button
                type="submit"
                className="btn"
              >
                Login
              </button>


              {/* =========================
                  REGISTER LINK
              ========================= */}

              <p>

                Don't have an account?{" "}

                <button
                  type="button"
                  className="switch-link"
                  onClick={handleRegisterClick}
                >
                  Register
                </button>

              </p>


            </form>

          </div>

        )}


        {/* =================================================
            REGISTER FORM
        ================================================= */}

        {isRegister && (

          <Register
            onLogin={handleLoginClick}
            onClose={onClose}
            onAuthSuccess={onAuthSuccess}
          />

        )}

      </div>

    </div>

  );
}


export default Login;