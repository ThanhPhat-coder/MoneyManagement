import { useEffect, useState } from "react";
    import Summary from "./Summary";
    import Filters from "./Filter";
    import TransactionTable from "./TransactionTable";
    
    const Table = () => {
        const [transactions, setTransactions] = useState([]);
        const [filteredTransactions, setFilteredTransactions] = useState([]);
        const [searchTerm, setSearchTerm] = useState('');
        const [filterType, setFilterType] = useState('all');
        const [filterCategory, setFilterCategory] = useState('all');
        const [sortBy, setSortBy] = useState('date');
        const [sortOrder, setSortOrder] = useState('desc');
        const [currentPage, setCurrentPage] = useState(1);
        const [itemsPerPage] = useState(10);
    
       
        useEffect(() => {
            const loadTransactions = () => {
                try {
                    const storedTransactions = localStorage.getItem("transactions");
                    if (storedTransactions) {
                        const parsed = JSON.parse(storedTransactions);
                        const validTransactions = parsed.filter(t => t.id && t.date && !isNaN(new Date(t.date).getTime()));
                        setTransactions(validTransactions);
                        setFilteredTransactions(validTransactions);
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
            let filtered = transactions.filter(transaction => {
                if (!transaction) return false;
                const matchesSearch = (
                    (transaction.description?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
                    (transaction.paymentMethod?.toLowerCase() || '').includes(searchTerm.toLowerCase())
                );
                const matchesType = filterType === 'all' || transaction.type === filterType;
                const matchesCategory = filterCategory === 'all' || transaction.category === filterCategory;
                
                return matchesSearch && matchesType && matchesCategory;
            });
    
            filtered.sort((a, b) => {
                let aValue = a[sortBy];
                let bValue = b[sortBy];
                
                if (sortBy === 'amount') {
                    aValue = parseFloat(aValue) || 0;
                    bValue = parseFloat(bValue) || 0;
                } else if (sortBy === 'date') {
                    aValue = new Date(aValue) || new Date(0);
                    bValue = new Date(bValue) || new Date(0);
                } else if (sortBy === 'description') {
                    aValue = (aValue || '').toLowerCase();
                    bValue = (bValue || '').toLowerCase();
                }
                
                if (sortOrder === 'asc') {
                    return aValue > bValue ? 1 : -1;
                } else {
                    return aValue < bValue ? 1 : -1;
                }
            });
    
            setFilteredTransactions(filtered);
            setCurrentPage(1);
        }, [transactions, searchTerm, filterType, filterCategory, sortBy, sortOrder]);
    
        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        const currentTransactions = filteredTransactions.slice(indexOfFirstItem, indexOfLastItem);
        const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
    
        const filterOptions = {
            types: [
                { value: 'all', label: 'All Types', icon: 'bx-list-ul' },
                { value: 'income', label: 'Income', icon: 'bx-trending-up' },
                 { value: 'expense', label: 'Expense', icon: 'bx-trending-down' }
            ],
            categories: [
                { value: 'all', label: 'All Categories', icon: 'bx-category' },
                { value: 'salary', label: 'Salary', icon: 'bx-briefcase' },
                { value: 'freelance', label: 'Freelance', icon: 'bx-laptop' },
                { value: 'investment', label: 'Investment', icon: 'bx-line-chart' },
                { value: 'food', label: 'Food & Dining', icon: 'bx-restaurant' },
                { value: 'bills', label: 'Bills & Utilities', icon: 'bx-home' },
                { value: 'transport', label: 'Transportation', icon: 'bx-car' },
                { value: 'shopping', label: 'Shopping', icon: 'bx-cart' },
                { value: 'entertainment', label: 'Entertainment', icon: 'bx-movie' },
                { value: 'healthcare', label: 'Healthcare', icon: 'bx-plus-medical' },
                { value: 'education', label: 'Education', icon: 'bx-book' },
                { value: 'other', label: 'Other', icon: 'bx-dots-horizontal-rounded' }
            ],
            sortOptions: [
                { value: 'date', label: 'Date', icon: 'bx-calendar' },
                { value: 'amount', label: 'Amount', icon: 'bx-dollar' },
                { value: 'description', label: 'Description', icon: 'bx-text' }
            ]
        };
    
        const formatCurrency = (amount) => {
            return new Intl.NumberFormat('id-ID', {
                style: 'currency',
                currency: 'IDR'
            }).format(amount || 0);
        };
    
        const formatDate = (dateString) => {
            const date = new Date(dateString);
            return dateString && !isNaN(date)
                ? date.toLocaleDateString('id-ID', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                  })
                : 'N/A';
        };
    
        const getTypeColor = (type) => {
            return type === 'income' ? 'success' : 'danger';
        };
    
        const getStatusColor = (status) => {
            return status === 'completed' ? 'success' : 'warning';
        };
    
        const handleDelete = (id) => {
            const updatedTransactions = transactions.filter(t => t.id !== id);
            try {
                localStorage.setItem("transactions", JSON.stringify(updatedTransactions));
                setTransactions(updatedTransactions);
            } catch (error) {
                console.error("Error updating localStorage:", error);
            }
        };
    
        return (
            <section className="py-5 bg-white">
                <div className="container">
                    <Summary filteredTransactions={filteredTransactions} formatCurrency={formatCurrency} />
                    <Filters
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        filterType={filterType}
                        setFilterType={setFilterType}
                        filterCategory={filterCategory}
                        setFilterCategory={setFilterCategory}
                        sortBy={sortBy}
                        setSortBy={setSortBy}
                        sortOrder={sortOrder}
                        setSortOrder={setSortOrder}
                        filterOptions={filterOptions}
                    />
                    <TransactionTable
                        currentTransactions={currentTransactions}
                        totalPages={totalPages}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        indexOfFirstItem={indexOfFirstItem}
                        indexOfLastItem={indexOfLastItem}
                        filteredTransactions={filteredTransactions}
                        formatCurrency={formatCurrency}
                        formatDate={formatDate}
                        getTypeColor={getTypeColor}
                        getStatusColor={getStatusColor}
                        handleDelete={handleDelete}
                    />
                </div>
            </section>
        );
    };
    
    export default Table;