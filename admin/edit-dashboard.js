document.addEventListener('DOMContentLoaded', function() {
    checkAuth();
    loadData();
});

function checkAuth() {
    const verified = localStorage.getItem("auth");
    if (!verified) {
        window.location.href = "admin.html";
    }
}

async function loadData() {
    try {
        const response = await fetch('../../assets/storage/json/data.json');
        const data = await response.json();
        displayEditForms(data);
    } catch (error) {
        console.error("Error loading JSON data:", error);
        document.getElementById('editForms').innerHTML = '<p>Error loading data. Please try again later.</p>';
    }
}

function displayEditForms(data) {
    const editForms = document.getElementById('editForms');
    editForms.innerHTML = '';

    // About Me
    editForms.innerHTML += `
        <h2>About Me</h2>
        <textarea id="aboutMe" rows="5">${data.aboutMe.content}</textarea>
    `;

    // Skills
    editForms.innerHTML += `
        <h2>Skills</h2>
        <h3>Programming Skills</h3>
        <textarea id="programmingSkills" rows="5">${data.skills.programmingSkills.join(', ')}</textarea>
        <h3>Tech Skills</h3>
        <textarea id="techSkills" rows="5">${data.skills.techSkills.join(', ')}</textarea>
    `;

    // Projects
    editForms.innerHTML += `
        <h2>Projects</h2>
        <div id="projectsContainer"></div>
        <button onclick="addProject()">Add New Project</button>
    `;
    data.projects.forEach((project, index) => {
        addProjectForm(project, index);
    });

    // Learning Progress
    editForms.innerHTML += `
        <h2>Learning Progress</h2>
        <div id="learningProgressContainer"></div>
        <button id="addProgress">Add New Progress</button>
    `;
    data.learningProgress.forEach((progress, index) => {
        addLearningProgressForm(progress, index);
    });

    // Resume Link
    editForms.innerHTML += `
        <h2>Resume Link</h2>
        <input type="text" id="resumeLink" value="${data.resume}">
    `;

    // Save Button
    editForms.innerHTML += `
        <button onclick="saveData()">Save Changes</button>
    `;

    // Add event listener for new progress button
    document.getElementById('addProgress').addEventListener('click', () => {
        addLearningProgressForm({});
    });
}

function addProjectForm(project = {}, index) {
    const projectsContainer = document.getElementById('projectsContainer');
    const projectForm = document.createElement('div');
    projectForm.className = 'project-form';
    projectForm.innerHTML = `
        <h3>Project ${index + 1}</h3>
        <label>Name: <input type="text" class="project-name" value="${project.name || ''}"></label>
        <label>Status: <input type="text" class="project-status" value="${project.status || ''}"></label>
        <label>Description: <textarea class="project-description" rows="3">${project.description || ''}</textarea></label>
        <label>Thumbnail: <input type="text" class="project-thumbnail" value="${project.thumbnail || ''}"></label>
        <button onclick="removeProject(this)">Remove Project</button>
    `;
    projectsContainer.appendChild(projectForm);
}

function addProject() {
    const projectsContainer = document.getElementById('projectsContainer');
    addProjectForm({}, projectsContainer.children.length);
}

function removeProject(button) {
    button.closest('.project-form').remove();
}

function addLearningProgressForm(progress = {}, index) {
    const container = document.getElementById('learningProgressContainer');
    const form = document.createElement('div');
    form.className = 'progress-form';
    form.innerHTML = `
        <h3>Progress ${index + 1}</h3>
        <label>Title: <input type="text" class="progress-title" value="${progress.title || ''}"></label>
        <label>Description: <textarea class="progress-description" rows="3">${progress.description || ''}</textarea></label>
        <label>Percentage: <input type="number" class="progress-percentage" value="${progress.percentage || 0}" min="0" max="100"></label>
        <button onclick="removeLearningProgress(this)">Remove Progress</button>
    `;
    container.appendChild(form);
}

function removeLearningProgress(button) {
    button.closest('.progress-form').remove();
}

async function saveData() {
    const data = {
        aboutMe: {
            content: document.getElementById('aboutMe').value
        },
        skills: {
            programmingSkills: document.getElementById('programmingSkills').value.split(',').map(skill => skill.trim()),
            techSkills: document.getElementById('techSkills').value.split(',').map(skill => skill.trim())
        },
        projects: Array.from(document.querySelectorAll('.project-form')).map(form => ({
            name: form.querySelector('.project-name').value,
            status: form.querySelector('.project-status').value,
            description: form.querySelector('.project-description').value,
            thumbnail: form.querySelector('.project-thumbnail').value
        })),
        learningProgress: Array.from(document.querySelectorAll('.progress-form')).map(form => ({
            title: form.querySelector('.progress-title').value,
            description: form.querySelector('.progress-description').value,
            percentage: parseInt(form.querySelector('.progress-percentage').value)
        })),
        resume: document.getElementById('resumeLink').value
    };

    try {
        const response = await fetch('../../assets/storage/json/data.json', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            alert('Data saved successfully!');
        } else {
            throw new Error('Failed to save data');
        }
    } catch (error) {
        console.error("Error saving data:", error);
        alert('Failed to save data. Please try again.');
    }
}