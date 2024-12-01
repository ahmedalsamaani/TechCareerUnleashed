// Resource type to Font Awesome icon mapping
const iconMap = {
    article: 'fa-file-alt',
    book: 'fa-book',
    template: 'fa-file-code',
    framework: 'fa-project-diagram',
    course: 'fa-graduation-cap',
    blog: 'fa-rss'
};

/**
 * Get the appropriate Font Awesome icon class for a resource type
 * @param {string} type - The type of resource
 * @returns {string} The corresponding Font Awesome icon class
 */
export function getResourceIcon(type) {
    return iconMap[type] || 'fa-file';
}
