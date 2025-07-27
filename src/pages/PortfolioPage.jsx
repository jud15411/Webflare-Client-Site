import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import './PortfolioPage.css';
import { Helmet } from 'react-helmet-async';

const PortfolioPage = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                // Fetch all active portfolio projects from the public API
                const { data } = await api.get('/api/public/portfolio');
                setProjects(data);
            } catch (err) {
                setError('Unable to load our work at this time. Please try again later.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchProjects();
    }, []);

    const renderContent = () => {
        if (loading) {
            return <p className="status-message">Loading Projects...</p>;
        }
        if (error) {
            return <p className="status-message error">{error}</p>;
        }
        if (projects.length === 0) {
            return <p className="status-message">We're busy creating new things! Check back soon to see our latest work.</p>;
        }
        return (
            <div className="portfolio-grid">
                {projects.map(project => (
                    <div key={project._id} className="portfolio-card">
                        <img src={project.imageUrl} alt={project.title} />
                        <div className="portfolio-info">
                            <h3>{project.title}</h3>
                            <span>{project.tags.join(' / ')}</span>
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className="page-container">
            <Helmet>
                <title>Webflare Design Co. | Portfolio</title>
                <meta name="description" content="View our portfolio of recently completed web design and development projects. See the results we've delivered for our clients." />
            </Helmet>
            <header className="page-header">
                <h1>Our Work</h1>
                <p>We take pride in the solutions we've delivered.</p>
            </header>
            {renderContent()}
        </div>
    );
};

export default PortfolioPage;