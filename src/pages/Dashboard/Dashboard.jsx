import React, { useState } from 'react';
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
import Chats from '../Chats/Chats';

export default function Dashboard() {
    const [selectedView, setSelectedView] = useState('all');
    return (
        <div className='dashboard__wrapper'>
            <header className='dashboard__header'>
                <ul>
                    <li 
                    className={selectedView === 'only-network' ? 'active_dashboard_tab' : ''}
                    onClick={() => setSelectedView('only-network')}
                    >
                        <span>Only Network</span>
                    </li>
                    <li 
                        className={selectedView === 'graph-network' ? 'active_dashboard_tab' : ''}
                    onClick={() => setSelectedView('graph-network')}
                    >
                        <span>Graph & Network</span>
                    </li>
                    <li
                        className={selectedView === 'network-chat' ? 'active_dashboard_tab' : ''}
                        onClick={() => setSelectedView('network-chat')}
                    >
                        <span>Network & Chat</span>
                    </li>
                    <li
                        className={selectedView === 'all' ? 'active_dashboard_tab' : ''}
                        onClick={() => setSelectedView('all')}
                    >
                        <span>All</span>
                    </li>
                </ul>
            </header>
            {
                selectedView === 'all' ? <div className='dashboard__horizontal'>
                    <section className='dashboard__leftSection'>
                        <MemoryCpuChart />
                        <Logins />
                        <ClintSidePageLoadChart />
                        <GoogleHits />
                        {/* <MemoryChart/> */}
                        {/* <MemoryChat2/> */}
                        <ComboChats />
                    </section>
                    <section className='dashboard__centerSection'>
                        <TreeNetworkDiagram />
                    </section>
                    <section className='dashboard__rightSection'>
                        <Chats />
                    </section>
                </div> : null
            }
            {
                selectedView === 'only-network' ? <div className='dashboard__horizontal only_network'>
                    <section className='dashboard__centerSection'>
                        <TreeNetworkDiagram />
                    </section>
                </div> : null
            }
            {
                selectedView === 'graph-network' ? <div className='dashboard__horizontal graph_network'>
                    <section className='dashboard__leftSection'>
                        <MemoryCpuChart />
                        <Logins />
                        <ClintSidePageLoadChart />
                        <GoogleHits />
                        {/* <MemoryChart/> */}
                        {/* <MemoryChat2/> */}
                        <ComboChats />
                    </section>
                    <section className='dashboard__centerSection'>
                        <TreeNetworkDiagram />
                    </section>
                </div> : null
            }
            {
                selectedView === 'network-chat' ? <div className='dashboard__horizontal network-chat'>
                    <section className='dashboard__centerSection'>
                        <TreeNetworkDiagram />
                    </section>
                    <section className='dashboard__rightSection'>
                        <Chats />
                    </section>
                </div> : null
            }

        </div>
    )
}
