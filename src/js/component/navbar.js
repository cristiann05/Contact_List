import React from "react";
import { Link } from "react-router-dom";
import "../../styles/navbar.css";

export const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="container">
                <Link to="/" className="navbar-brand">
                    Contact List
                </Link>
                <div className="navbar-actions">
                    <Link to="/demo" className="custom-btn">
                        Add New Contact
                        <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"/>
                        </svg>
                    </Link>
                </div>
            </div>
        </nav>
    );
};
