import { CONSTANTS } from './utils/constants.js';

document.addEventListener('DOMContentLoaded', () => {
    console.log('Desmalha App Initialized');
    
    // Handle Active Menu Link
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath.split('/').pop()) {
            link.classList.add('active');
        }
    });
});
