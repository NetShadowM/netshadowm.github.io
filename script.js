// Utility Functions
const debounce = (func, wait = 20) => {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
};

// DOM Manipulation Functions
const animateSections = () => {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        if (sectionTop < window.innerHeight * 0.75) {
            section.classList.add('visible', 'animated');
        }
    });
};

const setupMobileMenu = () => {
    const mobileMenuToggle = document.createElement('div');
    mobileMenuToggle.className = 'mobile-menu-toggle';
    mobileMenuToggle.innerHTML = '☰';
    document.querySelector('header .container').prepend(mobileMenuToggle);

    mobileMenuToggle.addEventListener('click', () => {
        document.querySelector('nav').classList.toggle('active');
    });

    document.addEventListener('click', (e) => {
        if (!e.target.closest('nav') && !e.target.closest('.mobile-menu-toggle')) {
            document.querySelector('nav').classList.remove('active');
        }
    });
};

// Data Loading and Population Functions
const loadData = () => {
    try {
        const data = JSON.parse(localStorage.getItem('portfolioData')) || {};

        // Check if the #about .about-text element exists before setting its value
        const aboutTextElement = document.querySelector('#about .about-text');
        if (aboutTextElement) {
            aboutTextElement.innerHTML = data.aboutMe?.content || 'No About Me content available.';
        }

        populateSkills(data.skills?.programmingSkills || [], 'programming-skills');
        populateSkills(data.skills?.techSkills || [], 'tech-skills');
        populateProjectsTable(data.projects || []);
        loadProjectShowcase(data.projects || []);
        updateLearningChart(data.learningProgress || {});

        // Check if the resume links exist before updating them
        const resumeLinks = document.querySelectorAll('.resume-buttons a');
        if (resumeLinks.length > 0) {
            resumeLinks.forEach(link => link.href = data.resume || '#');
        }

    } catch (error) {
        console.error("Error loading data:", error);
        const loadingErrorElement = document.getElementById('loading-error');
        if (loadingErrorElement) {
            loadingErrorElement.textContent = 'Failed to load data. Please try again later.';
        }
    } finally {
        // Check if the loading indicator exists before hiding it
        const loadingIndicator = document.getElementById('loading-indicator');
        if (loadingIndicator) {
            loadingIndicator.style.display = 'none';
        }
    }
};


const populateSkills = (skillsArray, elementId) => {
    const ul = document.getElementById(elementId);
    ul.innerHTML = skillsArray.map(skill => `<li>${skill}</li>`).join('');
};

const populateProjectsTable = (projects) => {
    const projectsTable = document.querySelector('#projectsTable tbody');
    projectsTable.innerHTML = projects.map(project => `
        <tr class="clickable-row" data-project="${project.name}">
            <td>${project.name}</td>
            <td>${project.status}</td>
            <td>${project.description}</td>
        </tr>
    `).join('');

    document.querySelectorAll('.clickable-row').forEach(row => {
        row.addEventListener('click', function() {
            const projectName = encodeURIComponent(this.getAttribute('data-project'));
            window.location.href = `assets/pages/projects-display.html?project=${projectName}`;
        });
    });

    $('#projectsTable').DataTable();
};

const loadProjectShowcase = (projects) => {
    const swiperWrapper = document.getElementById('project-showcase-wrapper');
    swiperWrapper.innerHTML = projects.map(project => `
        <div class="swiper-slide">
            <a href="assets/pages/projects-display.html?project=${encodeURIComponent(project.name)}">
                <img src="${project.thumbnail}" alt="${project.name}">
                <h3>${project.name}</h3>
            </a>
        </div>
    `).join('');

    new Swiper('.swiper-container', {
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        slidesPerView: 1,
        spaceBetween: 10,
        breakpoints: {
            320: {
                slidesPerView: 1,
                spaceBetween: 10
            },
            480: {
                slidesPerView: 2,
                spaceBetween: 20
            },
            640: {
                slidesPerView: 3,
                spaceBetween: 30
            }
        }
    });
};

const updateLearningChart = (progressData) => {
    const ctx = document.getElementById('skillsChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Linux', 'Networking', 'Smart Contracts'],
            datasets: [{
                label: 'Learning Progress',
                data: [progressData.Linux || 0, progressData.Networking || 0, progressData.SmartContracts || 0],
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
};

// Event Listeners and Initialization
document.addEventListener('DOMContentLoaded', () => {
    setupMobileMenu();
    loadData();
    window.addEventListener('scroll', debounce(animateSections));
});

// Developer Tools Protection (optional)
const enableDevProtection = () => {
    document.addEventListener('contextmenu', (e) => e.preventDefault());
    document.addEventListener('keydown', (e) => {
        if (e.keyCode === 123 || (e.ctrlKey && e.shiftKey && e.keyCode === 73)) {
            e.preventDefault();
            alert('Developer tools are disabled.');
        }
    });
    setInterval(() => {
        const devTools = new Function('debugger');
        try {
            devTools();
        } catch (e) {
            console.warn('Developer tools are open!');
            alert('Please close developer tools to continue.');
        }
    }, 1000);
};

// Uncomment the line below to enable developer tools protection
// enableDevProtection();