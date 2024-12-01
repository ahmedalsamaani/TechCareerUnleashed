// Initial state
const initialState = {
    currentWeek: 1,
    currentSlide: 1,
    currentTab: 'content'
};

// State validation rules
const stateValidation = {
    currentWeek: (week) => typeof week === 'number' && week >= 1 && week <= 8,
    currentSlide: (slide) => typeof slide === 'number' && slide >= 1,
    currentTab: (tab) => ['content', 'resources'].includes(tab)
};

class StateManager {
    constructor() {
        this.state = { ...initialState };
        this.listeners = new Set();
    }

    // Get current state
    getState() {
        return { ...this.state };
    }

    // Update state with validation
    setState(newState) {
        const validatedState = {};
        let hasChanges = false;

        // Validate each state property
        Object.entries(newState).forEach(([key, value]) => {
            if (key in stateValidation && stateValidation[key](value)) {
                if (this.state[key] !== value) {
                    validatedState[key] = value;
                    hasChanges = true;
                }
            } else {
                console.warn(`Invalid state value for ${key}:`, value);
            }
        });

        // Only update if there are valid changes
        if (hasChanges) {
            this.state = {
                ...this.state,
                ...validatedState
            };
            this.notifyListeners();
            this.persistState();
        }
    }

    // Subscribe to state changes
    subscribe(listener) {
        this.listeners.add(listener);
        return () => this.listeners.delete(listener);
    }

    // Notify all listeners of state change
    notifyListeners() {
        this.listeners.forEach(listener => listener(this.state));
    }

    // Load state from localStorage
    loadState() {
        try {
            const savedState = localStorage.getItem('workshopState');
            if (savedState) {
                const parsed = JSON.parse(savedState);
                // Validate each property before applying
                Object.entries(parsed).forEach(([key, value]) => {
                    if (stateValidation[key]?.(value)) {
                        this.state[key] = value;
                    }
                });
            }
        } catch (error) {
            console.warn('Error loading state:', error);
        }
        this.notifyListeners();
    }

    // Persist state to localStorage
    persistState() {
        try {
            localStorage.setItem('workshopState', JSON.stringify(this.state));
        } catch (error) {
            console.warn('Error saving state:', error);
            if (error.name === 'QuotaExceededError') {
                console.warn('Storage quota exceeded. Some data may not be saved.');
            }
        }
    }
}

export const stateManager = new StateManager();
