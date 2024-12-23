import React, { useState } from 'react'
import { Chrono } from 'react-chrono';
import './HorizontalTimeLine.scss';
import ChatIcon from '../../assets/svg/chatIcon.svg'

const items = [{
    title: "May 1940",
    cardTitle: "Dunkirk1",
    details: 'detailsdetailsdetailsdetails'
},
{
    title: "May 1941",
    cardTitle: "Dunkirk2",
    details: 'detailsdetailsdetailsdetails'

    
},
{
    title: "May 1942",
    cardTitle: "Dunkirk3",
    details: 'detailsdetailsdetailsdetails'

},
{
    title: "May 1943",
    cardTitle: "Dunkirk4",
    details: 'detailsdetailsdetailsdetails'

},
    {
        title: "May 1944",
        cardTitle: "Dunkirk5",
        details: 'detailsdetailsdetailsdetails'

    },
    {
        title: "May 1945",
        cardTitle: "Dunkirk6",
        details: 'detailsdetailsdetailsdetails'

    },
    {
        title: "May 1946",
        cardTitle: "Dunkirk7",
        details: 'detailsdetailsdetailsdetails'

    },
];



const CardDetail = ({ card, index, defaultView = false }) => {
    const [selectedCard, setSelectedCard] = useState(defaultView); 
    return (
        <div className="card-detail" key={index}>
            <button onClick={() => setSelectedCard(!selectedCard)}>click</button>
            {
                selectedCard ? <section>
                    <div className='cardItem'>{card.title}</div>
                    <div className='cardItem'>{card.cardTitle}</div>
                    <div className='cardItem'>{index}</div>
                </section> : null
            }
           
        </div>
    );
}

export default function HorizontalTimeLine() {
   



 
    return (
        <div style={{ width: "100%", height: "800px" }}>
            <Chrono
                items={items}
                mode="HORIZONTAL"
                disableToolbar={false}
                timelinePointDimension={40}
                cardWidth={500} 
                cardHeight={500} 
                scrollable={true} 
                cardPositionHorizontal="TOP"
                flipLayout={false}
                buttonTexts={'my button'}
                highlightCardsOnHover={true}
                 // onItemSelected={(e) => console.log("click", e)}
                // useReadMore={true}
            >
                <div className="chrono-icons">
                    <img src={ChatIcon} alt="image1" />
                    <img src={ChatIcon} alt="image1" />
                    <img src={ChatIcon} alt="image1" />
                    <img src={ChatIcon} alt="image1" />
                </div>
                {items.map((item, index) => (
                    <CardDetail card={item} index={index}/>
                ))}
            </Chrono>

        </div>
    );
}
