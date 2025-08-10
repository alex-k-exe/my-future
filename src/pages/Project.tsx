import { useMemo, useState } from "react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardTitle } from "../components/ui/card";
import { Search, Filter } from "lucide-react";
import type { Base64Image, Project, ProjectId } from "../types";
import { Badge } from "../components/ui/badge";
import { Link } from "react-router-dom";
import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from "../components/ui/popover";
import DatePicker from "../components/ui/datePicker";
import { MultiSelect } from "../components/ui/mutliselect";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "../components/ui/select";

function ProjectCard(project: {
    id: ProjectId;
    name: string;
    description: string;
    category: string;
    thumbnail: Base64Image;
    progress: number;
    goal: number;
}) {
    return (
        <Link to={"/project/" + project.id}>
            <Card className="hover:shadow-lg transition-shadow mb-4">
                <CardContent className="p-4 flex items-start gap-4">
                    {/* TODO: thumbnail would probably be too small */}
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
                        <div className="mb-2">
                            <CardTitle className="text-base font-semibold">
                                {project.name}
                            </CardTitle>
                            <Badge>{project.category}</Badge>
                        </div>

                        <p className="text-sm text-gray-500 leading-relaxed mb-3 line-clamp-2">
                            {project.description}
                        </p>

                        {/* Progress Bar */}
                        <div className="space-y-1">
                            <div className="flex justify-between items-center text-xs">
                                <span className="text-gray-500">Progress</span>
                                <span className="text-gray-500 font-medium">
                                    {project.progress}%
                                </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                    className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                                    style={{ width: `${project.progress}%` }}
                                ></div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
}

// Sample project data
export const projects: Project[] = [
    {
        id: "proj-001",
        name: "Community Garden",
        description: "Build and maintain a garden in the local park.",
        category: "Environment",
        dateStarted: new Date("2024-03-01"),
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
        dateStarted: new Date("2024-05-18"),
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
        dateStarted: new Date("2024-07-01"),
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
        dateStarted: new Date("2024-04-10"),
        dateCompleted: new Date("2024-08-05"),
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
        dateStarted: new Date("2024-02-19"),
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

    let [afterDate, setAfterDate] = useState<Date | undefined>();
    let [beforeDate, setBeforeDate] = useState<Date | undefined>();
    const [categories, setCategories] = useState(
        Array.from(new Set(projects.map((p) => p.category))).map(
            (category) => ({
                category,
                selected: true
            })
        )
    );
    let [projectStatus, setProjectStatus] = useState<
        "completed" | "notCompleted" | "both"
    >("notCompleted");

    function resetFilters() {
        setAfterDate(undefined);
        setBeforeDate(undefined);
        setCategories(
            categories.map((category) => {
                return { category: category.category, selected: true };
            })
        );
        setProjectStatus("notCompleted");
    }

    const filteredProjects = useMemo(() => {
        const lowerQuery = searchQuery.toLowerCase();

        return projects.filter((project) => {
            const projectIncludesQuery =
                project.name.toLowerCase().includes(lowerQuery) ||
                project.description.toLowerCase().includes(lowerQuery) ||
                project.category.toLowerCase().includes(lowerQuery);
            const startDateInRange =
                (!afterDate || project.dateStarted >= afterDate) &&
                (!beforeDate || project.dateStarted <= beforeDate);
            const categorySelected =
                categories.find(
                    (category) => project.category === category.category
                )?.selected ?? true;
            let correctProjectStatus: boolean;
            if (projectStatus === "completed") {
                correctProjectStatus =
                    project.dateCompleted !== undefined ||
                    project.progress === project.goal;
            } else if (projectStatus === "notCompleted") {
                correctProjectStatus =
                    project.dateCompleted === undefined &&
                    project.progress < project.goal;
            } else {
                correctProjectStatus = true;
            }

            return (
                projectIncludesQuery &&
                startDateInRange &&
                categorySelected &&
                correctProjectStatus
            );
        });
    }, [
        searchQuery,
        categories,
        afterDate,
        beforeDate,
        projectStatus,
        projects
    ]);

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
                        <Popover>
                            <PopoverTrigger>
                                <Button>
                                    <Filter />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent collisionPadding={8}>
                                <Button onClick={resetFilters} className="mb-3">Reset</Button>
                                <DatePicker
                                    label="From"
                                    date={afterDate}
                                    setDate={setAfterDate}
                                />
                                <DatePicker
                                    label="To"
                                    date={beforeDate}
                                    setDate={setBeforeDate}
                                />
                                <MultiSelect
                                    categories={categories}
                                    setCategories={setCategories}
                                />
                                <Select
                                    value={projectStatus}
                                    onValueChange={(value) =>
                                        setProjectStatus(
                                            value as
                                                | "completed"
                                                | "notCompleted"
                                                | "both"
                                        )
                                    }
                                >
                                    <SelectTrigger className="w-[180px] mt-3">
                                        <SelectValue placeholder="Project status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="both">
                                            Both
                                        </SelectItem>
                                        <SelectItem value="notCompleted">
                                            Not completed
                                        </SelectItem>
                                        <SelectItem value="completed">
                                            Completed
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </PopoverContent>
                        </Popover>
                    </div>
                </header>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProjects.map((project) => (
                        <ProjectCard {...project} />
                    ))}
                </div>
            </div>
        </main>
    );
}
