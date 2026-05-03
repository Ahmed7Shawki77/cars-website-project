// --- 1. THEME TOGGLE LOGIC ---
function toggleTheme() {
    const body = document.body;
    body.classList.toggle("dark-theme");
    console.log("Dark mode is now:", body.classList.contains("dark-theme")); // Debug line
    
    const isDark = body.classList.contains("dark-theme");
    localStorage.setItem("userTheme", isDark ? "dark" : "light");
}

// --- 2. LOGIN / SIGNUP / LOGOUT LOGIC ---
// --- 2. LOGIN / SIGNUP / LOGOUT LOGIC ---

function openForm(type) {
    if (type === 'Sign Up') {
        // --- SIGN UP PHASE ---
        let person = prompt("Create a Username:");
        if (!person || person.trim() === "") {
            alert("Sign Up failed: Username is required.");
            return;
        }

        let pass = prompt("Create a Password (min. 4 characters):");
        if (!pass || pass.length < 4) {
            alert("Sign Up failed: Password must be at least 4 characters.");
            return;
        }

        // Save both to localStorage
        // We use a prefix 'pwd_' so we can find this specific user's password later
        localStorage.setItem(`pwd_${person}`, pass);
        localStorage.setItem('currentUser', person);
        
        alert(`Account created! Welcome, ${person}.`);
        location.reload();
    } 
    
    else if (type === 'Login') {
        // --- LOGIN PHASE ---
        let person = prompt("Enter your Username:");
        if (!person) return;

        // Check if user exists in our "database" (localStorage)
        let savedPwd = localStorage.getItem(`pwd_${person}`);

        if (!savedPwd) {
            alert("User does not exist. Please Sign Up first.");
            return;
        }

        let passCheck = prompt("Enter your Password:");
        if (passCheck === savedPwd) {
            localStorage.setItem('currentUser', person);
            alert(`Welcome back, ${person}!`);
            location.reload();
        } else {
            alert("Incorrect password. Access denied.");
        }
    }
}

function logout() {
    localStorage.removeItem('currentUser');
    alert("You have been logged out.");
    location.reload();
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
