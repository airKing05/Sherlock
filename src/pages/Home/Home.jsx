import React from 'react'
import ChecklistCard from './components/Cards/ChecklistCard'
import BasicCard from './components/Cards/BasicCard'
import CodeCard from './components/Cards/CodeCard'
import FlowDiagram from './components/FlowChart/FlowChart'
import BasicCardWithIcon from './components/Cards/BasicCardWithIcon'
import LineChart from './components/LineChart.js/LineChart'
import CustomTable from '../../Components/CustomTable/CustomTable'
// import HorizontalTimeLine from '../../Components/HorizontalTimeLine/HorizontalTimeLine'
import HorizontalTimeline2 from '../../Components/HorizontalTimeLine/HorizontalTimeline2'

export default function Home() {
    return (
        <div>
            <ChecklistCard />
            <br />
            <br />
            <BasicCard />
            <br />
            <br />
            <CodeCard />
            <br />
            <br />
            <FlowDiagram />
            <br />
            <br />
            <BasicCardWithIcon />
            <br />
            <br />
            <LineChart />
            <br />
            <br />
            <br />
            <br />
            {/* <VerticalTimeLine/> */}
            {/* <HorizontalTimeLine/> */}
            <HorizontalTimeline2/>
            <br />
            <br />
            <CustomTable/>
        </div>
    )
}
