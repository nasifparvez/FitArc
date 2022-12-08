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
      <div className='infoSection'>
      <div className='featuresSection'>
        <div>
          <h1 className='featuresTitle'>Features</h1>
        </div>
        <div className='featuresInfo'>
        <p className='paragraph'>
        FitArc is a one-stop web application that allows you to track your fitness and nutrition.
        </p>
        <div className='space'></div>
        <img className='feautureImg' src={require('../images/features.png')} width={200} height={200}></img>
        </div>
        
      </div>
      <div className='funcSection'>
      <div className='nutritionSection'>
        <h2>Our Nutrition Page</h2>
        <div>
        
        <div className='featuresInfo'>
        <p className='paragraph'>
         Get meal plans perfectly catered for your needs!
        </p>
        <div className='space'></div>
        <img src={require('../images/nutrition.png')} width={200} height={200}></img>
        </div> 
        
        </div>

      </div>
      <div className='fitnessSection'>
        <h2>Our Fitness Page</h2>
        <div className='featuresInfo'>
        <p className='paragraph'>
        Find and track workouts suited for your fitness jouney!
        </p>
        <div className='space'></div>
        <img src={require('../images/weights.png')} width={200} height={200}></img>
        </div> 
      </div>
      </div>
      </div>
    </div>
    )
}

export default HomePage