import axiosService from './axiosService';
import endpoints from './endPoints';

export const serviceStatus = () => {
    const customResponse = {
        status: 200,
        message: 'success',
        data: {
            answer_type: "checklist",
            answer: {
                title: "What we've checked",
                data: [
                    {
                        title: 'APPLICATION HEALTH',
                        status: 'ISSUE FOUNDED',
                        color: 'red',
                        summary: 'Significant slowdown during pick hours.',
                        details: {
                            widgetType : 'LIST',
                            content: [
                                'The Unicode and HTML Entities But to use',
                                'this Unicode correctly,',
                                'remove the U+ and replace it with ampersand',
                                'and x. Then type the 2022 number in, and then add a semi-colon'
                            ]
                        }
                    },
                    {
                        title: 'DOWNSTREAM SERVICE',
                        status: 'ALL GOOD',
                        color: 'green',
                        summary: 'All service performing with in normal parameters.',
                        details: {
                            widgetType: 'TEXT',
                            content: 'The Unicode and HTML Entities But to use this Unicode correctly, remove the U+ and replace it with ampersand (&), pound sign (#), and x. Then type the 2022 number in, and then add a semi-colon. So, it becomes •.'
                        }

                    },
                    {
                        title: 'INFRASTRUCTURE',
                        status: 'ISSUE FOUNDED',
                        color: 'red',
                        summary: 'CPU saturation due to high traffic volume.',
                        details: {
                            widgetType: 'CODE',
                            content: `for(let i = 0; i<=5; i++){
                                      console.log(i)
                                     }`
                        }
                    },
                    {
                        title: 'CONFIGURATION',
                        status: 'ISSUE FOUNDED',
                        color: 'red',
                        summary: 'Suboptimal load balancer setting uneven service load.',
                        details: {
                            widgetType: 'HTML',
                            content: `<section>
  <h2>Section Title</h2>
  <p>Section content goes here...</p>
</section>`
                        }
                    },
                    {
                        title: 'INFRASTRUCTURE',
                        status: 'ISSUE FOUNDED',
                        color: 'red',
                        summary: 'CPU saturation due to high traffic volume.',
                        details: {
                            widgetType: 'IMAGE',
                            content: `https://cdn.pixabay.com/photo/2014/10/05/19/02/binary-code-475664_1280.jpg`
                        }
                    },
                ]
            }
        }

    }

    return customResponse;
}

export const serviceSummary = () => {
    const customResponse = {
        status: 200,
        message: 'success',
        data: {
            answer_type: "summary",
            answer: {
                title: 'Suggested Reminder',
                description: "<b> The Unicode and HTML Entities</b> But to use this Unicode correctly, remove the U+ and replace it with ampersand(&), pound sign(#), and x.Then type the 2022 number in, and then add a semi - colon.So, it becomes & #x2022;."
            }
        }

    }
    return customResponse;
}

export const serviceCode = () => {
    const customResponse = {
        status: 200,
        message: 'success',
        data: {
            answer_type: "code",
            answer: {
                title: 'Code Support',
                code: `for(let i = 0; i<=5; i++){
                         console.log(i)
                       }`
            }
        }

    }
    return customResponse;
}

export const serviceGraph = () => {
    const customResponse = {
        status: 200,
        message: 'success',
        data: {
            answer_type: "graph",
            answer: {
                title: 'Line chart',
                data: [
                    { date: "2024-01-01", value: 10 },
                    { date: "2024-01-02", value: 13 },
                    { date: "2024-01-03", value: 13 },
                    { date: "2024-01-04", value: 49 },
                    { date: "2024-01-05", value: 19 },
                    { date: "2024-01-06", value: 29 },
                    { date: "2024-01-07", value: 31 },
                    { date: "2024-01-08", value: 46 },
                    { date: "2024-01-09", value: 33 },
                    { date: "2024-01-10", value: 16 },
                    { date: "2024-01-11", value: 34 },
                    { date: "2024-01-12", value: 34 },
                    { date: "2024-01-13", value: 22 },
                    { date: "2024-01-14", value: 11 },
                    { date: "2024-01-15", value: 48 },
                    { date: "2024-01-16", value: 49 },
                    { date: "2024-01-17", value: 33 },
                    { date: "2024-01-18", value: 34 },
                    { date: "2024-01-19", value: 27 },
                    { date: "2024-01-20", value: 47 },
                    { date: "2024-01-21", value: 35 },
                    { date: "2024-01-22", value: 23 },
                    { date: "2024-01-23", value: 18 },
                    { date: "2024-01-24", value: 19 },
                    { date: "2024-01-25", value: 30 },
                    { date: "2024-01-26", value: 26 },
                    { date: "2024-01-27", value: 15 },
                    { date: "2024-01-28", value: 25 },
                    { date: "2024-01-29", value: 10 },
                    { date: "2024-01-30", value: 28 }
                ]
                
            }
        }

    }
    return customResponse;
}

export const serviceTimeline = () => {
    const customResponse = {
        status: 200,
        message: 'success',
        data: {
            answer_type: "timeline",
            answer: {
                data: [
                    {
                        time: "4 pm",
                        description: "Tommy Smyth seen at Willowpoint Public Library, 175 miles from Graslin",
                        iconType: "react",
                        // highlight: false,
                        position: "top",
                        eventTime: '4:30',
                        details: {
                            widgetType: 'HTML',
                            title: 'React development',
                            content: `<section>
  <h4>Create react portal</h4>
  <p>To see the full details about time event on any other continent</p>
</section>`
                        }
                    },
                    {
                        time: "6:05 pm",
                        description: "Smyth and Porton take cell phone picture at Pickering Dairy Queen, 200 miles from Graslin",
                        iconType: "scss",
                        highlight: false,
                        position: "top",
                        eventTime: '6:15',
                        details: {
                            title: 'Scss library for css',
                            widgetType: 'TEXT',
                            content: 'Before you can use Sass, you need to set it up on your project. If you want to just browse here, go ahead, but we recommend you go install Sass first'
                        }
                    },
                    {
                        time: "7:29 pm",
                        description: "Emanuel Spizer checks into Desert Motel in Graslin",
                        iconType: "node",
                        highlight: true,
                        position: "bottom",
                        eventTime: '8:15',
                        moreDetails: "Smyth and Porton take cell phone picture at Pickering Dairy Queen, 200 miles from Graslin",
                    },
                    {
                        time: "8:22 pm",
                        description: "Guest in next door room reports shouting",
                        iconType: "express",
                        highlight: false,
                        position: "bottom",
                        eventTime: '8:30',
                        details: {
                            title: 'Express setup to chats',
                            widgetType: 'CODE',
                            content: `for(let i = 0; i<=5; i++){
                                      console.log(i)
                                     }`
                        }
                    },
                    {
                        time: "9:30 pm - 10:30 pm",
                        description: "Time of assault",
                        iconType: "database",
                        highlight: true,
                        position: "top",
                        eventTime: '10:00',
                        details: {
                            title: 'MongoDB Atlas connection',
                            widgetType: 'TEXT',
                            content: 'Up to 32% higher throughput, improved horizontal scaling, expanded queryable encryption capabilities, and more.'
                        }
                    },
                    {
                        time: "12:20 am",
                        description: "Smyth receives a speeding ticket 20 miles south of Pickering",
                        iconType: "kubernetes",
                        highlight: false,
                        position: "top",
                        eventTime: '12:30',
                        details: {
                            title: 'Kubernetes used instead of Docker',
                            widgetType: 'IMAGE',
                            content: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0HoWq-QIBCxGG7fEPcjM5dPu9iIfQiCr2Ug&s`
                        }
                    },
                    {
                        time: "01:30 am - 4:00 am",
                        description: "Motel guest in neighboring room hears no disturbances the rest of the night",
                        iconType: "git",
                        highlight: false,
                        position: "bottom",
                        eventTime: '02:07',
                        details: {
                            title: 'Git to GitHub',
                            widgetType: 'LIST',
                            content: [
                                'store, share, and work together with others to write code',
                                'open issues, comment on pull requests, and manage projects',
                                'different people and teams use GitHub for different projects',
                                "Github is an essential part of any aspiring web developer's journey to employment"
                            ]
                        }
                    },
                ]

            }
        }

    }
    return customResponse;
}

export const serviceTable = () => {
    const customResponse = {
        status: 200,
        message: 'success',
        data: {
            answer_type: "table",
            answer: {
                data: [
                    {
                        "id": 1,
                        "name": "Leanne Graham",
                        "username": "Bret",
                        "email": "Sincere@april.biz",
                        // "address": {
                        //     "street": "Kulas Light",
                        //     "suite": "Apt. 556",
                        //     "city": "Gwenborough",
                        //     "zipcode": "92998-3874",
                        // },
                        "phone": "1-770-736-8031",
                        "website": "hildegard.org",
                        "company": {
                            "name": "Romaguera-Crona",
                            "catchPhrase": "Multi-layered client-server neural-net",
                            "bs": "harness real-time e-markets"
                        }
                    },
                    {
                        "id": 2,
                        "name": "Ervin Howell",
                        "username": "Antonette",
                        "email": "Shanna@melissa.tv",
                        // "address": {
                        //     "street": "Victor Plains",
                        //     "suite": "Suite 879",
                        //     "city": "Wisokyburgh",
                        //     "zipcode": "90566-7771",
                        // },
                        "phone": "010-692-6593",
                        "website": "anastasia.net",
                        "company": {
                            "name": "Deckow-Crist",
                            "catchPhrase": "Proactive didactic contingency",
                            "bs": "synergize scalable supply-chains"
                        }
                    },
                    {
                        "id": 3,
                        "name": "Clementine Bauch",
                        "username": "Samantha",
                        "email": "Nathan@yesenia.net",
                        // "address": {
                        //     "street": "Douglas Extension",
                        //     "suite": "Suite 847",
                        //     "city": "McKenziehaven",
                        //     "zipcode": "59590-4157",
                        // },
                        "phone": "1-463-1234447",
                        "website": "ramiro.info",
                        "company": {
                            "name": "Romaguera-Jacobson",
                            "catchPhrase": "Face to face bifurcated interface",
                            "bs": "e-enable strategic applications"
                        }
                    },
                ]

            }
        }

    }
    return customResponse;
}

export const serviceNetwork = () => {
    const customResponse = {
        status: 200,
        message: 'success',
        data: {
            answer_type: "network",
            answer: {
                title: 'Network Flow',
                data: {
                    edges: [
                        {
                            id: 'e1-2',
                            source: '1',
                            target: '2',
                            type: 'bezier',
                            style: { stroke: '#AD60CC', strokeWidth: 3 },
                            label: 'DynamoDB - Table',
                            labelStyle: { fill: '#E099EB', fontWeight: 'bold', fontSize: '12px' },
                        },
                        {
                            id: 'e2-3',
                            source: '2',
                            target: '3',
                            type: 'bezier',
                            style: { stroke: '#E0E0E0', strokeWidth: 3 },
                            label: 'Table - Cluster',
                            labelStyle: { fill: '#E099EB', fontWeight: 'bold', fontSize: '12px' },
                        },
                        {
                            id: 'e2-4',
                            source: '2',
                            target: '4',
                            type: 'bezier',
                            animated: true,
                            style: { stroke: '#E0E0E0', strokeWidth: 3 },
                            label: 'Table - Rds',
                            labelStyle: { fill: '#E099EB', fontWeight: 'bold', fontSize: '12px' },
                        },
                        {
                            id: 'e2-5',
                            source: '2',
                            target: '5',
                            type: 'bezier',
                            animated: true,
                            style: { stroke: '#E0E0E0', strokeWidth: 3 },
                            label: 'Table - Aurora',
                            labelStyle: { fill: '#E099EB', fontWeight: 'bold', fontSize: '12px' },
                        },
                    ],
                    nodes: [
                        {
                            id: '1',
                            position: { x: 150, y: 150 },
                            data: { background: '#6A0DAD', source: 'right', target: 'right', iconType: 'dynamoDb', },
                            type: 'customNode',
                        },
                        {
                            id: '2',
                            position: { x: 350, y: 150 },
                            data: { background: '#AD60CC', source: 'right', target: 'left', iconType: 'dynamoDb-table', },
                            type: 'customNode',
                        },
                        {
                            id: '3',
                            position: { x: 550, y: 250 },
                            data: { background: '#E099EB', source: 'left', target: 'left', iconType: 'aurora', },
                            type: 'customNode',
                        },
                        {
                            id: '4',
                            position: { x: 550, y: 150 },
                            data: { background: '#E099EB', source: 'left', target: 'left', iconType: 'rds', },
                            type: 'customNode',
                        },
                        {
                            id: '5',
                            position: { x: 550, y: 50 },
                            data: { background: '#E099EB', source: 'left', target: 'left', iconType: 'cluster', },
                            type: 'customNode',
                        },

                    ]
                }

            }
        }

    }
    return customResponse;
}



const URL = 'https://jsonplaceholder.typicode.com/todos';
const getURL = 'http://jsonblob.com/1309018725575483392';
const expressServerURL = 'http://localhost:3001/';
//endpoints.SERVICE
const serviceApis = {
    getService: () => axiosService.get(endpoints.SERVICE),
    createService: (data) => axiosService.post(URL, data),
};

export default serviceApis;