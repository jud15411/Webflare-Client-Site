import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import api from '../api/axios';
import './AboutPage.css';
import { Helmet } from 'react-helmet-async';

const AboutPage = () => {
    const [pageContent, setPageContent] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPageContent = async () => {
            try {
                // Fetch the content for the "About Us" page specifically
                const { data } = await api.get('/api/public/pages/About Us');
                setPageContent(data.content);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchPageContent();
    }, []);

    if (loading) return <div className="page-container"><p>Loading...</p></div>;

    return (
        <div className="page-container">
            <Helmet>
                <title>Webflare Design Co. | About</title>
                <meta name="description" content="Learn about Webflare Design Co.'s mission, vision, and the team dedicated to building exceptional digital experiences." />
            </Helmet>
            {/* The entire content of the page is now rendered from your CMS */}
            <div className="about-content markdown-body">
                <ReactMarkdown>{pageContent}</ReactMarkdown>
            </div>
        </div>
    );
};

export default AboutPage;