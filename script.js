document.addEventListener('DOMContentLoaded', () => {

const fullSystemInfo = {
    platform: navigator.platform,          
    userAgent: navigator.userAgent,        
    language: navigator.language,         
    cookiesEnabled: navigator.cookieEnabled, 
    logicalProcessors: navigator.hardwareConcurrency, 
    screenResolution: `${window.screen.width}x${window.screen.height}` 
};

localStorage.setItem('systemInfo', JSON.stringify(fullSystemInfo));

const footerDiv = document.getElementById('footer-info');
if (footerDiv) {
    const data = JSON.parse(localStorage.getItem('systemInfo'));
    footerDiv.innerHTML = `
        <div style="font-size: 12px; line-height: 1.6; opacity: 0.8;">
            <strong>ОС та Платформа:</strong> ${data.platform} <br>
            <strong>Браузер:</strong> ${data.userAgent} <br>
            <strong>Екран:</strong> ${data.screenResolution} | <strong>Мова:</strong> ${data.language}
        </div>
    `;
}

    const variantNumber = 7; 
    const commentsContainer = document.getElementById('comments-container');
    
    if (commentsContainer) {
        fetch(`https://jsonplaceholder.typicode.com/posts/${variantNumber}/comments`)
            .then(response => response.json())
            .then(comments => {
                commentsContainer.innerHTML = ''; 
                comments.forEach(comment => {
                    const div = document.createElement('div');
                    div.className = 'comment-item'; 
                    div.innerHTML = `<strong>${comment.email}</strong>: <p>${comment.body}</p>`;
                    commentsContainer.appendChild(div);
                });
            })
            .catch(err => console.error("Помилка завантаження коментарів:", err));
    }

    const modal = document.getElementById('modal-overlay');
    const closeModalBtn = document.getElementById('close-modal');

    setTimeout(() => {
        if (modal) modal.style.display = 'flex';
    }, 60000);

    if (closeModalBtn) {
        closeModalBtn.onclick = () => {
            modal.style.display = 'none';
        };
    }

    const themeBtn = document.getElementById('theme-toggle');
    
    const toggleTheme = () => {
        document.body.classList.toggle('dark-mode');
    };

    if (themeBtn) themeBtn.onclick = toggleTheme;

    const checkAutoTheme = () => {
        const hour = new Date().getHours();
        if (hour < 7 || hour >= 21) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    };
    
    checkAutoTheme();
});