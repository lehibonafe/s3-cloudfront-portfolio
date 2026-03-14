// Show/hide page sections
function showPage(pageName, pushState = true) {
    document.querySelectorAll('.page-section').forEach(section => {
        section.classList.remove('active');
    });

    const selectedSection = document.getElementById(pageName);
    if (selectedSection) {
        selectedSection.classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    document.querySelectorAll('.nav-item').forEach(link => {
        link.classList.remove('active');
        if (link.dataset.page === pageName) {
            link.classList.add('active');
        }
    });

    if (pushState) {
        history.pushState({ page: pageName }, '', '/' + pageName);
    }
}

// Theme toggle functionality
function toggleTheme() {
    const body = document.body;
    body.classList.toggle('light-theme');
    localStorage.setItem('theme', body.classList.contains('light-theme') ? 'light' : 'dark');
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.nav-item').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            showPage(this.dataset.page);
        });
    });

    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
    }

    // Handle browser back/forward
    window.addEventListener('popstate', function(e) {
        const page = e.state?.page || 'about';
        showPage(page, false);
    });

    // Load page from URL path on initial load
    const path = window.location.pathname.replace('/', '').trim();
    const validPages = ['about', 'projects', 'certs', 'resume'];
    const initialPage = validPages.includes(path) ? path : 'about';
    showPage(initialPage, true);
});
