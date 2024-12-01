import { week1Content } from './js/weeks/week1.js';
import { createPlaceholderContent } from './js/weeks/placeholder.js';
import { stateManager } from './js/state/state.js';
import { UIManager } from './js/ui/UIManager.js';
import { EventHandler } from './js/events/EventHandler.js';

// Initialize week content
const weekContent = {
    1: week1Content,
    2: createPlaceholderContent(2),
    3: createPlaceholderContent(3),
    4: createPlaceholderContent(4),
    5: createPlaceholderContent(5),
    6: createPlaceholderContent(6),
    7: createPlaceholderContent(7),
    8: createPlaceholderContent(8)
};

// Initialize UI Manager
const uiManager = new UIManager(weekContent);

// Initialize Event Handler
const eventHandler = new EventHandler(stateManager, weekContent);

// Setup application
document.addEventListener('DOMContentLoaded', () => {
    try {
        // Subscribe UI updates to state changes
        stateManager.subscribe((state) => {
            uiManager.updateUI(state);
        });

        // Load saved state and initialize UI
        stateManager.loadState();

        // Setup event handlers
        eventHandler.init();

    } catch (error) {
        console.error('Error initializing application:', error);
        document.querySelector('.app-container').innerHTML = `
            <div class="error-message" role="alert">
                <h2>Unable to initialize application</h2>
                <p>Please refresh the page or contact support if the problem persists.</p>
            </div>
        `;
    }
});
