document.addEventListener('DOMContentLoaded', () => {
    const headers = document.querySelectorAll('main section h2');

    headers.forEach(header => {
        header.addEventListener('click', () => {
            const content = header.nextElementSibling;
            content.style.display = content.style.display === 'none' ? 'block' : 'none';
        });

        // Initially hide the content
        const content = header.nextElementSibling;
        content.style.display = 'none';
    });
});
