window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    const popup = document.getElementById('artist-popup');

    setTimeout(() => {
        popup?.classList.remove('hidden');
        setTimeout(() => {
            loader.classList.add('hide');
        }, 150);
    }, 1200);
});
