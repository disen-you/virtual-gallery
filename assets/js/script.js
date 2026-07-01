const categoryNames = defaultCategoryNames;
let galleryData = getSavedGalleryData();
let currentIndex = 0;
let featuredIndex = getSavedFeaturedIndex();

document.addEventListener('DOMContentLoaded', () => {
    const collectionButtons = document.querySelectorAll('.collection-button');
    const viewer = document.getElementById('artworkViewer');
    const viewerBackdrop = viewer?.querySelector('.viewer-backdrop');
    const viewerClose = document.getElementById('viewerClose');
    const viewerPrev = document.getElementById('viewerPrev');
    const viewerNext = document.getElementById('viewerNext');
    const viewerImg = viewer?.querySelector('.viewer-media img');
    const viewerTitle = viewer?.querySelector('.viewer-title');
    const viewerMedium = viewer?.querySelector('.viewer-medium');
    const viewerYear = viewer?.querySelector('.viewer-year');
    const viewerDescription = viewer?.querySelector('.viewer-description');
    const featuredView = document.querySelector('[data-view-index]');
    const contactForm = document.getElementById('contactForm');
    const contactStatus = document.getElementById('contactStatus');
    const adminTrigger = document.getElementById('adminTrigger');
    const adminModal = document.getElementById('adminModal');
    const adminBackdrop = adminModal?.querySelector('.admin-backdrop');
    const adminClose = document.getElementById('adminClose');
    const adminLoginForm = document.getElementById('adminLoginForm');
    const adminLoginStatus = document.getElementById('adminLoginStatus');
    const adminPanelContent = document.getElementById('adminPanelContent');
    const adminSave = document.getElementById('adminSave');
    const adminSaveStatus = document.getElementById('adminSaveStatus');
    const adminImageUrl = document.getElementById('adminImageUrl');
    const adminTitle = document.getElementById('adminTitle');
    const adminCategory = document.getElementById('adminCategory');
    const adminMedium = document.getElementById('adminMedium');
    const adminYear = document.getElementById('adminYear');
    const adminDescription = document.getElementById('adminDescription');
    const galleryModal = document.getElementById('galleryModal');
    const galleryModalClose = document.getElementById('galleryModalClose');
    const galleryModalTitle = document.getElementById('galleryModalTitle');
    const galleryModalGrid = document.getElementById('galleryModalGrid');

    const setFeaturedArtwork = (index) => {
        const item = galleryData[index];
        if (!item) return;
        featuredIndex = index;
        window.featuredIndex = featuredIndex;

        const featuredImg = document.querySelector('.about-feature-card img');
        const featuredTitle = document.querySelector('.feature-overlay h3');
        const featuredMeta = document.querySelector('.feature-meta');
        const featureButton = document.querySelector('.feature-overlay button');
        if (featuredImg) {
            featuredImg.src = item.image;
            featuredImg.alt = item.title;
        }
        if (featuredTitle) featuredTitle.textContent = item.title;
        if (featuredMeta) featuredMeta.textContent = `${item.medium} · ${item.year}`;
        if (featureButton) featureButton.dataset.viewIndex = index;
    };

    window.setFeaturedArtwork = setFeaturedArtwork;

    const openViewer = (index) => {
        const item = galleryData[index];
        if (!item || !viewer) return;
        currentIndex = index;
        if (viewerImg) viewerImg.src = item.image;
        if (viewerImg) viewerImg.alt = item.title;
        if (viewerTitle) viewerTitle.textContent = item.title;
        if (viewerMedium) viewerMedium.textContent = item.medium;
        if (viewerYear) viewerYear.textContent = item.year;
        if (viewerDescription) viewerDescription.textContent = item.description;
        viewer.classList.remove('hidden');
        viewer.setAttribute('aria-hidden', 'false');
        document.body.classList.add('no-scroll');
    };

    const closeViewer = () => {
        if (!viewer) return;
        viewer.classList.add('hidden');
        viewer.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('no-scroll');
    };

    const showNext = () => {
        const nextIndex = (currentIndex + 1) % galleryData.length;
        openViewer(nextIndex);
    };

    const showPrev = () => {
        const prevIndex = (currentIndex - 1 + galleryData.length) % galleryData.length;
        openViewer(prevIndex);
    };

    const buildGalleryModal = (category) => {
        if (!galleryModalGrid || !galleryModalTitle || !galleryModal) return;
        const categoryName = categoryNames[category] || 'Gallery';
        galleryModalTitle.textContent = categoryName;
        galleryModalGrid.innerHTML = galleryData
            .filter((item) => item.category === category)
            .map((item, index) => {
                return `
                    <article class="gallery-modal-item" data-index="${index}">
                        <img src="${item.image}" alt="${item.title}" loading="lazy">
                        <div class="gallery-modal-caption">
                            <h3>${item.title}</h3>
                            <p>${item.medium}</p>
                        </div>
                    </article>
                `;
            })
            .join('');

        const modalItems = galleryModalGrid.querySelectorAll('.gallery-modal-item');
        modalItems.forEach((item) => {
            const itemIndex = Number(item.dataset.index);
            item.addEventListener('click', () => {
                closeGalleryModal();
                openViewer(itemIndex);
            });
        });
    };

    const openGalleryModal = (category) => {
        if (!galleryModal) return;
        buildGalleryModal(category);
        galleryModal.classList.remove('hidden');
        galleryModal.setAttribute('aria-hidden', 'false');
        document.body.classList.add('no-scroll');
    };

    const closeGalleryModal = () => {
        if (!galleryModal) return;
        galleryModal.classList.add('hidden');
        galleryModal.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('no-scroll');
    };

    collectionButtons.forEach((button) => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            const category = button.dataset.category || 'art-commissions';
            openGalleryModal(category);
        });
    });

    featuredView?.addEventListener('click', () => {
        openViewer(featuredIndex);
    });

    setFeaturedArtwork(0);

    galleryModalClose?.addEventListener('click', closeGalleryModal);
    galleryModal?.addEventListener('click', (event) => {
        if (event.target === galleryModal) {
            closeGalleryModal();
        }
    });

    viewerClose?.addEventListener('click', closeViewer);
    viewerBackdrop?.addEventListener('click', closeViewer);
    viewerNext?.addEventListener('click', showNext);
    viewerPrev?.addEventListener('click', showPrev);

    document.addEventListener('keydown', (event) => {
        if (viewer && !viewer.classList.contains('hidden')) {
            if (event.key === 'Escape') closeViewer();
            if (event.key === 'ArrowRight') showNext();
            if (event.key === 'ArrowLeft') showPrev();
        }
        if (galleryModal && !galleryModal.classList.contains('hidden')) {
            if (event.key === 'Escape') closeGalleryModal();
        }
    });

    contactForm?.addEventListener('submit', (event) => {
        event.preventDefault();
        contactStatus.textContent = 'Thank you. Your inquiry is ready to send.';
        const royalColor = getComputedStyle(document.documentElement).getPropertyValue('--royal') || '#183A67';
        contactStatus.style.color = royalColor.trim();
        contactForm.reset();
    });

    const openAdminModal = () => {
        if (!adminModal) return;
        adminModal.classList.remove('hidden');
        adminModal.setAttribute('aria-hidden', 'false');
        document.body.classList.add('no-scroll');
    };

    const closeAdminModal = () => {
        if (!adminModal) return;
        adminModal.classList.add('hidden');
        adminModal.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('no-scroll');
        adminLoginForm?.reset();
        if (adminPanelContent) adminPanelContent.classList.add('hidden');
        if (adminLoginStatus) adminLoginStatus.textContent = '';
        if (adminSave) adminSave.textContent = 'Save artwork';
    };

    adminTrigger?.addEventListener('click', openAdminModal);
    adminClose?.addEventListener('click', closeAdminModal);
    adminBackdrop?.addEventListener('click', closeAdminModal);
    adminModal?.addEventListener('click', (event) => {
        if (event.target === adminModal) {
            closeAdminModal();
        }
    });

    adminLoginForm?.addEventListener('submit', (event) => {
        event.preventDefault();
        const username = adminLoginForm.adminUser.value.trim();
        const password = adminLoginForm.adminPass.value.trim();

        if (username === 'admin' && password === 'password123') {
            if (adminLoginStatus) {
                adminLoginStatus.textContent = 'Login successful. Opening admin panel...';
                adminLoginStatus.style.color = 'var(--royal)';
            }
            closeAdminModal();
            window.open('admin.html', '_blank');
        } else {
            if (adminLoginStatus) {
                adminLoginStatus.textContent = 'Invalid login. Please try again.';
                adminLoginStatus.style.color = '#d92f2f';
            }
        }
    });

    adminSave?.addEventListener('click', () => {
        if (!adminImageUrl || !adminTitle || !adminCategory) return;

        if (!adminImageUrl.value.trim() || !adminTitle.value.trim()) {
            if (adminSaveStatus) {
                adminSaveStatus.textContent = 'Please add at least an image URL and title.';
                adminSaveStatus.style.color = '#d92f2f';
            }
            return;
        }

        const newArtwork = {
            category: adminCategory.value,
            title: adminTitle.value.trim(),
            medium: adminMedium?.value.trim() || 'Mixed media',
            year: adminYear?.value.trim() || '2026',
            description: adminDescription?.value.trim() || 'New collection artwork.',
            image: adminImageUrl.value.trim(),
        };

        galleryData.push(newArtwork);

        if (adminSaveStatus) {
            adminSaveStatus.textContent = 'Artwork added locally. Firebase upload can be wired here.';
            adminSaveStatus.style.color = 'var(--royal)';
        }

        adminImageUrl.value = '';
        adminTitle.value = '';
        if (adminMedium) adminMedium.value = '';
        if (adminYear) adminYear.value = '';
        if (adminDescription) adminDescription.value = '';
    });

    window.addEventListener('storage', (event) => {
        if (event.key === storageKey) {
            galleryData = getSavedGalleryData();
            setFeaturedArtwork(getSavedFeaturedIndex());
        }
        if (event.key === featuredKey) {
            featuredIndex = getSavedFeaturedIndex();
            setFeaturedArtwork(featuredIndex);
        }
    });

    document.addEventListener('keydown', (event) => {
        if (viewer && !viewer.classList.contains('hidden')) {
            if (event.key === 'Escape') closeViewer();
            if (event.key === 'ArrowRight') showNext();
            if (event.key === 'ArrowLeft') showPrev();
        }
        if (galleryModal && !galleryModal.classList.contains('hidden')) {
            if (event.key === 'Escape') closeGalleryModal();
        }
        if (adminModal && !adminModal.classList.contains('hidden')) {
            if (event.key === 'Escape') closeAdminModal();
        }
    });
});
