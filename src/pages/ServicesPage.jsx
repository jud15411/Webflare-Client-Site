import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import './ServicesPage.css';
import { Helmet } from 'react-helmet-async';

const ServicesPage = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const { data } = await api.get('/api/public/services');
                setServices(data);
            } catch (err) {
                console.error(err);
                setError('Unable to load our services at this time. Please try again later.');
            } finally {
                setLoading(false);
            }
        };
        fetchServices();
    }, []);

    const renderContent = () => {
        if (loading) return <p className="status-message">Loading...</p>;
        if (error) return <p className="status-message error">{error}</p>;
        if (services.length === 0) return <p className="status-message">No services are currently available. Please check back soon!</p>;

        return (
            <div className="services-content-grid">
                {services.map(service => (
                    <div key={service._id} className="service-card">
                        <div className="service-card-header">
                            <h3>{service.name}</h3>
                            <p className="service-description">{service.description}</p>
                        </div>
                        <ul className="service-features">
                            {service.features.map((feature, index) => (
                                <li key={index}>
                                    <span className="checkmark">✓</span> {feature}
                                </li>
                            ))}
                        </ul>
                        <div className="service-footer">
                            <span className="service-price">{service.price}</span>
                            <a href="/contact" className="btn-contact">Get Started</a>
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className="page-container">
            <Helmet>
                <title>Webflare Design Co. | Services</title>
                <meta name="description" content="Explore our professional web services, including custom website design, development, redesigns, and ongoing maintenance plans." />
            </Helmet>
            <header className="page-header">
                <h1>Our Services</h1>
                <p>Providing cutting-edge solutions to grow your business.</p>
            </header>
            {renderContent()}
        </div>
    );
};

export default ServicesPage;