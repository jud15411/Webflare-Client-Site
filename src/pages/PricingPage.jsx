import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import './PricingPage.css';
import { Helmet } from 'react-helmet-async';

const PricingPage = () => {
    const [tiers, setTiers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchTiers = async () => {
            try {
                const { data } = await api.get('/api/public/pricing');
                setTiers(data);
            } catch (err) {
                setError('Unable to load pricing at this time. Please check back later.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchTiers();
    }, []);

    // --- NEW: Separate featured tiers from standard tiers ---
    const featuredTiers = tiers.filter(tier => tier.isFeatured);
    const standardTiers = tiers.filter(tier => !tier.isFeatured);

    const renderContent = () => {
        if (loading) {
            return <p className="status-message">Loading Plans...</p>;
        }
        if (error) {
            return <p className="status-message error">{error}</p>;
        }
        if (tiers.length === 0) {
            return <p className="status-message">No pricing plans are available right now.</p>;
        }
        return (
            <>
                {/* --- Featured Section --- */}
                {featuredTiers.length > 0 && (
                    <div className="featured-section">
                        <h2>Our Most Popular Plans</h2>
                        <div className="pricing-grid">
                            {featuredTiers.map(tier => (
                                <div key={tier._id} className="pricing-card featured">
                                    <div className="featured-badge">Most Popular</div>
                                    <h3>{tier.name}</h3>
                                    <p className="tier-description">{tier.description}</p>
                                    <div className="price">{tier.price} <span className="frequency">/ {tier.frequency}</span></div>
                                    <ul className="features-list">
                                        {tier.features.map((feature, index) => <li key={index}>{feature}</li>)}
                                    </ul>
                                    <a href="/contact" className="btn-primary">Get Started</a>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* --- Standard Section --- */}
                {standardTiers.length > 0 && (
                    <div className="standard-section">
                        <h2>Standard Packages</h2>
                        <div className="pricing-grid">
                            {standardTiers.map(tier => (
                                <div key={tier._id} className="pricing-card">
                                    <h3>{tier.name}</h3>
                                    <p className="tier-description">{tier.description}</p>
                                    <div className="price">{tier.price} <span className="frequency">/ {tier.frequency}</span></div>
                                    <ul className="features-list">
                                        {tier.features.map((feature, index) => <li key={index}>{feature}</li>)}
                                    </ul>
                                    <a href="/contact" className="btn-primary">Get Started</a>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </>
        );
    };

    return (
        <div className="page-container">
            <Helmet>
                <title>Webflare Design Co. | Pricing</title>
                <meta name="description" content="Find the perfect package for your needs. We offer transparent and flexible pricing plans for businesses of all sizes." />
            </Helmet>
            <header className="page-header">
                <h1>Flexible Plans for Every Need</h1>
                <p>Choose the perfect package to kickstart your project.</p>
            </header>
            {renderContent()}
        </div>
    );
};

export default PricingPage;