import React, { useEffect, useState } from 'react'
import FlowChart from './components/FlowChart/FlowChart'
// import BasicCardWithIcon from './components/Cards/BasicCardWithIcon'
import LineChart from '../../Components/Charts/LineChart.js/LineChart'
import CustomTable from '../../Components/CustomTable/CustomTable'
import HorizontalTimeline2 from '../../Components/HorizontalTimeLine/HorizontalTimeline2'
import usePostApiRequest from '../../Hooks/usePostApiRequest'
import serviceApis from '../../apis/apis';
import CardLayout from '../../Layouts/CardLayout/CardLayout'
import ChecklistCard from '../../Components/Cards/ChecklistCard'
import BasicCard from '../../Components/Cards/BasicCard'
import CodeCard from '../../Components/Cards/CodeCard'
import useGetApiRequest from '../../Hooks/useGetApiRequest'
import HashLoaderComponent from '../../Common/Loader/HashLoaderComponent'
import CustomTable2 from '../../Components/CustomTable/CustomTable2'
import TreeDiagram1 from './components/TreeDiagram/TreeDiagram1'
import TreeDiagram2 from './components/TreeDiagram/TreeDigram2'
import TreeDiagram3 from './components/TreeDiagram/TreeDiagram3'


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
            return <CustomTable2 data={data.answer.data}/>
        case 'network':
            return <CardLayout title={data?.answer.title}>
                <FlowChart data={data.answer.data} />
            </CardLayout>
        case 'tree':
            return <CardLayout title={data?.answer.title}>
                <TreeDiagram3 data={data.answer.data} />
            </CardLayout>
        default:
            break;
    }
}

export default function Home() {
    const [cards, setCards] = useState([]);
    // const { executePost, loading: postLoading, error: postError} = usePostApiRequest(serviceApis.createService);
    const { data: getData, loading: getLoading, error: getError } = useGetApiRequest(serviceApis.getService)

    // console.log("getData", getData, getLoading, getError)
    // const handleSubmit = (payload) => {
    //     executePost(payload)
    //         .then((resp) => {
    //             setCards((prevCard) => [...prevCard, resp])
    //         })
    //         .catch((err) => console.log("error", err))
    // };

    // useEffect(() => {
    //     const payloads = [
    //         {
    //             question: 'service status',
    //         },
    //         {
    //             question: 'summary',
    //         },
    //         {
    //             question: 'code',
    //         },
    //         {
    //             question: 'graph',
    //         },
    //         {
    //             question: 'timeline',
    //         },
    //         {
    //             question: 'table',
    //         },
    //         {
    //             question: 'network',
    //         }
    //     ];

    //     if (!cards.length){
    //         for (const _payload of payloads) {
    //             handleSubmit(_payload);
    //         }
    //     }

    // }, [cards.length])


    

   

    if (getLoading){
        return <HashLoaderComponent loading={getLoading} />
    }

    return (
        <div>
            {
                getData?.data?.map((_card, index) => {
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
