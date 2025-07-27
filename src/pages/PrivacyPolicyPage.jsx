import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { Helmet } from 'react-helmet-async';
import api from '../api/axios';
import './AboutPage.css'; // This stylesheet is now correct

const PrivacyPolicyPage = () => {
    const [pageContent, setPageContent] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPageContent = async () => {
            try {
                const { data } = await api.get('/api/public/pages/Privacy Policy');
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
            {/* --- THIS IS THE CORRECTED HELMET --- */}
            <Helmet>
                <title>Webflare Design Co. | Privacy Policy</title>
                <meta name="description" content="Read the privacy policy for Webflare Design Co." />
            </Helmet>
            <div className="about-content markdown-body">
                <ReactMarkdown>{pageContent}</ReactMarkdown>
            </div>
        </div>
    );
};

export default PrivacyPolicyPage;