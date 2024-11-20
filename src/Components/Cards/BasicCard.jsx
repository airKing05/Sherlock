import React from 'react';

export default function BasicCard({ data }) {
  return (
      <p>
        {data?.description || "Sweden is a Scandinavian nation with thousands of coastal islands and inland lakes, along with vast boreal forests and glaciated mountains. Its principal cities, eastern capital"}
      </p>
  )
}
