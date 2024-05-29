import React, { useState } from "react";
import axios from "axios";

const Profile = () => {
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    console.log(token);
    try {
      const response = await axios.put(
        "http://localhost:4000/profile",
        {
          username,
          bio,
        },
        {
          headers: { "x-token": token },
        }
      );
      alert(response.data.message);
    } catch (error) {
      alert(error.response.data.message || "Profile update failed");
    }
  };

  return (
    <div className="card mt-5">
      <div className="card-header">
        Update Profile
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="profileUsername">Username</label>
              <input
                type="text"
                className="form-control"
                id="profileUsername"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="profileBio">Bio</label>
              <input
                type="text"
                className="form-control"
                id="profileUsername"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Update Profile
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
