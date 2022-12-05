import React from 'react'
import './HomePage.css'
function HomePage() {
  return (
    <div className='homepageContainer'>
      <div className='mainTitle'>
        <h1 className='homepageTitle'>
          Wellness
        </h1>
        <h1 className='homepageTitle'>
          Made
        </h1>
        <h1 className='homepageTitle'>
          Easy
        </h1>
      </div>
      <div className='featuresSection'>
        <div>
          <h1 className='featuresTitle'>Features</h1>
        </div>
      </div>
      <div className='nutritionSection'>
        <h2>Our Nutrition Page</h2>

      </div>
      <div className='fitnessSection'>
        <h2>Our Fitness Page</h2>
      </div>
    </div>
    )
}

export default HomePage