import { useState } from "react";
import { Button } from "../components/ui/button";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Edit2, User } from "lucide-react";

export default function Profile() {
    const [isEditing, setIsEditing] = useState(false);
    const [profileData, setProfileData] = useState({
        fullName: "Full Name",
        addressDesc: "Address Desc",
        status: "Citizen",
        email: "johnpark@gmail.com",
    });

    const handleEdit = () => {
        setIsEditing(!isEditing);
    };

    const handleSave = () => {
        setIsEditing(false);
        // Add save logic here
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Main Content Area */}
            <div className="flex-1 p-6">
                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-2xl font-bold">My Profile</h1>
                </div>

                {/* Profile Header Section */}
                <div className="bg-white rounded-lg p-6 mb-6 shadow-sm">
                    <div className="flex items-center gap-6">
                        {/* Profile Avatar */}
                        <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                            <User className="w-10 h-10 text-gray-400" />
                        </div>

                        {/* Profile Info */}
                        <div className="flex-1">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h2 className="text-xl font-semibold text-gray-900 mb-1">
                                        {profileData.fullName}
                                    </h2>
                                    <p className="text-gray-600 text-sm">
                                        {profileData.addressDesc}
                                    </p>
                                </div>

                                <div className="text-right">
                                    <div className="text-sm text-gray-500 mb-1">
                                        {profileData.status}
                                    </div>
                                    <div className="text-sm text-gray-600">
                                        {profileData.email}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Personal Information Section */}
                <Card>
                    <CardHeader className="border-b border-blue-200 bg-blue-50">
                        <div className="flex justify-between items-center">
                            <CardTitle className="text-lg font-semibold text-gray-900">
                                Personal Information
                            </CardTitle>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={handleEdit}
                                className="flex items-center gap-2"
                            >
                                <Edit2 className="w-4 h-4" />
                                {isEditing ? "Cancel" : "Edit"}
                            </Button>
                        </div>
                    </CardHeader>

                    <CardContent className="p-6">
                        {isEditing ? (
                            <div className="space-y-6">
                                {/* Editing Form */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="fullName">
                                            Full Name
                                        </Label>
                                        <Input
                                            id="fullName"
                                            value={profileData.fullName}
                                            onChange={(e) =>
                                                setProfileData({
                                                    ...profileData,
                                                    fullName: e.target.value,
                                                })
                                            }
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="status">Status</Label>
                                        <Input
                                            id="status"
                                            value={profileData.status}
                                            onChange={(e) =>
                                                setProfileData({
                                                    ...profileData,
                                                    status: e.target.value,
                                                })
                                            }
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="address">
                                            Address Description
                                        </Label>
                                        <Input
                                            id="address"
                                            value={profileData.addressDesc}
                                            onChange={(e) =>
                                                setProfileData({
                                                    ...profileData,
                                                    addressDesc: e.target.value,
                                                })
                                            }
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            value={profileData.email}
                                            onChange={(e) =>
                                                setProfileData({
                                                    ...profileData,
                                                    email: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                </div>

                                <div className="flex gap-3 pt-4">
                                    <Button
                                        onClick={handleSave}
                                        className="flex-1"
                                    >
                                        Save Changes
                                    </Button>
                                    <Button
                                        variant="outline"
                                        onClick={handleEdit}
                                        className="flex-1"
                                    >
                                        Cancel
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {/* Display Mode */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label className="text-sm font-medium text-gray-500">
                                            Full Name
                                        </Label>
                                        <p className="text-gray-900">
                                            {profileData.fullName}
                                        </p>
                                    </div>

                                    <div className="space-y-2">
                                        <Label className="text-sm font-medium text-gray-500">
                                            Status
                                        </Label>
                                        <p className="text-gray-900">
                                            {profileData.status}
                                        </p>
                                    </div>

                                    <div className="space-y-2">
                                        <Label className="text-sm font-medium text-gray-500">
                                            Address Description
                                        </Label>
                                        <p className="text-gray-900">
                                            {profileData.addressDesc}
                                        </p>
                                    </div>

                                    <div className="space-y-2">
                                        <Label className="text-sm font-medium text-gray-500">
                                            Email
                                        </Label>
                                        <p className="text-gray-900">
                                            {profileData.email}
                                        </p>
                                    </div>
                                </div>

                                <div className="text-sm text-gray-500 pt-4 border-t">
                                    Click "Edit" to modify your personal
                                    information
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
