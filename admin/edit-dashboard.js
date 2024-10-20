if (localStorage.getItem('auth') !== 'true') {

    window.location.href = 'admin.html';
}

document.addEventListener('DOMContentLoaded', function() {
    // Fetch the existing data.json file and update it in localStorage
async function loadDashboardData() {
    try {
        const response = await fetch('assets/storage/json/data.json');
        const data = await response.json();

        // Populate the dashboard fields with existing data
        document.getElementById('about-text').value = data.aboutMe.content;
        document.getElementById('programming-skills').value = data.skills.programmingSkills.join(', ');
        document.getElementById('tech-skills').value = data.skills.techSkills.join(', ');
        document.getElementById('learning-focus').value = "Current Learning Focus";  // Example

        // Populate resume, learning progress, and project thumbnails

        // Store the data in localStorage (this simulates saving back to the JSON file)
        localStorage.setItem('portfolioData', JSON.stringify(data));

    } catch (error) {
        console.error("Error loading dashboard data:", error);
    }
}

// Save the updated data back to localStorage (to simulate JSON save)
function saveDashboardData() {
    const updatedData = {
        aboutMe: {
            content: document.getElementById('about-text').value
        },
        skills: {
            programmingSkills: document.getElementById('programming-skills').value.split(',').map(skill => skill.trim()),
            techSkills: document.getElementById('tech-skills').value.split(',').map(skill => skill.trim())
        },
        // Additional saving logic for Learning Progress, Projects, and Resume
    };

    localStorage.setItem('portfolioData', JSON.stringify(updatedData));

    alert('Portfolio data updated successfully!');
}

// Example save button event listener
document.getElementById('save-button').addEventListener('click', saveDashboardData);

});


