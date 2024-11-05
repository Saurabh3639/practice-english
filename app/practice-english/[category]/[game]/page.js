import React from 'react'

export default async function GamePage({ params }) {
    const { game } = await params;

  return (
    <div>GamePage: {game}</div>
  )
}
