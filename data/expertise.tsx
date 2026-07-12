import React from "react";

export interface ExpertiseItem {
    icon: React.ReactNode;
    title: string;
    description: string;
}

export const expertise: ExpertiseItem[] = [
    {
        icon: (
            <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14M12 5l7 7-7 7" />
            </svg>
        ),
        title: "Backend Architecture",
        description: "Designing scalable enterprise services, RESTful APIs, and robust data models with Java, Spring Boot, and relational databases.",
    },
    {
        icon: (
            <svg className="w-8 h-8 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
        ),
        title: "Full-Stack Web Engineering",
        description: "Building fast, dynamic, and accessible frontend interfaces using React, Next.js, and modern CSS utility frameworks.",
    },
    {
        icon: (
            <svg className="w-8 h-8 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15a4 4 0 100-8 4 4 0 000 8z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v4M8 20h8" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 9h2a2 2 0 012 2v1a2 2 0 01-2 2h-2M8 9H6a2 2 0 00-2 2v1a2 2 0 002 2h2" />
            </svg>
        ),
        title: "System Design",
        description: "Architecting scalable, distributed systems with a strong emphasis on microservices, asynchronous communication, and data consistency patterns.",
    },
    {
        icon: (
            <svg className="w-8 h-8 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15a4 4 0 100-8 4 4 0 000 8z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v4M8 20h8" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 9h2a2 2 0 012 2v1a2 2 0 01-2 2h-2M8 9H6a2 2 0 00-2 2v1a2 2 0 002 2h2" />
            </svg>
        ),
        title: "Competitive Programming",
        description: "Solving complex algorithmic puzzles and optimizing code for maximum speed and efficiency using advanced data structures and algorithms.",
    },
    {
        icon: (
            <svg className="w-8 h-8 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 5h10a2 2 0 012 2v10a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2zM9 9h6v6H9V9z" />
            </svg>
        ),
        title: "Learning AI Engineering using OLLAMA",
        description: "Exploring local LLM orchestration and running open-source models (like Llama 3 and Mistral) offline with Ollama, focusing on local embeddings and model integration.",
    },
    {
        icon: (
            <svg className="w-8 h-8 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
        ),
        title: "AI Integration & Agents",
        description: "Leveraging LLM APIs, prompt engineering, and modern AI frameworks to create intuitive intelligent applications and automation tools.",
    }
];