// --- 1. THEME TOGGLE LOGIC ---
function toggleTheme() {
    const body = document.body;
    body.classList.toggle("dark-theme");
    console.log("Dark mode is now:", body.classList.contains("dark-theme")); // Debug line
    
    const isDark = body.classList.contains("dark-theme");
    localStorage.setItem("userTheme", isDark ? "dark" : "light");
}

// --- 2. LOGIN / SIGNUP / LOGOUT LOGIC ---
function openForm(type) {
    let person = prompt(`Enter your username to ${type}:`);
    
    if (person && person.trim() !== "") {
        // If it's a Sign Up, we also ask for a password
        if (type === 'Sign Up') {
            let pass = prompt("Create a password:");
            if (!pass || pass.length < 4) {
                alert("Sign up failed: Password must be at least 4 characters.");
                return;
            }
            // In a real app, we'd save the password too, 
            // but for this project, we'll just save the user.
        }

        localStorage.setItem('currentUser', person);
        alert(`Welcome, ${person}! You have successfully ${type === 'Login' ? 'logged in' : 'signed up'}.`);
        location.reload(); // Refresh to update the UI
    }
}

function logout() {
    localStorage.removeItem('currentUser');
    alert("Logged out successfully.");
    location.reload(); // Refresh to show Login/Signup buttons again
}

// --- 3. SEARCH BAR LOGIC ---
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

// --- 4. FORM VALIDATIONS (Contact & Test Drive) ---
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
                statusMsg.style.color = "#ff4d4d";
                statusMsg.innerHTML = errors.join(" | ");
            } else {
                localStorage.setItem('lastContactName', name);
                statusMsg.style.color = "#4CAF50";
                statusMsg.innerHTML = "✅ Message saved to storage and sent!";
                this.reset();
            }
        });
    }
}

function initTestDriveForm() {
    const tdForm = document.getElementById('testdriveForm');
    if (tdForm) {
        tdForm.addEventListener('submit', function(e) {
            const nameInput = this.querySelector('input[placeholder="Full Name"]');
            if (nameInput && nameInput.value.length < 2) {
                e.preventDefault();
                alert("❌ Please enter a valid name for the test drive.");
            }
        });
    }
}

// --- 5. INITIALIZATION (On Page Load) ---
window.onload = function() {
    // A. Apply Saved Theme
    const savedTheme = localStorage.getItem("userTheme") || "light";
    if (savedTheme === "dark") {
        document.body.classList.add("dark-theme");
    }

    // B. Manage Auth UI (Login vs Welcome/Logout)
    const savedUser = localStorage.getItem('currentUser');
    const authSection = document.querySelector('.auth-buttons');
    
    if (savedUser && authSection) {
        // If user is logged in, replace buttons with Welcome message and Logout
        authSection.innerHTML = `
            <span style="color:white; font-weight:bold; margin-right:15px;">Welcome, ${savedUser}</span>
            <button class="btn" onclick="logout()" style="background:#ff4d4d;">Logout</button>
        `;
    }

    // C. Persist Search Placeholder
    const lastSearch = sessionStorage.getItem('lastSearch');
    const searchInput = document.querySelector('.glass-search');
    if (lastSearch && searchInput) {
        searchInput.placeholder = "Last search: " + lastSearch;
    }

    // D. Start Listeners
    initSearch();
    initContactForm();
    initTestDriveForm();
};
