const iconMap = {
    article: 'fa-file-alt',
    research: 'fa-microscope',
    guide: 'fa-compass',
    book: 'fa-book',
    video: 'fa-video',
    course: 'fa-graduation-cap'
};

/**
 * Get the appropriate Font Awesome icon class for a resource type
 * @param {string} type - The type of resource
 * @returns {string} The corresponding Font Awesome icon class
 */
export function getResourceIcon(type) {
    return iconMap[type] || 'fa-file';
}
