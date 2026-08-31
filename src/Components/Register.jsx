import { useState } from "react";
import "../ComponentStyles/Register.css";
import { showSuccess, showError } from "../utils/toastMessage";

function Register({ onLogin, onClose, onAuthSuccess }) {

  // =========================
  // PASSWORD VISIBILITY
  // =========================

  const [showPassword, setShowPassword] = useState(false);


  // =========================
  // REGISTER
  // =========================

  const handleRegister = async (e) => {

    e.preventDefault();

    const form = e.target;
    const email = form.email.value.trim();
const phone = form.phone.value.trim();
const password = form.password.value;


// =========================
// EMAIL VALIDATION
// =========================

const emailRegex =
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (!emailRegex.test(email)) {

  showError("Invalid email address.");

  return;
}


// =========================
// PHONE VALIDATION
// =========================

const phoneRegex = /^\d{10}$/;

if (!phoneRegex.test(phone)) {

  showError("Phone number must be a valid 10-digit number.");

  return;
}


// =========================
// PASSWORD VALIDATION
// =========================

if (password.length < 8) {

  showError(
    "Password must contain at least 8 characters."
  );

  return;
}


    const userData = {
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      phone: form.phone.value.trim(),
      city: form.city.value.trim(),
      state: form.state.value.trim(),
      country: form.country.value.trim(),
      password: form.password.value,
    };


    try {

      const response = await fetch(
        "https://login-signup-backend-1c1i.onrender.com/register",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(userData),
        }
      );


      const data = await response.json();


      // =========================
      // REGISTRATION SUCCESSFUL
      // =========================

      if (response.ok && data.success) {

        showSuccess(
          data.message ||
          "Registration successful!"
        );


        form.reset();

        setShowPassword(false);


        // =========================
        // SEND USER DATA
        // =========================

        if (onAuthSuccess && data.user) {

          onAuthSuccess(data.user);

        }


        setTimeout(() => {

          onClose();

        }, 1500);

        return;
      }


      // =========================
      // BACKEND ERROR
      // =========================

      if (data.message) {

        showError(data.message);

        return;
      }


      // =========================
      // PYDANTIC VALIDATION ERROR
      // =========================

      if (Array.isArray(data.detail)) {

        const validationError = data.detail[0];


        if (validationError?.msg) {

          showError(validationError.msg);

        } else {

          showError(
            "Please check your registration details."
          );

        }

        return;
      }


      // =========================
      // UNKNOWN ERROR
      // =========================

      showError(
        "Registration unsuccessful."
      );

    } catch (error) {

      console.error(
        "Registration Error:",
        error
      );


      // =========================
      // SERVER CONNECTION ERROR
      // =========================

      showError(
        "Unable to connect to the server."
      );

    }

  };


  return (
    <div className="form-box register">

      <h2>Register</h2>


      <form onSubmit={handleRegister}>


        {/* =========================
            NAME
        ========================= */}

        <div className="input-box">

          <input
            type="text"
            name="name"
            placeholder="Name"
            required
          />

          <i className="bx bxs-user"></i>

        </div>


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
            PHONE
        ========================= */}

        <div className="input-box">

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            required
          />

          <i className="bx bxs-phone"></i>

        </div>


        {/* =========================
            CITY
        ========================= */}

        <div className="input-box">

          <input
            type="text"
            name="city"
            placeholder="City"
            required
          />

          <i className="bx bx-city"></i>

        </div>


        {/* =========================
            STATE
        ========================= */}

        <div className="input-box">

          <input
            type="text"
            name="state"
            placeholder="State"
            required
          />

          <i className="bx bx-landmark"></i>

        </div>


        {/* =========================
            COUNTRY
        ========================= */}

        <div className="input-box">

          <input
            type="text"
            name="country"
            placeholder="Country"
            required
          />

          <i className="bx bxs-globe"></i>

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


          {/* =========================
              PASSWORD SHOW / HIDE
          ========================= */}

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
            REGISTER BUTTON
        ========================= */}

        <button
          type="submit"
          className="btn"
        >
          Register
        </button>


        {/* =========================
            LOGIN
        ========================= */}

        <p>

          Already Have An Account?{" "}

          <button
            type="button"
            className="login-link"
            onClick={() => {

              setShowPassword(false);

              onLogin();

            }}
          >
            Login
          </button>

        </p>


      </form>

    </div>
  );
}


export default Register;