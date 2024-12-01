export const createPlaceholderContent = (weekNumber) => ({
    title: `Week ${weekNumber} Content`,
    slides: [
        {
            title: "Coming Soon",
            subtitle: `Week ${weekNumber} Content`,
            content: `
                <div class="coming-soon">
                    <h3>This week's content is under development</h3>
                    <p>Check back later for:</p>
                    <ul>
                        <li>Detailed workshop materials</li>
                        <li>Interactive exercises</li>
                        <li>Practical examples</li>
                        <li>Resources and references</li>
                    </ul>
                </div>
            `
        }
    ],
    resources: {
        recommended: [
            {
                title: "Coming Soon",
                description: "Recommended readings will be available when this week's content is released",
                type: "article",
                link: "#"
            }
        ],
        practice: [
            {
                title: "Coming Soon",
                description: "Practice materials will be available when this week's content is released",
                type: "template",
                link: "#"
            }
        ],
        additional: [
            {
                title: "Coming Soon",
                description: "Additional resources will be available when this week's content is released",
                type: "course",
                link: "#"
            }
        ]
    }
});
