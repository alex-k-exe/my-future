import { useParams, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { ArrowLeft } from "lucide-react";
import type { Project } from "../types";
import { formatDate } from "../lib/utils";
import {useContext, useEffect, useState} from "react";
import {AppContext} from "../lib/AppContext.ts";

export default function ProjectDetail() {
    const { id } = useParams();
    const navigate = useNavigate();

    const appContext = useContext(AppContext)

    // set to loading state
    const [projectData, setProjectData] = useState({
        id: "",
        name: "Loading...",
        description: "Loading...",
        category: "Loading...",
        dateStarted: new Date(),
        thumbnail: "",
        progress: 0,
        goal: 0,
        contact: "",
        businessDonations: []
    } as Project);

    useEffect(() => {
        (async () => {
            setProjectData(
                (await appContext.fetchApiPublic(`/projects/${id}`)
                .then(response => response.json())
                .then(response => response.project as Project)
                    .then(proj => {
                        if (proj) return proj;
                        else throw new Error("Project not found");
                    })
                .catch(error => {
                    console.error("Error fetching project data:", error);
                    return {
                        id: id || "",
                        name: "Project Not Found",
                        description: "No description available.",
                        category: "Unknown",
                        dateStarted: new Date(),
                        thumbnail: "",
                        progress: 0,
                        goal: 100,
                        contact: "N/A",
                        businessDonations: []
                    }
                })));
        })();
    }, [id]);

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
                    <br/>
                    <br/>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Left side - Image placeholder */}
                    <div className="space-y-4">
                        <div className="w-full h-80 bg-gray-200 rounded-lg flex items-center justify-center relative">
                            {/* Diagonal lines placeholder like in the image */}
                            <img src={projectData.thumbnail}></img>
                            {/*<svg*/}
                            {/*    className="w-full h-full opacity-30"*/}
                            {/*    viewBox="0 0 400 300"*/}
                            {/*>*/}
                            {/*    <line*/}
                            {/*        x1="50"*/}
                            {/*        y1="50"*/}
                            {/*        x2="350"*/}
                            {/*        y2="250"*/}
                            {/*        stroke="gray"*/}
                            {/*        strokeWidth="2"*/}
                            {/*    />*/}
                            {/*    <line*/}
                            {/*        x1="50"*/}
                            {/*        y1="250"*/}
                            {/*        x2="350"*/}
                            {/*        y2="50"*/}
                            {/*        stroke="gray"*/}
                            {/*        strokeWidth="2"*/}
                            {/*    />*/}
                            {/*</svg>*/}
                        </div>
                    </div>

                    {/* Right side - Stats */}
                    <div>
                        {/* Progress Bar */}
                        <div className="mb-3">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-500">Progress</span>
                                <span className="text-gray-500 font-medium">
                                    {Math.round(projectData.progress / projectData.goal * 10000) / 100}%
                                </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                    className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                                    style={{
                                        width: `${Math.round(projectData.progress / projectData.goal * 10000) / 100}%`
                                    }}
                                ></div>
                            </div>
                        </div>

                        {/* Stats */}
                        <div className="space-y-6">
                            <div className="flex justify-between items-center py-3 border-b border-gray-200">
                                <span className="text-xl text-gray-500">
                                    {projectData.progress.toLocaleString()} out of{" "}
                                    {projectData.goal.toLocaleString()}
                                </span>
                            </div>

                            <div className="flex justify-between items-center py-3 border-b border-gray-200">
                                <span className="text-lg text-gray-700">
                                    {formatDate(projectData.dateStarted)}
                                </span>
                                <span className="text-base text-gray-500">
                                    Date started
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Description */}
                <div className="mt-12 space-y-4">
                    <br/>
                    <br/>
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
