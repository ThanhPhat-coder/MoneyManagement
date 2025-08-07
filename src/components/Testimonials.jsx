import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const Testimonials = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
    }, []);

    const testimonials = [
        {
            id: 1,
            name: "Uzumaki Naruto",
            role: "Software Developer",
            company: "HSU Uni",
            image: "https://gamek.mediacdn.vn/133514250583805952/2020/5/31/anh-4-15909430232362015900333.png",
            rating: 5,
            text: "Perfect!.",
            savings: "Rp 8,500,000",
            period: "4 months"
        },
        {
            id: 2,
            name: "Monkey D Luffy",
            role: "Business Owner",
            company: "HSU Uni",
            image: "https://jbagy.me/wp-content/uploads/2025/03/avatar-Luffy.jpg",
            rating: 5,
            text: "10 points no but.",
            savings: "Rp 25,000,000",
            period: "8 months"
        },
        {
            id: 3,
            name: "Cristiano Ronaldo",
            role: "Football Player",
            company: "Al Nassr FC",
            image: "https://file3.qdnd.vn/data/images/0/2022/11/23/vuhuyen/cris.jpeg?dpi=150&quality=100&w=870",
            rating: 5,
            text: "Siuuuuuuu!",
            savings: "Rp 12,750,000",
            period: "5 months"
        },
        {
            id: 4,
            name: "Lionel Messi",
            role: "Football Player",
            company: "Inter Miami CF",
            image: "https://pbs.twimg.com/profile_images/1075824593711947776/_7XI8ec0_400x400.jpg",
            rating: 5,
            text: "I love this app! It helps me manage my finances effortlessly.",
            savings: "Rp 6,200,000",
            period: "7 months"
        },
        {
            id: 5,
            name: "Elon Musk",
            role: "CEO of SpaceX",
            company: "SpaceX",
            image: "https://media.cnn.com/api/v1/images/stellar/prod/c-2025-01-29t200958z-751044450-rc2qdca4cgkl-rtrmadp-3-tesla-results.jpg?c=16x9&q=h_833,w_1480,c_fill",
            rating: 5,
            text: "Bitcoin to the moon and you to the hole.",
            savings: "Rp 9,800,000",
            period: "6 months"
        }
    ];

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    const goToSlide = (index) => {
        setCurrentSlide(index);
    };


    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const renderStars = (rating) => {
        return [...Array(5)].map((_, i) => (
            <i key={i} className={`bx ${i < rating ? 'bxs-star' : 'bx-star'} text-warning`}></i>
        ));
    };

    return (
        <section className="py-5 bg-white overflow-hidden">
            <div className="container">
                <div className="row align-items-center">

                    <div className="col-lg-5 col-md-12 mb-5 mb-lg-0" data-aos="fade-right">
                        <div className="pe-lg-4">

                            <span className="badge bg-success bg-opacity-10 text-success px-3 py-2 rounded-pill mb-3" data-aos="zoom-in" data-aos-delay="200">
                                <i className="bx bx-heart me-2"></i>
                                User Testimonials
                            </span>

                            <h2 className="display-5 fw-bold text-dark mb-4" data-aos="fade-up" data-aos-delay="300">
                                Real People,
                                <span className="text-success"> Real Results</span>
                            </h2>

                            <p className="lead text-muted mb-4" data-aos="fade-up" data-aos-delay="400">
                                Join thousands of users who have transformed their financial lives with our money management tracker.
                            </p>

                            <div className="card border-0 shadow rounded-4 p-4 mb-4" data-aos="fade-up" data-aos-delay="500">
                                <div className="row text-center g-0">
                                    <div className="col-4">
                                        <div className="border-end border-light">
                                            <div className="bg-primary bg-opacity-10 rounded-circle mx-auto mb-2 d-flex align-items-center justify-content-center" style={{ width: '50px', height: '50px' }}>
                                                <i className="bx bx-user text-primary fs-5"></i>
                                            </div>
                                            <h5 className="fw-bold text-primary mb-0">50K+</h5>
                                            <small className="text-muted">Happy Users</small>
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <div className="border-end border-light">
                                            <div className="bg-success bg-opacity-10 rounded-circle mx-auto mb-2 d-flex align-items-center justify-content-center" style={{ width: '50px', height: '50px' }}>
                                                <i className="bx bx-trending-up text-success fs-5"></i>
                                            </div>
                                            <h5 className="fw-bold text-success mb-0">85%</h5>
                                            <small className="text-muted">Save More</small>
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <div className="bg-warning bg-opacity-10 rounded-circle mx-auto mb-2 d-flex align-items-center justify-content-center" style={{ width: '50px', height: '50px' }}>
                                            <i className="bx bx-star text-warning fs-5"></i>
                                        </div>
                                        <h5 className="fw-bold text-warning mb-0">4.9</h5>
                                        <small className="text-muted">Rating</small>
                                    </div>
                                </div>
                            </div>


                            <div className="d-flex align-items-center gap-3" data-aos="fade-up" data-aos-delay="600">
                                <div className="d-flex align-items-center">
                                    <i className="bx bx-check-shield text-success me-2 fs-5"></i>
                                    <small className="text-muted">Trusted by 50,000+ users</small>
                                </div>
                                <div className="d-flex align-items-center">
                                    <i className="bx bxs-star text-warning me-2 fs-5"></i>
                                    <small className="text-muted">4.9★ Real Users</small>
                                </div>
                            </div>

                        </div>
                    </div>


                    <div className="col-lg-7 col-md-12" data-aos="fade-left" data-aos-delay="700">
                        <div className="position-relative">

                            <div className="testimonial-carousel overflow-hidden rounded-4 shadow">
                                <div
                                    className="d-flex transition-all"
                                    style={{
                                        transform: `translateX(-${currentSlide * 100}%)`,
                                        transition: 'transform 0.5s ease-in-out'
                                    }}
                                >
                                    {testimonials.map((testimonial) => (
                                        <div key={testimonial.id} className="w-100 flex-shrink-0 px-2" style={{ minWidth: '100%', boxSizing: 'border-box' }}>
                                            <div className="card card-testimonials border-0  rounded-4 p-4 h-100">

                                                <div className="d-flex align-items-center mb-3">
                                                    <img
                                                        src={testimonial.image}
                                                        alt={testimonial.name}
                                                        className="rounded-circle me-3"
                                                        width="60"
                                                        height="60"
                                                        style={{ objectFit: 'cover' }}
                                                    />
                                                    <div className="flex-grow-1">
                                                        <h6 className="fw-bold mb-0">{testimonial.name}</h6>
                                                        <p className="text-muted small mb-1">{testimonial.role}</p>
                                                        <p className="text-primary small mb-0">{testimonial.company}</p>
                                                    </div>
                                                    <div className="text-end">
                                                        <div className="mb-1">
                                                            {renderStars(testimonial.rating)}
                                                        </div>
                                                        <small className="text-muted">Verified User</small>
                                                    </div>
                                                </div>


                                                <div className="position-relative mb-4">
                                                    <i className="bx bxs-quote-alt-left text-primary fs-1 opacity-25 position-absolute" style={{ top: '-10px', left: '-10px' }}></i>
                                                    <p className="text-muted lead ps-4">
                                                        {testimonial.text}
                                                    </p>
                                                </div>

                                                <div className="row g-3 mt-auto">
                                                    <div className="col-6">
                                                        <div className="bg-success bg-opacity-10 rounded-3 p-3 text-center">
                                                            <i className="bx bx-wallet text-success fs-4 mb-1"></i>
                                                            <div className="fw-bold text-success small">{testimonial.savings}</div>
                                                            <small className="text-muted">Total Saved</small>
                                                        </div>
                                                    </div>
                                                    <div className="col-6">
                                                        <div className="bg-info bg-opacity-10 rounded-3 p-3 text-center">
                                                            <i className="bx bx-time text-info fs-4 mb-1"></i>
                                                            <div className="fw-bold text-info small">{testimonial.period}</div>
                                                            <small className="text-muted">Using App</small>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <button
                                className="btn btn-primary rounded-circle position-absolute top-50 start-0 translate-middle-y d-none d-lg-flex align-items-center justify-content-center shadow"
                                style={{ width: '50px', height: '50px', left: '-25px', zIndex: 10 }}
                                onClick={prevSlide}
                                type="button"
                            >
                                <i className="bx bx-chevron-left fs-4"></i>
                            </button>

                            <button
                                className="btn btn-primary rounded-circle position-absolute top-50 end-0 translate-middle-y d-none d-lg-flex align-items-center justify-content-center shadow"
                                style={{ width: '50px', height: '50px', right: '-25px', zIndex: 10 }}
                                onClick={nextSlide}
                                type="button"
                            >
                                <i className="bx bx-chevron-right fs-4"></i>
                            </button>


                            <div className="d-flex justify-content-center mt-4 gap-2">
                                {testimonials.map((_, index) => (
                                    <button
                                        key={index}
                                        className={`btn rounded-circle p-0 ${index === currentSlide ? 'bg-primary' : 'bg-light border'}`}
                                        style={{ width: '12px', height: '12px' }}
                                        onClick={() => goToSlide(index)}
                                        type="button"
                                        aria-label={`Go to slide ${index + 1}`}
                                    ></button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </section>
    );
};

export default Testimonials;