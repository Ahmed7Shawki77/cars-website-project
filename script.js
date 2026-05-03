// --- 1. THEME TOGGLE (Requirement 8: LocalStorage) ---
function toggleTheme() {
    const body = document.body;
    let theme = "light";

    if (body.classList.contains("light-theme")) {
        body.classList.remove("light-theme");
        body.classList.add("dark-theme");
        theme = "dark";
    } else {
        body.classList.remove("dark-theme");
        body.classList.add("light-theme");
        theme = "light";
    }
    localStorage.setItem("userTheme", theme);
}

// --- 2. LOGIN / SIGN UP (Requirement 8: LocalStorage) ---
// This function MUST be global for the HTML onclick to work
function openForm(type) {
    let person = prompt("Enter your username to " + type + ":");
    if (person && person.trim() !== "") {
        localStorage.setItem('currentUser', person);
        alert("Welcome, " + person + "! You are now logged in.");
        
        // Update the buttons to show the name (if we are on the Home Page)
        const authSection = document.querySelector('.auth-buttons');
        if (authSection) {
            authSection.innerHTML = `<span style="color:white; font-weight:bold; padding: 10px;">Welcome, ${person}</span>`;
        }
    }
}

// --- 3. SEARCH BAR LOGIC (Requirement 8: SessionStorage) ---
function initSearch() {
    const searchBtn = document.querySelector('.glass-search-btn');
    const searchInput = document.querySelector('.glass-search');

    if (searchBtn && searchInput) {
        searchBtn.addEventListener('click', () => {
            const query = searchInput.value.trim();
            if (query === "") {
                alert("Please enter a car name to search.");
            } else {
                alert("Searching for: " + query);
                sessionStorage.setItem('lastSearch', query);
            }
        });
    }
}

// --- 4. CONTACT FORM VALIDATION (Requirement 7 & 8) ---
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); 
            const name = document.getElementById('userName').value.trim();
            const email = document.getElementById('userEmail').value.trim();
            const message = document.getElementById('userMessage').value.trim();
            const statusMsg = document.getElementById('statusMessage');

            let errors = [];
            if (name.length < 3) errors.push("Name too short.");
            if (!email.includes("@")) errors.push("Invalid email.");
            if (message.length < 10) errors.push("Message too short.");

            if (errors.length > 0) {
                statusMsg.style.color = "red";
                statusMsg.innerHTML = errors.join(" | ");
            } else {
                localStorage.setItem('lastContact', name);
                statusMsg.style.color = "green";
                statusMsg.innerHTML = "✅ Saved to storage and Sent!";
                this.reset();
            }
        });
    }
}

// --- 5. TEST DRIVE FORM VALIDATION (Requirement 7) ---
function initTestDriveForm() {
    const tdForm = document.getElementById('testdriveForm');
    if (tdForm) {
        tdForm.addEventListener('submit', function(e) {
            const name = this.querySelector('input[placeholder="Full Name"]').value;
            if (name.length < 2) {
                e.preventDefault();
                alert("❌ Custom Validation: Name is required.");
            }
        });
    }
}

// --- 6. INITIALIZATION (Read from Storage) ---
window.onload = function() {
    // Read Theme
    const savedTheme = localStorage.getItem("userTheme") || "light";
    document.body.classList.add(savedTheme + "-theme");

    // Read User
    const savedUser = localStorage.getItem('currentUser');
    const authSection = document.querySelector('.auth-buttons');
    if (savedUser && authSection) {
        authSection.innerHTML = `<span style="color:white; font-weight:bold; padding: 10px;">Welcome, ${savedUser}</span>`;
    }

    initSearch();
    initContactForm();
    initTestDriveForm();
};
