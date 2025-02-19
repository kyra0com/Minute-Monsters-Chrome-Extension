let timerInterval; // Timer interval
let paused = false; // Timer paused state
let timeRemaining = 0; // Remaining time
let balance = 1000; // Initial balance
let monsterPurchased = false;

// Function to start a timer
function startTimer(duration, display, color, enablePurchase = false) {
    clearInterval(timerInterval); // Clear any existing timer
    timeRemaining = duration;
    paused = false; // Reset paused state

    document.body.style.backgroundColor = color; // Change background color
    document.getElementById("pause-btn").disabled = false; // Enable pause button
    document.getElementById("buy-monster-btn").disabled = !enablePurchase; // Enable/disable buy button

    // Timer countdown logic
    timerInterval = setInterval(() => {
        if (!paused) {
            const minutes = Math.floor(timeRemaining / 60);
            const seconds = timeRemaining % 60;

            // Display time left
            display.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

            if (timeRemaining === 0) {
                clearInterval(timerInterval);
                alert("Time's up!");
                document.body.style.backgroundColor = "#ffffff"; // Reset background
                document.getElementById("pause-btn").disabled = true; // Disable pause button
                document.getElementById("buy-monster-btn").disabled = true; // Disable buy button
            } else {
                timeRemaining -= 1;
            }
        }
    }, 1000);
}

// Function to update balance display
function updateBalance() {
    document.getElementById("balance").textContent = balance;
}

// Add event listeners to timer buttons
document.getElementById("start-25-btn").addEventListener("click", () => {
    const display = document.getElementById("time-left");
    startTimer(25 * 60, display, "darkblue");
});

document.getElementById("start-5-btn").addEventListener("click", () => {
    const display = document.getElementById("time-left");
    startTimer(5 * 60, display, "#FFEE8C", true);
});

// Add event listener to pause button
document.getElementById("pause-btn").addEventListener("click", () => {
    paused = !paused; // Toggle paused state
    document.getElementById("pause-btn").textContent = paused ? "Resume Timer" : "Pause Timer";
});

// Add event listener to buy button
document.getElementById("buy-monster-btn").addEventListener("click", () => {
    if (balance >= 500 && !monsterPurchased) {
        balance -= 500;
        monsterPurchased = true;
        updateBalance();

        // Display the purchased monster
        const monsterDisplay = document.getElementById("monster-display");
        const img = document.createElement("img");
        img.src = "mushroom_monster.png"; // Ensure this file is in the extension directory
        img.alt = "Monster";
        img.style.width = "100px"; // Adjust size as needed
        monsterDisplay.appendChild(img);

        alert("You purchased the monster!");
    } else if (monsterPurchased) {
        alert("You already own the monster!");
    } else {
        alert("Not enough balance to buy the monster.");
    }
});

// Initial balance update
updateBalance();