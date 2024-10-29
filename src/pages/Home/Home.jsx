import React from 'react'
import ChecklistCard from './components/Cards/ChecklistCard'
import BasicCard from './components/Cards/BasicCard'
import CodeCard from './components/Cards/CodeCard'
import FlowDiagram from './components/FlowChart/FlowChart'
import BasicCardWithIcon from './components/Cards/BasicCardWithIcon'
import LineChart from './components/LineChart.js/LineChart'
import VerticalTimeLine from '../../Components/VerticalTimeLine/VerticalTimeLine'
import CustomTable from '../../Components/CustomTable/CustomTable'

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
            <VerticalTimeLine/>
            <br />
            <br />
            <CustomTable/>
        </div>
    )
}
