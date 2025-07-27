import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    // Close menu when a link is clicked for a better mobile experience
    const handleLinkClick = () => {
        setIsMenuOpen(false);
    };

    // Prevent the page from scrolling when the mobile menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        // Cleanup function to reset the style when the component unmounts
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isMenuOpen]);

    return (
        <>
            <header className="navbar sticky">
                <div className="navbar-container">
                    <NavLink to="/" className="nav-logo" onClick={handleLinkClick}>Webflare Design Co.</NavLink>

                    {/* Desktop Navigation Menu */}
                    <nav className="nav-menu-desktop">
                        <NavLink to="/" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Home</NavLink>
                        <NavLink to="/services" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Services</NavLink>
                        <NavLink to="/portfolio" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Portfolio</NavLink>
                        <NavLink to="/about" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>About Us</NavLink>
                        <NavLink to="/pricing" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Pricing</NavLink>
                        <NavLink to="/contact" className="nav-link cta-button">Get a Quote</NavLink>
                    </nav>

                    {/* Hamburger Menu Button for Mobile */}
                    <button className={`hamburger-menu ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}>
                        <div className="bar"></div>
                        <div className="bar"></div>
                        <div className="bar"></div>
                    </button>
                </div>
            </header>

            {/* Mobile Menu Backdrop & Sidebar */}
            <div className={`mobile-nav-backdrop ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}></div>
            <nav className={`nav-menu-mobile ${isMenuOpen ? 'active' : ''}`}>
                <NavLink to="/" className="nav-link" onClick={handleLinkClick}>Home</NavLink>
                <NavLink to="/services" className="nav-link" onClick={handleLinkClick}>Services</NavLink>
                <NavLink to="/portfolio" className="nav-link" onClick={handleLinkClick}>Portfolio</NavLink>
                <NavLink to="/about" className="nav-link" onClick={handleLinkClick}>About Us</NavLink>
                <NavLink to="/pricing" className="nav-link" onClick={handleLinkClick}>Pricing</NavLink>
                <NavLink to="/contact" className="nav-link" onClick={handleLinkClick}>Contact</NavLink>
            </nav>
        </>
    );
};

export default Navbar;