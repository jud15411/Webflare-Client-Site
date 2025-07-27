import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios'; // Your central API instance
import './HomePage.css';
import { Helmet } from 'react-helmet-async';

const HomePage = () => {
    // State for all dynamic content
    const [featuredProjects, setFeaturedProjects] = useState([]);
    const [testimonials, setTestimonials] = useState([]);
    const [error, setError] = useState('');

    // Fetch all necessary data when the component mounts
    useEffect(() => {
        const fetchHomepageData = async () => {
            try {
                // Use Promise.all to fetch both sets of data concurrently for better performance
                const [projectsRes, testimonialsRes] = await Promise.all([
                    api.get('/api/public/portfolio/featured'), // Correct API call for featured projects
                    api.get('/api/public/testimonials')      // Correct API call for testimonials
                ]);
                setFeaturedProjects(projectsRes.data);
                setTestimonials(testimonialsRes.data);
            } catch (error) {
                console.error("Failed to fetch homepage data", error);
                setError('Could not load dynamic content. Please ensure the backend is running and accessible.');
            }
        };
        fetchHomepageData();
    }, []);

    // Static data for the services overview section can remain
    const featuredServices = [
        { name: 'Web Design', description: 'Stunning designs that captivate your audience.', icon: '🎨' },
        { name: 'Development', description: 'Robust and scalable code for seamless performance.', icon: '💻' },
        { name: 'SEO & Growth', description: 'Strategies that rank you higher and grow your business.', icon: '📈' },
    ];

    return (
        <div className="home-page">
            <Helmet>
                <title>Webflare Design Co. | Home</title>
                <meta name="description" content="Webflare Design Co. builds high-performance websites that are beautiful, responsive, and engineered to drive growth for your business. Get a quote today." />
            </Helmet>
            {/* --- Hero Section --- */}
            <section className="hero-section">
                <div className="hero-content">
                    <h1 className="hero-title">Building Digital Experiences That Drive Results</h1>
                    <p className="hero-subtitle">We craft high-performance websites that are not only beautiful but are engineered to convert visitors into customers.</p>
                    <div className="hero-buttons">
                        <Link to="/portfolio" className="btn btn-primary">View Our Work</Link>
                        <Link to="/contact" className="btn btn-secondary">Get a Quote</Link>
                    </div>
                </div>
            </section>

            {/* --- Services Overview --- */}
            <section className="home-section services-overview">
                <h2 className="section-title">What We Do</h2>
                <div className="services-grid">
                    {featuredServices.map(service => (
                        <div key={service.name} className="service-preview-card">
                            <div className="service-icon">{service.icon}</div>
                            <h3>{service.name}</h3>
                            <p>{service.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* --- Error Display --- */}
            {error && <div className="home-error-message">{error}</div>}

            {/* --- DYNAMIC PORTFOLIO PREVIEW --- */}
            {/* This section will now appear once featured projects are fetched */}
            {featuredProjects.length > 0 && (
                 <section className="home-section portfolio-preview">
                    <h2 className="section-title">Our Featured Work</h2>
                    <div className="portfolio-preview-grid">
                        {featuredProjects.map(project => (
                            <Link to="/portfolio" key={project._id} className="portfolio-preview-card">
                                <img src={project.imageUrl} alt={project.title} />
                                <div className="overlay"><h3>{project.title}</h3></div>
                            </Link>
                        ))}
                    </div>
                </section>
            )}

            {/* --- DYNAMIC TESTIMONIALS --- */}
            {/* This section will now appear once testimonials are fetched */}
            {testimonials.length > 0 && (
                <section className="home-section testimonials-section">
                    <h2 className="section-title">What Our Clients Say</h2>
                    {testimonials.map((testimonial) => (
                        <blockquote key={testimonial._id} className="testimonial-card">
                            <p>"{testimonial.quote}"</p>
                            <footer>— {testimonial.clientName}, {testimonial.company}</footer>
                        </blockquote>
                    ))}
                </section>
            )}

            {/* --- Call to Action --- */}
            <section className="home-section cta-section">
                <h2 className="section-title">Ready to Start Your Project?</h2>
                <p>Let's work together to create something amazing.</p>
                <Link to="/contact" className="btn btn-primary">Let's Talk</Link>
            </section>
        </div>
    );
};

export default HomePage;