import { useEffect } from "react";
import useCounter from "../functions/useCounter";
import AOS from "aos";
import "aos/dist/aos.css";

const Problem = () => {
    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
    }, []);

    const income = useCounter(8500000);
    const expenses = useCounter(8750000);
    const deficit = useCounter(250000);
    const coffee = useCounter(450000);
    const impulse = useCounter(850000);
    const subscriptions = useCounter(320000);

    return (
        <section className="py-5 bg-white overflow-hidden">
            <div className="container">
                <div className="row justify-content-center mb-5" data-aos="fade-up">
                    <div className="col-lg-8 text-center">
                        <span className="badge bg-danger bg-opacity-10 text-danger px-3 py-2 rounded-pill mb-3" data-aos="zoom-in" data-aos-delay="200">
                            <i className="bx bx-error-circle me-2"></i>
                            Financial Problems
                        </span> 

                        <h2 className="display-5 fw-bold text-dark mb-4" data-aos="fade-up" data-aos-delay="300">
                            Money Runs Out Fast, But
                            <span className="text-danger"> Don’t Know Where It Went?</span>
                        </h2>

                        <p className="lead text-muted mb-4" data-aos="fade-up" data-aos-delay="400">
                            You're not alone! Millions of people face the same financial struggles.
                            Let's take a look at some shocking facts about personal financial management.
                        </p>
                    </div>
                </div>

                <div className="row g-4 mb-5" data-aos="fade-up" data-aos-delay="500">
                    {[
                        {
                            icon: "bx-money",
                            percentage: 78,
                            title: "Indonesians",
                            desc: "Live paycheck to paycheck without emergency savings",
                            color: "danger"
                        },
                        {
                            icon: "bx-trending-down",
                            percentage: 65,
                            title: "Young Workers",
                            desc: "Experience monthly spending leaks",
                            color: "warning"
                        },
                        {
                            icon: "bx-calculator",
                            percentage: 82,
                            title: "General Public",
                            desc: "Never track daily expenses",
                            color: "info"
                        }
                    ].map((stat, index) => {
                        const count = useCounter(stat.percentage);
                        return (
                            <div className="col-lg-4 col-md-6" key={index} data-aos="zoom-in" data-aos-delay={600 + index * 200}>
                                <div className="card border-0 shadow h-100 text-center p-4">
                                    <div className={`bg-${stat.color} bg-opacity-10 rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center`} style={{ width: '80px', height: '80px' }}>
                                        <i className={`bx ${stat.icon} text-${stat.color} fs-1`}></i>
                                    </div>
                                    <h3 className={`text-${stat.color} fw-bold mb-2`}>{count}%</h3>
                                    <h6 className="fw-semibold text-dark mb-2">{stat.title}</h6>
                                    <p className="text-muted small mb-0">{stat.desc}</p>
                                </div>
                            </div>
                        );  
                    })}
                </div>

                <div className="row align-items-center mb-5">
                    <div className="col-lg-6 col-md-12 mb-4 mb-lg-0" data-aos="fade-right" data-aos-delay="700">
                        <h3 className="fw-bold text-dark mb-4">
                            <i className="bx bx-error text-danger me-2"></i>
                            Common Financial Problems
                        </h3>

                        <div className="accordion accordion-flush" id="problemAccordion">
                            {[
                                {
                                    id: "problem1",
                                    icon: "bx-money",
                                    title: "Uncontrolled Spending Leaks",
                                    desc: "Money disappears on small, unnecessary things. Coffee shops, online snacks, forgotten subscriptions — all draining your wallet unnoticed."
                                },
                                {
                                    id: "problem2",
                                    icon: "bx-calendar-x",
                                    title: "Salary Doesn’t Last Until Month-End",
                                    desc: "By week three, you're borrowing money; week four, it’s instant noodles again. Even with raises, it never seems enough."
                                },
                                {
                                    id: "problem3",
                                    icon: "bx-notepad",
                                    title: "Never Track Expenses",
                                    desc: "Too lazy, too complicated, or just forgetful. Without tracking, it's hard to find areas to save and you stay trapped in financial issues."
                                },
                                {
                                    id: "problem4",
                                    icon: "bx-target-lock",
                                    title: "No Clear Financial Goals",
                                    desc: "Living without a financial plan. No savings goals, no investments, no emergency fund — everything flows without direction."
                                },
                                {
                                    id: "problem5",
                                    icon: "bx-time-five",
                                    title: "Poor Time Management for Finances",
                                    desc: "Late bill payments, missed installments, and no time to track expenses. Both time and money are lost without a trace."
                                }
                            ].map((problem) => (
                                <div className="accordion-item border-0 mb-3" key={problem.id} data-aos="fade-up" data-aos-delay="800">
                                    <h2 className="accordion-header">
                                        <button
                                            className="accordion-button collapsed bg-light rounded-3 shadow"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target={`#${problem.id}`}
                                            aria-expanded="false"
                                        >
                                            <div className="d-flex align-items-center">
                                                <div className="bg-danger bg-opacity-10 rounded-circle p-2 me-3">
                                                    <i className={`bx ${problem.icon} text-danger`}></i>
                                                </div>
                                                <span className="fw-semibold">{problem.title}</span>
                                            </div>
                                        </button>
                                    </h2>
                                    <div
                                        id={problem.id}
                                        className="accordion-collapse collapse"
                                        data-bs-parent="#problemAccordion"
                                    >
                                        <div className="accordion-body bg-light rounded-bottom-3 text-muted">
                                            {problem.desc}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="col-lg-6 col-md-12" data-aos="fade-left" data-aos-delay="900">
                        <div className="position-relative">
                            <div className="card border-0 shadow rounded-4 p-4 bg-gradient-to-br from-red-50 to-orange-100">
                                <div className="text-center mb-4">  
                                    <div className="bg-danger bg-opacity-10 rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center" style={{ width: '100px', height: '100px' }}>
                                        <i className="bx bx-wallet text-danger" style={{ fontSize: '3rem' }}></i>
                                    </div>
                                    <h5 className="fw-bold text-danger mb-2">Current Financial Condition</h5>
                                    <p className="text-muted small">A realistic picture of most people’s financial status</p>
                                </div>

                                <div className="row g-3 mb-4">
                                    <div className="col-6" data-aos="fade-up" data-aos-delay="1000">
                                        <div className="bg-success bg-opacity-10 rounded-3 p-3 text-center">
                                            <i className="bx bx-plus-circle text-success fs-3 mb-2"></i>
                                            <div className="fw-bold text-success">Rp {income.toLocaleString('id-ID')}</div>
                                            <small className="text-muted">Income</small>
                                        </div>
                                    </div>
                                    <div className="col-6" data-aos="fade-up" data-aos-delay="1100">
                                        <div className="bg-danger bg-opacity-10 rounded-3 p-3 text-center">
                                            <i className="bx bx-minus-circle text-danger fs-3 mb-2"></i>
                                            <div className="fw-bold text-danger">Rp {expenses.toLocaleString('id-ID')}</div>
                                            <small className="text-muted">Expenses</small>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white rounded-3 p-3 text-center border border-danger border-opacity-25" data-aos="fade-up" data-aos-delay="1200">
                                    <i className="bx bx-error-circle text-danger fs-4 mb-2"></i>
                                    <div className="fw-bold text-danger">-Rp {deficit.toLocaleString('id-ID')}</div>
                                    <small className="text-muted">Monthly Deficit</small>
                                </div>
                            </div>

                            <div className="position-absolute top-0 start-0" data-aos="fade-down" data-aos-delay="1300">
                                <div className="card shadow border-0 rounded-3 p-3" style={{ width: '120px' }}>
                                    <div className="text-center">
                                        <i className="bx bx-coffee text-warning fs-4"></i>
                                        <div className="fw-bold small text-dark">Rp {coffee.toLocaleString('id-ID')}</div>
                                        <small className="text-muted">Coffee & Snacks</small>
                                    </div>
                                </div>
                            </div>

                            <div className="position-absolute top-0 end-0" data-aos="fade-down" data-aos-delay="1400">
                                <div className="card shadow border-0 rounded-3 p-3" style={{ width: '130px' }}>
                                    <div className="text-center">
                                        <i className="bx bx-shopping-bag text-info fs-4"></i>
                                        <div className="fw-bold small text-dark">Rp {impulse.toLocaleString('id-ID')}</div>
                                        <small className="text-muted">Impulse Buying</small>
                                    </div>
                                </div>
                            </div>

                            <div className="position-absolute bottom-0 start-0" data-aos="fade-down" data-aos-delay="1500">
                                <div className="card shadow border-0 rounded-3 p-3" style={{ width: '140px' }}>
                                    <div className="text-center">
                                        <i className="bx bx-credit-card text-danger fs-4"></i>
                                        <div className="fw-bold small text-dark">Rp {subscriptions.toLocaleString('id-ID')}</div>
                                        <small className="text-muted">Forgotten Subscriptions</small>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Problem;
