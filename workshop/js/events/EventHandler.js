export class EventHandler {
    constructor(stateManager, weekContent) {
        this.stateManager = stateManager;
        this.weekContent = weekContent;
    }

    init() {
        this.setupWeekSelection();
        this.setupTabSwitching();
        this.setupSlideNavigation();
        this.setupKeyboardNavigation();
    }

    setupWeekSelection() {
        document.querySelectorAll('.week-list li').forEach(li => {
            li.addEventListener('click', () => {
                const weekNum = parseInt(li.dataset.week);
                this.handleWeekSelection(weekNum);
            });
        });
    }

    handleWeekSelection(weekNum) {
        if (weekNum === 1 || confirm('This week\'s content is not yet available. Would you like to preview it?')) {
            this.stateManager.setState({
                currentWeek: weekNum,
                currentSlide: 1
            });
        }
    }

    setupTabSwitching() {
        document.querySelectorAll('.tab-btn').forEach(btn => {
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
            prevBtn.addEventListener('click', () => this.handlePrevSlide());
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.handleNextSlide());
        }
    }

    handlePrevSlide() {
        const { currentSlide } = this.stateManager.getState();
        if (currentSlide > 1) {
            this.stateManager.setState({
                currentSlide: currentSlide - 1
            });
        }
    }

    handleNextSlide() {
        const { currentWeek, currentSlide } = this.stateManager.getState();
        const totalSlides = this.weekContent[currentWeek].slides.length;
        
        if (currentSlide < totalSlides) {
            this.stateManager.setState({
                currentSlide: currentSlide + 1
            });
        }
    }

    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            const { currentTab } = this.stateManager.getState();
            
            if (currentTab === 'content') {
                if (e.key === 'ArrowLeft') {
                    this.handlePrevSlide();
                } else if (e.key === 'ArrowRight') {
                    this.handleNextSlide();
                }
            }
        });
    }
}
