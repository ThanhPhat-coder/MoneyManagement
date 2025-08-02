import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBootstrapTooltips } from "../functions/Tooltip";
import 'aos/dist/aos.css';
import AOS from 'aos';
import Swal from 'sweetalert2';


const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        AOS.init({ duration: 800 });
    }, []);

    useBootstrapTooltips();

    const goToSignup = (e) => {
        e.preventDefault();
        navigate("/signup");
    };

    const handleLoginSubmit = (e) => {
        e.preventDefault();

        const users = JSON.parse(localStorage.getItem("users")) || [];

        const matchedUser = users.find(
            (user) => user.email === email && user.password === password
        );

        if (matchedUser) {
            Swal.fire("Success", "Login successful!", "success").then(() => {
                localStorage.setItem("loggedInUser", JSON.stringify(matchedUser));
                navigate("/");
            });
        } else {
            Swal.fire("Error", "Invalid email or password", "error");
        }
    };
    return (
        <section className="py-5 bg-light min-vh-100 d-flex align-items-center overflow-hidden">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-5 col-md-8">
                        <div
                            className="card border-0 shadow p-4 bg-gradient-to-br from-primary-50 to-white"
                            data-aos="fade-up"
                            data-aos-duration="1000"
                        >
                            <div className="card-body">
                                <div className="text-center mb-4">
                                    <h2 className="fw-bold text-dark" data-aos="fade-up" data-aos-delay="200">
                                        Login to <span className="text-primary">Money Management Tracker</span>
                                    </h2>
                                    <p className="text-muted" data-aos="fade-up" data-aos-delay="300">
                                        Sign in to start managing your finances with ease!
                                    </p>
                                </div>

                                <form onSubmit={handleLoginSubmit}>
                                    <div className="mb-3" data-aos="fade-up" data-aos-delay="400">
                                        <label htmlFor="email" className="form-label fw-semibold text-dark">
                                            Email
                                        </label>
                                        <div className="input-group">
                                            <span className="input-group-text bg-primary bg-opacity-10 border-0">
                                                <i className="bx bx-envelope text-primary"></i>
                                            </span>
                                            <input
                                                type="email"
                                                className="form-control border-0 shadow-sm hover-glow"
                                                id="email"
                                                placeholder="Enter your email"
                                                required
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className="mb-3" data-aos="fade-up" data-aos-delay="500">
                                        <label htmlFor="password" className="form-label fw-semibold text-dark">
                                            Password
                                        </label>
                                        <div className="input-group">
                                            <span className="input-group-text bg-primary bg-opacity-10 border-0">
                                                <i className="bx bx-lock-alt text-primary"></i>
                                            </span>
                                            <input
                                                type="password"
                                                className="form-control border-0 shadow-sm hover-glow"
                                                id="password"
                                                placeholder="Enter your password"
                                                required
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className="text-center" data-aos="fade-up" data-aos-delay="600">
                                        <button
                                            type="submit"
                                            className="btn btn-primary shadow d-flex align-items-center justify-content-center w-100 px-4 animate__animated animate__pulse animate__infinite"
                                            data-bs-toggle="tooltip"
                                            title="Log in to your account"
                                        >
                                            Login
                                            <i className="bx bx-log-in-circle ms-2"></i>
                                        </button>
                                    </div>
                                </form>

                                <div className="text-center mt-3" data-aos="fade-up" data-aos-delay="700">
                                    <p className="text-muted small">
                                        Don’t have an account?{" "}
                                        <a
                                            href="/signup"
                                            onClick={goToSignup}
                                            className="text-primary fw-semibold"
                                            data-bs-toggle="tooltip"
                                            title="Create a new account"
                                        >
                                            Sign Up Now
                                        </a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style>
                {`
                    .hover-glow:focus {
                        outline: none;
                        border-color: var(--bs-primary) !important;
                        box-shadow: 0 0 8px rgba(13, 110, 253, 0.5) !important;
                    }
                    .animate__pulse {
                        animation-duration: 2s;
                    }
                    .input-group-text {
                        background-color: transparent !important;
                    }
                    .form-control {
                        transition: all 0.3s ease;
                    }
                `}
            </style>
        </section>
    );
};

export default Login;
