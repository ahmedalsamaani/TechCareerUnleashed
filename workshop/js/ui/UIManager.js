import { getResourceIcon } from '../utils/icons.js';

export class UIManager {
    constructor(weekContent) {
        this.weekContent = weekContent;
    }

    updateWeekSelection(currentWeek) {
        document.querySelectorAll('.week-list li').forEach(li => {
            const weekNum = parseInt(li.dataset.week);
            li.classList.toggle('active', weekNum === currentWeek);
            li.setAttribute('aria-current', weekNum === currentWeek ? 'true' : 'false');
        });
    }

    updateSlide(currentWeek, currentSlide) {
        const slides = document.querySelector('.slides');
        if (!slides) return;
        
        try {
            slides.innerHTML = '';
            
            const currentWeekContent = this.weekContent[currentWeek];
            if (!currentWeekContent?.slides) {
                throw new Error('Week content not found');
            }
            
            const slide = currentWeekContent.slides[currentSlide - 1];
            if (!slide) {
                throw new Error('Slide not found');
            }
            
            this.renderSlide(slides, slide, currentSlide);
            this.updateNavigation(currentSlide, currentWeekContent.slides.length);
            
        } catch (error) {
            console.error('Error updating slide:', error);
            this.showError(slides, 'Unable to load slide content');
        }
    }

    renderSlide(container, slide, slideNumber) {
        const slideElement = document.createElement('div');
        slideElement.className = 'slide active';
        slideElement.setAttribute('role', 'region');
        slideElement.setAttribute('aria-label', `Slide ${slideNumber}`);
        slideElement.innerHTML = `
            <h1>${slide.title}</h1>
            ${slide.subtitle ? `<h3>${slide.subtitle}</h3>` : ''}
            ${slide.content}
        `;
        container.appendChild(slideElement);
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

    updateTabs(currentTab) {
        document.querySelectorAll('.tab-btn').forEach(btn => {
            const isActive = btn.dataset.tab === currentTab;
            btn.classList.toggle('active', isActive);
            btn.setAttribute('aria-selected', isActive);
        });
        
        document.querySelectorAll('.tab-panel').forEach(panel => {
            const isActive = panel.id === `${currentTab}Panel`;
            panel.classList.toggle('active', isActive);
            panel.setAttribute('aria-hidden', !isActive);
        });
    }

    renderResources(currentWeek) {
        const resourcesPanel = document.getElementById('resourcesPanel');
        if (!resourcesPanel) return;
        
        try {
            const currentWeekContent = this.weekContent[currentWeek];
            if (!currentWeekContent?.resources) {
                throw new Error('Resources not found');
            }
            
            Object.entries(currentWeekContent.resources).forEach(([section, items]) => {
                this.renderResourceSection(resourcesPanel, section, items);
            });
        } catch (error) {
            console.error('Error rendering resources:', error);
            this.showError(resourcesPanel, 'Unable to load resources');
        }
    }

    renderResourceSection(panel, section, items) {
        const sectionElement = panel.querySelector(`[data-section="${section}"]`);
        if (!sectionElement) return;
        
        const list = sectionElement.querySelector('.resource-list');
        if (!list) return;
        
        list.innerHTML = items.map(item => this.createResourceItem(item)).join('');
    }

    createResourceItem(item) {
        return `
            <div class="resource-item">
                <i class="fas ${getResourceIcon(item.type)}" aria-hidden="true"></i>
                <div class="resource-content">
                    <h3>${item.title}</h3>
                    <p>${item.description}</p>
                    <a href="${item.link}" 
                       class="resource-link" 
                       target="_blank" 
                       rel="noopener noreferrer">
                        Read More<span class="sr-only"> about ${item.title}</span>
                    </a>
                </div>
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

    updateUI(state) {
        try {
            this.updateWeekSelection(state.currentWeek);
            this.updateSlide(state.currentWeek, state.currentSlide);
            this.updateTabs(state.currentTab);
            this.renderResources(state.currentWeek);
        } catch (error) {
            console.error('Error updating UI:', error);
            this.showError(document.querySelector('.slides'), 'Something went wrong');
        }
    }
}
