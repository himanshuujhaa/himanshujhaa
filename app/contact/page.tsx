"use client";

import { useState, FormEvent } from "react";

export default function ContactPage() {
    const [submitted, setSubmitted] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });

    const handleChanges = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        console.log("Submitting form data from browser:", formData);

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            console.log("Server responded with status:", res.status);

            if (res.ok) {
                const data = await res.json();
                console.log("Server response body:", data);
                setSubmitted(true);
                setFormData({
                    name: "",
                    email: "",
                    subject: "",
                    message: ""
                });
            } else {
                console.error("Server error response status:", res.status);
                alert("Something went wrong. Please try again.");
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            alert("Something went wrong. Please try again.");
        }
    };

    return (
        <main className="max-w-7xl mx-auto px-6 py-16 space-y-16">
            {/* Header */}
            <div className="max-w-3xl">
                <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                    Get In <span className="gradient-text">Touch</span>
                </h1>
                <p className="mt-4 text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                    Have a project proposal, engineering inquiry, or just want to say hi? I&apos;d love to connect.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                {/* Contact Info Cards */}
                <div className="lg:col-span-5 space-y-6">
                    <div className="glass-card p-6 rounded-2xl flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center text-white shrink-0">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 002-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Email</h3>
                            <a href="mailto:himanshuprincejha2001@gmail.com" className="text-slate-900 dark:text-white font-semibold hover:text-blue-500 transition-colors">
                                contact@himanshujha.com
                            </a>
                        </div>
                    </div>

                    <div className="glass-card p-6 rounded-2xl flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-xl bg-purple-600 flex items-center justify-center text-white shrink-0">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">GitHub</h3>
                            <a href="https://github.com/himanshuujhaa" target="_blank" rel="noopener noreferrer" className="text-slate-900 dark:text-white font-semibold hover:text-blue-500 transition-colors">
                                github.com/himanshujha
                            </a>
                        </div>
                    </div>

                    <div className="glass-card p-6 rounded-2xl flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center text-white shrink-0">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.262-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">LinkedIn</h3>
                            <a href="https://www.linkedin.com/in/himanshujhaa/" target="_blank" rel="noopener noreferrer" className="text-slate-900 dark:text-white font-semibold hover:text-blue-500 transition-colors">
                                linkedin.com/in/himanshujha
                            </a>
                        </div>
                    </div>
                </div>

                {/* Contact Form */}
                <div className="lg:col-span-7">
                    <div className="glass-card p-8 sm:p-10 rounded-3xl">
                        {submitted ? (
                            <div className="text-center py-12 space-y-4">
                                <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500 mx-auto flex items-center justify-center">
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Message Sent!</h3>
                                <p className="text-slate-600 dark:text-slate-400">Thank you for reaching out. I will get back to you shortly.</p>
                                <button
                                    onClick={() => setSubmitted(false)}
                                    className="mt-4 px-6 py-2.5 rounded-xl gradient-bg text-white text-sm font-medium"
                                >
                                    Send another message
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Send a Message</h2>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">Your Name</label>
                                        <input
                                            name="name"
                                            type="text"
                                            value={formData.name}
                                            onChange={handleChanges}
                                            required
                                            placeholder="Jane Doe"
                                            className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:outline-none focus:border-blue-500 text-slate-900 dark:text-white text-sm transition-colors"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">Your Email</label>
                                        <input
                                            name="email"
                                            type="email"
                                            value={formData.email}
                                            onChange={handleChanges}
                                            required
                                            placeholder="jane@example.com"
                                            className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:outline-none focus:border-blue-500 text-slate-900 dark:text-white text-sm transition-colors"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">Subject</label>
                                    <input
                                        name="subject"
                                        type="text"
                                        value={formData.subject}
                                        onChange={handleChanges}
                                        required
                                        placeholder="Project Inquiry / Collaboration"
                                        className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:outline-none focus:border-blue-500 text-slate-900 dark:text-white text-sm transition-colors"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">Message</label>
                                    <textarea
                                        name="message"
                                        rows={5}
                                        value={formData.message}
                                        onChange={handleChanges}
                                        required
                                        placeholder="Tell me about your project or inquiry..."
                                        className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:outline-none focus:border-blue-500 text-slate-900 dark:text-white text-sm transition-colors resize-none"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full py-4 rounded-xl gradient-bg text-white font-semibold shadow-lg shadow-blue-500/25 hover:scale-[1.01] active:scale-[0.99] transition-all"
                                >
                                    Send Message
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}