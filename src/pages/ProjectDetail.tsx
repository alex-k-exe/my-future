import { useParams, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { ArrowLeft } from "lucide-react";

interface ProjectDetailData {
    id: number;
    title: string;
    category: string;
    description: string;
    progress: number;
    totalGoal: string;
    activeDays: string;
}

export default function ProjectDetail() {
    const { id } = useParams();
    const navigate = useNavigate();

    // Sample project data - in a real app, this would come from an API
    const projectData: ProjectDetailData = {
        id: parseInt(id || "1"),
        title: "Project Title",
        category: "Category",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        progress: 85,
        totalGoal: "XXXXXXXX out of XXXX",
        activeDays: "XXX Active Days",
    };

    const handleBack = () => {
        navigate("/project");
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="flex-1 p-6">
                {/* Back Button */}
                <div className="mb-6">
                    <Button
                        variant="outline"
                        onClick={handleBack}
                        className="flex items-center gap-2"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Projects
                    </Button>
                </div>

                {/* Title and Category */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        {projectData.title}
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
                    <div className="space-y-8">
                        {/* Progress Bar */}
                        <div className="space-y-3">
                            <div className="w-full bg-gray-200 rounded-full h-4">
                                <div
                                    className="bg-gray-400 h-4 rounded-full"
                                    style={{
                                        width: `${projectData.progress}%`,
                                    }}
                                ></div>
                            </div>
                        </div>

                        {/* Stats */}
                        <div className="space-y-6">
                            <div className="flex justify-between items-center py-3 border-b border-gray-200">
                                <span className="text-xl font-bold text-gray-900">
                                    {projectData.totalGoal}
                                </span>
                            </div>
                            
                            <div className="flex justify-between items-center py-3 border-b border-gray-200">
                                <span className="text-lg text-gray-700">
                                    XXXXXX
                                </span>
                                <span className="text-base text-gray-500">
                                    Goals Reached
                                </span>
                            </div>
                            
                            <div className="flex justify-between items-center py-3 border-b border-gray-200">
                                <span className="text-lg text-gray-700">
                                    XXX
                                </span>
                                <span className="text-base text-gray-500">
                                    {projectData.activeDays}
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
