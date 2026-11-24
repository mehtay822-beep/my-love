// =====================================
// KARISHMA BIRTHDAY WEBSITE - FINAL
// =====================================

// अब असली Countdown चालू है
const TEST_MODE = false;

// 14 December 2026, Midnight Indian Time
const unlockDate = new Date("2026-12-14T00:00:00+05:30");

// Birthday Date
const birthDate = new Date("2008-12-14T00:00:00+05:30");

// Password
const SECRET_PASSWORD = "1014";


// =====================================
// SCREEN NAVIGATION
// =====================================

function goTo(screenId) {
    document.querySelectorAll(".screen").forEach(screen => {
        screen.classList.remove("active");
    });

    const target = document.getElementById(screenId);

    if (target) {
        target.classList.add("active");
        window.scrollTo(0, 0);
    }
}


// =====================================
// MUSIC SYSTEM
// =====================================

const romanticMusic = document.getElementById("romanticMusic");
const birthdayMusic = document.getElementById("birthdayMusic");

let musicStarted = false;

function startRomanticMusic() {
    if (!romanticMusic || musicStarted) return;

    romanticMusic.volume = 0.65;

    romanticMusic.play()
        .then(() => {
            musicStarted = true;
        })
        .catch(() => {
            // Browser autoplay blocked.
            // First user interaction will start music.
        });
}

// Try playing music when website opens
startRomanticMusic();

// Start music on first user interaction if autoplay was blocked
function enableMusic() {
    if (!musicStarted) {
        startRomanticMusic();
    }
}

document.addEventListener("click", enableMusic);
document.addEventListener("touchstart", enableMusic);
document.addEventListener("keydown", enableMusic);


function playBirthdayMusic() {
    if (romanticMusic) {
        romanticMusic.pause();
    }

    if (birthdayMusic) {
        birthdayMusic.currentTime = 0;
        birthdayMusic.volume = 0.75;

        birthdayMusic.play().catch(() => {});
    }
}


// =====================================
// COUNTDOWN SYSTEM
// =====================================

function updateCountdown() {

    if (TEST_MODE) {
        goTo("giftScreen");
        clearInterval(countdownInterval);
        return;
    }

    const now = new Date();
    const difference = unlockDate.getTime() - now.getTime();

    // Countdown finished
    if (difference <= 0) {
        clearInterval(countdownInterval);

        goTo("giftScreen");

        return;
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / (1000 * 60)) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    setText("days", days);
    setText("hours", String(hours).padStart(2, "0"));
    setText("minutes", String(minutes).padStart(2, "0"));
    setText("seconds", String(seconds).padStart(2, "0"));
}

function setText(id, value) {
    const element = document.getElementById(id);

    if (element) {
        element.textContent = value;
    }
}

// Countdown immediately starts when page loads
const countdownInterval = setInterval(updateCountdown, 1000);

if (TEST_MODE) {
    goTo("giftScreen");
} else {
    goTo("countdownScreen");
    updateCountdown();
}


// =====================================
// GIFT BOX OPENING
// =====================================

function openGift() {

    const gift = document.querySelector(".gift-box");

    if (gift) {
        gift.classList.add("open");
        gift.style.transform = "scale(1.3) rotate(10deg)";
    }

    setTimeout(() => {
        goTo("passwordScreen");
    }, 700);
}


// =====================================
// PASSWORD CHECK
// =====================================

function checkPassword() {

    const input = document.getElementById("passwordInput");
    const error = document.getElementById("passwordError");

    if (!input) return;

    if (input.value.trim() === SECRET_PASSWORD) {

        if (error) error.textContent = "";

        goTo("birthdayScreen");

        playBirthdayMusic();

        startBirthdayCelebration();

        startAgeCounter();

    } else {

        if (error) {
            error.textContent = "Wrong Password! Try Again ❤️";
        }

        input.value = "";
        input.focus();
    }
}

const passwordInput = document.getElementById("passwordInput");

if (passwordInput) {
    passwordInput.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            checkPassword();
        }
    });
}


// =====================================
// LIVE AGE COUNTER
// =====================================

function startAgeCounter() {
    updateAge();
    setInterval(updateAge, 1000);
}

function updateAge() {

    const now = new Date();

    let years = now.getFullYear() - birthDate.getFullYear();
    let months = now.getMonth() - birthDate.getMonth();
    let days = now.getDate() - birthDate.getDate();

    let hours = now.getHours() - birthDate.getHours();
    let minutes = now.getMinutes() - birthDate.getMinutes();
    let seconds = now.getSeconds() - birthDate.getSeconds();

    if (seconds < 0) {
        seconds += 60;
        minutes--;
    }

    if (minutes < 0) {
        minutes += 60;
        hours--;
    }

    if (hours < 0) {
        hours += 24;
        days--;
    }

    if (days < 0) {
        const previousMonth = new Date(
            now.getFullYear(),
            now.getMonth(),
            0
        );

        days += previousMonth.getDate();
        months--;
    }

    if (months < 0) {
        months += 12;
        years--;
    }

    setText("ageYears", years);
    setText("ageMonths", months);
    setText("ageDays", days);
    setText("ageHours", hours);
    setText("ageMinutes", minutes);
    setText("ageSeconds", seconds);
}


// =====================================
// BIRTHDAY CELEBRATION
// =====================================

function startBirthdayCelebration() {
    createFloatingHearts();
    createFireworks();
    createConfetti();
}

function createFloatingHearts() {

    setInterval(() => {

        const heart = document.createElement("div");

        heart.className = "floating-heart";

        heart.textContent = ["❤️", "💕", "💖", "💗", "💘"][
            Math.floor(Math.random() * 5)
        ];

        heart.style.left = Math.random() * 100 + "vw";

        document.body.appendChild(heart);

        setTimeout(() => heart.remove(), 6500);

    }, 700);
}

function createFireworks() {

    setInterval(() => {

        const firework = document.createElement("div");

        firework.className = "firework";
        firework.textContent = "✨";

        firework.style.left = Math.random() * 90 + "vw";
        firework.style.top = Math.random() * 75 + "vh";

        document.body.appendChild(firework);

        setTimeout(() => firework.remove(), 1600);

    }, 900);
}

function createConfetti() {

    for (let i = 0; i < 35; i++) {

        const piece = document.createElement("div");

        piece.className = "confetti";

        piece.textContent = ["💖", "✨", "💕", "🎉"][
            Math.floor(Math.random() * 4)
        ];

        piece.style.left = Math.random() * 100 + "vw";
        piece.style.animationDelay = Math.random() + "s";

        document.body.appendChild(piece);

        setTimeout(() => piece.remove(), 5000);
    }
}


// =====================================
// CAKE CUTTING
// =====================================

const cakeStage = document.getElementById("cakeStage");

let startX = 0;
let startY = 0;
let isSwiping = false;
let cakeAlreadyCut = false;

if (cakeStage) {

    cakeStage.addEventListener("pointerdown", function(event) {

        if (cakeAlreadyCut) return;

        isSwiping = true;

        startX = event.clientX;
        startY = event.clientY;

        cakeStage.setPointerCapture(event.pointerId);
    });

    cakeStage.addEventListener("pointerup", function(event) {

        if (!isSwiping || cakeAlreadyCut) return;

        isSwiping = false;

        const distanceX = Math.abs(event.clientX - startX);
        const distanceY = Math.abs(event.clientY - startY);

        if (distanceX > 45 && distanceX > distanceY) {
            cutCake();
        }
    });

    cakeStage.addEventListener("pointercancel", function() {
        isSwiping = false;
    });
}

function cutCake() {

    if (cakeAlreadyCut) return;

    cakeAlreadyCut = true;

    cakeStage.classList.add("cut");

    const success = document.getElementById("cakeSuccess");
    const hint = document.getElementById("cakeHint");

    if (success) success.classList.add("show");
    if (hint) hint.style.display = "none";

    createConfetti();
    createConfetti();
    createFireworks();
    createFloatingHearts();
}


// =====================================
// SECRET LOVE LETTER
// =====================================

function openLoveLetter() {

    const envelope = document.getElementById("envelope");
    const letterContent = document.getElementById("letterContent");
    const letterText = document.getElementById("letterText");

    if (!envelope || !letterContent || !letterText) return;

    envelope.classList.add("opened");
    letterContent.classList.add("show");

    const message =
        "Karishma, tum meri zindagi ka woh khoobsurat hissa ho jise main kabhi khona nahi chahta. Tumhari smile, tumhari baatein aur hamari har chhoti-badi memory mere liye bahut special hai. Main chahta hoon ki hum hamesha ek dusre ka saath dete rahein. Happy Birthday, my love. I love you so much. ❤️";

    letterText.textContent = "";

    let index = 0;

    const typing = setInterval(() => {

        letterText.textContent += message.charAt(index);

        index++;

        if (index >= message.length) {
            clearInterval(typing);
        }

    }, 45);
}


// =====================================
// FINAL SURPRISE
// =====================================

function finalSurprise() {
    createConfetti();
    createFireworks();
    createFloatingHearts();
}