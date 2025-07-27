import React from 'react';
import { Link } from 'react-router-dom'; // <-- Import the Link component
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-section">
                    <h4>Webflare Design Co.</h4>
                    <p>Creating digital experiences that matter.</p>
                </div>
                <div className="footer-section">
                    <h4>Quick Links</h4>
                    <ul>
                        {/* Use Link instead of a for client-side routing */}
                        <li><Link to="/services">Services</Link></li>
                        <li><Link to="/portfolio">Portfolio</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
                        {/* --- THIS IS THE NEW LINK --- */}
                        <li><Link to="/privacy-policy">Privacy Policy</Link></li>
                        <li><Link to="/terms-of-service">Terms of Service</Link></li> 
                        <li><Link to="/accessibility-statement">Accessibility</Link></li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h4>Connect With Us</h4>
                    <div className="social-links">
                        <a href="#">Twitter</a>
                        <a href="#">LinkedIn</a>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p>© {new Date().getFullYear()} Webflare Design Co. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;