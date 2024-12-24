import React from 'react'
import MemoryChart3 from './MemoryChart3'
import SupportCallsCharts from './SupportCallsCharts'

export default function ComboChats({ supportCallsData, memoryUsageData, googleHitsData, signUpsData }) {
    return (
        <div
            style={{
                // width: '350px'
            }}
        >
            <div
                style={{
                    display: 'flex',
                }}
            >
                <MemoryChart3 data={memoryUsageData} />
                <MemoryChart3 data={googleHitsData} />
            </div>
            <div
                style={{
                    display: 'flex',
                }}
            >
                <SupportCallsCharts data={supportCallsData} />
                <SupportCallsCharts data={signUpsData} />
            </div>
        </div>
    )
}
