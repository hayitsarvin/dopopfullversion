import React,{useEffect , useRef, useState} from 'react'
import GlobalCommunity from '../components/GlobalCommunity'
import Hero from '../components/Hero'
import MarketData from '../components/MarketData'
import PopularCreators from '../components/PopularCreators'
import TodaysPick from '../components/TodaysPick'
import TopGallery from '../components/TopGallery'
import PlaceBidPopup from '../components/PlaceBidPopup'
import BidSuccessPopup from '../components/BidSuccessPopup'
import useLoco from '../hooks/useLoco'
import Footer from '../components/Footer'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import CSSRulePlugin from 'gsap/CSSRulePlugin'
// import LocomotiveScroll from "locomotive-scroll";
import "../locomotive-scroll.css";
import ThreeJsSecene from '../helpers/ThreeJsSecene'
import HeroThree from '../components/HeroThree'
const Home = () => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.registerPlugin(CSSRulePlugin);
	var x = window.matchMedia("(max-width: 992px)")
    const [rows , setRows] = useState(200)
    useEffect(() => {
		window.addEventListener('resize', () => {
			x = window.matchMedia("(max-width: 992px)")
		
		}
		);
		
	},[x])
     useLoco(x.matches)


    // useEffect(() => {
    //     const scroll = new LocomotiveScroll({
    //       el: document.querySelector("#viewport"),
    //       smooth: true,
    //       smoothMobile: false,
    //       resetNativeScroll: true
    //     });
    //     return () => {
    //       if (scroll) scroll.destroy();
    //   }
    // })
    const popu = document.querySelector("#todaysPick")
   
    useEffect(() => {
        
       
        const threeJsAfter = document.querySelector(".threejs-back")
       
       
     
            const popularSection  = gsap.to(CSSRulePlugin.getRule(".threejs-back:after"), {
              
              backgroundColor:"rgb(250,0,150)",
              // immediateRender: false,
              scrollTrigger: {
                trigger: document.querySelector("#popularCreators"),
                scrub: true,
                start:'top center+=100',
                end: 'bottom top',
                scroller: !x.matches ? "#viewport" : null,
              }
            });
           const marketsection = gsap.to(CSSRulePlugin.getRule(".threejs-back:after"), {
              
              opacity: 1,
              backgroundColor:"red",
              // immediateRender: false,
              scrollTrigger: {
                trigger: document.querySelector(".market-data-page"),
                scrub: true,
                start:'top-=20 center+=100',
                end: 'bottom top',
                onEnter:() => gsap.to(CSSRulePlugin.getRule(".threejs-back .threejs-dark-back") , {opacity:0}),
                onLeaveBack:() => gsap.to(CSSRulePlugin.getRule(".threejs-back .threejs-dark-back") , {opacity:1}),
                scroller: !x.matches ? "#viewport" : null,
              }
            });

            const todaySection = gsap.to(CSSRulePlugin.getRule(".threejs-back .threejs-dark-back"), {
              
              
                opacity: 1,

                // immediateRender: false,
                scrollTrigger: {
                      trigger: document.querySelector(".back-animation-today-div"),
                      scrub: true,
                      start:'top center',
                      end: 'bottom top',
                      onEnterBack:() => gsap.to(CSSRulePlugin.getRule(".threejs-back .threejs-dark-back"), {opacity:1}),
                      scroller: !x.matches ? "#viewport" : null,
                    }
              });
            // const todaySection = gsap.to(CSSRulePlugin.getRule(".threejs-back:after"), {
            //   opacity: 1,
            //   mixBlendMode:"darken",
            //   backgroundColor:"black",
            //   immediateRender: false,
            //   scrollTrigger: {
            //     trigger: document.querySelector(".back-animation-today-div"),
            //     scrub: true,
            //     start:'top center',
            //     end: 'bottom top',
            //     scroller: !x.matches ? "#viewport" : null,
            //   }
            // });
             
       
    return() => {
      if(popularSection){
        popularSection.kill();
        if(popularSection.scrollTrigger){
          popularSection.scrollTrigger.kill()

        }
      }
      if(todaySection){
        todaySection.kill();
        if(todaySection.scrollTrigger){
          todaySection.scrollTrigger.kill()

        }
       
      }
      if(marketsection){
        marketsection.kill();
        if(marketsection.scrollTrigger){
          marketsection.scrollTrigger.kill()

        }
 
      }
    }
    },[popu])
    return (
        // <div >
        <div id="viewport" className='home-div' data-scroll-container  >

            <div id="stick"   className="home-page-loading"  data-scroll-section >
            <ThreeJsSecene />

            <div >

        
        <BidSuccessPopup />
		<PlaceBidPopup />

        {/* <Hero /> */}
        <HeroThree />
        <PopularCreators show={true}/>
        <div className='back-animation-today-div'>
        </div>

        <TodaysPick />
        <TopGallery />
        {/* <GlobalCommunity /> */}
        <MarketData/>
        <Footer />

        </div>
        </div>
        </div>
    )
}

export default Home
