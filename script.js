/* ==========================================
   1. THEME LOGIC
   ========================================== */
function initTheme() {
    if (localStorage.getItem('userTheme') === 'dark') document.body.classList.add('dark-theme');
}

function toggleTheme() {
    const isDark = document.body.classList.toggle('dark-theme');
    localStorage.setItem('userTheme', isDark ? 'dark' : 'light');
}

initTheme();

/* ==========================================
   2. AUTH LOGIC (PROMPTS)
   ========================================== */
function openForm(type) {
    let person = prompt(type === 'Sign Up' ? "Create Username:" : "Enter Username:");
    if (!person) return;
    if (type === 'Sign Up') {
        let pass = prompt("Create Password (min. 4 chars):");
        if (pass && pass.length >= 4) {
            localStorage.setItem(`pwd_${person}`, pass);
            localStorage.setItem('currentUser', person);
            location.reload();
        }
    } else {
        let savedPwd = localStorage.getItem(`pwd_${person}`);
        if (savedPwd && prompt("Enter Password:") === savedPwd) {
            localStorage.setItem('currentUser', person);
            location.reload();
        } else alert("Access Denied.");
    }
}

function logout() {
    localStorage.removeItem('currentUser');
    location.reload();
}

/* ==========================================
   3. FORM & UI HANDLING
   ========================================== */
document.addEventListener('DOMContentLoaded', () => {
    // UI Update
    const user = localStorage.getItem('currentUser');
    const auth = document.querySelector('.auth-buttons');
    if (user && auth) {
        auth.innerHTML = `<span style="color:#681A15;font-weight:bold;margin-right:15px;">Welcome, ${user}</span>
                          <button class="logout-btn" onclick="logout()">Logout</button>`;
    }

    // Contact Form
    const cForm = document.getElementById('contactForm');
    if (cForm) cForm.addEventListener('submit', (e) => {
        e.preventDefault();
        localStorage.setItem('lastContactName', document.getElementById('userName').value);
        const status = document.getElementById('statusMessage');
        status.innerText = " Message Sent!";
        status.style.color = "#4CAF50";
        cForm.reset();
    });

    // Test Drive Form
    const tForm = document.getElementById('testdriveForm');
    if (tForm) tForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const model = tForm.querySelector('input[placeholder="Car Model"]').value;
        localStorage.setItem('lastTestDriveUser', model);
        const status = document.getElementById('tdStatusMessage');
        status.innerText = " Booking Confirmed!";
        status.style.color = "#4CAF50";
        tForm.reset();
    });
});
