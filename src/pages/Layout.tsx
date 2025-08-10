import { useState } from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../components/sidebar";
import sidebarIcon from "../assets/sidebarIcon.svg";

export default function Layout() {
    const [sidebarState, setSidebarState] = useState<"open" | "closed">("open");

    function toggleSideBar() {
        const newState = sidebarState === "open" ? "closed" : "open";
        setSidebarState(newState);
        console.log("Sidebar toggled:", newState);
    }

    return (
        <div className="flex h-full bg-[rgb(31,40,70)]">
            <SideBar
                sidebarState={sidebarState}
                toggleSideBar={toggleSideBar}
            />
            {sidebarState === "closed" && (
                <div className="min-w-8">
                    <img
                        className="w-6 h-6 cursor-pointer"
                        src={sidebarIcon}
                        onClick={toggleSideBar}
                        alt="Toggle Sidebar"
                    />
                </div>
            )}

            {/* 👇 This is where the child routes will render */}
            <Outlet context={{ sidebarState, toggleSideBar }} />
        </div>
    );
}
