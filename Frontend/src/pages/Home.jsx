import React from 'react'
import Hero from '../components/Hero'
import Features from '../components/Features'
import Stats from '../components/Stats'
import '../components/css/home.css'

const Home = () => {
  return (
    <div className="home-container">
      <Hero />
      <Stats />
      <Features />
    </div>
  )
}

export default Home