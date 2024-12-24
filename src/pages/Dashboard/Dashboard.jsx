import React, { useEffect, useState } from 'react';
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
import Select from 'react-select';
import usePopupToggle from '../../Hooks/usePopupToggle';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import CalenderIcon from '../../assets/svg/calender.svg';
import Button from '../../Common/Button/Button';
import useGetApiRequest from '../../Hooks/useGetApiRequest';
import { graphApis } from '../../apis/apis';
import HashLoaderComponent from '../../Common/Loader/HashLoaderComponent';


const options = [
    { label: "Last 5 min", value: 5 },
    { label: "Last 15 min", value: 15 },
    { label: "Last 30 min", value: 30 },
    { label: "Last 1 hr", value: 60 },
    { label: "Last 2 hr", value: 120 },
    { label: "Last 4 hr", value: 240 },
    { label: "Last 6 hr", value: 360 },
    { label: "Last 12 hr", value: 720 },
    { label: "Last 24 hr", value: 1440 },
    { label: "Last 2 days", value: 2880 },
];

const customStyles = {
    control: (base) => ({
        ...base,
        backgroundColor: "rgb(45, 44, 44)", // Slightly darker than the screen background
        borderColor: "#1e1e2f",
        color: "white",
        boxShadow: "none",
        "&:hover": {
            borderColor: "#1e1e2f",
        },
    }),
    menu: (base) => ({
        ...base,
        backgroundColor: "rgb(45, 44, 44)",
        color: "white",
        fontSize: '12px',
        maxHeight: "260px", // Set dropdown max height
        overflowY: "auto", // Enable scrolling if content exceeds height
       
    }),
    option: (base, { isFocused, isSelected }) => ({
        ...base,
        backgroundColor: isSelected
            ? "#1e1e2f"
            : isFocused
                ? "rgb(65, 65, 65)"
                : "rgb(45, 44, 44)",
        // color: isSelected ? "white" : "rgb(200, 200, 200)",
        color: 'white',
        "&:active": {
            backgroundColor: "rgb(90, 90, 90)",
        },
    }),
    singleValue: (base) => ({
        ...base,
        color: "white",
    }),
    placeholder: (base) => ({
        ...base,
        color: "rgb(150, 150, 150)",
    }),
    indicatorSeparator: (base) => ({
        ...base,
        backgroundColor: "#1e1e2f", // Change the vertical line color
    }),
    dropdownIndicator: (base) => ({
        ...base,
        color: "#1e1e2f", // Change the arrow color
        "&:hover": {
            color: "#1e1e2f",
        },
    }),
};


// chats data
const memoryCpuData = {
    answer_type: "graph",
    graph_type: "memory-cpu",
    answer: {
        title: 'Memory / CPU ',
        data: {
            xaxis: {
                name: "Time",
                data: ["16:50", "17:00", "17:10", "17:20", "17:30", "17:40", "17:50"]
            },
            yaxis: [
                {
                    name: "Memory",
                    type: "area",
                    data: [2, 3.5, 4, 3.2, 3.8, 2.9, 6],
                },
                {
                    name: "CPU",
                    type: "line",
                    data: [1.5, 2.1, 1.8, 2.7, 3.2, 3.8, 5.5],
                },
            ]
        }
    }
}
const loginData = {
    answer_type: "graph",
    graph_type: "login",
    answer: {
        title: 'Logins',
        data: {
            xaxis: {
                name: "Time",
                data: ["16:50", "17:00", "17:10", "17:20", "17:30", "17:40", "17:50"]
            },
            yaxis: [
                {
                    name: "login",
                    type: "area",
                    data: [60, 65, 55, 58, 70, 51, 72],
                },
                {
                    name: "logins(-1 hours)",
                    type: "area",
                    data: [30, 35, 25, 28, 40, 21, 42], // New data with increased variation
                },
            ]
        }
    }
}

const clintSidePageLoadData = {
    answer_type: "graph",
    graph_type: "page-load",
    answer: {
        title: 'Client side page load',
        data: {
            xaxis: {
                name: "Time",
                data: ["16:50", "17:00", "17:10", "17:20", "17:30", "17:40", "17:50"]
            },
            yaxis: [
                {
                    name: "Memory",
                    data: [60, 65, 55, 58, 70, 51, 72],
                },
                {
                    name: "Logins(-1 hour)",
                    data: [30, 35, 25, 28, 40, 21, 42],
                },
                {
                    name: "CPU Usage",
                    data: [20, 18, 23, 21, 30, 25, 15], // New data series 3
                },
                {
                    name: "Disk Usage",
                    data: [5, 10, 7, 8, 10, 6, 12], // New data series 4
                },
                {
                    name: "Network Traffic",
                    data: [15, 12, 18, 16, 22, 20, 18], // New data series 5
                },
            ]
        }
    }
}

const googleHitsData = {
    answer_type: "graph",
    graph_type: "google-hits",
    answer: {
        title: 'Google hits',
        data: {
            xaxis: {
                name: "Series",
                data: ['A-series', 'B-series', 'C-series', 'D-series', 'E-series']
            },
            yaxis: [
                {
                    name: 'Google hits',
                    data: [4, 27.7, 37.1, 66.5, 21.2], // Actual data values
                },
            ]
        }
    }
}

const supportCallsData = {
    answer_type: "graph",
    graph_type: "support-calls",
    answer: {
        title: 'Support calls',
        data: {
            xaxis: {
                name: "Series",
                data: ['A-series', 'B-series', 'C-series', 'D-series', 'E-series']
            },
            yaxis: [
                {
                    name: 'Value',
                    data: [30, 50, 35, 50, 49, 110, 70, 91, 350, 30, 90, 32, 50, 35, 59, 49, 130, 70, 91, 103, 30, 92],
                },
            ]
        }
    }
}
const memoryUsageData = {
    answer_type: "graph",
    graph_type: "memory-usage",
    answer: {
        title: 'Memory',
        value: 40,
        data: {
            xaxis: {},
            yaxis: []
        }
    }
}



const GraphComponentRenderer = (props) => {
    const { data } = props;
    console.log("data", data)
    switch (data?.graph_type) {
        case 'memory-cpu':
            return  <MemoryCpuChart data={data}/>
                                
        case 'logins':
            return <Logins data={data}/>
                               
        case 'clint-page-loading':
            return  <ClintSidePageLoadChart data={data}/>
                               
        case 'google-hits':
            return  <GoogleHits data={data}/>
                                
        case 'combo':
            return <ComboChats
                supportCallsData={data.graphs['support-calls']}
                memoryUsageData={data.graphs['memory-usage']}
                googleHitsData={data.graphs['google-hits']}
                signUpsData={data.graphs['sign-ups']}
            />
        case 'table':
            return <CustomTable2 data={data.answer.data} />
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

export default function Dashboard() {
    const [selectedTabs, setSelectedTabs] = useState({
        network: true, // Tab 1 is always selected
        graph: false,
        chat: false,
    });
    const [selectedOption, setSelectedOption] = useState(null);
    const [startDate, setStartDate] = useState(new Date());

    const { showPopup, setShowPopup, popupRef } = usePopupToggle();

    const { data: getData, loading: getLoading, error: getError } = useGetApiRequest(graphApis.getGraphs);


    const handleTabChange = (tab) => {
        if (tab === 'network') return; 
        setSelectedTabs((prev) => ({ ...prev, [tab]: !prev[tab] }));
    };


    return (
        <>
            <div className='dashboard__wrapper'>
                <header className='dashboard__header'>
                    <ul>
                        {/* <li
                        className={selectedView === 'all' ? 'active_dashboard_tab' : ''}
                        onClick={() => handleTabClick('all')}
                    >
                        <input type="checkbox" id="all" name="all" checked={selectedView === 'all'} />
                        <label for="all">All</label>
                    </li> */}

                        <li
                            // className={selectedView === 'graph' ? 'active_dashboard_tab' : ''}
                            onChange={() => handleTabChange("graph")}
                        >
                            <input type="checkbox" id="graph" name="graph"
                                checked={selectedTabs.graph} />
                            <label for="graph"> Graph</label>
                        </li>
                        <li
                            // className={selectedView === 'network' ? 'active_dashboard_tab' : ''}
                            onChange={() => handleTabChange("network")}
                        >
                            <input type="checkbox" id="network" name="network"
                                checked={selectedTabs.network} />
                            <label for="network"> Network</label>
                        </li>
                        <li
                            // className={selectedView === 'chat' ? 'active_dashboard_tab' : ''}
                            onChange={() => handleTabChange("chat")}
                        >
                            <input type="checkbox" id="chat" name="chat"
                                checked={selectedTabs.chat} />
                            <label for="chat"> Chat</label>
                        </li>

                    </ul>
                    <div className='dashboard__timeSelection'>
                        <button
        onClick={() => setShowPopup(true)}
        >
            Select Time
        </button>
                       
                    </div>
                </header>

                {
                    <div className='dashboard__horizontal'>
                        {
                            selectedTabs.graph && <section className='dashboard__leftSection'>
                                {
                                    getData?.data?.map((_graph, index) => {
                                        if (_graph) {
                                            return <React.Fragment key={index}>
                                                    <GraphComponentRenderer data={_graph} />
                                            </React.Fragment>
                                        }
                                    })
                                }
                                {
                                    getLoading && <HashLoaderComponent loading={getLoading} />
                                }
                            </section>
                        }
                        {
                            selectedTabs.network && <section className='dashboard__centerSection'>
                                <TreeNetworkDiagram />
                            </section>
                        }
                        {
                            selectedTabs.chat && <section className='dashboard__rightSection'>
                                <Chats />
                            </section>
                        }

                    </div>
                }

            </div>

            {
                showPopup && (
                    <div
                        ref={popupRef}
                        style={{
                            position: "absolute",
                            top: 50,
                            right: 20,
                        }}
                        className="timePopup__wrapper"
                    >
                        <div className='row timePopup__main_section'>
                            <div className='col-7 timePopup__left_wrapper'>
                                <h6>Absolute time range</h6>
                                <div className='datePicker' style={{ marginBottom: '30px' }}>
                                    <label>From</label>
                                    <DatePicker
                                        showIcon
                                        toggleCalendarOnIconClick
                                        selected={startDate}
                                        onChange={(date) => setStartDate(date)}
                                        icon={<img src={CalenderIcon} className="calendar-icon" alt='icon' />}
                                        popperPlacement="left-start"
                                    // popperModifiers={[
                                    //     {
                                    //         name: "preventOverflow",
                                    //         options: {
                                    //             boundary: "viewport", // Ensures the popup doesn't overflow the viewport
                                    //         },
                                    //     },
                                    // ]}
                                    />
                                </div>
                                <div className='datePicker'>
                                    <label>To</label>
                                    <DatePicker
                                        showIcon
                                        toggleCalendarOnIconClick
                                        selected={startDate}
                                        onChange={(date) => setStartDate(date)}
                                        icon={<img src={CalenderIcon} className="calendar-icon" alt='icon' />}
                                        popperPlacement="left-start"
                                    />
                                </div>

                                <div className='timePopup__left_wrapper__recent_time'>
                                    <h6>Recently use absolute time ranges</h6>
                                    <ul>
                                        <li>Wed Dec 11 2024 10:31:56 GMT+0530 To Wed Dec 12 2024 10:31:56 GMT+0530</li>
                                        <li>Wed Dec 11 2024 10:31:56 GMT+0530 To Wed Dec 12 2024 10:31:56 GMT+0530</li>
                                    </ul>
                                </div>
                            </div>
                            <div className='col-5 timeSelector'>
                                <Select
                                    defaultValue={selectedOption}
                                    styles={customStyles}
                                    onChange={setSelectedOption}
                                    options={options}
                                />
                            </div>
                        </div>
                        <div className='timePopup__footer_section row'>
                            <div className='col'>
                                <label>Browser Time</label>
                                &nbsp;
                                &nbsp;
                                <span>IST</span>
                            </div>
                            <div className='col timePopup__footer_section__right'>
                                <span>UTC+05:30</span>
                                &nbsp;
                                &nbsp;
                                <button>
                                    Change time setting
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
      
    )
}




