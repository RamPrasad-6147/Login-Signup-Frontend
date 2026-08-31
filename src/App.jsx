import { useState } from "react";

import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import Dashboard from "./Components/Dashboard";
import ToastMessage from "./Components/ToastMessage";

import { showSuccess } from "./utils/toastMessage";

function App() {

  // =====================================================
  // RESTORE USER
  // =====================================================

  const [user, setUser] = useState(() => {

    const savedUser =
      localStorage.getItem("agrotech_user");

    if (savedUser) {

      try {

        return JSON.parse(savedUser);

      } catch (error) {

        console.error(
          "Unable to restore user:",
          error
        );

        localStorage.removeItem(
          "agrotech_user"
        );
      }
    }

    return null;
  });


  // =====================================================
  // LOGIN / REGISTER SUCCESS
  // =====================================================

  const handleAuthSuccess = (userData) => {

    console.log(
      "App authentication success:",
      userData
    );

    setUser(userData);

    localStorage.setItem(
      "agrotech_user",
      JSON.stringify(userData)
    );

  };


  // =====================================================
  // LOGOUT
  // =====================================================

  const handleLogout = () => {

    showSuccess(
      "Logged out successfully!"
    );

    localStorage.removeItem(
      "agrotech_user"
    );

    setTimeout(() => {

      setUser(null);

    }, 2000);

  };


  // =====================================================
  // UI
  // =====================================================

  return (
    <>

      {/* =================================================
          SINGLE TOAST CONTAINER
      ================================================= */}

      <ToastMessage />


      {/* =================================================
          LOGGED IN
      ================================================= */}

      {user ? (

        <Dashboard
          user={user}
          onLogout={handleLogout}
        />

      ) : (

        /* =================================================
           LOGGED OUT
        ================================================= */

        <>
          <Navbar
            onAuthSuccess={handleAuthSuccess}
          />

          <Home />
        </>

      )}

    </>
  );
}


export default App;