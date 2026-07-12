export interface WorkExperience {
  id: string;
  company: string;
  companyShort: string;
  role: string;
  period: string;
  location: string;
  description: string;
  stats?: { value: string; label: string }[];
  contributions: string[];
  technologies: string[];
}

export const experiences: WorkExperience[] = [
  {
    id: "tcs",
    company: "Tata Consultancy Services",
    companyShort: "TCS",
    role: "Software Engineer",
    period: "Apr 2025 - Present",
    location: "India (Kolkata)",
    description: "Worked on enterprise-scale data engineering solutions for a U.S. healthcare client, contributing to cloud migration, data processing pipelines, and Master Data Management (MDM) initiatives. Focused on building reliable, scalable workflows that improved operational efficiency and data quality.",
    stats: [
      { value: "25%", label: "Cloud system performance boost" },
      { value: "20+", label: "Data pipelines automated" },
      { value: "40%", label: "Manual workload reduced" }
    ],
    contributions: [
      "Built scalable backend workflows supporting a U.S. healthcare client's cloud migration, improving overall system performance by 25%.",
      "Developed and automated 20+ production data pipelines using Python and Databricks, reducing manual intervention by 40% while increasing operational reliability.",
      "Optimized complex SQL queries and database schema design, improving batch processing efficiency by more than 25% across high-volume datasets.",
      "Integrated and deployed Reference Data Models (RDM) into Reltio MDM through Databricks, improving consistency and governance of enterprise master data."
    ],
    technologies: [
      "Python",
      "Databricks",
      "SQL",
      "Reltio MDM",
      "Cloud Migration",
      "Data Engineering",
      "ETL",
      "Healthcare"
    ]
  },
  {
    id: "aixtor",
    company: "Aixtor Technologies",
    companyShort: "Aixtor",
    role: "Java Developer Intern",
    period: "Dec 2023 - May 2024",
    location: "India (Ahmedabad)",
    description: "Worked on the Human Resource Management System (HRMS), contributing to backend development, database design, and performance optimization. Collaborated with the development team to deliver production-ready modules within tight timelines.",
    stats: [
      { value: "8 Modules", label: "Shipped in 1.5 months" },
      { value: "20%", label: "Query performance optimization" },
      { value: "Winter 24", label: "Internship Duration" }
    ],
    contributions: [
      "Successfully completed and delivered 8 HRMS modules within 1.5 months, meeting project milestones and development timelines.",
      "Developed backend functionality for multiple HRMS features using Java, ensuring clean, maintainable, and scalable code.",
      "Wrote and optimized complex SQL queries, improving database performance by approximately 20% through query optimization.",
      "Designed relational database schemas for multiple modules, enabling efficient data storage, retrieval, and maintainability.",
      "Collaborated with senior developers during feature development, testing, and debugging to deliver reliable, production-ready solutions."
    ],
    technologies: [
      "Java",
      "SQL",
      "MySQL",
      "JDBC",
      "Database Design",
      "HRMS",
      "Git"
    ]
  }
];
