import React from 'react';
import './Dashboard.scss';
import MemoryCpuChart from './components/Charts/MemoryCpuChart';
import Logins from './components/Charts/Logins';
import ClintSidePageLoadChart from './components/Charts/ClintSidePageLoadChart';
import GoogleHits from './components/Charts/GoogleHits';
import MemoryChart from './components/Charts/MemoryChart';
import MemoryChat2 from './components/Charts/MemoryChat2';
import MemoryChart3 from './components/Charts/MemoryChart3';
import ComboChats from './components/Charts/ComboChats';
import SupportCallsCharts from './components/Charts/SupportCallsCharts';
import TreeNetworkDiagram from '../Home/components/TreeDiagram/TreeNetworkDiagram';

export default function Dashboard() {
    return (
        <div className='dashboard__wrapper'>
            <div className='dashboard__horizontal'>
                <section className='dashboard__leftSection'>
                   
                    <MemoryCpuChart/>
                    <Logins />
                    <ClintSidePageLoadChart/>
                    <GoogleHits/>
                    {/* <MemoryChart/> */}
                    {/* <MemoryChat2/> */}
                    <ComboChats />
                </section>
                <section className='dashboard__centerSection'>
                    <TreeNetworkDiagram/>
                </section>
                <section className='dashboard__rightSection'>right</section>
            </div>
        </div>
    )
}
