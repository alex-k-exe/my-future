import { Link } from "react-router-dom";
import sidebarIcon from "../assets/sidebarIcon.svg";

type SideBarProps = {
    sidebarState: "open" | "closed";
    toggleSideBar: () => void;
};

export default function SideBar({ sidebarState, toggleSideBar }: SideBarProps) {
    return (
        <aside
            className={`bg-[rgb(31,40,70)] h-full transition-all duration-300 ease-in-out overflow-hidden text-white ${
                sidebarState === "open" ? "w-1/5 max-w-80" : "w-0"
            }`}
            id="sidebar"
        >
            <div className="mt-4 mb-20">
                <img
                    src={sidebarIcon}
                    alt="Toggle Sidebar"
                    onClick={toggleSideBar}
                    className="w-6 ml-auto pr-1 cursor-pointer"
                    style={{
                        width: "48px",
                        background: "rgba(255, 255, 255, 0.3)",
                        borderRadius: "12px",
                        padding: "6px",
                        marginRight: "15px"
                    }}
                />
            </div>
            <nav className="ml-4">
                <Link to="/" className="block pb-2.5 text-white text-lg">
                    Home
                </Link>
                <Link to="/project" className="block pb-2.5 text-white text-lg">
                    Projects
                </Link>
                <Link to="/profile" className="block pb-2.5 text-white text-lg">
                    Profile
                </Link>
                <img src="/hackathon_logo.svg" />
            </nav>
        </aside>
    );
}
