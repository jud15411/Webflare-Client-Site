import React, { useState, useRef } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import ReCAPTCHA from 'react-google-recaptcha'; // <-- Import ReCAPTCHA
import './ContactPage.css';
import { Helmet } from 'react-helmet-async';

const ContactPage = () => {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const recaptchaRef = useRef(null); // <-- Create a ref for reCAPTCHA

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            message: '',
            recaptcha: '', // <-- Add recaptcha to form values
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Required'),
            email: Yup.string().email('Invalid email address').required('Required'),
            message: Yup.string().required('Required'),
            recaptcha: Yup.string().required('Please verify that you are not a robot.'), // <-- Add validation
        }),
        onSubmit: async (values, { setSubmitting, resetForm }) => {
            try {
                await axios.post(process.env.REACT_APP_FORMSPREE_ENDPOINT, values);
                setIsSubmitted(true);
                resetForm();
            } catch (error) {
                alert('Sorry, there was an error sending your message. Please try again later.');
                console.error("Form submission error:", error);
            } finally {
                setSubmitting(false);
                recaptchaRef.current.reset(); // <-- Reset reCAPTCHA after submission
            }
        },
    });

    return (
        <div className="page-container">
            <Helmet>
                <title>Contact Us | Webflare Design Co.</title>
                <meta name="description" content="Ready to start a project or have a question? Get in touch with the Webflare Design Co. team today to discuss your ideas." />
            </Helmet>
            <header className="page-header">
                <h1>Get In Touch</h1>
                <p>We'd love to hear from you. Let's build something great together.</p>
            </header>
            
            {isSubmitted ? (
                <div className="success-message">
                    <h3>Thank You!</h3>
                    <p>Your message has been sent successfully. We'll get back to you shortly.</p>
                    <button onClick={() => setIsSubmitted(false)} className="btn-secondary">Send Another Message</button>
                </div>
            ) : (
                <form onSubmit={formik.handleSubmit} className="contact-form">
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input id="name" type="text" {...formik.getFieldProps('name')} />
                        {formik.touched.name && formik.errors.name ? <div className="error">{formik.errors.name}</div> : null}
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input id="email" type="email" {...formik.getFieldProps('email')} />
                        {formik.touched.email && formik.errors.email ? <div className="error">{formik.errors.email}</div> : null}
                    </div>
                    <div className="form-group">
                        <label htmlFor="message">Message</label>
                        <textarea id="message" rows="6" {...formik.getFieldProps('message')}></textarea>
                        {formik.touched.message && formik.errors.message ? <div className="error">{formik.errors.message}</div> : null}
                    </div>

                    {/* --- NEW ReCAPTCHA Component --- */}
                    <div className="form-group">
                        <ReCAPTCHA
                            ref={recaptchaRef}
                            sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
                            onChange={(token) => formik.setFieldValue('recaptcha', token)}
                        />
                        {formik.touched.recaptcha && formik.errors.recaptcha ? <div className="error">{formik.errors.recaptcha}</div> : null}
                    </div>
                    
                    <button type="submit" disabled={formik.isSubmitting}>
                        {formik.isSubmitting ? 'Sending...' : 'Send Message'}
                    </button>
                </form>
            )}
        </div>
    );
};

export default ContactPage;