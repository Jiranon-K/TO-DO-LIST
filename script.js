const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask() {
    if (inputBox.value.trim() === '') {
        inputBox.classList.add('shake');
        setTimeout(() => inputBox.classList.remove('shake'), 500);
        return;
    }

    let li = document.createElement("li");
    li.innerHTML = inputBox.value;
    listContainer.appendChild(li);
    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    li.appendChild(span);
    
    inputBox.value = "";
    saveData();
}

inputBox.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});

listContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        
        const ripple = document.createElement('div');
        ripple.className = 'ripple';
        e.target.appendChild(ripple);
        setTimeout(() => ripple.remove(), 500);
        saveData();
    }
    else if (e.target.tagName === "SPAN") {
        const li = e.target.parentElement;
        li.style.animation = 'slideOut 0.3s ease forwards';
        setTimeout(() => {
            li.remove();
            saveData();
        }, 300);
    }
}, false);

function saveData() {
    try {
        localStorage.setItem("data", listContainer.innerHTML);
    } catch (error) {
        console.error("Error saving data to localStorage:", error);
    }
}

function showTask() {
    try {
        listContainer.innerHTML = localStorage.getItem("data") || "";
    } catch (error) {
        console.error("Error retrieving data from localStorage:", error);
    }
}

// Theme Toggle
function toggleTheme() {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
}

// Load saved theme
const savedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);

// Sakura animation
function createSakura() {
    const sakuraContainer = document.querySelector('.sakura-container');
    const sakura = document.createElement('div');
    sakura.className = 'sakura';
    
    // Random starting position
    sakura.style.left = Math.random() * window.innerWidth + 'px';
    sakuraContainer.appendChild(sakura);
    
    // Remove after animation
    setTimeout(() => {
        sakura.remove();
    }, 10000);
}

// Create sakura petals periodically
setInterval(createSakura, 2000);

for(let i = 0; i < 5; i++) {
    setTimeout(createSakura, i * 300);
}

const container = document.querySelector('.container');
let isTicking = false;
container.addEventListener('mousemove', (e) => {
    if (!isTicking) {
        window.requestAnimationFrame(() => {
            const { left, top, width, height } = container.getBoundingClientRect();
            const x = (e.clientX - left) / width;
            const y = (e.clientY - top) / height;
            const shift = 2;
            container.style.backgroundColor = `hsl(0, 0%, ${95 + x * shift + y * shift}%)`;
            isTicking = false;
        });
        isTicking = true;
    }
});

showTask();
