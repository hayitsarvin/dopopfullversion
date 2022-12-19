import React,{useEffect} from 'react'

import DiscoverAllCreators from '../components/DiscoverAllCreators'
import HeroCreators from '../components/HeroCreators'
import HeroPopularCreators from '../components/HeroPopularCreators'

import PopularCreators from '../components/PopularCreators'
import Footer from '../components/Footer'
import useLoco from '../hooks/useLoco'
import { useAppContext } from "../contexts/appcontext.js";
import ThreeJsSecene from '../helpers/ThreeJsSecene'
import { useState } from 'react'
const Creators = () => {
    const { isMobile, resetLoco,setReset} = useAppContext();

    // var x = window.matchMedia("(max-width: 992px)")
	// useEffect(() => {
	// 	window.addEventListener('resize', () => {
    
	// 		x = window.matchMedia("(max-width: 992px)")
	// 	}
	// 	);
		
	// },[isMobile])
   
	// useLoco( isMobile)
   

    return (
        <>
        <div id="viewport" data-scroll-container>
        <div data-scroll-section >
        <ThreeJsSecene />

        <div className="container"   >
            <div className="creator-hero-div">
            <HeroCreators />
            <HeroPopularCreators />
            </div>
            <PopularCreators show={false} />
            <DiscoverAllCreators />

            </div>
          <Footer />
          </div>
            </div>
        </>
    )
}

export default Creators
