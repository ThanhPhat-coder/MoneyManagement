import { useEffect } from "react";
import Swal from "sweetalert2";
import AOS from "aos";
import "aos/dist/aos.css";
import { useNavigate, Link } from "react-router-dom";
import { getUsername } from "../auth/getUsername";

const Navbar = () => {
    const navigate = useNavigate();

    const userName = getUsername();

    let loggedInUser = { fullName: "Guest", email: "Not logged in" };
    try {
        const userData = localStorage.getItem("loggedInUser");
        if (userData) {
            loggedInUser = JSON.parse(userData);
        }
    } catch (error) {
        console.error("Error parsing loggedInUser from localStorage:", error);
    }

    const handleClearLocalStorage = () => {
        Swal.fire({
            title: 'Are you sure you want to delete all data?',
            text: "All data in localStorage will be permanently deleted!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete all!',
            cancelButtonText: 'Cancel',
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.clear();
                Swal.fire(
                    'Deleted!',
                    'All localStorage data has been deleted.',
                    'success'
                ).then(() => {
                    window.location.reload();
                });
            }
        });
    };

    const handleClick = async (e) => {
        e.preventDefault();
        const result = await Swal.fire({
            title: "Add Income",
            text: "Are you sure you want to add income?",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Yes",
            cancelButtonText: "No",
            reverseButtons: true,
        });
        if (result.isConfirmed) {
            navigate("/income");
        }
    };

    const handleDeleteAccount = async (e) => {
        e.preventDefault();
        if (loggedInUser.email === "Not logged in") {
            Swal.fire("Error", "Please log in to delete your account.", "error");
            return;
        }
        const result = await Swal.fire({
            title: "Delete Account",
            text: "Are you sure you want to delete your account? This action cannot be undone.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, Delete",
            cancelButtonText: "No",
            reverseButtons: true,
            confirmButtonColor: "#dc3545",
        });
        if (result.isConfirmed) {

            let users = [];
            try {
                users = JSON.parse(localStorage.getItem("users")) || [];
            } catch (error) {
                console.error("Error parsing users from localStorage:", error);
            }
            const updatedUsers = users.filter(user => user.email !== loggedInUser.email);
            localStorage.setItem("users", JSON.stringify(updatedUsers));
            localStorage.removeItem("loggedInUser");
            Swal.fire("Deleted", "Your account has been deleted.", "success").then(() => {
                navigate("/login");
            });
        }
    };

    const handleLogout = async (e) => {
        e.preventDefault();
        if (loggedInUser.email === "Not logged in") {
            Swal.fire("Error", "Please log in to log out.", "error");
            return;
        }
        const result = await Swal.fire({
            title: "Logout",
            text: "Are you sure you want to log out?",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Yes, Logout",
            cancelButtonText: "No",
            reverseButtons: true,
        });
        if (result.isConfirmed) {
            localStorage.removeItem("loggedInUser");
            Swal.fire("Logged Out", "You have been logged out.", "success").then(() => {
                navigate("/login");
            });
        }
    };

    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
        });
    }, []);

    return (
        <nav className="navbar navbar-expand-lg fixed-top py-3 bg-white shadow" data-aos="fade-down" data-aos-duration="1000">
            <div className="container">
                <a href="#" className="navbar-brand d-flex align-items-center text-primary" data-aos="fade-down" data-aos-duration="600">
                    <i className="bx bx-wallet fs-4 me-2"></i>
                    Money Management
                </a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto d-flex align-items-center" data-aos="fade-down">
                        <li className="nav-item">
                            <Link to="/" className="nav-link active" data-aos-delay="800">
                                <i className="bx bx-home-alt me-1"></i>
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/income" className="nav-link" data-aos-delay="700">
                                <i className="bx bx-dollar-circle me-1"></i>
                                Income
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/expenses" className="nav-link" data-aos-delay="600">
                                <i className="bx bx-receipt me-1"></i>
                                Expenses
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/reports" className="nav-link" data-aos-delay="500">
                                <i className="bx bx-bar-chart-alt-2 me-1"></i>
                                Reports
                            </Link>
                        </li>
                        {userName === "Guest" ? (
                            <li className="nav-item" data-aos-delay="400">
                                <Link to="/login" className="nav-link" data-bs-tooltip="tooltip" title="Log in to your account">
                                    <i className="bx bx-log-in me-1"></i>
                                    Login
                                </Link>
                            </li>
                        ) : (
                            <li className="nav-item dropdown" data-aos-delay="400">
                                <a
                                    className="nav-link dropdown-toggle d-flex align-items-center"
                                    href="#"
                                    id="profileDropdown"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                    data-bs-tooltip="tooltip"
                                    title="Profile Options"
                                >
                                    <i className="bx bx-id-card me-1"></i>
                                    {userName}
                                </a>
                                <div
                                    className="dropdown-menu dropdown-menu-end border-0 shadow rounded-3 p-3"
                                    aria-labelledby="profileDropdown"
                                    data-aos="fade-down"
                                    data-aos-delay="100"
                                    style={{ minWidth: "300px" }}
                                >
                                    <div className="card border-0">
                                        <div className="card-body p-3">
                                            <div className="d-flex align-items-center mb-2 shadow p-2 rounded-3">
                                                <i className="bx bx-user-circle fs-4 text-primary me-2"></i>
                                                <div>
                                                    <h6 className="fw-bold mb-0">{userName}</h6>
                                                    <small className="text-muted">{loggedInUser.email}</small>
                                                </div>
                                            </div>
                                            <hr className="my-2" />
                                            <button
                                                className="btn btn-outline-danger w-100 rounded-3 mb-2"
                                                onClick={handleDeleteAccount}
                                                data-bs-tooltip="tooltip"
                                                title="Delete your account"
                                            >
                                                <i className="bx bx-trash me-1"></i>
                                                Delete Account
                                            </button>

                                            <button
                                                className="btn btn-outline-warning w-100 rounded-3 mb-2"
                                                onClick={handleClearLocalStorage}
                                                data-bs-tooltip="tooltip"
                                                title="Clear all localStorage data"
                                            >
                                                <i className="bx bx-trash me-1"></i>
                                                Delete All Data
                                            </button>

                                            <button
                                                className="btn btn-outline-primary w-100 rounded-3"
                                                onClick={handleLogout}
                                                data-bs-tooltip="tooltip"
                                                title="Log out of your account"
                                            >
                                                <i className="bx bx-log-out me-1"></i>
                                                Logout
                                            </button>

                                        </div>
                                    </div>
                                </div>
                            </li>
                        )}
                        <li className="nav-item" data-aos-delay="300">
                            <a
                                href="#"
                                className="btn btn-primary btn-sm ms-lg-3 mt-2 mt-lg-0 d-flex align-items-center shadow-lg justify-content-center"
                                data-bs-toggle="tooltip"
                                data-bs-placement="right"
                                onClick={handleClick}
                                title="Add Income"
                            >
                                <i className="bx bx-plus me-1"></i>
                                Add Income
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;