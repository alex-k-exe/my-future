import { useEffect, useState } from "react";
import { User, Edit2 } from "lucide-react";
import { Modal } from "../components/ui/modal";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";

export default function Profile() {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [profileData, setProfileData] = useState({
        fullName: "Full Name",
        firstName: "Full",
        lastName: "Name",
        status: "Citizen",
        address: "123 Fake Street",
        address2: "Student One 4B",
        email: "johnpork@gmail.com",
        points: 256,
        lifetimePoints: 1045,
        accountImage: null as File | null
    });

    const [editData, setEditData] = useState({
        firstName: profileData.firstName,
        lastName: profileData.lastName,
        email: profileData.email,
        accountType: "Personal",
        password: "",
        confirmPassword: "",
        address1: profileData.address,
        address2: profileData.address2,
        accountImage: null as File | null
    });

    const handleEditClick = () => {
        setEditData({
            firstName: profileData.firstName,
            lastName: profileData.lastName,
            email: profileData.email,
            accountType: "Personal",
            password: "",
            confirmPassword: "",
            address1: profileData.address,
            address2: profileData.address2,
            accountImage: profileData.accountImage
        });
        setIsEditModalOpen(true);
    };

    const handleSaveChanges = () => {
        setProfileData({
            ...profileData,
            firstName: editData.firstName,
            lastName: editData.lastName,
            fullName: `${editData.firstName} ${editData.lastName}`,
            address: editData.address1,
            address2: editData.address2,
            email: editData.email,
            accountImage: editData.accountImage
        });
        setIsEditModalOpen(false);
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setEditData({ ...editData, accountImage: file });
        }
    };

    const handleCloseModal = () => {
        setIsEditModalOpen(false);
    };

    const pastProjects = [
        {
            id: 1,
            title: "Project Title",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit..."
        },
        {
            id: 2,
            title: "Project Title",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit..."
        },
        {
            id: 3,
            title: "Project Title",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit..."
        }
    ];


    useEffect( () => {
        const token = localStorage.getItem("token");


        const fetchProfile = async () => {
        const url = `http://localhost:3000/user/@me`;


        const res = await fetch(url, {
            headers: {
          Cookie: `${token}`
        }
        });

    const json = await res.json();
    console.log("Fetched Profile JSON:", json); 
    setProfileData(json);
    }
    })

    return (
        <div className="flex-1 bg-gray-100 p-6">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
            </div>

            {/* Main Profile Section */}
            <div className="bg-gray-400 rounded-lg p-6 mb-6 shadow-sm">
                <div className="flex items-center justify-between">
                    {/* Left side - Avatar and Name */}
                    <div className="flex items-center gap-6">
                        <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden">
                            {profileData.accountImage ? (
                                <img
                                    src={URL.createObjectURL(
                                        profileData.accountImage
                                    )}
                                    alt="Profile"
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <User className="w-10 h-10 text-gray-600" />
                            )}
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-1">
                                {profileData.fullName}
                            </h2>
                            <p className="text-gray-700">
                                {profileData.status}
                            </p>
                        </div>
                    </div>

                    {/* Right side - Contact Info */}
                    <div className="text-right text-gray-700">
                        <p className="mb-1">{profileData.address}</p>
                        {profileData.address2 && (
                            <p className="mb-1 text-sm text-gray-600">
                                {profileData.address2}
                            </p>
                        )}
                        <div className="flex items-center justify-end gap-2">
                            <p>{profileData.email}</p>
                            <button
                                onClick={handleEditClick}
                                title="Edit Profile"
                            >
                                <Edit2 className="w-6 h-6 bg-gray-600 text-gray-200 hover:bg-gray-500 rounded" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - Points */}
                <div className="space-y-6">
                    {/* Current Points */}
                    <div className="bg-gray-300 rounded-lg p-6 text-center">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                            Points
                        </h3>
                        <div className="text-6xl font-bold text-gray-900">
                            {profileData.points}
                        </div>
                    </div>

                    {/* Lifetime Points */}
                    <div className="bg-gray-300 rounded-lg p-6 text-center">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                            Lifetime Points Spent
                        </h3>
                        <div className="text-6xl font-bold text-gray-900">
                            {profileData.lifetimePoints}
                        </div>
                    </div>
                </div>

                {/* Right Column - Past Projects */}
                <div className="lg:col-span-2">
                    <div className="bg-gray-300 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-6">
                            Past Projects
                        </h3>

                        <div className="space-y-4">
                            {pastProjects.map((project) => (
                                <div
                                    key={project.id}
                                    className="bg-gray-200 rounded-lg p-4 flex items-center gap-4"
                                >
                                    {/* Project Icon/Image placeholder */}
                                    <div className="w-16 h-16 bg-gray-400 rounded flex items-center justify-center flex-shrink-0">
                                        <div className="w-8 h-8 bg-gray-500 transform rotate-45"></div>
                                        <div className="w-8 h-8 bg-gray-500 transform -rotate-45 -ml-8"></div>
                                    </div>

                                    {/* Project Details */}
                                    <div className="flex-1">
                                        <h4 className="font-semibold text-gray-900 mb-2">
                                            {project.title}
                                        </h4>
                                        <p className="text-sm text-gray-700">
                                            {project.description}
                                        </p>
                                    </div>

                                    {/* Right side placeholder */}
                                    <div className="text-right">
                                        <div className="text-xs text-gray-600">
                                            •••
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Edit Profile Modal */}
            <Modal
                isOpen={isEditModalOpen}
                onClose={handleCloseModal}
                title="Edit Profile"
                className="max-w-4xl max-h-[95vh]"
            >
                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Left Column */}
                        <div className="space-y-4">
                            <div className="grid gap-2">
                                <Label htmlFor="firstName">First Name</Label>
                                <Input
                                    id="firstName"
                                    type="text"
                                    value={editData.firstName}
                                    onChange={(e) =>
                                        setEditData({
                                            ...editData,
                                            firstName: e.target.value
                                        })
                                    }
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={editData.email}
                                    onChange={(e) =>
                                        setEditData({
                                            ...editData,
                                            email: e.target.value
                                        })
                                    }
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    value={editData.password}
                                    onChange={(e) =>
                                        setEditData({
                                            ...editData,
                                            password: e.target.value
                                        })
                                    }
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="address">Address</Label>
                                <Input
                                    id="address1"
                                    type="text"
                                    placeholder="Address Line 1"
                                    value={editData.address1}
                                    onChange={(e) =>
                                        setEditData({
                                            ...editData,
                                            address1: e.target.value
                                        })
                                    }
                                />
                                <Input
                                    id="address2"
                                    type="text"
                                    placeholder="Address Line 2"
                                    value={editData.address2}
                                    onChange={(e) =>
                                        setEditData({
                                            ...editData,
                                            address2: e.target.value
                                        })
                                    }
                                    className="mt-2"
                                />
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="space-y-4">
                            <div className="grid gap-2">
                                <Label htmlFor="lastName">Last Name</Label>
                                <Input
                                    id="lastName"
                                    type="text"
                                    value={editData.lastName}
                                    onChange={(e) =>
                                        setEditData({
                                            ...editData,
                                            lastName: e.target.value
                                        })
                                    }
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="accountType">
                                    Account Type
                                </Label>
                                <select
                                    id="accountType"
                                    value={editData.accountType}
                                    onChange={(e) =>
                                        setEditData({
                                            ...editData,
                                            accountType: e.target.value
                                        })
                                    }
                                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    <option value="">
                                        Select account type
                                    </option>
                                    <option value="Personal">Personal</option>
                                    <option value="Business">Business</option>
                                    <option value="Premium">Premium</option>
                                </select>
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="confirmPassword">
                                    Confirm Password
                                </Label>
                                <Input
                                    id="confirmPassword"
                                    type="password"
                                    value={editData.confirmPassword}
                                    onChange={(e) =>
                                        setEditData({
                                            ...editData,
                                            confirmPassword: e.target.value
                                        })
                                    }
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="accountImage">
                                    Account Image
                                </Label>
                                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                                    <input
                                        id="accountImage"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        className="hidden"
                                    />
                                    <label
                                        htmlFor="accountImage"
                                        className="cursor-pointer text-sm text-gray-600 hover:text-gray-800"
                                    >
                                        {editData.accountImage ? (
                                            <div>
                                                <p className="font-medium">
                                                    {editData.accountImage.name}
                                                </p>
                                                <p className="text-xs text-black mt-1">
                                                    Click to change
                                                </p>
                                            </div>
                                        ) : (
                                            <div>
                                                <p>Drag a file here</p>
                                                <p className="text-xs text-gray-500 mt-1">
                                                    or click to select
                                                </p>
                                            </div>
                                        )}
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Save Button */}
                    <div className="flex justify-center py-8 mt-6">
                        <Button onClick={handleSaveChanges}>Save</Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
