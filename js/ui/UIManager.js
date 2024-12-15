import { getResourceIcon } from '../utils/icons.js';

export class UIManager {
    constructor() {
        this.weekContent = null;
    }

    init(weekContent) {
        this.weekContent = weekContent;
    }

    getTotalSlides(weekNum) {
        return this.weekContent[weekNum]?.slides.length || 0;
    }

    updateUI(state) {
        this.updateWeekSelection(state.currentWeek);
        this.updateTabs(state.currentTab);
        
        if (state.currentTab === 'content') {
            this.updateSlide(state.currentWeek, state.currentSlide);
        } else {
            this.updateResources(state.currentWeek);
        }
    }

    updateWeekSelection(currentWeek) {
        document.querySelectorAll('.sidebar__item').forEach(item => {
            const weekNum = parseInt(item.dataset.week);
            item.classList.toggle('sidebar__item--active', weekNum === currentWeek);
            item.setAttribute('aria-current', weekNum === currentWeek ? 'true' : 'false');
            
            // Update icon based on availability
            const icon = item.querySelector('i');
            if (weekNum <= 2) {  // Changed this line
                icon.className = 'fas fa-book-open';
            } else {
                icon.className = 'fas fa-lock';
            }
        });
    }

    updateTabs(currentTab) {
        document.querySelectorAll('.tabs__button').forEach(btn => {
            const isActive = btn.dataset.tab === currentTab;
            btn.classList.toggle('tabs__button--active', isActive);
            btn.setAttribute('aria-selected', isActive);
        });

        document.querySelectorAll('.tabs__panel').forEach(panel => {
            const isActive = panel.id === `${currentTab}Panel`;
            panel.classList.toggle('tabs__panel--active', isActive);
            panel.setAttribute('aria-hidden', !isActive);
        });
    }

    updateSlide(currentWeek, currentSlide) {
        const slides = document.querySelector('.slides');
        if (!slides) return;

        try {
            const weekContent = this.weekContent[currentWeek];
            if (!weekContent?.slides) {
                throw new Error('Week content not found');
            }

            const slide = weekContent.slides[currentSlide - 1];
            if (!slide) {
                throw new Error('Slide not found');
            }

            // Create slide element with proper structure
            const slideElement = document.createElement('div');
            slideElement.className = 'slide slide--active';
            slideElement.innerHTML = `
                <div class="slide__content">
                    <h1 class="slide__title">${slide.title}</h1>
                    ${slide.subtitle ? `<h3 class="slide__subtitle">${slide.subtitle}</h3>` : ''}
                    ${slide.content}
                </div>
            `;

            // Clear and append new slide
            slides.innerHTML = '';
            slides.appendChild(slideElement);

            this.updateNavigation(currentSlide, weekContent.slides.length);
        } catch (error) {
            console.error('Error updating slide:', error);
            this.showError(slides, 'Unable to load slide content');
        }
    }

    updateNavigation(currentSlide, totalSlides) {
        const currentSlideEl = document.getElementById('currentSlide');
        const totalSlidesEl = document.getElementById('totalSlides');
        const prevBtn = document.getElementById('prevSlide');
        const nextBtn = document.getElementById('nextSlide');

        if (currentSlideEl) currentSlideEl.textContent = currentSlide;
        if (totalSlidesEl) totalSlidesEl.textContent = totalSlides;

        if (prevBtn) {
            prevBtn.disabled = currentSlide === 1;
            prevBtn.setAttribute('aria-disabled', currentSlide === 1);
        }
        if (nextBtn) {
            nextBtn.disabled = currentSlide === totalSlides;
            nextBtn.setAttribute('aria-disabled', currentSlide === totalSlides);
        }
    }

    updateResources(currentWeek) {
        const resourcesPanel = document.getElementById('resourcesPanel');
        if (!resourcesPanel) return;

        try {
            const weekContent = this.weekContent[currentWeek];
            if (!weekContent?.resources) {
                throw new Error('Resources not found');
            }

            Object.entries(weekContent.resources).forEach(([section, items]) => {
                const sectionEl = resourcesPanel.querySelector(`[data-section="${section}"]`);
                if (!sectionEl) return;

                const list = sectionEl.querySelector('.resources__list');
                if (!list) return;

                list.innerHTML = items.map(item => this.createResourceItem(item)).join('');
            });
        } catch (error) {
            console.error('Error updating resources:', error);
            this.showError(resourcesPanel, 'Unable to load resources');
        }
    }

    createResourceItem(item) {
        return `
            <div class="resources__item resources__item--${item.type}">
                <i class="fas ${getResourceIcon(item.type)}" aria-hidden="true"></i>
                <h3 class="resources__item-title">${item.title}</h3>
                <p class="resources__item-description">${item.description}</p>
                <a href="${item.link}" 
                   class="resources__item-link" 
                   target="_blank" 
                   rel="noopener noreferrer">
                    Read More<span class="visually-hidden"> about ${item.title}</span>
                </a>
            </div>
        `;
    }

    showError(container, message) {
        container.innerHTML = `
            <div class="error-message" role="alert">
                <h2>${message}</h2>
                <p>Please try again later.</p>
            </div>
        `;
    }
}
