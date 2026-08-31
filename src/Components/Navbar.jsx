import { useState } from "react";
import Login from "./Login";
import "../ComponentStyles/Navbar.css";

function Navbar({ onAuthSuccess }) {

  const [showAuth, setShowAuth] = useState(false);

  const [menuOpen, setMenuOpen] = useState(false);


  // =====================================================
  // CLOSE MOBILE MENU
  // =====================================================

  const closeMenu = () => {

    setMenuOpen(false);

  };


  // =====================================================
  // OPEN LOGIN
  // =====================================================

  const openLogin = () => {

    setShowAuth(true);

    closeMenu();

  };


  // =====================================================
  // AUTH SUCCESS
  // =====================================================

  const handleAuthSuccess = (userData) => {

    console.log(
      "Navbar received user:",
      userData
    );


    // Send user information to App
    if (onAuthSuccess) {

      onAuthSuccess(userData);

    }


    // Close login modal
    setShowAuth(false);

  };


  // =====================================================
  // UI
  // =====================================================

  return (
    <>

      <header className="header">


        {/* =================================================
            LOGO
        ================================================= */}

        <div className="logo">

          <h1>
            AgroTech
          </h1>

        </div>


        {/* =================================================
            NAVIGATION
        ================================================= */}

        <nav
          className={
            menuOpen
              ? "navbar active"
              : "navbar"
          }
        >

          <a
            href="#home"
            onClick={closeMenu}
          >
            HOME
          </a>


          <a
            href="#features"
            onClick={closeMenu}
          >
            FEATURES
          </a>


          <a
            href="#about"
            onClick={closeMenu}
          >
            ABOUT
          </a>


          <a
            href="#footer"
            onClick={closeMenu}
          >
            CONTACT
          </a>


          <a
            href="#explore"
            className="explore-btn"
            onClick={closeMenu}
          >
            EXPLORE NOW
          </a>

        </nav>


        {/* =================================================
            LOGIN BUTTON
        ================================================= */}

        <div className="user-auth">

          <button
            type="button"
            className="login-btn-modal"
            onClick={openLogin}
          >
            Login
          </button>

        </div>


        {/* =================================================
            WELCOME FARMER
        ================================================= */}

        <div className="welcome-section">

          <h2>
            Welcome Farmer!
          </h2>

        </div>


        {/* =================================================
            MOBILE MENU
        ================================================= */}

        <button
          type="button"
          className="menu-btn"
          onClick={() =>
            setMenuOpen(!menuOpen)
          }
          aria-label={
            menuOpen
              ? "Close menu"
              : "Open menu"
          }
        >

          <i
            className={
              menuOpen
                ? "bx bx-x"
                : "bx bx-menu"
            }
          ></i>

        </button>

      </header>


      {/* =================================================
          LOGIN / REGISTER MODAL
      ================================================= */}

      {showAuth && (

        <Login

          onClose={() =>
            setShowAuth(false)
          }

          onAuthSuccess={
            handleAuthSuccess
          }

        />

      )}

    </>
  );
}

export default Navbar;