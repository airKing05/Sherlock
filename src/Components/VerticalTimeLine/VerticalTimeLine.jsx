import React from 'react';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import TimelineIcon from '../../assets/svg/timelineIcon.svg';
import './VerticalTimeLine.scss';

const timeLineData = [
    {
        title: 'Creative Director',
        subtitle: 'Miami, FL',
        summary: 'Creative Direction, User Experience, Visual Design, Project Management, Team Leading',
        date: '2011 - present',
        backgroundColor: '#6A0DAD',
        color: '#fff'
    },
    {
        title: 'Art Director',
        subtitle: 'San Francisco, CA',
        summary: 'Creative Direction, User Experience, Visual Design, SEO, Online Marketing',
        date: '2010 - 2011',
        backgroundColor: '#6E6E6E',
        color: '#fff'
    },
    {
        title: 'Web Designer',
        subtitle: 'Los Angeles, CA',
        summary: 'User Experience, Visual Design',
        date: '2008 - 2010',
        backgroundColor: '#6A0DAD',
        color: '#fff'
    },
    {
        title: 'Content Marketing for Web, Mobile and Social Media',
        subtitle: 'Online Course',
        summary: ' Strategy, Social Media',
        date: 'April 2013',
        backgroundColor: '#6E6E6E',
        color: '#fff'
    },
    {
        title: 'Agile Development Scrum Master',
        subtitle: 'Certification',
        summary: 'Creative Direction, User Experience, Visual Design',
        date: '2002 - 2006',
        backgroundColor: '#6A0DAD',
        color: '#fff'
    },
]
export default function VerticalTimeLine() {
  return (
    <>
          <VerticalTimeline
            lineColor="#333333"
          >
          {
                  timeLineData.length ? timeLineData.map((_timeObject, index) => {
                   return <React.Fragment key={index}>
                        <VerticalTimelineElement
                            className="vertical-timeline-element--work"
                            contentStyle={{ background: _timeObject.backgroundColor, color: _timeObject.color }}
                            contentArrowStyle={{ borderRight: `7px solid  ${_timeObject.backgroundColor}` }}
                            date={<span style={{ color: '#222222' }}>{_timeObject.date}</span>}
                            iconStyle={{ 
                                background: _timeObject.backgroundColor, 
                                color: _timeObject.color, 
                                display: 'flex', 
                                padding: "5px",
                                borderColor: '#222222'
                             }}
                            // position="right"
                           icon={<img src={TimelineIcon} alt='timeline icon' />}
                        >
                            <h3 className="vertical-timeline-element-title">{_timeObject.title}</h3>
                            <h4 className="vertical-timeline-element-subtitle">{_timeObject.subtitle}</h4>
                            <p>{_timeObject.summary}</p>
                        </VerticalTimelineElement>
                    </React.Fragment>
                  }) : null
          }
              
             
          </VerticalTimeline>
    </>
  )
}
