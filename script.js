// Debounce Function for Scroll Optimization
function debounce(func, wait = 20, immediate = true) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Define animateSections function
function animateSections() {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (sectionTop < windowHeight * 0.75) {
            section.classList.add('visible', 'animated');
        }
    });
}

// Add the scroll event listener with debounce
window.addEventListener('scroll', debounce(animateSections));

// Mobile menu toggle
const mobileMenuToggle = document.createElement('div');
mobileMenuToggle.className = 'mobile-menu-toggle';
mobileMenuToggle.innerHTML = '☰';
document.querySelector('header .container').prepend(mobileMenuToggle);

mobileMenuToggle.addEventListener('click', () => {
    const nav = document.querySelector('nav');
    nav.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    const nav = document.querySelector('nav');
    if (!e.target.closest('nav') && !e.target.closest('.mobile-menu-toggle')) {
        nav.classList.remove('active');
    }
});

document.addEventListener('DOMContentLoaded', function() {

    const devProtection = true;  // Set to true to block DevTools, false during development

if (devProtection) {
    // Disable right-click and common DevTools shortcuts
    document.addEventListener('contextmenu', (e) => {
        e.preventDefault();
    });

    document.addEventListener('keydown', (e) => {
        // F12 or Ctrl+Shift+I
        if (e.keyCode === 123 || (e.ctrlKey && e.shiftKey && e.keyCode === 73)) {
            e.preventDefault();
            alert('Developer tools are disabled.');
        }
    });

    // Detect DevTools
    setInterval(() => {
        const devTools = new Function('debugger');
        try {
            devTools();
        } catch (e) {
            console.warn('Developer tools are open!');
            alert('Please close developer tools to continue.');
        }
    }, 1000); // Check every second
}
    // Check if data exists in localStorage, otherwise use default values
    const aboutContent = localStorage.getItem('aboutContent') || 'Hello! I\'m Michael T, passionate about cybersecurity, blockchain, and game development.';
    const programmingSkills = localStorage.getItem('programmingSkills') || 'JavaScript, Python, Java, Solidity';
    const techSkills = localStorage.getItem('techSkills') || 'Linux, Git, Network Security, Blockchain';
    const projectsData = localStorage.getItem('projectsData') || `
        <tr>
            <td>Personal Cybersecurity Tool</td>
            <td>Ongoing</td>
            <td>Building a personal cybersecurity solution for network security.</td>
        </tr>
        <tr>
            <td>Blockchain Voting System</td>
            <td>Completed</td>
            <td>A blockchain-based voting system for secure elections.</td>
        </tr>`;

    // Load "About Me" content
    document.querySelector('#about .about-text').innerHTML = aboutContent;

    // Load Skills
    function populateSkills(skillsString, elementId) {
        const ul = document.getElementById(elementId);
        const skillsArray = skillsString.split(',').map(skill => skill.trim());
        ul.innerHTML = '';  // Clear previous content
        skillsArray.forEach(skill => {
            const li = document.createElement('li');
            li.textContent = skill;
            ul.appendChild(li);
        });
    }

    populateSkills(programmingSkills, 'programming-skills');
    populateSkills(techSkills, 'tech-skills');

    // Load Projects
    document.querySelector('#projectsTable tbody').innerHTML = projectsData;

    // Save "About Me" content to localStorage
    function saveAboutContent(content) {
        localStorage.setItem('aboutContent', content);
    }

    // Save Skills to localStorage
    function saveSkills(programming, tech) {
        localStorage.setItem('programmingSkills', programming);
        localStorage.setItem('techSkills', tech);
    }

    // Save Projects to localStorage
    function saveProjects(projects) {
        localStorage.setItem('projectsData', projects);
    }

    // Smooth scrolling for navigation (unchanged)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
            document.querySelector('nav').classList.remove('active');
        });
    });

    var ctx = document.getElementById('skillsChart').getContext('2d');
            var skillsChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['Linux', 'Networking', 'Smart Contracts'],
                    datasets: [{
                        label: 'Learning Progress',
                        data: [70, 85, 60], // Your learning progress in %
                        backgroundColor: ['rgba(76, 175, 80, 0.6)', 'rgba(255, 159, 64, 0.6)', 'rgba(54, 162, 235, 0.6)'],
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: { beginAtZero: true }
                    }
                }
            });

            $(document).ready(function() {
                $('#projectsTable').DataTable();
            });

            var swiper = new Swiper('.swiper-container', {
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
            });
});

