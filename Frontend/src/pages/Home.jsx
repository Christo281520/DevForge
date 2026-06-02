import React from 'react'
import Hero from '../components/Hero'
import Features from '../components/Features'
import Stats from '../components/Stats'
import '../components/css/home.css'
import ContinueSolving from '../components/ContinueSolving'
import RecentActivity from '../components/RecentActivity'

const Home = () => {

  return (

    <div className="home-container">

      <Hero />

      <Stats />

      <ContinueSolving />

      <RecentActivity />

      <Features />

    </div>
  )
}

export default Home