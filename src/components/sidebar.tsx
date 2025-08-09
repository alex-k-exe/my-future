import { Link } from "react-router-dom";
import sidebarIcon from "../assets/sidebarIcon.svg";
import "../sidebar.css";

type SideBarProps = {
    sidebarState: "open" | "closed";
    toggleSideBar: () => void;
};

export default function SideBar({ sidebarState, toggleSideBar }: SideBarProps) {
    return (
        <aside
            className={`sidebar ${sidebarState === "open" ? "expanded" : "collapsed"}`}
            id="sidebar"
        >
            <div className="profileMenu">
                <img
                    src={sidebarIcon}
                    alt="Toggle Sidebar"
                    onClick={toggleSideBar}
                    className="sidebarToggle clickable"
                />
            </div>
            <nav>
                <Link to="/" className="links">
                    Home
                </Link>
                <Link to="/project" className="links">
                    Projects
                </Link>
                <Link to="/profile" className="links">
                    Profile
                </Link>
            </nav>
        </aside>
    );
}
