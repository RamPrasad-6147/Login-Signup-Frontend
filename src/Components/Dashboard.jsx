import "../ComponentStyles/Dashboard.css";

function Dashboard({ user, onLogout }) {

  return (
    <div className="dashboard">

      {/* =========================
          DASHBOARD HEADER
      ========================= */}

      <header className="dashboard-header">

        <div className="dashboard-brand">

          <div className="brand-icon">
            <i className="bx bx-sapling"></i>
          </div>

          <div>
            <h1>AgroTech</h1>
            <span>Smart Farming Assistant</span>
          </div>

        </div>


        <div className="dashboard-user">

          <div className="user-avatar">
            {user?.name?.charAt(0).toUpperCase() || "F"}
          </div>

          <div className="user-name">

            <span>Welcome back</span>

            <strong>
              {user?.name || "Farmer"}
            </strong>

          </div>

          <button
            type="button"
            className="logout-btn"
            onClick={onLogout}
          >
            <i className="bx bx-log-out"></i>
            Logout
          </button>

        </div>

      </header>


      {/* =========================
          MAIN CONTENT
      ========================= */}

      <main className="dashboard-content">


        {/* =========================
            WELCOME BANNER
        ========================= */}

        <section className="welcome-card">

          <div className="welcome-text">

            <span className="welcome-label">
              FARMER DASHBOARD
            </span>

            <h2>
              Hello, {user?.name || "Farmer"}!
              <i className="bx bx-hand-wave"></i>
            </h2>

            <p>
              Welcome to your AgroTech dashboard.
              Manage your farming activities from one place.
            </p>

          </div>


          <div className="welcome-icon">
            <i className="bx bx-user-circle"></i>
          </div>

        </section>


        {/* =========================
            QUICK ACTIONS
        ========================= */}

        <section className="section">

          <div className="section-title">

            <div>
              <h3>Quick Actions !</h3>

              <span>
                Manage your farming needs
              </span>
            </div>

          </div>


          <div className="action-grid">


            {/* Crop Management */}

            <div className="action-card">

              <div className="action-icon">
                <i className="bx bx-leaf"></i>
              </div>

              <h4>Crop Management</h4>

              <p>
                Manage and monitor your crops.
              </p>

              <button type="button">
                Explore
                <i className="bx bx-caret-right"></i>
              </button>

            </div>


            {/* Weather */}

            <div className="action-card">

              <div className="action-icon">
                <i className="bx bx-cloud"></i>
              </div>

              <h4>Weather</h4>

              <p>
                Check weather conditions for your farm.
              </p>

              <button type="button">
                Check Weather
                <i className="bx bx-caret-right"></i>
              </button>

            </div>


            {/* Irrigation */}

            <div className="action-card">

              <div className="action-icon">
                <i className="bx bx-trees"></i>
              </div>

              <h4>Irrigation</h4>

              <p>
                Monitor your irrigation requirements.
              </p>

              <button type="button">
                View Details
                <i className="bx bx-caret-right"></i>
              </button>

            </div>


            {/* Farm Reports */}

            <div className="action-card">

              <div className="action-icon">
                <i className="bx bx-file-report"></i>
              </div>

              <h4>Farm Reports</h4>

              <p>
                View your farming reports and insights.
              </p>

              <button type="button">
                View Reports
                <i className="bx bx-caret-right"></i>
              </button>

            </div>

          </div>

        </section>


        {/* =========================
            USER INFORMATION
        ========================= */}

        <section className="section">

          <div className="section-title">

            <div>
              <h3>My Profile</h3>

              <span>
                Your registered information
              </span>
            </div>

          </div>


          <div className="profile-card">


            {/* Profile Header */}

            <div className="profile-header">

              <div className="large-avatar">
                {user?.name?.charAt(0).toUpperCase() || "F"}
              </div>

              <div>

                <h3>
                  {user?.name || "Farmer"}
                </h3>

                <p>
                  AgroTech Farmer
                </p>

              </div>

            </div>


            {/* Profile Details */}

            <div className="profile-details">


              {/* Name */}

              <div className="detail-item">

                <span className="detail-icon">
                  <i className="bx bx-user"></i>
                </span>

                <div>
                  <small>Name</small>

                  <strong>
                    {user?.name || "N/A"}
                  </strong>
                </div>

              </div>


              {/* Email */}

              <div className="detail-item">

                <span className="detail-icon">
                  <i className="bx bx-envelope"></i>
                </span>

                <div>
                  <small>Email</small>

                  <strong>
                    {user?.email || "N/A"}
                  </strong>
                </div>

              </div>


              {/* Phone */}

              <div className="detail-item">

                <span className="detail-icon">
                  <i className="bx bx-phone"></i>
                </span>

                <div>
                  <small>Phone Number</small>

                  <strong>
                    {user?.phone || "N/A"}
                  </strong>
                </div>

              </div>


              {/* City */}

              <div className="detail-item">

                <span className="detail-icon">
                  <i className="bx bx-buildings"></i>
                </span>

                <div>
                  <small>City</small>

                  <strong>
                    {user?.city || "N/A"}
                  </strong>
                </div>

              </div>


              {/* State */}

              <div className="detail-item">

                <span className="detail-icon">
                  <i className="bx bx-map"></i>
                </span>

                <div>
                  <small>State</small>

                  <strong>
                    {user?.state || "N/A"}
                  </strong>
                </div>

              </div>


              {/* Country */}

              <div className="detail-item">

                <span className="detail-icon">
                  <i className="bx bx-globe"></i>
                </span>

                <div>
                  <small>Country</small>

                  <strong>
                    {user?.country || "N/A"}
                  </strong>
                </div>

              </div>

            </div>

          </div>

        </section>

      </main>

    </div>
  );
}

export default Dashboard;