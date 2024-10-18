if (localStorage.getItem('auth') !== 'true') {

    window.location.href = 'admin.html';
}

document.addEventListener('DOMContentLoaded', () => {
    // Load existing data from localStorage
    document.getElementById('about-text').value = localStorage.getItem('aboutContent') || 'Default About Me content';
    document.getElementById('programming-skills').value = localStorage.getItem('programmingSkills') || '';
    document.getElementById('tech-skills').value = localStorage.getItem('techSkills') || '';
    document.getElementById('projects-data').value = localStorage.getItem('projectsData') || 'Default Projects data';

    // Save About Me section
    document.getElementById('save-about').addEventListener('click', () => {
        const aboutText = document.getElementById('about-text').value;
        localStorage.setItem('aboutContent', aboutText);
        alert('About Me section saved!');
    });

    // Save Skills section
    document.getElementById('save-skills').addEventListener('click', () => {
        const programmingSkills = document.getElementById('programming-skills').value;
        const techSkills = document.getElementById('tech-skills').value;
        localStorage.setItem('programmingSkills', programmingSkills);
        localStorage.setItem('techSkills', techSkills);
        alert('Skills section saved!');
    });

    // Save Projects section
    document.getElementById('save-projects').addEventListener('click', () => {
        const projectsData = document.getElementById('projects-data').value;
        localStorage.setItem('projectsData', projectsData);
        alert('Projects section saved!');
    });
});

