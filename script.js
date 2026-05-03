// Function to handle form submission (Write to Storage)
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Get input values
    const name = document.getElementById('userName').value;
    const email = document.getElementById('userEmail').value;
    const message = document.getElementById('userMessage').value;

    // Create an object to store
    const contactData = {
        name: name,
        email: email,
        timestamp: new Date().toLocaleString()
    };

    // WRITE to LocalStorage
    localStorage.setItem('lastInquiry', JSON.stringify(contactData));

    // Feedback to user
    document.getElementById('statusMessage').innerText = `Thank you, ${name}! Your inquiry has been saved.`;
    this.reset();
});

// Function to check previous inquiries (Read from Storage)
window.onload = function() {
    // READ from LocalStorage
    const savedData = localStorage.getItem('lastInquiry');

    if (savedData) {
        const parsedData = JSON.parse(savedData);
        document.getElementById('statusMessage').innerText = 
            `Welcome back, ${parsedData.name}! Your last inquiry was on ${parsedData.timestamp}.`;
    }
};