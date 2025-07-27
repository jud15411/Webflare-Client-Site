import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    return (
        <header className="navbar sticky">
            <div className="navbar-container">
                <NavLink to="/" className="nav-logo">Webflare Design Co.</NavLink>
                <nav className="nav-menu">
                    <NavLink to="/" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Home</NavLink>
                    <NavLink to="/services" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Services</NavLink>
                    <NavLink to="/portfolio" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Portfolio</NavLink>
                    <NavLink to="/about" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>About Us</NavLink>
                    <NavLink to="/pricing" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Pricing</NavLink>
                    <NavLink to="/contact" className="nav-link cta-button">Get a Quote</NavLink>
                </nav>
            </div>
        </header>
    );
};

export default Navbar;