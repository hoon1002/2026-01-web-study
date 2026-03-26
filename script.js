document.addEventListener("DOMContentLoaded", () => {
    // 1. Initialize Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // 2. Custom Cursor
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    let isHovering = false;

    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;
        
        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;
        
        // Add slight delay for outline
        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 150, fill: "forwards" });
    });

    // Hover effects for cursor on clickable elements
    const addCursorHover = () => {
        const interactables = document.querySelectorAll('button, input, textarea, .interactive-card, a');
        interactables.forEach(el => {
            el.addEventListener('mouseenter', () => cursorOutline.classList.add('hovering'));
            el.addEventListener('mouseleave', () => cursorOutline.classList.remove('hovering'));
        });
    };
    addCursorHover();

    // 3. Mouse Tracking Glow Effect on Cards
    const recordsGrid = document.getElementById('records-container');
    
    // Delegate mousemove to update CSS vars for glowing border
    recordsGrid.addEventListener('mousemove', (e) => {
        const cards = document.querySelectorAll('.interactive-card');
        for (const card of cards) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        }
    });

    // 4. Staggered Entrance Animation for initial cards
    const initialCards = document.querySelectorAll('.week-card');
    initialCards.forEach((card, index) => {
        card.classList.add('animate-enter');
        card.style.animationDelay = `${index * 0.15}s`;
    });

    // 5. Expand/Collapse logic
    recordsGrid.addEventListener('click', (e) => {
        const toggleBtn = e.target.closest('.toggle-btn');
        if (toggleBtn) {
            const card = toggleBtn.closest('.week-card');
            const detailsWrapper = card.querySelector('.details-wrapper');
            const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';

            toggleBtn.setAttribute('aria-expanded', !isExpanded);
            
            if (!isExpanded) {
                detailsWrapper.classList.add('open');
                toggleBtn.querySelector('.btn-text').textContent = '데이터 접기';
            } else {
                detailsWrapper.classList.remove('open');
                toggleBtn.querySelector('.btn-text').textContent = '데이터 스캔';
            }
        }
    });

    // 6. Toast Notification Engine
    const showToast = (message) => {
        const container = document.getElementById('toast-container');
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.innerHTML = `
            <i data-lucide="check-circle" class="toast-icon"></i>
            <div>${message}</div>
        `;
        container.appendChild(toast);
        lucide.createIcons({ root: toast });

        // Animate in
        setTimeout(() => toast.classList.add('show'), 10);

        // Remove after 3 seconds
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 500);
        }, 3000);
    };

    // 7. Update Stats
    const updateStats = () => {
        const totalElement = document.getElementById('total-records');
        if(totalElement) {
            const count = document.querySelectorAll('.week-card').length;
            totalElement.textContent = count;
            
            // Pop animation on stat
            totalElement.style.transform = 'scale(1.5)';
            totalElement.style.color = '#f472b6';
            setTimeout(() => {
                totalElement.style.transform = 'scale(1)';
                totalElement.style.color = 'inherit';
            }, 300);
        }
    };

    // 8. Form Submission (The Magic Happens Here)
    const form = document.getElementById('record-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            // Fire Confetti!
            if (typeof confetti === 'function') {
                confetti({
                    particleCount: 150,
                    spread: 80,
                    origin: { y: 0.6 },
                    colors: ['#6366f1', '#ec4899', '#14b8a6', '#facc15'],
                    disableForReducedMotion: true
                });
            }

            const title = document.getElementById('week-title').value;
            const content = document.getElementById('learned-content').value;
            const detailsText = document.getElementById('details-content').value;

            const detailsItems = detailsText
                .split('\n')
                .filter(item => item.trim() !== '')
                .map(item => `<li>${item}</li>`)
                .join('');

            const newCard = document.createElement('article');
            newCard.className = 'week-card glass-panel interactive-card';
            // Setup vanilla tilt attributes
            newCard.setAttribute('data-tilt', '');
            newCard.setAttribute('data-tilt-perspective', '1000');
            newCard.setAttribute('data-tilt-scale', '1.02');
            newCard.setAttribute('data-tilt-speed', '400');
            newCard.setAttribute('data-tilt-max', '5');

            newCard.innerHTML = `
                <div class="card-glow"></div>
                <div class="card-content-inner">
                    <div class="card-header">
                        <span class="week-badge badge-new"><i data-lucide="zap" class="badge-icon"></i> 방금 추가됨</span>
                        <h2>${title}</h2>
                    </div>
                    <div class="card-body">
                        <p class="summary">${content}</p>
                        <div class="details-wrapper">
                            <div class="details">
                                <ul>${detailsItems}</ul>
                            </div>
                        </div>
                    </div>
                    <div class="card-footer">
                        <button type="button" class="toggle-btn" aria-expanded="false">
                            <span class="btn-text">데이터 스캔</span>
                            <i data-lucide="chevron-down" class="btn-icon"></i>
                        </button>
                    </div>
                </div>
            `;

            // Prepare for animation
            newCard.style.opacity = '0';
            newCard.style.transform = 'scale(0.8) translateY(-50px)';
            newCard.style.transition = 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';

            recordsGrid.prepend(newCard);
            
            // Re-initialize plugins for new elements
            if (typeof lucide !== 'undefined') {
                lucide.createIcons({ root: newCard });
            }
            if (typeof VanillaTilt !== 'undefined') {
                VanillaTilt.init(newCard);
            }
            // Bind cursor events to new card
            const newInteractables = newCard.querySelectorAll('button');
            newInteractables.forEach(el => {
                el.addEventListener('mouseenter', () => cursorOutline.classList.add('hovering'));
                el.addEventListener('mouseleave', () => cursorOutline.classList.remove('hovering'));
            });
            newCard.addEventListener('mouseenter', () => cursorOutline.classList.add('hovering'));
            newCard.addEventListener('mouseleave', () => cursorOutline.classList.remove('hovering'));

            // Trigger Animation
            requestAnimationFrame(() => {
                newCard.style.opacity = '1';
                newCard.style.transform = 'scale(1) translateY(0)';
            });

            // Cleanup inline styles
            setTimeout(() => {
                newCard.style.transition = '';
            }, 600);

            // UI Feedback
            form.reset();
            showToast('새로운 데이터가 성공적으로 동기화되었습니다. 🔥');
            updateStats();
        });
    }
});