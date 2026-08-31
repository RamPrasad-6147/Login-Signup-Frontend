import { useState } from "react";

import {
  Country,
  State,
  City,
} from "country-state-city";

import "../ComponentStyles/Register.css";

import {
  showSuccess,
  showError,
} from "../utils/toastMessage";


function Register({
  onLogin,
  onClose,
  onAuthSuccess,
}) {

  // =========================
  // PASSWORD VISIBILITY
  // =========================

  const [showPassword, setShowPassword] =
    useState(false);


  // =========================
  // LOCATION STATES
  // =========================

  const [selectedCountry, setSelectedCountry] =
    useState("");

  const [selectedState, setSelectedState] =
    useState("");

  const [selectedCity, setSelectedCity] =
    useState("");


  // =========================
  // COUNTRIES
  // =========================

  const countries =
    Country.getAllCountries();


  // =========================
  // STATES
  // =========================

  const states = selectedCountry
    ? State.getStatesOfCountry(
        selectedCountry
      )
    : [];


  // =========================
  // CITIES
  // =========================

  const cities =
    selectedCountry && selectedState
      ? City.getCitiesOfState(
          selectedCountry,
          selectedState
        )
      : [];


  // =========================
  // COUNTRY CHANGE
  // =========================

  const handleCountryChange = (e) => {

    const countryCode =
      e.target.value;

    setSelectedCountry(
      countryCode
    );

    // Reset state
    setSelectedState("");

    // Reset city
    setSelectedCity("");
  };


  // =========================
  // STATE CHANGE
  // =========================

  const handleStateChange = (e) => {

    const stateCode =
      e.target.value;

    setSelectedState(
      stateCode
    );

    // Reset city
    setSelectedCity("");
  };


  // =========================
  // CITY CHANGE
  // =========================

  const handleCityChange = (e) => {

    setSelectedCity(
      e.target.value
    );
  };


  // =========================
  // REGISTER
  // =========================

  const handleRegister = async (e) => {

    e.preventDefault();

    const form = e.target;


    // =========================
    // FORM VALUES
    // =========================

    const name =
      form.name.value.trim();

    const email =
      form.email.value.trim();

    const phone =
      form.phone.value.trim();

    const password =
      form.password.value;


    // =========================
    // SELECTED COUNTRY DATA
    // =========================

    const selectedCountryData =
      countries.find(
        (country) =>
          country.isoCode ===
          selectedCountry
      );


    // =========================
    // SELECTED STATE DATA
    // =========================

    const selectedStateData =
      states.find(
        (state) =>
          state.isoCode ===
          selectedState
      );


    // =========================
    // EMAIL VALIDATION
    // =========================

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    if (
      !emailRegex.test(email)
    ) {

      showError(
        "Invalid email address."
      );

      return;
    }


    // =========================
    // PHONE VALIDATION
    // =========================

    const phoneRegex =
      /^\d{10}$/;


    if (
      !phoneRegex.test(phone)
    ) {

      showError(
        "Phone number must be a valid 10-digit number."
      );

      return;
    }


    // =========================
    // COUNTRY VALIDATION
    // =========================

    if (!selectedCountry) {

      showError(
        "Please select a country."
      );

      return;
    }


    // =========================
    // STATE VALIDATION
    // =========================

    if (!selectedState) {

      showError(
        "Please select a state."
      );

      return;
    }


    // =========================
    // CITY VALIDATION
    // =========================

    if (!selectedCity) {

      showError(
        "Please select a city."
      );

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


    // =========================
    // USER DATA
    // =========================

    const userData = {

      name: name,

      email: email,

      phone: phone,

      country:
        selectedCountryData?.name || "",

      state:
        selectedStateData?.name || "",

      city: selectedCity,

      password: password,
    };


    // =========================
    // DEBUG
    // =========================

    console.log(
      "Registration data:",
      userData
    );


    // =========================
    // SEND REQUEST
    // =========================

    try {

      const response = await fetch(
        "https://login-signup-backend-1c1i.onrender.com/register",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body:
            JSON.stringify(userData),
        }
      );


      // =========================
      // RESPONSE
      // =========================

      const data =
        await response.json();


      // =========================
      // SUCCESS
      // =========================

      if (
        response.ok &&
        data.success
      ) {

        showSuccess(
          data.message ||
          "Registration successful!"
        );


        // Reset form
        form.reset();


        // Reset password
        setShowPassword(false);


        // Reset country
        setSelectedCountry("");


        // Reset state
        setSelectedState("");


        // Reset city
        setSelectedCity("");


        // =========================
        // SEND USER DATA
        // =========================

        if (
          onAuthSuccess &&
          data.user
        ) {

          onAuthSuccess(
            data.user
          );
        }


        // =========================
        // CLOSE FORM
        // =========================

        setTimeout(() => {

          if (onClose) {
            onClose();
          }

        }, 1500);


        return;
      }


      // =========================
      // BACKEND ERROR
      // =========================

      if (data.message) {

        showError(
          data.message
        );

        return;
      }


      // =========================
      // VALIDATION ERROR
      // =========================

      if (
        Array.isArray(data.detail)
      ) {

        const validationError =
          data.detail[0];


        if (
          validationError?.msg
        ) {

          showError(
            validationError.msg
          );

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


      showError(
        "Unable to connect to the server."
      );
    }
  };


  // =========================
  // LOGIN
  // =========================

  const handleLoginClick = () => {

    setShowPassword(false);

    onLogin();
  };


  // =========================
  // UI
  // =========================

  return (

    <div className="form-box register">

      <h2>
        Register
      </h2>


      <form
        onSubmit={handleRegister}
      >


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
            COUNTRY
        ========================= */}

        <div className="input-box location-select">

          <select
            name="country"
            value={selectedCountry}
            onChange={
              handleCountryChange
            }
            required
          >

            <option
              value=""
              disabled
            >
              Select Country
            </option>


            {countries.map(
              (country) => (

                <option
                  key={
                    country.isoCode
                  }
                  value={
                    country.isoCode
                  }
                >
                  {country.name}
                </option>

              )
            )}

          </select>


          <i className="bx bxs-globe"></i>

        </div>


        {/* =========================
            STATE
        ========================= */}

        <div className="input-box location-select">

          <select
            name="state"
            value={selectedState}
            onChange={
              handleStateChange
            }
            disabled={
              !selectedCountry
            }
            required
          >

            <option
              value=""
              disabled
            >
              {selectedCountry
                ? "Select State"
                : "Select Country First"}
            </option>


            {states.map(
              (state) => (

                <option
                  key={
                    state.isoCode
                  }
                  value={
                    state.isoCode
                  }
                >
                  {state.name}
                </option>

              )
            )}

          </select>


          <i className="bx bx-landmark"></i>

        </div>


        {/* =========================
            CITY
        ========================= */}

        <div className="input-box location-select">

          <select
            name="city"
            value={selectedCity}
            onChange={
              handleCityChange
            }
            disabled={
              !selectedCountry ||
              !selectedState
            }
            required
          >

            <option
              value=""
              disabled
            >
              {!selectedCountry
                ? "Select Country First"
                : !selectedState
                ? "Select State First"
                : "Select City"}
            </option>


            {cities.map(
              (city, index) => (

                <option
                  key={
                    `${city.name}-${index}`
                  }
                  value={
                    city.name
                  }
                >
                  {city.name}
                </option>

              )
            )}

          </select>


          <i className="bx bx-city"></i>

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


          <button
            type="button"
            className="password-toggle"
            onClick={() =>
              setShowPassword(
                !showPassword
              )
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
            onClick={
              handleLoginClick
            }
          >
            Login
          </button>

        </p>

      </form>

    </div>
  );
}


export default Register;