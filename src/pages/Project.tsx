import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "../components/ui/card";
import { Search, Filter } from "lucide-react";

interface ProjectCardProps {
    title: string;
    description: string;
    category: string;
    progress?: number;
    onClick?: () => void;
}



function ProjectCard({
    title,
    description,
    progress = 75,
    onClick,
}: Omit<ProjectCardProps, "category"> & {
    progress?: number;
    onClick?: () => void;
}) {
    return (
        <Card className="hover:shadow-lg transition-shadow mb-4">
            <CardContent className="p-4 flex items-start gap-4">
                {/* Image placeholder on the left */}
                <div className="w-16 h-16 bg-gray-200 flex-shrink-0 relative">
                    {/* Diagonal lines to match Figma design */}
                    <svg
                        className="w-full h-full opacity-50"
                        viewBox="0 0 64 64"
                    >
                        <line
                            x1="16"
                            y1="16"
                            x2="48"
                            y2="48"
                            stroke="gray"
                            strokeWidth="1"
                        />
                        <line
                            x1="16"
                            y1="48"
                            x2="48"
                            y2="16"
                            stroke="gray"
                            strokeWidth="1"
                        />
                    </svg>
                </div>

                {/* Content on the right */}
                <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-2">
                        <CardTitle
                            className="text-base font-semibold cursor-pointer hover:text-blue-600 transition-colors"
                            onClick={onClick}
                        >
                            {title}
                        </CardTitle>
                        <div className="text-xs text-gray-400">view</div>
                    </div>

                    <p className="text-sm text-gray-600 leading-relaxed mb-3 line-clamp-2">
                        {description}
                    </p>

                    {/* Progress Bar */}
                    <div className="space-y-1">
                        <div className="flex justify-between items-center text-xs">
                            <span className="text-gray-500">Progress</span>
                            <span className="text-gray-600 font-medium">
                                {progress}%
                            </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                                className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${progress}%` }}
                            ></div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

export default function Project() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("category");
    const navigate = useNavigate();

    // Sample project data organized by columns
    const projectColumns = [
        {
            category: "category header",
            projects: [
                {
                    id: 1,
                    title: "Project Title",
                    description:
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                    progress: 85,
                    category: "Category",
                    totalGoal: "XXXXXXXX out of XXXX",
                    activeDays: "XXX Active Days",
                },
                {
                    id: 2,
                    title: "Project Title",
                    description:
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
                    progress: 60,
                },
                {
                    id: 3,
                    title: "Project Title",
                    description:
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
                    progress: 92,
                },
                {
                    id: 4,
                    title: "Project Title",
                    description:
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
                    progress: 45,
                },
            ],
        },
        {
            category: "category header",
            projects: [
                {
                    id: 5,
                    title: "Project Title",
                    description:
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
                    progress: 78,
                },
                {
                    id: 6,
                    title: "Project Title",
                    description:
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
                    progress: 30,
                },
                {
                    id: 7,
                    title: "Project Title",
                    description:
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
                    progress: 65,
                },
                {
                    id: 8,
                    title: "Project Title",
                    description:
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
                    progress: 88,
                },
            ],
        },
        {
            category: "category header",
            projects: [
                {
                    id: 9,
                    title: "Project Title",
                    description:
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
                    progress: 55,
                },
                {
                    id: 10,
                    title: "Project Title",
                    description:
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
                    progress: 95,
                },
                {
                    id: 11,
                    title: "Project Title",
                    description:
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
                    progress: 40,
                },
                {
                    id: 12,
                    title: "Project Title",
                    description:
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
                    progress: 72,
                },
            ],
        },
    ];

    const categories = ["category", "category", "category"];

    const handleProjectClick = (project: any) => {
        navigate(`/project/${project.id}`);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Main Content Area */}
            <div className="flex-1 p-6">
                {/* Header Section */}
                <div className="mb-6">
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
                            <Filter className="w-4 h-4" />
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
                                        ? "bg-red-500 text-blue-500 hover:bg-red-600"
                                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                                }`}
                            >
                                {category}
                            </Button>
                        ))}
                    </div>
                </div>

                {/* Projects Grid with Category Headers */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projectColumns.map((column, columnIndex) => (
                        <div key={columnIndex} className="space-y-4">
                            {/* Category Header */}
                            <div className="bg-gray-300 text-gray-700 text-sm font-medium p-3 rounded">
                                {column.category}
                            </div>

                            {/* Projects in this column */}
                            <div className="space-y-4">
                                {column.projects.map((project) => (
                                    <ProjectCard
                                        key={project.id}
                                        title={project.title}
                                        description={project.description}
                                        progress={project.progress}
                                        onClick={() =>
                                            handleProjectClick(project)
                                        }
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
