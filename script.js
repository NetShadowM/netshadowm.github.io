// Animate sections on scroll
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

window.addEventListener('scroll', animateSections);
window.addEventListener('load', animateSections);

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
    // Populate skills
    const programmingSkills = ['JavaScript', 'Python', 'Java', 'Solidity'];
    const techSkills = ['Linux', 'Git', 'Network Security', 'Blockchain'];

    function populateSkills(skillsArray, elementId) {
        const ul = document.getElementById(elementId);
        skillsArray.forEach(skill => {
            const li = document.createElement('li');
            li.textContent = skill;
            ul.appendChild(li);
        });
    }

    populateSkills(programmingSkills, 'programming-skills');
    populateSkills(techSkills, 'tech-skills');

    // Project ideas
    const projectIdeas = [
        'Personal Cybersecurity Tool',
        'Blockchain-based Voting System',
        'Secure File Sharing App',
        'Crypto Portfolio Tracker'
    ];

    const projectSection = document.getElementById('project-ideas');
    const ideaList = document.createElement('ul');
    projectIdeas.forEach(idea => {
        const li = document.createElement('li');
        li.textContent = idea;
        ideaList.appendChild(li);
    });
    projectSection.innerHTML = '<h3>Future Project Ideas:</h3>';
    projectSection.appendChild(ideaList);

    // Form submission
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Prepare the message for WhatsApp
        const whatsappMessage = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nMessage: ${message}`);
        const whatsappLink = `https://wa.me/+2347041029093?text=${whatsappMessage}`;
        
        // Prepare the message for email
        const emailSubject = encodeURIComponent("Portfolio Contact Form");
        const emailBody = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nMessage: ${message}`);
        const emailLink = `mailto:NetShadowM@proton.me?subject=${emailSubject}&body=${emailBody}`;

        // Ask user which method they prefer
        const preferredMethod = confirm("Click OK to send via WhatsApp, or Cancel to send via Email");
        
        if (preferredMethod) {
            window.open(whatsappLink, '_blank');
        } else {
            window.location.href = emailLink;
        }

        contactForm.reset();
    });

    // Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });

        // Close the mobile menu after clicking a link
        document.querySelector('nav').classList.remove('active');
    });
});
});