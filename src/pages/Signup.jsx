import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import 'aos/dist/aos.css';
import Swal from 'sweetalert2';
import AOS from 'aos';
import 'boxicons/css/boxicons.min.css';
import { useBootstrapTooltips } from "../functions/Tooltip";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  useBootstrapTooltips();

  const goToLogin = (e) => {
    e.preventDefault();
    navigate('/login');
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };


  const handleSignupClick = (e) => {
    e.preventDefault();

    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

   
    const emailExists = existingUsers.some(user => user.email === formData.email);

    if (emailExists) {
      Swal.fire("Error", "Email already registered", "error");
      return;
    }

    const newUser = {
      fullName: formData.fullName,
      email: formData.email,
      password: formData.password, 
    };

    existingUsers.push(newUser);
    localStorage.setItem("users", JSON.stringify(existingUsers));

    Swal.fire("Success", "User registered successfully", "success").then(() => {
      navigate('/login');
    });
  };

  return (
    <section className="py-5 bg-light min-vh-100 d-flex align-items-center">
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
                    Sign Up to <span className="text-primary">Money Management Tracker</span>
                  </h2>
                  <p className="text-muted" data-aos="fade-up" data-aos-delay="300">
                    Create an account to start managing your finances with ease!
                  </p>
                </div>

                <form onSubmit={handleSignupClick}>
                  <div className="mb-3" data-aos="fade-up" data-aos-delay="400">
                    <label htmlFor="fullName" className="form-label fw-semibold text-dark">
                      Full Name
                    </label>
                    <div className="input-group">
                      <span className="input-group-text bg-primary bg-opacity-10 border-0">
                        <i className="bx bx-user text-primary"></i>
                      </span>
                      <input
                        type="text"
                        className="form-control border-0 shadow-sm hover-glow"
                        id="fullName"
                        placeholder="Enter your full name"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-3" data-aos="fade-up" data-aos-delay="500">
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
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-3" data-aos="fade-up" data-aos-delay="600">
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
                        value={formData.password}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="text-center" data-aos="fade-up" data-aos-delay="800">
                    <button
                      type="submit"
                      className="btn btn-primary d-flex align-items-center justify-content-center w-100 shadow px-4 animate__animated animate__pulse animate__infinite"
                      data-bs-toggle="tooltip"
                      title="Create a new account"
                    >
                      Sign Up
                      <i className="bx bx-user-plus ms-2"></i>
                    </button>
                  </div>
                </form>

                <div className="text-center mt-3" data-aos="fade-up" data-aos-delay="900">
                  <p className="text-muted small">
                    Already have an account?{' '}
                    <a
                      href="/login"
                      onClick={goToLogin}
                      className="text-primary fw-semibold"
                      data-bs-toggle="tooltip"
                      title="Log in to your account"
                    >
                      Login Now
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

export default Signup;
