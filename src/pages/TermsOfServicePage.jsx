import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { Helmet } from 'react-helmet-async';
import api from '../api/axios';
import './AboutPage.css'; // Reuse the same styles

const TermsOfServicePage = () => {
    const [pageContent, setPageContent] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPageContent = async () => {
            try {
                const { data } = await api.get('/api/public/pages/Terms of Service');
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
                <title>Terms of Service | Webflare Design Co.</title>
                <meta name="description" content="Read the terms and conditions for using the Webflare Design Co. website and services." />
            </Helmet>
            <div className="about-content markdown-body">
                <ReactMarkdown>{pageContent}</ReactMarkdown>
            </div>
        </div>
    );
};

export default TermsOfServicePage;