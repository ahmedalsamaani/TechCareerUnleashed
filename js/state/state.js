export class StateManager {
    constructor() {
        this.state = {
            currentWeek: 1,
            currentSlide: 1,
            currentTab: 'content'
        };
        this.listeners = new Set();
    }

    getState() {
        return { ...this.state };
    }

    setState(updates) {
        console.log("Setting state:", updates);
        const newState = { ...this.state, ...updates };
        console.log("New state will be:", newState);
        
        // Validate state changes
        if (this.isValidState(newState)) {
            console.log("State is valid");
            this.state = newState;
            this.notifyListeners();
            this.persistState();
        } else {
            console.log("State validation failed");
        }
    }

    isValidState(state) {
        return (
            typeof state.currentWeek === 'number' &&
            state.currentWeek >= 1 &&
            state.currentWeek <= 3 &&  // Updated to include Week 2
            typeof state.currentSlide === 'number' &&
            state.currentSlide >= 1 &&
            ['content', 'resources'].includes(state.currentTab)
        );
    }

    subscribe(listener) {
        this.listeners.add(listener);
        return () => this.listeners.delete(listener);
    }

    notifyListeners() {
        this.listeners.forEach(listener => listener(this.getState()));
    }

    loadState() {
        try {
            const saved = localStorage.getItem('workshopState');
            if (saved) {
                const parsed = JSON.parse(saved);
                if (this.isValidState(parsed)) {
                    this.state = parsed;
                    this.notifyListeners();
                }
            }
        } catch (error) {
            console.warn('Error loading state:', error);
        }
    }

    persistState() {
        try {
            localStorage.setItem('workshopState', JSON.stringify(this.state));
        } catch (error) {
            console.warn('Error saving state:', error);
        }
    }
}
