import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardTitle } from "../components/ui/card";
import { Search, Filter } from "lucide-react";
import type { Base64Image, Project, ProjectId } from "../types";
import { Badge } from "../components/ui/badge";

function ProjectCard(
    project: {
        id: ProjectId;
        name: string;
        description: string;
        category: string;
        thumbnail: Base64Image;
        progress: number;
        goal: number;
    } & {
        onClick?: () => void;
    }
) {
    return (
        <Card
            className="hover:shadow-lg transition-shadow cursor-pointer"
            onClick={project.onClick}
        >
            <CardContent className="p-0">
                {/* Image placeholder on top */}
                <div className="w-full h-32 bg-gray-400 flex items-center justify-center">
                    <span className="text-black font-medium">Image</span>
                </div>

                {/* Content below image */}
                <div className="p-4 space-y-3">
                    {/* Title */}
                    <h3 className="text-lg font-semibold text-black">
                        {project.name}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-black leading-relaxed">
                        {project.description}
                    </p>

                    {/* Progress Bar */}
                    <div className="space-y-2">
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-black">Progress</span>
                            <span className="text-black font-medium">
                                {project.progress}%
                            </span>
                        </div>
                        <div className="w-full bg-gray-300 rounded-full h-2">
                            <div
                                className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${project.progress}%` }}
                            ></div>
                        </div>
                    </div>

                    {/* Category Button */}
                    <div className="flex justify-center">
                        <Button
                            className="bg-black text-white hover:bg-gray-800 px-4 py-2 rounded"
                            size="sm"
                        >
                            {project.category}
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

// Sample project data
export const projects: Project[] = [
    {
        id: "proj-001",
        name: "Community Garden",
        description: "Build and maintain a garden in the local park.",
        category: "Environment",
        dateStarted: "2024-03-01",
        dateCompleted: undefined,
        thumbnail: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...",
        progress: 30,
        goal: 100,
        contact: "garden@community.org",
        citizenContributions: {
            "4c8f6d82-e4c6-4478-92eb-d9342500f006": 50,
            "7884a866-4ae1-4945-9fba-b2b8d2b7c5a9": 20
        },
        businessDonations: [
            {
                donor: "f0ab14ef-6cdc-4c1e-ae52-04de6c844dbc",
                equipment: "Shovel",
                estimatedValue: 50
            },
            {
                donor: "7c09e008-a836-4607-9c59-6336a07368c0",
                equipment: "Seeds",
                estimatedValue: 5
            }
        ]
    },
    {
        id: "proj-002",
        name: "Art Mural",
        description: "Create a mural for the city center wall.",
        category: "Art",
        dateStarted: "2024-05-18",
        dateCompleted: undefined,
        thumbnail: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...",
        progress: 70,
        goal: 100,
        contact: "art@city.org",
        citizenContributions: {
            "ce93ac0e-aade-423e-94f4-85cd33a15dbb": 60,
            "8fd03d6b-b1d6-4dc0-8985-b7c9f3115089": 10
        },
        businessDonations: [
            {
                donor: "a9adff1f-b61b-493d-9c47-9e4ea62e3ae7",
                equipment: "Paint",
                estimatedValue: 20
            }
        ]
    },
    {
        id: "proj-003",
        name: "Tech Workshop",
        description: "Teach programming basics to youth.",
        category: "Education",
        dateStarted: "2024-07-01",
        dateCompleted: undefined,
        thumbnail: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...",
        progress: 45,
        goal: 100,
        contact: "tech@workshop.org",
        citizenContributions: {
            "c8eea5d1-2a3b-499b-9aee-555760ba0cf9": 30
        },
        businessDonations: [
            {
                donor: "aab8614f-94d6-4e4e-b9d5-00deae751184",
                equipment: "Laptops",
                estimatedValue: 10
            }
        ]
    },
    {
        id: "proj-004",
        name: "Street Clean-Up",
        description: "Monthly clean-up of major streets.",
        category: "Community Service",
        dateStarted: "2024-04-10",
        dateCompleted: "2024-08-05",
        thumbnail: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...",
        progress: 100,
        goal: 100,
        contact: "cleanup@community.org",
        citizenContributions: {
            "2ccab30f-80bf-4b33-9918-b374f7e9dd4e": 25,
            "af8cc079-71e8-45ed-9bfe-9445174dc231": 40
        },
        businessDonations: [
            {
                donor: "5f830f6c-1cca-4276-8db3-9d8de320fba0",
                equipment: "Gloves",
                estimatedValue: 50
            }
        ]
    },
    {
        id: "proj-005",
        name: "Solar Panel Installation",
        description: "Equip the library with solar panels.",
        category: "Sustainability",
        dateStarted: "2024-02-19",
        dateCompleted: undefined,
        thumbnail: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...",
        progress: 60,
        goal: 100,
        contact: "solar@city.org",
        citizenContributions: {
            "30358007-5b19-47b8-979f-5b8afaae1e44": 35,
            "ddf30d9e-0865-48d8-88ed-648c28710853": 15
        },
        businessDonations: [
            {
                donor: "16f27f95-5b85-4d54-9905-0fdaa036b0a8",
                equipment: "Solar Panels",
                estimatedValue: 10
            }
        ]
    }
] as const;

export default function Project() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("category");
    const navigate = useNavigate();

    const filteredProjects = useMemo(() => {
        const lowerQuery = searchQuery.toLowerCase();
        return projects.filter(
            (p) =>
                p.name.toLowerCase().includes(lowerQuery) ||
                p.description.toLowerCase().includes(lowerQuery) ||
                p.category.toLowerCase().includes(lowerQuery)
        );
    }, [searchQuery, projects]);

    const categories = ["category", "category", "category"];

    const handleProjectClick = (project: any) => {
        navigate(`/project/${project.id}`);
    };

    return (
        <main className="flex-1 bg-gray-50">
            <div className="flex-1 p-6">
                <header className="mb-6">
                    <h1 className="text-2xl font-bold mb-4">Projects</h1>

                    {/* Search and Filter Bar */}
                    <div className="flex items-center gap-3 mb-6">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <Input
                                type="text"
                                placeholder="Search projects..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10"
                            />
                        </div>

                        {/* Filter Button */}
                        <Button variant="outline" size="default">
                            <Filter className="w-4 h-4" color="white" />
                        </Button>
                    </div>

                    {/* Category Buttons */}
                    <div className="flex items-center gap-3">
                        {categories.map((category, index) => (
                            <Button
                                key={index}
                                variant={
                                    selectedCategory === category
                                        ? "default"
                                        : "outline"
                                }
                                size="sm"
                                onClick={() => setSelectedCategory(category)}
                                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                                    selectedCategory === category
                                        ? "bg-gray-500 text-white hover:bg-gray-600"
                                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                                }`}
                            >
                                {category}
                            </Button>
                        ))}
                    </div>
                </header>

                {/* Projects Grid with Category Headers */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProjects.map((project) => (
                        <div className="space-y-4">
                            <ProjectCard
                                onClick={() => handleProjectClick(project)}
                                {...project}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
