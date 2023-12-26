import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./styles.css";

const NewPass = () => {
  const { passtoken } = useParams();
  const [newPass, setNewPass] = useState("");
  const [err, setErr] = useState("");
  const [fetchError, setFetchError] = useState("");
  useEffect(() => {
    const checkuservalidity = async () => {
      try {
        const checkuser = await axios.get(
          "https://password-rest-zo33.onrender.com/users"
        );
        const userdata = checkuser.data;
        const founduser = userdata.some((id) => id.passwordtoken === passtoken);
        if (!founduser) {
          setFetchError("Token expired");
        }
      } catch (error) {
        console.log("Error fetching user data", error);
        setFetchError("Error checking token validity");
      }
    };

    checkuservalidity();
  }, [passtoken]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const getusers = await axios.get(
        "https://password-rest-zo33.onrender.com/users"
      );
      const userdata = getusers.data;
      const finduser = userdata.some((id) => id.passwordtoken === passtoken);
      if (finduser) {
        await axios.put(
          `https://password-rest-zo33.onrender.com/createpass/${passtoken}`,
          {
            newPass,
          }
        );
      }
      setNewPass("");
      setFetchError("Password Changed Successfully");
    } catch (error) {
      console.log("Error updating password", error);
      setErr("Error updating password");
    }
  };
  return (
    <div className="newpasscontainer">
      {fetchError ? (
        <div>{fetchError}</div>
      ) : (
        <div className="newpassform">
          <h2>Enter New Password here</h2>
          <form className="newpass" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="New Password"
              value={newPass}
              onChange={(e) => setNewPass(e.target.value)}
            />
            <br />
            <br />
            <input
              type="text"
              placeholder="Confirm New Password"
              onChange={(e) => {
                if (e.target.value !== newPass) {
                  setErr("Password does not match");
                } else {
                  setErr("");
                }
              }}
            />
            {err && <div style={{ color: "red" }}>{err}</div>}
            <br />

            <button type="Submit" className="newpassbtn">
              Submit
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default NewPass;
