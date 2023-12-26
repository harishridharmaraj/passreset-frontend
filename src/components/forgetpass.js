import React, { useState } from "react";
import "./styles.css";
import axios from "axios";

const Forgot = () => {
  const [email, setEmail] = useState("");
  const [emailerr, setEmailErr] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const getusers = await axios.get(
      "https://password-rest-zo33.onrender.com/users"
    );
    const userdata = getusers.data;
    const finduser = userdata.some((id) => id.email === email);
    if (finduser) {
      try {
        await axios.put("https://password-rest-zo33.onrender.com/checkemail", {
          email,
        });

        setEmailErr("");
        alert("Verification Mail sent Successfully");
        setEmail("");
      } catch (error) {
        console.log("Error sending Mail", error);
      }
    } else {
      setEmailErr("User E-Mail does not exist");
    }
  };

  return (
    <div className="forgotcontainer">
      <div>
        <h2>Password Reset</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="email"
            placeholder="Enter your Email Address"
            onChange={(e) => setEmail(e.target.value)}
            className="resetinput"
            value={email}
          />
          {emailerr && <div style={{ color: "red" }}>{emailerr}</div>}
          <br />
          <button type="submit" className="resetbtn">
            Reset
          </button>
        </form>
      </div>
    </div>
  );
};

export default Forgot;
