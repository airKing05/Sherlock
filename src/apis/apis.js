export const serviceStatus = () => {
    return [
        {
            title: 'APPLICATION HEALTH',
            status: 'ISSUE FOUNDED',
            summary: 'Significant slowdown during pick hours.'
        },
        {
            title: 'DOWNSTREAM SERVICE',
            status: 'ALL GOOD',
            summary: 'All service performing with in normal parameters.'
        },
        {
            title: 'INFRASTRUCTURE',
            status: 'ISSUE FOUNDED',
            summary: 'CPU saturation due to high traffic volume.'
        },
        {
            title: 'CONFIGURATION',
            status: 'ISSUE FOUNDED',
            summary: 'Suboptimal load balancer setting uneven service load.'
        }
    ]
}
