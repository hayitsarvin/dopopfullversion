import React,{useLayoutEffect , useEffect , useRef, useState} from 'react'
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
import { useAppContext } from "../contexts/appcontext.js";
// import LocomotiveScroll from "locomotive-scroll";
import "../locomotive-scroll.css";
import ThreeJsSecene from '../helpers/ThreeJsSecene'
import HeroThree from '../components/HeroThree'
const Home = () => {
  const { isMobile , setReset} = useAppContext();
    gsap.registerPlugin(ScrollTrigger);
    gsap.registerPlugin(CSSRulePlugin);
    const el = useRef();
    const q = gsap.utils.selector(el);
    const popularSection = useRef()
    const todaySection = useRef()
    const marketsection = useRef()
    const revealMarket = useRef()


	var x = window.matchMedia("(max-width: 992px)");

    const [rows , setRows] = useState(200)
    useEffect(() => {
		window.addEventListener('resize', () => {
			x = window.matchMedia("(max-width: 992px)")
  
		}
		);
		
	},[x])
  // useLoco(!isMobile)

  


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
    useLayoutEffect(() => {
      if(!isMobile){

      setTimeout(() => {
        
         popularSection.current  = gsap.timeline({
          scrollTrigger: {
            trigger: q("#popularCreators"),
            scrub: true,
            // markers:true,
            start:'top center+=100',
            end: 'center center'
          }
         })
         .fromTo(q(".threejs-blue-back"),
         {
         opacity:0,
         },
         {
          // backgroundColor:"rgb(250,0,150)",
          opacity:.7,
          // immediateRender: false,
        })
       
        marketsection.current = gsap.to(q(".threejs-back .threejs-dark-back"), {

          scrollTrigger: {
            trigger: q(".market-data-page"),
            scrub: true,
            start:'top center',
            end: 'center center',
            // markers:true,
            // onEnter:() => gsap.to(CSSRulePlugin.getRule(".threejs-back:after") , {backgroundColor:"#e95900"}),
            // onLeaveBack:() => gsap.to(CSSRulePlugin.getRule(".threejs-back .threejs-dark-back") , {opacity:1}),
         
          }
        });

         todaySection.current = gsap.fromTo(q(".threejs-back .threejs-dark-back"), {
          opacity: 0,
         },{
            opacity: 1,
            // immediateRender: false,
            scrollTrigger: {
                  trigger: q(".back-animation-today-div"),
                  scrub: true,
                  start:'top center+=10%',
                  end: 'top top',
           
                }
          });
          const changeBack = (dir)=>{
            
            // gsap.to(CSSRulePlugin.getRule(".threejs-back:after"),{
            //   backgroundColor:"#8000FF",
            //   duration:0,
            // })
            gsap.to(CSSRulePlugin.getRule(".threejs-back:after"),
            {
             
              backgroundColor:()=> dir ===1? "#ff4600": "#8000FF",
              duration:0.01,
            })
            gsap.to(q(".threejs-blue-back"),
           {
              opacity:()=>dir === 1? 0: .7,
              duration:0.01,
            })
          }
          revealMarket.current = gsap.timeline({
            
            scrollTrigger: {
              trigger: q(".back-animation-today-div"),
              scrub: true,
              start:'bottom-=18% top',
              end: 'bottom+=8% top',
              onLeaveBack:({direction})=>  changeBack(direction),
              onEnter:({direction})=>  changeBack(direction),
             
        
            },
            ease:"none",
          })
      
          .to(q(".threejs-back .threejs-dark-back"), {
          
            // onStart:()=>{
            //   gsap.to(CSSRulePlugin.getRule(".threejs-back:after"),{
            //     backgroundColor:"#ff4600",
            //     duration:0,
            //   })
            // },
            opacity: 0,
            // immediateRender: false,
          },0);


      }, 10);
     
      // const threeJsAfter = document.querySelector(".threejs-back")
     
       
     
  return() => {
    if(popularSection.current){
      if(popularSection.current.revert){
        popularSection.current.revert();

      }
      if(popularSection.current.scrollTrigger){
        popularSection.current.scrollTrigger.kill()
      }
    }
    if(todaySection.current){
      if(todaySection.current.revert){

      todaySection.current.revert();
      }
      if(todaySection.current.scrollTrigger){
        todaySection.current.scrollTrigger.kill()

      }
     
    }
    if(marketsection.current){
      if(marketsection.current.revert){
        marketsection.current.revert();

      }
      if(marketsection.current.scrollTrigger){
        marketsection.current.scrollTrigger.kill()
      }
    }
    if(revealMarket.current){
      if(revealMarket.current.revert){
      revealMarket.current.revert();

      }
      if(revealMarket.current.scrollTrigger){
        revealMarket.current.scrollTrigger.kill()
      }
    }
  }
}

  },[popu, isMobile])
   
    // useEffect(() => {
        
       
    //     const threeJsAfter = document.querySelector(".threejs-back")
       
       
     
    //         const popularSection  = gsap.to(CSSRulePlugin.getRule(".threejs-back:after"), {
              
    //           backgroundColor:"rgb(250,0,150)",
    //           // immediateRender: false,
    //           scrollTrigger: {
    //             trigger: document.querySelector("#popularCreators"),
    //             scrub: true,
    //             start:'top center+=100',
    //             end: 'bottom top',
    //             scroller: !x.matches ? "#viewport" : null,
    //           }
    //         });
    //        const marketsection = gsap.to(CSSRulePlugin.getRule(".threejs-back:after"), {
              
    //           opacity: 1,
    //           backgroundColor:"red",
    //           // immediateRender: false,
    //           scrollTrigger: {
    //             trigger: document.querySelector(".market-data-page"),
    //             scrub: true,
    //             start:'top-=20 center+=100',
    //             end: 'bottom top',
    //             onEnter:() => gsap.to(CSSRulePlugin.getRule(".threejs-back .threejs-dark-back") , {opacity:0}),
    //             onLeaveBack:() => gsap.to(CSSRulePlugin.getRule(".threejs-back .threejs-dark-back") , {opacity:1}),
    //             scroller: !x.matches ? "#viewport" : null,
    //           }
    //         });

    //         const todaySection = gsap.to(CSSRulePlugin.getRule(".threejs-back .threejs-dark-back"), {
              
              
    //             opacity: 1,

    //             // immediateRender: false,
    //             scrollTrigger: {
    //                   trigger: document.querySelector(".back-animation-today-div"),
    //                   scrub: true,
    //                   start:'top center',
    //                   end: 'bottom top',
    //                   onEnterBack:() => gsap.to(CSSRulePlugin.getRule(".threejs-back .threejs-dark-back"), {opacity:1}),
    //                   scroller: !x.matches ? "#viewport" : null,
    //                 }
    //           });
    //         // const todaySection = gsap.to(CSSRulePlugin.getRule(".threejs-back:after"), {
    //         //   opacity: 1,
    //         //   mixBlendMode:"darken",
    //         //   backgroundColor:"black",
    //         //   immediateRender: false,
    //         //   scrollTrigger: {
    //         //     trigger: document.querySelector(".back-animation-today-div"),
    //         //     scrub: true,
    //         //     start:'top center',
    //         //     end: 'bottom top',
    //         //     scroller: !x.matches ? "#viewport" : null,
    //         //   }
    //         // });
             
       
    // return() => {
    //   if(popularSection){
    //     popularSection.kill();
    //     if(popularSection.scrollTrigger){
    //       popularSection.scrollTrigger.kill()

    //     }
    //   }
    //   if(todaySection){
    //     todaySection.kill();
    //     if(todaySection.scrollTrigger){
    //       todaySection.scrollTrigger.kill()

    //     }
       
    //   }
    //   if(marketsection){
    //     marketsection.kill();
    //     if(marketsection.scrollTrigger){
    //       marketsection.scrollTrigger.kill()

    //     }
 
    //   }
    // }
    // },[popu])
    // if(isMobile){
    //   return (
    //     // <div >

        
         
    //         <div  className='home-div'  ref={el} >
          
        

       

    //         <div id="stick"   className="home-page-loading" data-scroll  data-scroll-section >
    //         <ThreeJsSecene />

    //         <div >

        
    //     <BidSuccessPopup />
		// <PlaceBidPopup />

    //     {/* <Hero /> */}
    //     <HeroThree />
    //     <PopularCreators show={true}/>
    //     <div className='back-animation-today-div'>
    //     <TodaysPick />
    //     <TopGallery />
    //     </div>

        
    //     {/* <GlobalCommunity /> */}
    //     <MarketData/>
    //     <Footer />

    //     </div>
    //     </div>
    //     </div>
       
    // )
    // }else{
      return (
        // <div >

       
         
     
          <div id="viewport" className='home-div' data-scroll-container ref={el} >

          
        

       

            <div id="stick"   className="home-page-loading" data-scroll  data-scroll-section >
            {
        isMobile ? null 
        :
        <ThreeJsSecene />
        
       }

            <div >

        
        <BidSuccessPopup />
		<PlaceBidPopup />

        {/* <Hero /> */}
        <HeroThree />
        <PopularCreators show={true}/>
        <div className='back-animation-today-div'>
        <TodaysPick />
        <TopGallery />
        </div>

        
        {/* <GlobalCommunity /> */}
        <MarketData/>
        <Footer />

        </div>
        </div>
        </div>
       
       
    )
    // }
    
}

export default Home
