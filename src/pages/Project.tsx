import { useMemo, useState, useEffect } from "react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardTitle } from "../components/ui/card";
import { Search, Filter, ArrowDownNarrowWide, Edit, Plus, X } from "lucide-react";
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

// プロジェクトフォームの型定義
interface ProjectFormData {
    name: string;
    description: string;
    category: string;
    thumbnail: string;
    progress: number;
    contact: string;
}

// プロジェクト追加・編集モーダルコンポーネント
function ProjectModal({
    isOpen,
    onClose,
    onSubmit,
    project = null,
    mode
}: {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: ProjectFormData) => void;
    project?: Project | null;
    mode: "add" | "edit";
}) {
    const [formData, setFormData] = useState<ProjectFormData>({
        name: "",
        description: "",
        category: "",
        thumbnail: "",
        progress: 0,
        contact: ""
    });

    // projectプロパティが変更されるたびにformDataを更新
    useEffect(() => {
        if (project && mode === "edit") {
            setFormData({
                name: project.name || "",
                description: project.description || "",
                category: project.category || "",
                thumbnail: project.thumbnail || "",
                progress: project.progress || 0,
                contact: project.contact || ""
            });
        } else if (mode === "add") {
            // 新規追加時はフォームをリセット
            setFormData({
                name: "",
                description: "",
                category: "",
                thumbnail: "",
                progress: 0,
                contact: ""
            });
        }
    }, [project, mode]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-none w-full max-w-md max-h-[90vh] flex flex-col">
                <div className="flex justify-between items-center p-6 pb-4 border-b">
                    <h2 className="text-xl font-bold">
                        {mode === "add" ? "Add New Project" : "Edit Project"}
                    </h2>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={onClose}
                        className="p-1 h-8 w-8"
                    >
                        <X className="h-4 w-4" />
                    </Button>
                </div>

                <form
                    id="project-form"
                    onSubmit={handleSubmit}
                    className="flex-1 overflow-y-auto p-6 pt-4 space-y-4"
                >
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Project Name
                        </label>
                        <Input
                            value={formData.name}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    name: e.target.value
                                })
                            }
                            placeholder="Enter project name"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Description
                        </label>
                        <textarea
                            value={formData.description}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    description: e.target.value
                                })
                            }
                            placeholder="Enter project description"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            rows={3}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Category
                        </label>
                        <Input
                            value={formData.category}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    category: e.target.value
                                })
                            }
                            placeholder="Enter category"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Thumbnail (Base64 or URL)
                        </label>
                        <Input
                            value={formData.thumbnail}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    thumbnail: e.target.value
                                })
                            }
                            placeholder="Enter thumbnail URL or base64 data"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Progress (%)
                        </label>
                        <Input
                            type="number"
                            min="0"
                            max="100"
                            value={formData.progress}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    progress: parseInt(e.target.value) || 0
                                })
                            }
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Contact Email
                        </label>
                        <Input
                            type="email"
                            value={formData.contact}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    contact: e.target.value
                                })
                            }
                            placeholder="Enter contact email"
                            required
                        />
                    </div>
                </form>

                {/* Fixed button area at bottom */}
                <div className="p-6 pt-0 border-t bg-gray-50">
                    <div className="flex gap-3">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onClose}
                            className="flex-1"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            form="project-form"
                            className="flex-1 bg-black text-white hover:bg-gray-800"
                        >
                            {mode === "add" ? "Add Project" : "Save Changes"}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function ProjectCard(props: {
    id: ProjectId;
    name: string;
    description: string;
    category: string;
    thumbnail: Base64Image;
    progress: number;
    goal: number;
    showAdminButtons: boolean;
    onEdit: (project: Project) => void;
}) {
    const {
        id,
        name,
        description,
        category,
        thumbnail,
        progress,
        goal,
        showAdminButtons,
        onEdit
    } = props;

    // プロジェクトデータを再構築
    const projectData: Project = {
        id,
        name,
        description,
        category,
        thumbnail,
        progress,
        goal,
        dateStarted: new Date(),
        dateCompleted: undefined,
        contact: "",
        citizenContributions: {},
        businessDonations: []
    };

    return (
        <Link to={"/project/" + id}>
            <div className="bg-white border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer rounded-none">
                {/* Image placeholder on top */}
                <div className="w-full h-36 bg-gray-400 flex items-center justify-center">
                    <span className="text-black font-medium">Image</span>
                </div>

                {/* Content below image */}
                <div className="p-4 flex flex-col h-full">
                    {/* Top content area */}
                    <div className="flex-1 space-y-3">
                        {/* Title and Edit Button */}
                        <div className="flex justify-between items-start">
                            <h3 className="text-lg font-semibold text-black flex-1">
                                {name}
                            </h3>
                            {/* Admin Edit Button */}
                            {showAdminButtons && (
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="ml-2 p-1 h-8 w-8 hover:bg-gray-100"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        onEdit(projectData);
                                    }}
                                >
                                    <Edit className="h-4 w-4 text-gray-600" />
                                </Button>
                            )}
                        </div>
                        <div className="flex place-content-start">
                            <Badge className="mb-4">{category}</Badge>
                        </div>
                        {/* Description */}
                        <p className="text-sm text-black leading-relaxed">
                            {description}
                        </p>
                    </div>

                    {/* Bottom content area - fixed at bottom */}
                    <div className="mt-4 space-y-3">
                        {/* Progress Bar */}
                        <div className="space-y-2">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-black">Progress</span>
                                <span className="text-black font-medium">
                                    {progress}%
                                </span>
                            </div>
                            <div className="w-full bg-gray-300 rounded-full h-2">
                                <div
                                    className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                                    style={{
                                        width: `${progress}%`
                                    }}
                                ></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}

// Sample project data
export const projects: Project[] = [
    {
        id: "proj-001",
        name: "Community Garden",
        description: "Build a garden in the local park.",
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
                donor: "f0ab14ef-6cdc-4e1e-ae52-04de6c844dbc",
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
        thumbnail: "data:image/png;base64;iVBORw0KGgoAAAANSUhEUgAA...",
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
                donor: "f0ab14ef-6cdc-4e1e-ae52-04de6c844dbc",
                equipment: "Garbage Bags",
                estimatedValue: 15
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
        thumbnail: "data:image/png;base64;iVBORw0KGgoAAAANSUhEUgAA...",
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
    const [showAdminButtons, setShowAdminButtons] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedProjectToEdit, setSelectedProjectToEdit] = useState<Project | null>(null);

    // Filter states
    const [afterDate, setAfterDate] = useState<Date | undefined>(undefined);
    const [beforeDate, setBeforeDate] = useState<Date | undefined>(undefined);
    const [categories, setCategories] = useState<{ category: string; selected: boolean }[]>([]);
    const [projectStatus, setProjectStatus] = useState<"completed" | "notCompleted" | "both">("both");

    // Filter logic
    const filteredProjects = useMemo(() => {
        const lowerQuery = searchQuery.toLowerCase();
        return projects.filter((p) => {
            // Search filter
            const matchesSearch =
                p.name.toLowerCase().includes(lowerQuery) ||
                p.description.toLowerCase().includes(lowerQuery) ||
                p.category.toLowerCase().includes(lowerQuery);

            // Date filter
            let matchesDate = true;
            if (afterDate) {
                const startDate = typeof p.dateStarted === "string" ? new Date(p.dateStarted) : p.dateStarted;
                matchesDate = startDate >= afterDate;
            }
            if (beforeDate) {
                const startDate = typeof p.dateStarted === "string" ? new Date(p.dateStarted) : p.dateStarted;
                matchesDate = matchesDate && startDate <= beforeDate;
            }

            // Category filter
            const selectedCategories = categories.filter(c => c.selected).map(c => c.category);
            const matchesCategory =
                selectedCategories.length === 0 || selectedCategories.includes(p.category);

            // Status filter
            let matchesStatus = true;
            if (projectStatus === "completed") {
                matchesStatus = !!p.dateCompleted;
            } else if (projectStatus === "notCompleted") {
                matchesStatus = !p.dateCompleted;
            }

            return matchesSearch && matchesDate && matchesCategory && matchesStatus;
        });
    }, [searchQuery, afterDate, beforeDate, categories, projectStatus]);

    // Collect all categories for MultiSelect
    const allCategories = useMemo(() => {
        const set = new Set<string>();
        projects.forEach((p) => set.add(p.category));
        return Array.from(set).map((category) => ({
            category,
            selected: false
        }));
    }, []);

    // Modal handlers
    const handleAddProject = (data: any) => {
        // Add project logic here (e.g. API call or local state update)
        setIsAddModalOpen(false);
    };

    const handleEditProject = (project: Project) => {
        setSelectedProjectToEdit(project);
        setIsEditModalOpen(true);
    };

    const handleSaveEditedProject = (data: any) => {
        // Save edited project logic here
        setIsEditModalOpen(false);
        setSelectedProjectToEdit(null);
    };

    const resetFilters = () => {
        setAfterDate(undefined);
        setBeforeDate(undefined);
        setCategories([]);
        setProjectStatus("both");
    };

    return (
        <main className="flex-1 bg-gray-50">
            <div className="flex-1 p-6">
                <header className="mb-6">
                    <div className="flex justify-between items-center mb-4">
                        <h1 className="text-2xl font-bold">Projects</h1>
                        <div className="flex items-center gap-3">
                            {/* Switch Test Button */}
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                    setShowAdminButtons(!showAdminButtons);
                                    console.log(
                                        "Switch Test clicked, showAdminButtons:",
                                        !showAdminButtons
                                    );
                                }}
                            >
                                Switch Test
                            </Button>
                            {/* Admin Add Button */}
                            {showAdminButtons && (
                                <Button
                                    className="bg-black text-white hover:bg-gray-800 px-4 py-2 rounded"
                                    onClick={() => setIsAddModalOpen(true)}
                                >
                                    <Plus className="h-4 w-4 mr-2" />
                                    Add
                                </Button>
                            )}
                        </div>
                    </div>

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
                                    date={afterDate ?? undefined}
                                    setDate={setAfterDate}
                                />
                                <DatePicker
                                    label="To"
                                    date={beforeDate ?? undefined}
                                    setDate={setBeforeDate}/>
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
                        <ProjectCard
                            key={project.id}
                            {...project}
                            showAdminButtons={showAdminButtons}
                            onEdit={handleEditProject}
                        />
                    ))}
                </div>
            </div>

            <ProjectModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onSubmit={handleAddProject}
                mode="add"
            />

            <ProjectModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                onSubmit={handleSaveEditedProject}
                project={selectedProjectToEdit}
                mode="edit"
            />
        </main>
    );
}
