import React,{useEffect} from 'react'

import DiscoverAllCreators from '../components/DiscoverAllCreators'
import HeroCreators from '../components/HeroCreators'
import HeroPopularCreators from '../components/HeroPopularCreators'

import PopularCreators from '../components/PopularCreators'
import Footer from '../components/Footer'
import useLoco from '../hooks/useLoco'
import ThreeJsSecene from '../helpers/ThreeJsSecene'
const Creators = () => {
    var x = window.matchMedia("(max-width: 992px)")
	useEffect(() => {
		window.addEventListener('resize', () => {

			x = window.matchMedia("(max-width: 992px)")
		}
		);
		
	},[x])
	useLoco(x.matches)

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
