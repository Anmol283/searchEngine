document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("searchInput");
    const searchButton = document.getElementById("searchButton");
    const clearHistoryButton = document.getElementById("clearHistoryButton");
    const searchHistoryDiv = document.getElementById("searchHistory");

    // Load search history from localStorage
    const loadSearchHistory = () => {
        const history = JSON.parse(localStorage.getItem("searchHistory")) || [];
        searchHistoryDiv.innerHTML = history.map(item => `<div class="history-item">${item}</div>`).join('');
        addFadeEffect(); // Add fade-in effect
    };

    // Save search term to localStorage
    const saveSearchTerm = (term) => {
        const history = JSON.parse(localStorage.getItem("searchHistory")) || [];
        if (!history.includes(term)) {  // Prevent duplicates
            history.push(term);
            localStorage.setItem("searchHistory", JSON.stringify(history));
        } else {
            alert("This search term already exists.");
        }
    };

    searchButton.addEventListener("click", () => {
        const term = searchInput.value.trim();
        if (term) {
            saveSearchTerm(term);
            loadSearchHistory();
            searchInput.value = ''; // Clear input field
        } else {
            alert("Please enter a search term.");
        }
    });

    clearHistoryButton.addEventListener("click", () => {
        localStorage.removeItem("searchHistory");
        loadSearchHistory();
        alert("Search history cleared.");
    });

    // Add fade-in effect for history items
    const addFadeEffect = () => {
        const historyItems = document.querySelectorAll('.history-item');
        historyItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.opacity = '1';
            }, index * 100); // Staggered fade-in
        });
    };

    loadSearchHistory(); // Load history on page load
});
