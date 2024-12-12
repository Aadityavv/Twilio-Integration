document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll("#signIN, #signUP, #responseButton,#toggleTheme");

    buttons.forEach(button => {
        button.addEventListener("mouseover", () => addHoverEvent(button));
        button.addEventListener("mouseout", () => removeHoverEvent(button));
    });

    function addHoverEvent(button) {
        if (document.body.classList.contains('light-theme')) {
            button.style.backgroundColor = "#cacdef";
        } else {
            button.style.backgroundColor = "#28336b";
        }
        button.style.transform = "scale(1.05)";
        button.style.transition = "transform 0.5s ease, background-color 0.5s ease";
    }

    function removeHoverEvent(button) {
        button.style.transform = "scale(1)";
        button.style.transition = "transform 0.5s ease, background-color 0.5s ease";
        button.style.backgroundColor = "transparent";
    }

    // Initialize GSAP timeline for slogan animation
    const textArray = ["Your Market Your Way", "One step Solution for all your needs", "Clothings, Electronics, Groceries and more"];
    const textElement = $("#slogan");
    const timeline = gsap.timeline({ repeat: -1 });

    textArray.forEach(function(element) {
        timeline.to(textElement, { duration: 0.5, opacity: 0, onComplete: function() {
            textElement.text(element);
        }})
        .to(textElement, { duration: 0.5, opacity: 1 })
        .to(textElement, { duration: 0.5, opacity: 1, delay: 1 });
    });

    // Load theme from localStorage
    function loadTheme() {
        const theme = localStorage.getItem('theme');
        if (theme === 'light') {
            document.body.classList.add('light-theme');
            document.getElementById('toggleTheme').textContent = 'Light';
            applyLightTheme();
        } else {
            document.body.classList.remove('light-theme');
            document.getElementById('toggleTheme').textContent = 'Dark';
            applyDarkTheme();
        }
    }

    function applyLightTheme() {
        document.body.style.backgroundColor = 'white';
        document.body.style.color = 'black';
        document.querySelectorAll('input').forEach(input => input.style.color = 'black');
        document.getElementById('toggleTheme').style.color = 'black';
        document.getElementById("logo").style.color = 'black'
        document.querySelector(".blurBG").style.backgroundColor="#585DCF";
        
    }

    function applyDarkTheme() {

        document.body.style.backgroundColor = '#0C1A2E';
        document.body.style.color = 'white';
        document.querySelectorAll('input').forEach(input => input.style.color = 'white');
        document.getElementById('toggleTheme').style.color = 'white';
        document.querySelector(".blurBG").style.backgroundColor = "#40a0e5"
        document.getElementById("logo").style.color = 'black'
        }

    // Call loadTheme on page load
    loadTheme();

    // Toggle theme functionality
    document.getElementById('toggleTheme').addEventListener('click', function() {
        if (document.body.classList.contains('light-theme')) {
            document.body.classList.remove('light-theme');
            this.textContent = 'Dark';
            applyDarkTheme();
            localStorage.setItem('theme', 'dark');
        } else {
            document.body.classList.add('light-theme');
            this.textContent = 'Light';
            applyLightTheme();
            localStorage.setItem('theme', 'light');
        }
    });

    // Move blur circle with cursor
    const blurCircle = document.querySelector(".blurBG");
    document.addEventListener("mousemove", (e) => {
        blurCircle.style.left = `${e.clientX - blurCircle.offsetWidth / 2}px`;
        blurCircle.style.top = `${e.clientY - blurCircle.offsetHeight / 2}px`;
    });
});
