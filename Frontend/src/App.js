// import './App.css';
import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import Profile from "./Components/Profile";
import CreateCommunity from "./Components/CreateCommunity";
import ShareResource from "./Components/ShareResource";
import JoinCommunity from "./Components/JoinCommunity";

function App() {
  return (
    <BrowserRouter>
      <div className="container mt-5">
        <h1 className="text-center">Discussify</h1>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link className="navbar-brand" to="/">
            Home
          </Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav mr-auto">
              <li className="`nav-item">
                <Link className="nav-link" to="/signup">
                  SignUp
                </Link>
              </li>
              <li className="`nav-item">
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>
              <li className="`nav-item">
                <Link className="nav-link" to="/profile">
                  Profile
                </Link>
              </li>
              <li className="`nav-item">
                <Link className="nav-link" to="/create_community ">
                  Create Community
                </Link>
              </li>
              <li className="`nav-item">
                <Link className="nav-link" to="/share-resource">
                  Share Resource
                </Link>
              </li>
              <li className="`nav-item">
                <Link className="nav-link" to="/join-community">
                  Join Community
                </Link>
              </li>
            </ul>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<h3>Welcome to Discussify</h3>} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/create_community" element={<CreateCommunity />} />
          <Route path="/share-resource" element={<ShareResource />} />
          <Route path="/join-community" element={<JoinCommunity />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
