export class EventHandler {
    constructor(stateManager, uiManager) {
        this.stateManager = stateManager;
        this.uiManager = uiManager;
    }

    init() {
        this.setupWeekSelection();
        this.setupTabSwitching();
        this.setupSlideNavigation();
        this.setupKeyboardNavigation();
    }

    setupWeekSelection() {
        document.querySelectorAll('.sidebar__item').forEach(li => {
            li.addEventListener('click', () => {
                const weekNum = parseInt(li.dataset.week);
                if (weekNum === 1 || confirm('This week\'s content is not yet available. Would you like to preview it?')) {
                    this.stateManager.setState({
                        currentWeek: weekNum,
                        currentSlide: 1
                    });
                }
            });
        });
    }

    setupTabSwitching() {
        document.querySelectorAll('.tabs__button').forEach(btn => {
            btn.addEventListener('click', () => {
                this.stateManager.setState({
                    currentTab: btn.dataset.tab
                });
            });
        });
    }

    setupSlideNavigation() {
        const prevBtn = document.getElementById('prevSlide');
        const nextBtn = document.getElementById('nextSlide');

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                const { currentSlide } = this.stateManager.getState();
                if (currentSlide > 1) {
                    this.stateManager.setState({
                        currentSlide: currentSlide - 1
                    });
                }
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                const { currentWeek, currentSlide } = this.stateManager.getState();
                const totalSlides = this.uiManager.getTotalSlides(currentWeek);
                if (currentSlide < totalSlides) {
                    this.stateManager.setState({
                        currentSlide: currentSlide + 1
                    });
                }
            });
        }
    }

    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            const { currentTab } = this.stateManager.getState();
            
            if (currentTab === 'content') {
                if (e.key === 'ArrowLeft') {
                    const { currentSlide } = this.stateManager.getState();
                    if (currentSlide > 1) {
                        this.stateManager.setState({
                            currentSlide: currentSlide - 1
                        });
                    }
                } else if (e.key === 'ArrowRight') {
                    const { currentWeek, currentSlide } = this.stateManager.getState();
                    const totalSlides = this.uiManager.getTotalSlides(currentWeek);
                    if (currentSlide < totalSlides) {
                        this.stateManager.setState({
                            currentSlide: currentSlide + 1
                        });
                    }
                }
            }
        });
    }
}
