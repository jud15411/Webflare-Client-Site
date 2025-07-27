import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CookieConsent from "react-cookie-consent";

// --- Pages ---
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import PortfolioPage from './pages/PortfolioPage';
import AboutPage from './pages/AboutPage';
import PricingPage from './pages/PricingPage';
import ContactPage from './pages/ContactPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsOfServicePage from './pages/TermsOfServicePage'; 
import AccessibilityStatementPage from './pages/AccessibilityStatementPage'; 

// --- Layout Component ---
const Layout = () => (
    <>
        <Navbar />
        <main style={{ minHeight: '80vh' }}>
            <Outlet />
        </main>
        <Footer />
    </>
);

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/terms-of-service" element={<TermsOfServicePage />} />
          <Route path="/accessibility-statement" element={<AccessibilityStatementPage />} />
        </Route>
      </Routes>
      <CookieConsent
            location="bottom"
            buttonText="I understand"
            style={{ background: "#1F2937", borderTop: "1px solid #374151" }}
            buttonStyle={{ color: "#111827", background: "#38BDF8", fontSize: "13px" }}
          >
            This website uses cookies to enhance the user experience.
        </CookieConsent>
    </Router>
  );
}

export default App;