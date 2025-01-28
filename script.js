// Initialize pet status from localStorage or set default values
let petName = localStorage.getItem('petName') || 'Rocky';
let petHealth = localStorage.getItem('petHealth') || 'Happy';
let petHunger = localStorage.getItem('petHunger') || 'Not Hungry';
let lastCheckTime = localStorage.getItem('lastCheckTime');
let petSick = localStorage.getItem('petSick') || false;

// Update the pet's name and status in the UI
document.getElementById('pet-name').textContent = petName;
document.getElementById('health-status').children[0].textContent = petHealth;
document.getElementById('hunger-status').children[0].textContent = petHunger;

// Function to check if a day has passed and remind the user to check on their pet
const now = Date.now();
const oneDayInMs = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

if (!lastCheckTime || now - lastCheckTime >= oneDayInMs) {
    alert('Hey! It\'s time to check on your pet!');
    localStorage.setItem('lastCheckTime', now); // Update last check time
}

// Button to feed the pet
document.getElementById('feed-btn').addEventListener('click', () => {
    if (petSick) {
        petHealth = 'Sick'; // Pet is sick if not fed for too long
    } else {
        petHealth = 'Happy'; // Pet is happy when fed
    }

    petHunger = 'Not Hungry'; // Reset hunger after feeding
    localStorage.setItem('petHealth', petHealth);
    localStorage.setItem('petHunger', petHunger);
    document.getElementById('health-status').children[0].textContent = petHealth;
    document.getElementById('hunger-status').children[0].textContent = petHunger;

    // Add bounce effect to the pet image when fed
    const petImage = document.getElementById('pet-img');
    petImage.classList.add('bounce');

    // Play sound effect when feeding the pet
    const feedSound = new Audio('feed-sound.mp3'); // Add your feed sound
    feedSound.play();

    // Remove bounce effect after animation ends
    setTimeout(() => {
        petImage.classList.remove('bounce');
    }, 300);
});

// Button to rename the pet
document.getElementById('rename-btn').addEventListener('click', () => {
    const newName = prompt('What would you like to name your pet?');
    if (newName && newName.trim() !== '') {
        petName = newName;
        localStorage.setItem('petName', petName);
        document.getElementById('pet-name').textContent = petName;
    }
});

// Button to check the pet's health
document.getElementById('check-health-btn').addEventListener('click', () => {
    alert(`Your pet's health is: ${petHealth}`);
});

setInterval(() => {
    if (petHunger === 'Not Hungry' && !petSick) {
        petHunger = 'Hungry'; // Pet gets hungry after a longer time
        localStorage.setItem('petHunger', petHunger);
        document.getElementById('hunger-status').children[0].textContent = petHunger;
    }

    // Check if pet is sick if left hungry for too long (e.g., 1 minute)
    if (petHunger === 'Hungry' && !petSick) {
        setTimeout(() => {
            petSick = true;
            localStorage.setItem('petSick', petSick);
            petHealth = 'Sick'; // Pet gets sick if not fed after 1 minute
            localStorage.setItem('petHealth', petHealth);
            document.getElementById('health-status').children[0].textContent = petHealth;
        }, 60000); // 1 minute
    }
}, 30000); // Check hunger status every 30 seconds



// Reset the sick status if pet is fed
if (petSick && petHunger === 'Not Hungry') {
    petSick = false;
    localStorage.setItem('petSick', petSick);
}

// Pet status reminder (notifications every 24 hours)
const checkStatusInterval = setInterval(() => {
    if (now - lastCheckTime >= oneDayInMs) {
        alert('Reminder: Check on your pet!');
        localStorage.setItem('lastCheckTime', Date.now());
    }
}, 86400000); // 24 hours
