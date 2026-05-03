// --- 1. THEME TOGGLE ---
function toggleTheme() {
    const body = document.body;
    body.classList.toggle("dark-theme"); // Simpler way to toggle
    
    const isDark = body.classList.contains("dark-theme");
    localStorage.setItem("userTheme", isDark ? "dark" : "light");
}

// --- 2. LOGIN & LOGOUT ---
function openForm(type) {
    let person = prompt("Enter your username to " + type + ":");
    if (person && person.trim() !== "") {
        localStorage.setItem('currentUser', person);
        location.reload(); // Refresh to show the Welcome message
    }
}

function logout() {
    localStorage.removeItem('currentUser'); // Requirement 8: Remove from storage
    alert("You have been logged out.");
    location.reload(); // Refresh to show Login/Sign Up buttons again
}

// --- 3. INITIALIZATION (Read from Storage) ---
window.onload = function() {
    // A. Apply Theme
    const savedTheme = localStorage.getItem("userTheme");
    if (savedTheme === "dark") {
        document.body.classList.add("dark-theme");
    }

    // B. Check User & Update UI
    const savedUser = localStorage.getItem('currentUser');
    const authSection = document.querySelector('.auth-buttons');
    
    if (savedUser && authSection) {
        // Change Login/Sign Up buttons into a Welcome message and Logout button
        authSection.innerHTML = `
            <span style="margin-right:10px;">Welcome, <b>${savedUser}</b></span>
            <button class="btn" onclick="logout()" style="background:#ff4d4d;">Logout</button>
        `;
    }

    // Initialize other features
    initSearch();
    if(typeof initContactForm === "function") initContactForm();
};

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
