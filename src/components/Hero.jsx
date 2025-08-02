import { useEffect } from "react";
import useCounter from "../functions/useCounter";
import AOS from "aos";
import { useNavigate } from 'react-router-dom';
import { useBootstrapTooltips } from "../functions/Tooltip";
import "aos/dist/aos.css";
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

const Hero = () => {
    const navigate = useNavigate();
    useBootstrapTooltips();


    const handleGetStartedClick = async (e) => {
        e.preventDefault();

        const result = await Swal.fire({
            title: "Get Started Free",
            text: "Do you want to get started for free?",
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
    const handleWatchDemoClick = () => {
        Swal.fire({
            title: 'Do you want to watch the demo?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: 'Demo Not Available',
                    text: 'The demo feature is not available on this website yet.',
                    icon: 'info',
                    confirmButtonText: 'OK',
                });
            }
        });
    };


    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
    }, []);

    const budget = useCounter(2450);
    const spend = useCounter(1680);
    const savings = useCounter(15);
    const budgetUsed = useCounter(85);

    return (
        <section
            className="py-5 bg-gradient-to-br from-blue-50 to-indigo min-vh-100 d-flex align-items-center overflow-hidden"
            data-aos="fade-down"
            data-aos-duration="1000"
        >
            <div className="container d-flex flex-column" style={{ paddingTop: "80px" }}>
                <div className="row align-items-center">
                    {/* Konten kiri */}
                    <div className="col-lg-6 col-md-12 mb-4 mb-lg-0" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200">
                        <div className="hero-content">
                            <span className="badge bg-primary bg-opacity-10 text-primary px-3 py-2 rounded-pill mb-3" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="300">
                                <i className="bx bx-trending-up me-2"></i>
                                Smart Financial Management
                            </span>

                            <h1 className="display-4 fw-bold text-dark mb-4" data-aos="fade-up" data-aos-delay="400">
                                Take Control of Your
                                <span className="text-primary"> Finances</span> Today
                            </h1>

                            <p className="lead text-muted mb-4" data-aos="fade-up" data-aos-delay="500">
                                Track expenses, set budgets, and achieve your financial goals with our intuitive
                                budget tracker. Make every penny count and build a brighter financial future.
                            </p>

                            <div className="d-flex flex-column flex-sm-row gap-3 mb-4" data-aos="fade-left" data-aos-duration="1000" data-aos-delay="600">
                                <a
                                    href="#"
                                    className="btn btn-primary btn-lg px-4 py-3 rounded-3 shadow-lg d-flex align-items-center justify-content-center"
                                    data-bs-toggle="tooltip"
                                    data-bs-placement="top"
                                    title="Get Started Free"
                                    onClick={handleGetStartedClick}
                                >
                                    <i className="bx bx-rocket me-2"></i>
                                    Get Started Free
                                </a>


                                <button className="btn btn-outline-primary btn-lg px-4 py-3 rounded-3 shadow-lg" data-aos="fade-up" data-aos-delay="800" data-bs-toggle="tooltip" title="Watch Demo" onClick={handleWatchDemoClick}>
                                    <i className="bx bx-play-circle me-2"></i>
                                    Watch Demo
                                </button>
                            </div>

                            {/* fitur fitur */}
                            <div className="row g-3">
                                {[
                                    { icon: "bx-rocket", label: "Fast Performance" },
                                    { icon: "bx-shield", label: "Secure Data" },
                                    { icon: "bx-cog", label: "Customizable" },
                                    { icon: "bx-support", label: "24/7 Support" },
                                ].map(({ icon, label }, i) => (
                                    <div className="col-sm-3" key={i} data-aos="fade-right" data-aos-delay={900 + i * 100}>
                                        <div className="d-flex align-items-center" data-aos="fade-up" data-aos-delay={1000 + i * 100}>
                                            <div className="rounded-circle p-2 me-1 shadow" style={{ backgroundColor: "#fff" }}>
                                                <i className={`bx ${icon} text-primary fs-5`}></i>
                                            </div>
                                            <span className="text-muted small">{label}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Card kanan */}
                    <div className="col-lg-6 col-md-12">
                        <div className="hero-visual position-relative">
                            {/* Card utama */}
                            <div className="card shadow border-0 rounded-4 p-4 mb-4" data-aos="fade-left" data-aos-delay="600" data-aos-duration="1000">
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <h5 className="card-title mb-0 text-dark">Monthly Overview</h5>
                                    <span className="badge bg-success rounded-pill">On Track</span>
                                </div>

                                <div className="row g-3 mb-4">
                                    <div className="col-6" data-aos="fade-up" data-aos-delay="700">
                                        <div className="bg-primary bg-opacity-10 rounded-3 p-3 text-center">
                                            <i className="bx bx-wallet text-primary fs-3 mb-2"></i>
                                            <div className="fw-bold text-primary">${budget}</div>
                                            <small className="text-muted">Total Budget</small>
                                        </div>
                                    </div>
                                    <div className="col-6" data-aos="fade-up" data-aos-delay="800">
                                        <div className="bg-success bg-opacity-10 rounded-3 p-3 text-center">
                                            <i className="bx bx-trending-down text-success fs-3 mb-2"></i>
                                            <div className="fw-bold text-success">${spend}</div>
                                            <small className="text-muted">Spent</small>
                                        </div>
                                    </div>
                                </div>

                                {/* Progress Bar */}
                                <div className="mb-3" data-aos="fade-up" data-aos-delay="900">
                                    <div className="d-flex justify-content-between small text-muted mb-1">
                                        <span>Budget Used</span>
                                        <span>{budgetUsed}%</span>
                                    </div>
                                    <div className="progress rounded-pill" style={{ height: "8px" }}>
                                        <div className="progress-bar bg-gradient" role="progressbar" style={{ width: "68%" }}></div>
                                    </div>
                                </div>
                            </div>

                            {/* Float Card */}
                            <div className="position-absolute top-0 end-0" data-aos="fade-down" data-aos-delay="1000">
                                <div className="card shadow border-0 rounded-3 p-3" style={{ width: "140px" }}>
                                    <div className="text-center">
                                        <i className="bx bx-trending-up text-success fs-4"></i>
                                        <div className="fw-bold text-success">+{savings}</div>
                                        <small className="text-muted">Savings</small>
                                    </div>
                                </div>
                            </div>

                            <div className="position-absolute bottom-0 start-0" data-aos="fade-down" data-aos-delay="1100">
                                <div className="card shadow border-0 rounded-3 p-3" style={{ width: "160px" }}>
                                    <div className="d-flex align-items-center">
                                        <div className="bg-warning bg-opacity-10 rounded-circle p-2 me-2">
                                            <i className="bx bx-bell text-warning"></i>
                                        </div>
                                        <div>
                                            <div className="fw-bold small">Budget Alert</div>
                                            <small className="text-muted">Dining: {budgetUsed}%</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats section */}
                <div className="row mt-5 pt-5" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="1200">
                    {[
                        { icon: "bx-user", color: "primary", value: 50, suffix: "K+", label: "Happy Users" },
                        { icon: "bx-money", color: "success", value: 28, prefix: "$", suffix: "M+", label: "Money Tracked" },
                        { icon: "bx-target-lock", color: "warning", value: 95, suffix: "%", label: "Goal Achievement" },
                        { icon: "bx-lock", color: "info", value: 100, suffix: "%", label: "Secure & Safe" },
                    ].map(({ icon, color, value, prefix = "", suffix = "", label }, i) => {
                        const count = useCounter(value);
                        return (
                            <div className="col-md-3 col-6 text-center mb-4" key={i} data-aos="fade-down" data-aos-delay={1300 + i * 150}>
                                <div className="bg-white rounded-3 p-4 shadow h-100">
                                    <i className={`bx ${icon} text-${color} fs-1 mb-3`}></i>
                                    <h4 className="fw-bold text-dark">{prefix}{count}{suffix}</h4>
                                    <p className="text-muted mb-0">{label}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Hero;
