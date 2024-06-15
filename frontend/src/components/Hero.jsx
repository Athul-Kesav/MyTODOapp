import React from 'react'
import './Hero.css'
import HeroImg from '../assets/HeroImg.svg'
import SubHeroImg from '../assets/SubHeroImg.svg'


const Hero = () => {
  return (
    <div className='heroContainer'>
        <div className='leftContainer'>
            <p>
                Let's Do<br/>
                What Needs<br/>
                TO be Done<br/>
            </p>
            <h3>
            With our all new <u>AI Enhanced</u> design, tell us <br/> what matters more to you.<br/>
            Setting up your Priorities.
            </h3>
        </div>
        <div className='rightContainer'>
            <img src={HeroImg} alt='HeroImg' id='imgH'/>
            <img src={SubHeroImg} alt='SubHeroImg' id='imgSH'/>
        </div>
    </div>
  )
}

export default Hero