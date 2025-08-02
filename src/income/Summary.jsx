import { useEffect, useState } from "react";
import { useBootstrapTooltips } from "../functions/Tooltip";
import 'aos/dist/aos.css';
import AOS from 'aos';
import Swal from "sweetalert2";

const Summary = ({ formatCurrency }) => {
    const [transactions, setTransactions] = useState([]);
    const [formData, setFormData] = useState({
        type: "income",
        category: "",
        amount: "",
        date: "",
        description: "",
        notes: "",
        paymentMethod: "",
        tags: ""
    });

    useBootstrapTooltips();

    useEffect(() => {
        AOS.init({ 
            duration: 1000, 
            once: true,
            offset: 50
        });
        return () => AOS.refresh(); 
    }, []);

    useEffect(() => {
        try {
            const storedTransactions = localStorage.getItem("transactions");
            if (storedTransactions) {
                setTransactions(JSON.parse(storedTransactions));
            }
        } catch (error) {
            console.error("Error loading transactions from localStorage:", error);
            Swal.fire("Error", "Failed to load transactions.", "error");
        }
    }, []);

    const calculateTotals = () => {
        const totalIncome = transactions
            .filter(t => t.type === 'income')
            .reduce((sum, t) => sum + (parseFloat(t.amount) || 0), 0);
        
        const totalExpense = transactions
            .filter(t => t.type === 'expense')
            .reduce((sum, t) => sum + (parseFloat(t.amount) || 0), 0);
        
        return { totalIncome, netAmount: totalIncome - totalExpense };
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleAddTransaction = (e) => {
        e.preventDefault();

 
        const { type, category, amount, date, description } = formData;
        if (!type || !category || !amount || !date || !description) {
            Swal.fire("Error", "Please fill in all required fields.", "error");
            return;
        }

  
        const parsedAmount = parseFloat(amount);
        if (isNaN(parsedAmount) || parsedAmount <= 0) {
            Swal.fire("Error", "Amount must be a positive number.", "error");
            return;
        }

        const newTransaction = {
            id: Date.now(),
            type: "income",
            category,
            amount: parsedAmount,
            date,
            description,
            notes: formData.notes || "",
            paymentMethod: formData.paymentMethod || "",
            tags: formData.tags ? formData.tags.split(",").map(tag => tag.trim()) : []
        };


        try {
            const updatedTransactions = [...transactions, newTransaction];
            localStorage.setItem("transactions", JSON.stringify(updatedTransactions));
            setTransactions(updatedTransactions);
            setFormData({
                type: "income",
                category: "",
                amount: "",
                date: "",
                description: "",
                notes: "",
                paymentMethod: "",
                tags: ""
            });

            Swal.fire("Success", "Transaction added successfully!", "success").then(() => {
         
                const modal = document.getElementById("addTransactionModal");
                if (modal) {
                    const bootstrapModal = window.bootstrap.Modal.getInstance(modal);
                    if (bootstrapModal) {
                        bootstrapModal.hide();
                    }
                }
            });
        } catch (error) {
            console.error("Error saving transaction to localStorage:", error);
            Swal.fire("Error", "Failed to save transaction.", "error");
        }
    };

    const totals = calculateTotals();

    return (
        <>
            <div className="row mb-4">
                <div className="col-12">
                    <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4" data-aos="fade-down">
                        <div>
                            <h2 className="fw-bold text-dark mb-2">
                                <i className="bx bx-table text-primary me-2"></i>
                                Transaction History
                            </h2>
                            <p className="text-muted mb-0">Manage and track all your financial transactions</p>
                        </div>
                        <div className="mt-3 mt-md-0">
                            <button 
                                className="btn btn-primary btn-lg rounded-3 shadow" 
                                data-bs-toggle="modal" 
                                data-bs-target="#addTransactionModal" 
                                title="Add Transaction"
                            >
                                <i className="bx bx-plus me-2"></i>
                                Add Transaction
                            </button>
                        </div>
                    </div>

                    <div className="row g-3 mb-4" data-aos="fade-up" data-aos-delay="200">
                        <div className="col-md-4">
                            <div className="card border-0 shadow h-100">
                                <div className="card-body text-center">
                                    <i className="bx bx-trending-up text-success fs-2 mb-2"></i>
                                    <h5 className="text-success fw-bold">{formatCurrency(totals.totalIncome)}</h5>
                                    <small className="text-muted">Total Income</small>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card border-0 shadow h-100">
                                <div className="card-body text-center">
                                    <i className={`bx bx-wallet ${totals.netAmount >= 0 ? 'text-success' : 'text-danger'} fs-2 mb-2`}></i>
                                    <h5 className={totals.netAmount >= 0 ? 'text-success fw-bold' : 'text-danger fw-bold'}>
                                        {formatCurrency(totals.netAmount)}
                                    </h5>
                                    <small className="text-muted">Net Amount</small>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card border-0 shadow h-100">
                                <div className="card-body text-center">
                                    <i className="bx bx-list-ul text-info fs-2 mb-2"></i>
                                    <h5 className="text-info fw-bold">{transactions.length}</h5>
                                    <small className="text-muted">Total Transactions</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

       
            <div className="modal fade" id="addTransactionModal" tabIndex="-1" aria-labelledby="addTransactionModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content border-0 shadow" data-aos="zoom-in" data-aos-duration="300">
                        <div className="modal-header bg-primary text-white">
                            <h5 className="modal-title fw-bold" id="addTransactionModalLabel">
                                <i className="bx bx-plus-circle me-2"></i>
                                Add New Transaction
                            </h5>
                            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body p-4">
                            <form onSubmit={handleAddTransaction}>
                                <div className="row g-3">
                                    <div className="col-md-6">
                                        <label className="form-label fw-semibold">
                                            <i className="bx bx-transfer me-1 text-primary"></i>
                                            Transaction Type
                                        </label>
                                        <select 
                                            className="form-select" 
                                            name="type" 
                                            value={formData.type} 
                                            onChange={handleInputChange} 
                                            required
                                            disabled
                                        >
                                            <option value="income">Income</option>
                                        </select>
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label fw-semibold">
                                            <i className="bx bx-category me-1 text-primary"></i>
                                            Category
                                        </label>
                                        <select 
                                            className="form-select" 
                                            name="category" 
                                            value={formData.category} 
                                            onChange={handleInputChange} 
                                            required
                                        >
                                            <option value="">Select Category</option>
                                            <option value="food">Food & Dining</option>
                                            <option value="transport">Transportation</option>
                                            <option value="shopping">Shopping</option>
                                            <option value="entertainment">Entertainment</option>
                                            <option value="bills">Bills & Utilities</option>
                                            <option value="healthcare">Healthcare</option>
                                            <option value="education">Education</option>
                                            <option value="salary">Salary</option>
                                            <option value="freelance">Freelance</option>
                                            <option value="investment">Investment</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label fw-semibold">
                                            <i className="bx bx-money me-1 text-primary"></i>
                                            Amount
                                        </label>
                                        <div className="input-group">
                                            <span className="input-group-text bg-light">Rp</span>
                                            <input 
                                                type="number" 
                                                className="form-control" 
                                                name="amount" 
                                                value={formData.amount} 
                                                onChange={handleInputChange} 
                                                placeholder="0" 
                                                min="0" 
                                                step="0.01" 
                                                required 
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label fw-semibold">
                                            <i className="bx bx-calendar me-1 text-primary"></i>
                                            Date
                                        </label>
                                        <input 
                                            type="date" 
                                            className="form-control" 
                                            name="date" 
                                            value={formData.date} 
                                            onChange={handleInputChange} 
                                            required 
                                        />
                                    </div>
                                    <div className="col-12">
                                        <label className="form-label fw-semibold">
                                            <i className="bx bx-text me-1 text-primary"></i>
                                            Description
                                        </label>
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            name="description" 
                                            value={formData.description} 
                                            onChange={handleInputChange} 
                                            placeholder="Enter transaction description" 
                                            required 
                                        />
                                    </div>
                                    <div className="col-12">
                                        <label className="form-label fw-semibold">
                                            <i className="bx bx-note me-1 text-primary"></i>
                                            Notes (Optional)
                                        </label>
                                        <textarea 
                                            className="form-control" 
                                            rows="3" 
                                            name="notes" 
                                            value={formData.notes} 
                                            onChange={handleInputChange} 
                                            placeholder="Additional notes..."
                                        ></textarea>
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label fw-semibold">
                                            <i className="bx bx-credit-card me-1 text-primary"></i>
                                            Payment Method
                                        </label>
                                        <select 
                                            className="form-select" 
                                            name="paymentMethod" 
                                            value={formData.paymentMethod} 
                                            onChange={handleInputChange}
                                        >
                                            <option value="">Select Payment Method</option>
                                            <option value="cash">Cash</option>
                                            <option value="credit_card">Credit Card</option>
                                            <option value="debit_card">Debit Card</option>
                                            <option value="bank_transfer">Bank Transfer</option>
                                            <option value="e_wallet">E-Wallet</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label fw-semibold">
                                            <i className="bx bx-tag me-1 text-primary"></i>
                                            Tags (Optional)
                                        </label>
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            name="tags" 
                                            value={formData.tags} 
                                            onChange={handleInputChange} 
                                            placeholder="Enter tags separated by comma" 
                                        />
                                        <small className="form-text text-muted">e.g: work, urgent, monthly</small>
                                    </div>
                                </div>
                                <div className="modal-footer bg-light mt-3">
                                    <button type="button" className="btn btn-outline-secondary" data-bs-dismiss="modal">
                                        <i className="bx bx-x me-1"></i>
                                        Cancel
                                    </button>
                                    <button type="submit" className="btn btn-primary">
                                        <i className="bx bx-check me-1"></i>
                                        Save Transaction
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Summary;