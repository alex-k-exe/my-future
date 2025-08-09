import { useParams, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { ArrowLeft } from "lucide-react";
import type { Project } from "../types";
import { daysSince } from "../lib/utils";

export default function ProjectDetail() {
    const { id } = useParams();
    const navigate = useNavigate();

    // Sample project data - in a real app, this would come from an API
    const projectData: Project = {
        id: id ?? "proj-001",
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
    };

    return (
        <div className="min-h-screen bg-gray-50 w-full">
            <div className="flex-1 p-6">
                {/* Back Button */}
                <Button
                    onClick={() => navigate("/project")}
                    className="flex items-center gap-2 text-white mb-4"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Projects
                </Button>

                {/* Title and Category */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        {projectData.name}
                    </h1>
                    <div className="text-base text-gray-600">
                        {projectData.category}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Left side - Image placeholder */}
                    <div className="space-y-4">
                        <div className="w-full h-80 bg-gray-200 rounded-lg flex items-center justify-center relative">
                            {/* Diagonal lines placeholder like in the image */}
                            <svg
                                className="w-full h-full opacity-30"
                                viewBox="0 0 400 300"
                            >
                                <line
                                    x1="50"
                                    y1="50"
                                    x2="350"
                                    y2="250"
                                    stroke="gray"
                                    strokeWidth="2"
                                />
                                <line
                                    x1="50"
                                    y1="250"
                                    x2="350"
                                    y2="50"
                                    stroke="gray"
                                    strokeWidth="2"
                                />
                            </svg>
                        </div>
                    </div>

                    {/* Right side - Stats */}
                    <div>
                        {/* Progress Bar */}
                        <div className="mb-3">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-500">Progress</span>
                                <span className="text-gray-600 font-medium">
                                    {projectData.progress}%
                                </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                    className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                                    style={{
                                        width: `${projectData.progress}%`
                                    }}
                                ></div>
                            </div>
                        </div>

                        {/* Stats */}
                        <div className="space-y-6">
                            <div className="flex justify-between items-center py-3 border-b border-gray-200">
                                <span className="text-xl text-gray-500">
                                    {projectData.progress} out of {projectData.goal}
                                </span>
                            </div>

                            <div className="flex justify-between items-center py-3 border-b border-gray-200">
                                <span className="text-lg text-gray-700">
                                    {Object.keys(projectData.citizenContributions).length}
                                </span>
                                <span className="text-base text-gray-500">
                                    Contributors
                                </span>
                            </div>

                            <div className="flex justify-between items-center py-3 border-b border-gray-200">
                                <span className="text-lg text-gray-700">
                                    {daysSince(projectData.dateStarted)}
                                </span>
                                <span className="text-base text-gray-500">
                                    Active days
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Description */}
                <div className="mt-12 space-y-4">
                    <h3 className="text-2xl font-semibold text-gray-900">
                        Description
                    </h3>
                    <p className="text-gray-700 leading-relaxed text-lg">
                        {projectData.description}
                    </p>
                </div>
            </div>
        </div>
    );
}
