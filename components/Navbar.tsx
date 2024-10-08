import Image from "next/image";
import React from "react";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";
import "bootstrap/dist/css/bootstrap.min.css";

const Navbar = () => {
  return (
    <nav
      className="navbar navbar-expand-lg navbar-light bg-light mx-3"
      style={{ margin: 0, padding: 0 }}
    >
      <a className="navbar-brand" href="#">
        <Image
          src="/logo.png"
          alt="logo"
          width={70}
          height={60}
          style={{ borderRadius: "1rem" }}
        />
      </a>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className={`nav-link`} href="#">
              Home
            </a>
          </li>
          <li className="nav-item">
            <a className={`nav-link`} href="#">
              History
            </a>
          </li>
          <li className="nav-item">
            <a className={`nav-link`} href="#">
              Help
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
