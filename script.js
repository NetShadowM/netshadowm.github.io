window.location.href = "index2.html";

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