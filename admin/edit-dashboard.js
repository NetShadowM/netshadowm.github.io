if (localStorage.getItem('auth') !== 'true') {

    window.location.href = 'admin.html';
}

document.addEventListener('DOMContentLoaded', function() {
    // Load existing content from localStorage to allow editing
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

    // Set initial values in the form fields (assuming you have input fields for editing)
    document.getElementById('about-text').value = aboutContent;
    document.getElementById('programming-skills').value = programmingSkills;
    document.getElementById('tech-skills').value = techSkills;
    document.getElementById('projects-data').value = projectsData;

    // Save "About Me" content
    document.getElementById('save-about').addEventListener('click', () => {
        const newAboutContent = document.getElementById('about-text').value;
        localStorage.setItem('aboutContent', newAboutContent);
        alert('About Me updated!');
    });

    // Save Skills
    document.getElementById('save-skills').addEventListener('click', () => {
        const newProgrammingSkills = document.getElementById('programming-skills').value;
        const newTechSkills = document.getElementById('tech-skills').value;
        localStorage.setItem('programmingSkills', newProgrammingSkills);
        localStorage.setItem('techSkills', newTechSkills);
        alert('Skills updated!');
    });

    // Save Projects
    document.getElementById('save-projects').addEventListener('click', () => {
        const newProjectsData = document.getElementById('projects-data').value;
        localStorage.setItem('projectsData', newProjectsData);
        alert('Projects updated!');
    });
});


