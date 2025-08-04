import { useEffect, useState } from "react";
import { useBootstrapTooltips } from "../functions/Tooltip";
import 'aos/dist/aos.css';
import AOS from 'aos';
import { getUsername } from "../auth/getUsername";

const HeroExpenses = () => {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [transactions, setTransactions] = useState([]);
    const userName = getUsername();

    useBootstrapTooltips();

    useEffect(() => {
        AOS.init({ 
            duration: 1000, 
            once: true,
            offset: 100
        });

        const loadTransactions = () => {
            try {
                const storedTransactions = localStorage.getItem("transactions");
                if (storedTransactions) {
                    const parsed = JSON.parse(storedTransactions).filter(t => t.type === 'expense' && t.date && !isNaN(new Date(t.date).getTime()));
                    setTransactions(parsed);
                }
            } catch (error) {
                console.error("Error loading transactions from localStorage:", error);
            }
        };

        loadTransactions();
        window.addEventListener("storage", loadTransactions);
        return () => window.removeEventListener("storage", loadTransactions);
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 60000);

        return () => clearInterval(timer);
    }, []);

    const financialData = {
        totalExpenses: transactions
            .reduce((sum, t) => sum + (parseFloat(t.amount) || 0), 0),
        monthlyExpenses: transactions
            .filter(t => 
                new Date(t.date).getMonth() === currentTime.getMonth() && 
                new Date(t.date).getFullYear() === currentTime.getFullYear())
            .reduce((sum, t) => sum + (parseFloat(t.amount) || 0), 0),
        highestCategory: (() => {
            const categorySums = transactions
                .reduce((acc, t) => {
                    acc[t.category] = (acc[t.category] || 0) + (parseFloat(t.amount) || 0);
                    return acc;
                }, {});
            const maxCategory = Object.entries(categorySums).reduce((max, [category, amount]) => 
                amount > (max.amount || 0) ? { category, amount } : max, {});
            return maxCategory.category || "None";
        })(),
        averageExpenses: (() => {
            const expenseByMonth = transactions
                .reduce((acc, t) => {
                    const date = new Date(t.date);
                    if (!isNaN(date.getTime())) {
                        const monthKey = `${date.getFullYear()}-${date.getMonth()}`;
                        acc[monthKey] = (acc[monthKey] || 0) + (parseFloat(t.amount) || 0);
                        return acc;
                    }
                    return acc;
                }, {});
            const monthlySums = Object.values(expenseByMonth);
            return monthlySums.length > 0 ? monthlySums.reduce((sum, val) => sum + val, 0) / monthlySums.length : 0;
        })()
    };

    const getGreeting = () => {
        const hour = currentTime.getHours();
        if (hour < 12) return "Good Morning";
        if (hour < 17) return "Good Afternoon";
        return "Good Evening";
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 2
        }).format(amount || 0);
    };

    const getCurrentMonth = () => {
        return currentTime.toLocaleString('id-ID', { month: 'long' });
    };

    return (
        <section className="py-5">
            <div className="container" style={{ paddingTop: "60px" }}>
                <div className="row mb-5">
                    <div className="col-12">
                        <div 
                            className="bg-white rounded-4 shadow p-4 mb-4 border-0"
                            data-aos="fade-down"
                            data-aos-duration="1000"
                        >
                            <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center">
                                <div>
                                    <h2 className="fw-bold text-dark mb-2" data-aos="fade-right" data-aos-delay="200">
                                        {getGreeting()}, {userName}! 👋
                                    </h2>
                                    <p className="text-muted mb-0 lead" data-aos="fade-right" data-aos-delay="300">
                                        Welcome back to your expense overview. Here's how your spending looks this month.
                                    </p>
                                </div>
                                <div className="mt-3 mt-md-0" data-aos="fade-left" data-aos-delay="400">
                                    <div className="d-flex align-items-center bg-danger bg-opacity-10 rounded-pill px-3 py-2">
                                        <i className="bx bx-calendar text-danger me-2"></i>
                                        <span className="text-danger fw-semibold">
                                            {currentTime.toLocaleDateString('id-ID', { 
                                                weekday: 'long', 
                                                year: 'numeric', 
                                                month: 'long', 
                                                day: 'numeric' 
                                            })}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row g-4 mb-5">
                    <div className="col-xl-3 col-lg-6 col-md-6 col-12">
                        <div 
                            className="card border-0 shadow h-100 hover-lift"
                            data-aos="fade-up"
                            data-aos-delay="500"
                            data-bs-toggle="tooltip"
                            title="Your total accumulated expenses"
                        >
                            <div className="card-body p-4">
                                <div className="d-flex align-items-center justify-content-between mb-3">
                                    <div className="bg-danger bg-opacity-15 rounded-circle p-3">
                                        <i className="bx bx-wallet text-danger fs-3"></i>
                                    </div>
                                    <div className="badge bg-danger bg-opacity-10 text-danger">
                                        <i className="bx bx-trending-down me-1"></i>
                                        Total
                                    </div>
                                </div>
                                <h3 className="fw-bold text-danger mb-1">
                                    {formatCurrency(financialData.totalExpenses)}
                                </h3>
                                <p className="text-muted mb-0 fw-medium">Total Expenses</p>
                                <small className="text-muted">All time spending</small>
                            </div>
                        </div>
                    </div>

                    <div className="col-xl-3 col-lg-6 col-md-6 col-12">
                        <div 
                            className="card border-0 shadow h-100 hover-lift"
                            data-aos="fade-up"
                            data-aos-delay="600"
                            data-bs-toggle="tooltip"
                            title={`Expenses in ${getCurrentMonth()}`}
                        >
                            <div className="card-body p-4">
                                <div className="d-flex align-items-center justify-content-between mb-3">
                                    <div className="bg-warning bg-opacity-15 rounded-circle p-3">
                                        <i className="bx bx-chart text-warning fs-3"></i>
                                    </div>
                                    <div className="badge bg-info bg-opacity-10 text-info">
                                        <i className="bx bx-calendar me-1"></i>
                                        This Month
                                    </div>
                                </div>
                                <h3 className="fw-bold text-warning mb-1">
                                    {formatCurrency(financialData.monthlyExpenses)}
                                </h3>
                                <p className="text-muted mb-0 fw-medium">Expenses This Month</p>
                                <small className="text-muted">{getCurrentMonth()} spending</small>
                            </div>
                        </div>
                    </div>

                    <div className="col-xl-3 col-lg-6 col-md-6 col-12">
                        <div 
                            className="card border-0 shadow h-100 hover-lift"
                            data-aos="fade-up"
                            data-aos-delay="700"
                            data-bs-toggle="tooltip"
                            title="Your highest expense category"
                        >
                            <div className="card-body p-4">
                                <div className="d-flex align-items-center justify-content-between mb-3">
                                    <div className="bg-secondary bg-opacity-15 rounded-circle p-3">
                                        <i className="bx bx-category text-secondary fs-3"></i>
                                    </div>
                                    <div className="badge bg-secondary bg-opacity-10 text-secondary">
                                        <i className="bx bx-star me-1"></i>
                                        Top Category
                                    </div>
                                </div>
                                <h3 className="fw-bold text-secondary mb-1 text-capitalize">
                                    {financialData.highestCategory || "None"}
                                </h3>
                                <p className="text-muted mb-0 fw-medium">Highest Category</p>
                                <small className="text-muted">Dominant spending area</small>
                            </div>
                        </div>
                    </div>

                    <div className="col-xl-3 col-lg-6 col-md-6 col-12">
                        <div 
                            className="card border-0 shadow h-100 hover-lift"
                            data-aos="fade-up"
                            data-aos-delay="800"
                            data-bs-toggle="tooltip"
                            title="Your average monthly expenses"
                        >
                            <div className="card-body p-4">
                                <div className="d-flex align-items-center justify-content-between mb-3">
                                    <div className="bg-info bg-opacity-15 rounded-circle p-3">
                                        <i className="bx bx-bar-chart-alt-2 text-info fs-3"></i>
                                    </div>
                                    <div className="badge bg-primary bg-opacity-10 text-primary">
                                        <i className="bx bx-math me-1"></i>
                                        Average
                                    </div>
                                </div>
                                <h3 className="fw-bold text-info mb-1">
                                    {formatCurrency(financialData.averageExpenses)}
                                </h3>
                                <p className="text-muted mb-0 fw-medium">Average Expenses</p>
                                <small className="text-muted">Monthly average</small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroExpenses;