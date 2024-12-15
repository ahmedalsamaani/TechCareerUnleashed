import { week1Content } from './js/weeks/week1.js';
import { week2Content } from './js/weeks/week2.js';  
import { UIManager } from './js/ui/UIManager.js';
import { StateManager } from './js/state/state.js';
import { EventHandler } from './js/events/EventHandler.js';

// Initialize managers
const stateManager = new StateManager();
const uiManager = new UIManager();
const eventHandler = new EventHandler(stateManager, uiManager);

// Initialize content
const weekContent = {
    1: week1Content,
    2: week2Content,
    // Other weeks will be added later
};

// Start the app
document.addEventListener('DOMContentLoaded', () => {
    // Initialize UI with content
    uiManager.init(weekContent);
    
    // Set up event handling
    eventHandler.init();
    
    // Load saved state if any
    stateManager.loadState();
    
    // Initial render
    uiManager.updateUI(stateManager.getState());
    
    // Subscribe to state changes
    stateManager.subscribe((state) => {
        uiManager.updateUI(state);
    });
});
