import React from 'react';
import GaugeComponent from 'react-gauge-component';
import './Charts.scss'




export default function MemoryChart3({data}) {
    const { title, value } = data.answer;

    return (

        <div
            className='custom_memory'
            style={{
                paddingBottom: "2px",
                background: "#1e1e2f",
                borderRadius: "2px",
                margin: '10px',
                textAlign: 'center',
                width: '176px',  // Adjust outer width
                height: '100px'  // Adjust outer height
            }}>
            <h6 style={{ color: "#fff", width: '100%' }}>{title}</h6>
            <GaugeComponent
                className="sherlock-gauge"
                arc={{
                    width: .30,
                }}
                value={value}
                //   type="grafana"
                labels={{
                    valueLabel: {
                        fontSize: '12px'
                    }
                }}
                style={{
                    width: '100%',
                    height: '100%'
                }}
            />
        </div>
    )
}
