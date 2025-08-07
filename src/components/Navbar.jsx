import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import AOS from "aos";
import "aos/dist/aos.css";
import { getUsername } from "../auth/getUsername";

const Navbar = () => {
    const navigate = useNavigate();
    const userName = getUsername();
    const isLoggedIn = userName !== "Guest";

    let loggedInUser = { fullName: "Guest", email: "Not logged in" };
    try {
        const userData = localStorage.getItem("loggedInUser");
        if (userData) loggedInUser = JSON.parse(userData);
    } catch (e) {
        console.error("Error loading user", e);
    }

    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
    const [notifications] = useState([
        { id: 1, message: "💰 You added income successfully!" },
        { id: 2, message: "📊 New report generated" },
        { id: 3, message: "⚠️ Expense limit approaching!" },
    ]);

    useEffect(() => {
        AOS.init({ duration: 1000 });
        document.body.setAttribute("data-bs-theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        const newTheme = theme === "dark" ? "light" : "dark";
        localStorage.setItem("theme", newTheme);
        setTheme(newTheme);
    };

    const handleLogout = async () => {
        const result = await Swal.fire({
            title: "Logout?",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Yes",
        });
        if (result.isConfirmed) {
            localStorage.removeItem("loggedInUser");
            Swal.fire({ icon: "success", title: "Logged out", toast: true, timer: 1500 });
            navigate("/login");
        }
    };

    const handleDeleteAccount = async () => {
        const result = await Swal.fire({
            title: "Delete Account?",
            icon: "warning",
            confirmButtonText: "Delete",
            confirmButtonColor: "#dc3545",
            showCancelButton: true,
        });
        if (result.isConfirmed) {
            const users = JSON.parse(localStorage.getItem("users")) || [];
            const updated = users.filter(u => u.email !== loggedInUser.email);
            localStorage.setItem("users", JSON.stringify(updated));
            localStorage.removeItem("loggedInUser");
            Swal.fire("Deleted", "Your account is gone.", "success").then(() => navigate("/login"));
        }
    };

    const handleAddIncome = async () => {
        const result = await Swal.fire({
            title: "Add income?",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Go",
        });
        if (result.isConfirmed) navigate("/income");
    };

    const handleClearLocalStorage = () => {
        Swal.fire({
            title: "Clear all localStorage?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            confirmButtonText: "Clear All",
        }).then(res => {
            if (res.isConfirmed) {
                localStorage.clear();
                Swal.fire("Cleared!", "Local storage has been wiped.", "success").then(() =>
                    window.location.reload()
                );
            }
        });
    };

    return (
        <nav
            className="navbar navbar-expand-lg fixed-top px-4 py-2 shadow-lg glass-nav"
            data-aos="fade-down"
        >
            <div className="container-fluid">
                <Link to="/" className="navbar-brand d-flex align-items-center text-white fw-bold fs-4">
                    <i className="bx bx-wallet-alt me-2 fs-3"></i> MoneyManager
                </Link>

                <button
                    className="navbar-toggler border-0 text-white"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarMain"
                >
                    <i className="bx bx-menu fs-2"></i>
                </button>

                <div className="collapse navbar-collapse" id="navbarMain">
                    <ul className="navbar-nav ms-auto align-items-center gap-2">
                        <li className="nav-item">
                            <Link to="/" className="nav-link text-white">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/income" className="nav-link text-white">Income</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/expenses" className="nav-link text-white">Expenses</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/reports" className="nav-link text-white">Reports</Link>
                        </li>

                        {/* Notification Bell */}
                        <li className="nav-item dropdown">
                            <a
                                href="#"
                                className="nav-link dropdown-toggle text-white position-relative"
                                data-bs-toggle="dropdown"
                            >
                                <i className="bx bx-bell fs-5"></i>
                                <span className="position-absolute top-0 start-100 translate-middle badge bg-danger rounded-pill">
                                    {notifications.length}
                                </span>
                            </a>
                            <ul className="dropdown-menu dropdown-menu-end rounded-4 glass-dropdown shadow-sm p-2">
                                {notifications.map(n => (
                                    <li key={n.id} className="dropdown-item small">
                                        {n.message}
                                    </li>
                                ))}
                            </ul>
                        </li>

                        {/* Dark Mode */}
                        <li className="nav-item">
                            <button
                                className="btn btn-outline-light rounded-circle p-2"
                                onClick={toggleTheme}
                                title="Toggle Dark Mode"
                            >
                                <i className={`bx ${theme === "light" ? "bx-moon" : "bx-sun"} fs-5`}></i>
                            </button>
                        </li>

                        {/* User Avatar */}
                        <li className="nav-item dropdown ms-2">
                            <a
                                href="#"
                                className="nav-link dropdown-toggle d-flex align-items-center text-white"
                                data-bs-toggle="dropdown"
                            >
                                <img
                                    src={`https://api.dicebear.com/7.x/initials/svg?seed=${userName}`}
                                    alt="avatar"
                                    width="32"
                                    height="32"
                                    className="rounded-circle me-2"
                                />
                                <span>{userName}</span>
                            </a>
                            <ul className="dropdown-menu dropdown-menu-end rounded-4 shadow glass-dropdown p-2">
                                <li className="dropdown-item small text-muted">{loggedInUser.email}</li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><button className="dropdown-item" onClick={handleAddIncome}><i className="bx bx-plus me-2"></i>Add Income</button></li>
                                <li><button className="dropdown-item" onClick={handleClearLocalStorage}><i className="bx bx-reset me-2"></i>Clear Data</button></li>
                                <li><button className="dropdown-item text-danger" onClick={handleDeleteAccount}><i className="bx bx-trash me-2"></i>Delete Account</button></li>
                                <li><button className="dropdown-item text-primary" onClick={handleLogout}><i className="bx bx-log-out me-2"></i>Logout</button></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Glassmorphism CSS */}
            <style>{`
        .glass-nav {
          background: rgba(34, 34, 34, 0.6);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(255,255,255,0.1);
        }
        .glass-dropdown {
          backdrop-filter: blur(15px);
          background: rgba(255, 255, 255, 0.8);
        }
        [data-bs-theme="dark"] .glass-dropdown {
          background: rgba(33, 33, 33, 0.9);
          color: white;
        }
        .dropdown-item:hover {
          background: rgba(0,0,0,0.05);
        }
      `}</style>
        </nav>
    );
};

export default Navbar;
