(() => {
    const greeting = document.getElementById('greetingOverlay');
    const openButton = document.getElementById('openSurprise');
    const pageContent = document.getElementById('pageContent');
    const hero = document.querySelector('.hero');
    const footer = document.querySelector('.site-footer');

    if (!greeting || !openButton || !pageContent) return;

    openButton.focus({ preventScroll: true });

    const openBirthdayPage = () => {
        if (greeting.classList.contains('is-leaving')) return;

        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        greeting.classList.add('is-leaving');

        window.setTimeout(() => {
            greeting.hidden = true;
            document.body.classList.remove('is-greeting-open');
            pageContent.inert = false;
            if (hero) hero.inert = false;
            if (footer) footer.inert = false;
            hero?.querySelector('.button')?.focus({ preventScroll: true });
        }, reducedMotion ? 0 : 650);

        if (reducedMotion) return;

        const colors = ['#f0bd7b', '#ed9bb2', '#fff7e8', '#bd6884'];
        for (let index = 0; index < 32; index += 1) {
            const piece = document.createElement('span');
            piece.className = 'confetti-piece';
            piece.setAttribute('aria-hidden', 'true');
            piece.style.left = (Math.random() * 100) + '%';
            piece.style.backgroundColor = colors[index % colors.length];
            piece.style.setProperty('--fall-distance', (80 + Math.random() * 50) + 'vh');
            piece.style.setProperty('--fall-duration', (2.2 + Math.random() * 1.8) + 's');
            document.body.appendChild(piece);
            window.setTimeout(() => piece.remove(), 4300);
        }
    };

    openButton.addEventListener('click', openBirthdayPage);
    greeting.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') openBirthdayPage();
    });
})();
