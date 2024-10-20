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

    const devProtection = false;  // Set to true to block DevTools, false during development

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
// Function to fetch JSON data and load it into the webpage
async function loadData() {
    try {
        const response = await fetch('assets/storage/json/data.json');
        const data = await response.json();
        
        // Populate About Me
        document.querySelector('#about .about-text').innerHTML = data.aboutMe.content;

        // Populate Programming and Tech Skills
        populateSkills(data.skills.programmingSkills, 'programming-skills');
        populateSkills(data.skills.techSkills, 'tech-skills');

        // Populate Projects (Table)
        populateProjectsTable(data.projects);

        // Populate Project Showcase (Swiper)
        loadProjectShowcase(data.projects);

        // Populate Learning Progress Chart
        updateLearningChart(data.learningProgress);

        // Populate Resume link
        document.querySelector('.resume-buttons .view-resume').setAttribute('href', data.resume);
        document.querySelector('.resume-buttons .download-resume').setAttribute('href', data.resume);

    } catch (error) {
        console.error("Error loading JSON data:", error);
    }
}

// Populate Projects Table with clickable rows
function populateProjectsTable(projects) {
    const projectsTable = document.querySelector('#projectsTable tbody');
    projectsTable.innerHTML = ''; // Clear existing rows

    projects.forEach(project => {
        const row = `<tr class="clickable-row" data-project="${project.name}">
            <td>${project.name}</td>
            <td>${project.status}</td>
            <td>${project.description}</td>
        </tr>`;
        projectsTable.innerHTML += row;
    });

    // Add event listeners to each row
    const rows = document.querySelectorAll('.clickable-row');
    rows.forEach(row => {
        row.addEventListener('click', function() {
            const projectName = encodeURIComponent(this.getAttribute('data-project'));
            window.location.href = `assets/pages/projects-display.html?project=${projectName}`;
        });
    });

    // Initialize DataTables
    $('#projectsTable').DataTable();
}

// Load and populate the Project Showcase (Swiper Carousel)
function loadProjectShowcase(projects) {
    const swiperWrapper = document.getElementById('project-showcase-wrapper');
    swiperWrapper.innerHTML = ''; // Clear existing slides

    projects.forEach(project => {
        const slide = `
            <div class="swiper-slide">
                <a href="assets/pages/projects-display.html?project=${encodeURIComponent(project.name)}">
                    <img src="${project.thumbnail}" alt="${project.name}">
                    <h3>${project.name}</h3>
                </a>
            </div>`;
        swiperWrapper.innerHTML += slide;
    });

    // Initialize Swiper after populating
    var swiper = new Swiper('.swiper-container', {
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
    });
}

// Function to update the Learning Progress chart
function updateLearningChart(progressData) {
    const ctx = document.getElementById('skillsChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Linux', 'Networking', 'Smart Contracts'],
            datasets: [{
                label: 'Learning Progress',
                data: [progressData.Linux, progressData.Networking, progressData.SmartContracts],
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
}

// Helper function to populate skills in the skills list
function populateSkills(skillsArray, elementId) {
    const ul = document.getElementById(elementId);
    ul.innerHTML = '';  // Clear existing content
    skillsArray.forEach(skill => {
        const li = document.createElement('li');
        li.textContent = skill;
        ul.appendChild(li);
    });
}

});

// Load data when the page is ready
document.addEventListener('DOMContentLoaded', loadData);

