import React from 'react';
import CardLayout from '../../../../Layouts/CardLayout/CardLayout';

export default function BasicCard({ data }) {
  return (
    <CardLayout
      title={data?.answer?.title}
    >
      <p>
        {data?.answer?.description}
      </p>
    </CardLayout>

  )
}
