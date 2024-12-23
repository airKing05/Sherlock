import React from 'react'
import MemoryChart3 from './MemoryChart3'
import SupportCallsCharts from './SupportCallsCharts'

export default function ComboChats() {
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
              <MemoryChart3/>
              <MemoryChart3 />
        </div>
          <div
              style={{
                  display: 'flex',
              }}
          >
              <SupportCallsCharts/>
              <SupportCallsCharts />


          </div>
    </div>
  )
}
