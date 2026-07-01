document.addEventListener('DOMContentLoaded', () => {
    const popup = document.getElementById('artist-popup');
    const closeButton = document.getElementById('closePopup');
    const enterButton = document.getElementById('enterGallery');
    const body = document.body;

    const closePopup = () => {
        popup.classList.add('hidden');
        body.classList.remove('no-scroll');
        body.classList.remove('loading');
    };

    closeButton?.addEventListener('click', closePopup);
    enterButton?.addEventListener('click', closePopup);
    popup?.addEventListener('click', (event) => {
        if (event.target === popup) {
            closePopup();
        }
    });
});
