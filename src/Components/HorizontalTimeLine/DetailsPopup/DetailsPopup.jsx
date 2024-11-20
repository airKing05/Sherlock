import React from 'react';
import './DetailsPopup.scss';
import { HtmlRenderer, ListRenderer, PictureRenderer } from '../../../Common/smallComponents/smallComponents';
import CodeCard from '../../Cards/CodeCard';


const renderWidgets = (data) => {
  const { widgetType, content } = data;

  switch (widgetType) {
    case 'TEXT':
      return <p>{content}</p>
    case 'HTML':
      return <HtmlRenderer data={content} />
    case 'LIST':
      return <ListRenderer data={content} />
    case 'CODE':
      return <CodeCard data={content} />
    case 'IMAGE':
      return <PictureRenderer data={content} />
    default:
      return <p>{data}</p>;
  }

}

export default function DetailsCard({ data }) {
  console.log("data", data)
  return (
    <div className='detailsCard__container'>
      <h3><span>{data.icon}</span> <span>{data && data.title}</span></h3>
      {
        renderWidgets(data)
      }
    </div>
  )
}
