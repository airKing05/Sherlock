import React, { useEffect, useState } from 'react'
import FlowChart from './components/FlowChart/FlowChart'
// import BasicCardWithIcon from './components/Cards/BasicCardWithIcon'
import LineChart from '../../Components/Charts/LineChart.js/LineChart'
import CustomTable from '../../Components/CustomTable/CustomTable'
// import HorizontalTimeLine from '../../Components/HorizontalTimeLine/HorizontalTimeLine'
import HorizontalTimeline2 from '../../Components/HorizontalTimeLine/HorizontalTimeline2'
import usePostApiRequest from '../../Hooks/usePostApiRequest'
import serviceApis from '../../apis/apis';
import CardLayout from '../../Layouts/CardLayout/CardLayout'
import ChecklistCard from '../../Components/Cards/ChecklistCard'
import BasicCard from '../../Components/Cards/BasicCard'
import CodeCard from '../../Components/Cards/CodeCard'


const HomeComponentRenderer = (props) => {
    const { data } = props;
    switch (data?.answer_type) {
        case 'checklist':
            return <CardLayout title={data?.answer.title}>
                <ChecklistCard data={data.answer.data} />
            </CardLayout>
        case 'summary':
            return <CardLayout title={data?.answer.title}>
                <BasicCard data={data.answer.data} />
            </CardLayout>
        case 'code':
            return <CardLayout title={data?.answer.title}>
                <CodeCard data={data.answer.data} />
            </CardLayout> 
        case 'graph':
            return <CardLayout title={data?.answer.title}>
                <LineChart data={data.answer.data} />
            </CardLayout> 
        case 'timeline':
            return <HorizontalTimeline2 data={data} />
        case 'table':
            return <CustomTable data={data.answer.data} />
        case 'network':
            return <CardLayout title={data?.answer.title}>
                <FlowChart data={data.answer.data} />
            </CardLayout>
        default:
            break;
    }
    // return (
    //     <>
    //         <ChecklistCard />
    //             <br />
    //             <br />
    //             <BasicCard />
    //             <br />
    //             <br />
    //             <CodeCard />
    //             <br />
    //             <br />
    //             <FlowChart />
    //             <br />
    //             <br />
    //    <BasicCardWithIcon />
    //             <br />
    //             <br />
    //             <LineChart />
    //             <br />
    //             <br />
    //             <br />
    //             <br />
    //             <HorizontalTimeline2/>
    //             <br />
    //             <br />
    //             <CustomTable/>
    //     </>
    // )
}

export default function Home() {
    const [cards, setCards] = useState([]);
    const { executePost, loading: postLoading, error: postError, data } = usePostApiRequest(serviceApis.createService);

    const handleSubmit = (payload) => {
        executePost(payload)
            .then((resp) => {
                setCards((prevCard) => [...prevCard, resp])
            })
            .catch((err) => console.log("error", err))
    };

    useEffect(() => {
        const payloads = [
            {
                question: 'service status',
            },
            {
                question: 'summary',
            },
            {
                question: 'code',
            },
            {
                question: 'graph',
            },
            {
                question: 'timeline',
            },
            {
                question: 'table',
            },
            {
                question: 'network',
            }
        ];

        if (!cards.length){
            for (const _payload of payloads) {
                handleSubmit(_payload);
            }
        }

    }, [cards.length])

    

    console.log("cards", cards)


    return (
        <div>
            {
                cards?.map((_card, index) => {
                    if (_card){
                        return <React.Fragment key={index}>
                            <HomeComponentRenderer data={_card} />
                            <br />
                            <br />
                        </React.Fragment> 
                    }
                } )
            }

        </div>
    )
}
