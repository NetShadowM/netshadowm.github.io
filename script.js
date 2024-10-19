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

// Animate sections on scroll
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
});

