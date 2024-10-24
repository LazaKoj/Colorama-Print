document.addEventListener("DOMContentLoaded", function() {
    const preloader = document.getElementById('preloader');
    const loadingBar = document.querySelector('.loading-bar');

    // Check if the user is coming back from another page
    const isNavigatingFromOtherPage = sessionStorage.getItem('navigatedFromInternalPage');

    if (!isNavigatingFromOtherPage) {
        // If not navigating from another page, show the pre-loader
        preloader.classList.add('show');
        let loadProgress = 0;
        const loadingInterval = setInterval(() => {
            loadProgress += 1;
            loadingBar.style.width = loadProgress + '%';

            if (loadProgress >= 100) {
                clearInterval(loadingInterval);
                setTimeout(() => {
                    preloader.classList.add('fade-out');
                }, 4000);
            }
        }, 20);
    } else {
        // If navigating from another page, hide the preloader immediately
        preloader.style.display = 'none';
    }

    // Event listeners to set sessionStorage flag when navigating using navbar
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            // Set flag in sessionStorage when navigating to a different page
            sessionStorage.setItem('navigatedFromInternalPage', 'true');
        });
    });

    // Remove the flag if the user refreshes the main page (i.e. URL is index.html)
    if (window.location.pathname === "/index.html" || window.location.pathname === "/") {
        sessionStorage.removeItem('navigatedFromInternalPage');
    }
});
