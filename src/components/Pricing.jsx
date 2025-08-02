import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useBootstrapTooltips } from "../functions/Tooltip";


const Pricing = () => {
    useBootstrapTooltips();
    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
    }, []);
    const [isYearly, setIsYearly] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState(1);

    const pricingPlans = [
        {
            id: 0,
            name: "Free Trial",
            subtitle: "Perfect for Getting Started",
            price: { monthly: 0, yearly: 0 },
            originalPrice: { monthly: 49000, yearly: 490000 },
            duration: "14 Days Free",
            badge: "Most Popular",
            badgeColor: "success",
            icon: "bx-gift",
            highlights: [
                "No credit card required",
                "Full access for 14 days",
                "Easy setup in 5 minutes"
            ]
        },
        {
            id: 1,
            name: "Personal Pro",
            subtitle: "Best for Individual Users",
            price: { monthly: 49000, yearly: 39000 },
            originalPrice: { monthly: 79000, yearly: 590000 },
            duration: "per month",
            badge: "Recommended",
            badgeColor: "primary",
            icon: "bx-user",
            highlights: [
                "Save 38% with yearly plan",
                "Cancel anytime",
                "30-day money back guarantee"
            ]
        },
        {
            id: 2,
            name: "Family Premium",
            subtitle: "Perfect for Families",
            price: { monthly: 89000, yearly: 69000 },
            originalPrice: { monthly: 129000, yearly: 990000 },
            duration: "per month",
            badge: "Best Value",
            badgeColor: "warning",
            icon: "bx-group",
            highlights: [
                "Share with 5 family members",
                "Advanced investment tracking",
                "24/7 premium support"
            ]
        },
        {
            id: 3,
            name: "Business Elite",
            subtitle: "For Small Businesses",
            price: { monthly: 149000, yearly: 119000 },
            originalPrice: { monthly: 199000, yearly: 1590000 },
            duration: "per month",
            badge: "Enterprise",
            badgeColor: "info",
            icon: "bx-briefcase",
            highlights: [
                "Unlimited team members",
                "Advanced business features",
                "Dedicated account manager"
            ]
        }
    ];

    const toggleBilling = () => {
        setIsYearly(!isYearly);
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('id-ID').format(price);
    };

    const calculateSavings = (monthly, yearly) => {
        const yearlyTotal = monthly * 12;
        const actualYearly = yearly * 12;
        const savings = yearlyTotal - actualYearly;
        return Math.round((savings / yearlyTotal) * 100);
    };

    return (
        <section className="py-5 bg-white overflow-hidden">
            <div className="container">
                <div className="row justify-content-center mb-5">
                    <div className="col-lg-8 text-center">
                        <span
                            className="badge bg-primary bg-opacity-10 text-primary px-3 py-2 rounded-pill mb-3"
                            data-aos="fade-up"
                            data-aos-delay="100"
                        >
                            <i className="bx bx-crown me-2"></i>
                            Pricing Plans
                        </span>

                        <h2
                            className="display-5 fw-bold text-dark mb-4"
                            data-aos="fade-up"
                            data-aos-delay="200"
                        >
                            Choose the Perfect Plan for
                            <span className="text-primary"> Your Financial Journey</span>
                        </h2>

                        <p
                            className="lead text-muted mb-4"
                            data-aos="fade-up"
                            data-aos-delay="300"
                        >
                            Start with our free trial and upgrade anytime. All plans include our core money management features
                            with 30-day money-back guarantee.
                        </p>

                        <div
                            className="d-flex align-items-center justify-content-center gap-3 mb-4"
                            data-aos="fade-up"
                            data-aos-delay="400"
                        >
                            <span className={`fw-semibold ${!isYearly ? 'text-primary' : 'text-muted'}`}>Monthly</span>
                            <div className="form-check form-switch">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="billingToggle"
                                    checked={isYearly}
                                    onChange={toggleBilling}
                                    style={{ transform: 'scale(1.2)' }}
                                />
                            </div>
                            <span className={`fw-semibold ${isYearly ? 'text-primary' : 'text-muted'}`}>
                                Yearly
                                <span className="badge bg-success bg-opacity-10 text-success ms-2 small">Save up to 30%</span>
                            </span>
                        </div>
                    </div>
                </div>

                <div className="row g-4 mb-5">
                    {pricingPlans.map((plan, index) => (
                        <div
                            className="col-lg-3 col-md-6"
                            key={plan.id}
                            data-aos="fade-up"
                            data-aos-delay={500 + index * 100}
                        >
                            <div
                                className={`card border-0 shadow h-100 position-relative ${selectedPlan === plan.id ? 'border-primary' : ''}`}
                                style={{ transition: 'all 0.3s ease' }}
                                onMouseEnter={() => setSelectedPlan(plan.id)}
                            >
                                {plan.badge && (
                                    <div className={`badge bg-${plan.badgeColor} position-absolute top-0 start-50 translate-middle px-3 py-2 rounded-pill`}>
                                        <i className="bx bx-star me-1"></i>
                                        {plan.badge}
                                    </div>
                                )}

                                <div className="card-body p-4 text-center">
                                    <div className={`bg-${plan.badgeColor} bg-opacity-10 rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center`}
                                        style={{ width: '80px', height: '80px' }}>
                                        <i className={`bx ${plan.icon} text-${plan.badgeColor} fs-1`}></i>
                                    </div>

                                    <h5 className="fw-bold text-dark mb-1">{plan.name}</h5>
                                    <p className="text-muted small mb-3">{plan.subtitle}</p>

                                    <div className="mb-3">
                                        {plan.id === 0 ? (
                                            <div>
                                                <h2 className="fw-bold text-success mb-0">FREE</h2>
                                                <p className="text-muted small">{plan.duration}</p>
                                                <p className="text-muted small">
                                                    <span className="text-decoration-line-through">
                                                        Rp {formatPrice(plan.originalPrice.monthly)}
                                                    </span>
                                                </p>
                                            </div>
                                        ) : (
                                            <div>
                                                <div className="d-flex align-items-center justify-content-center gap-2 mb-2">
                                                    <h2 className="fw-bold text-dark mb-0">
                                                        Rp {formatPrice(isYearly ? plan.price.yearly : plan.price.monthly)}
                                                    </h2>
                                                    <div className="text-muted small">
                                                        /{isYearly ? 'month' : 'month'}
                                                    </div>
                                                </div>
                                                {isYearly && (
                                                    <p className="text-success small mb-0">
                                                        Save {calculateSavings(plan.price.monthly, plan.price.yearly)}% yearly
                                                    </p>
                                                )}
                                                <p className="text-muted small text-decoration-line-through">
                                                    Rp {formatPrice(isYearly ? Math.round(plan.originalPrice.yearly / 12) : plan.originalPrice.monthly)}
                                                </p>
                                            </div>
                                        )}
                                    </div>

                                    <div className="mb-4">
                                        {plan.highlights.map((highlight, idx) => (
                                            <div key={idx} className="d-flex align-items-center justify-content-center mb-2">
                                                <i className="bx bx-check-circle text-success me-2"></i>
                                                <small className="text-muted">{highlight}</small>
                                            </div>
                                        ))}
                                    </div>

                                    <button
                                        className={`btn btn-${plan.badgeColor} w-100 shadow text-white`}
                                        data-bs-toggle="tooltip"
                                        data-bs-placement="top"
                                        title={
                                            plan.id === 0 ? "Start your free trial now!" :
                                                plan.id === 1 ? "Choose Personal Pro plan" :
                                                    plan.id === 2 ? "Choose Family Premium plan" :
                                                        "Contact our sales team"
                                        }
                                    >
                                        <i className={`bx ${plan.id === 3 ? 'bx-phone' : plan.id === 0 ? 'bx-gift' : 'bx-plus'} me-2`}></i>
                                        {plan.id === 0 ? 'Start Free Trial' :
                                            plan.id === 1 ? 'Choose Personal Pro' :
                                                plan.id === 2 ? 'Choose Family Premium' :
                                                    'Contact Sales'}
                                    </button>

                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Pricing;
