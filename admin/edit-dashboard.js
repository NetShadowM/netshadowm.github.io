

function checkAuth() {
    const verified = localStorage.getItem("auth");
    if (!verified) {
        window.location.href = "admin.html";
    }
}




let progressData = [];

function loadData() {
    const savedData = localStorage.getItem('progressData');
    return savedData ? JSON.parse(savedData) : [];
}

function saveData() {
    localStorage.setItem('progressData', JSON.stringify(progressData));
}

function createProgressForm(progress = {}) {
    const form = document.createElement('form');
    form.classList.add('progress-form');

    form.innerHTML = `
        <input type="text" name="title" placeholder="Title" value="${progress.title || ''}" required>
        <input type="text" name="description" placeholder="Description" value="${progress.description || ''}" required>
        <input type="number" name="percentage" placeholder="Percentage" value="${progress.percentage || ''}" required min="0" max="100">
        <button type="submit">Save</button>
        <button type="button" class="delete-btn">Delete</button>
    `;

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(form);
        const updatedProgress = {
            title: formData.get('title'),
            description: formData.get('description'),
            percentage: parseInt(formData.get('percentage'))
        };

        const index = progressData.findIndex(p => p.title === progress.title);
        if (index !== -1) {
            progressData[index] = updatedProgress;
        } else {
            progressData.push(updatedProgress);
        }

        saveData();
        renderForms();
    });

    form.querySelector('.delete-btn').addEventListener('click', function() {
        progressData = progressData.filter(p => p.title !== progress.title);
        saveData();
        renderForms();
    });

    return form;
}

function renderForms() {
    const container = document.getElementById('editForms');
    container.innerHTML = '';
    progressData.forEach(progress => {
        container.appendChild(createProgressForm(progress));
    });
}

document.getElementById('addProgress').addEventListener('click', function() {
    const container = document.getElementById('editForms');
    container.appendChild(createProgressForm());
});

document.addEventListener('DOMContentLoaded', function() {
    progressData = loadData();
    renderForms();
    checkAuth();
});