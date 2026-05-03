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

function openForm(type) {
    let person = prompt("Enter your username to " + type + ":");
    if (person) {
    
        localStorage.setItem('currentUser', person);
        alert("Welcome, " + person + "! You are now " + type + "ed in.");
        
        const authSection = document.querySelector('.auth-buttons');
        if(authSection) {
            authSection.innerHTML = `<span style="color:white; font-weight:bold;">Welcome, ${person}</span>`;
        }
    }
}


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
            if (name.length < 3) errors.push("Name must be at least 3 characters.");
            if (!email.includes("@") || !email.includes(".")) errors.push("Please enter a valid email address.");
            if (message.length < 10) errors.push("Message must be at least 10 characters long.");

            if (errors.length > 0) {
                statusMsg.style.color = "#e63946"; 
                statusMsg.innerHTML = errors.join("<br>");
            } else {
                const contactData = { name, email, date: new Date().toLocaleDateString() };
                localStorage.setItem('lastContact', JSON.stringify(contactData));

                statusMsg.style.color = "green";
                statusMsg.innerHTML = "✅ Message sent successfully! Data saved to storage.";
                contactForm.reset();
            }
        });
    }
}

function initTestDriveForm() {
    const testdriveForm = document.getElementById('testdriveForm');
    if (testdriveForm) {
        testdriveForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = this.querySelector('input[placeholder="Full Name"]').value.trim();
            const phone = this.querySelector('input[placeholder="Phone Number"]').value.trim();
            const carModel = this.querySelector('input[placeholder="Car Model"]').value.trim();
            const gender = this.querySelector('input[name="gender"]:checked');

            
            if (name.length < 3 || phone.length < 8 || carModel === "" || !gender) {
                alert("❌ Custom Validation Error: Please check that Name > 3 chars, Phone > 8 digits, and a Car Model is entered.");
                return;
            }

            
            const booking = { name, carModel, phone, gender: gender.value };
            localStorage.setItem('recentBooking', JSON.stringify(booking));

            alert("🏁 Booking for " + carModel + " successfully saved to local storage!");
            this.reset();
        });
    }
}


window.onload = function() {
    
    const savedTheme = localStorage.getItem("userTheme") || "light";
    document.body.classList.add(savedTheme + "-theme");

    
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        console.log("Logged in user: " + savedUser);
    }

    
    const lastSearch = sessionStorage.getItem('lastSearch');
    const searchInput = document.querySelector('.glass-search');
    if (lastSearch && searchInput) {
        searchInput.placeholder = "Last search: " + lastSearch;
    }

    
    initSearch();
    initContactForm();
    initTestDriveForm();
};g
