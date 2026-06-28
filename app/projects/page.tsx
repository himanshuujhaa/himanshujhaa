import { projects } from "@/data/projects";
import Link from "next/link";

export default function ProjectsPage() {
    return (
        <div>
            {projects.map((project) => (
                <div key={project.slug}>
                    <h2>{project.title}</h2>
                    <Link href={`/projects/${project.slug}`}>
                        View Project
                    </Link>
                </div>
            ))}
        </div>
    );
}