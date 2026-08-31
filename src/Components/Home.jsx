import "../ComponentStyles/Home.css";

function Home() {
  return (
    <section className="home" id="home">

      {/* Background Image */}
      <img
        className="home-bg"
        src="/images/image1.jpg"
        alt="Smart Farming"
      />

      {/* Home Content */}
      <div className="home-content">

        <h1>
          YOUR SMART FARMING ASSISTANT
        </h1>

        <p>
          Smart Crops, Smart Choices With AgriTech!
        </p>

        <a
          href="#"
          className="home-btn"
        >
          Smart Farming Guide
        </a>

      </div>

    </section>
  );
}

export default Home;