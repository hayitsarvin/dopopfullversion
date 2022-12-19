import LocomotiveScroll from "locomotive-scroll";
import React, { useEffect,useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLocation } from 'react-router-dom';
import Lenis from '@studio-freight/lenis'
import { useAppContext } from "../contexts/appcontext.js";
gsap.registerPlugin(ScrollTrigger);

const useLoco = (props) => {

  const location = useLocation()
  
  useEffect(()=> {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
      direction: 'vertical', // vertical, horizontal
      gestureDirection: 'vertical', // vertical, horizontal, both
      smooth: true,
      mouseMultiplier: 1.51,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    })
    
    const header = document.querySelector(".header__1");

    //get scroll value
    lenis.on('scroll', ({ scroll, limit, velocity, direction, progress }) => {

    
        if(location.pathname.includes("/creators/")){
			
                        				header.classList.add("active")
        }else  {
          if(scroll > 20){
            header.classList.add("active")
                                  
          }else{
            header.classList.remove("active")
    
    
    
          }

        }
                      			
    })
    
    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    
    requestAnimationFrame(raf)

    return(()=> {
      if(lenis){
        lenis.destroy()
      }
    }
    )
  },[])
 
  // const { isMobile ,resetLoco} = useAppContext();
  // console.log("props", props)
	// const location = useLocation();
  // var x = window.matchMedia("(max-width: 992px)")
	// const [deviceChange , setDeviceChange] = useState(x.matches)
  //   useEffect(() => {
  //       if(!props) {
  //       console.log("run loco reset mobile" ,x )
  //         return
  //       };
  //       console.log("run loco reset" ,x )
  //       const scEl = document.querySelector("#viewport");
  //       let locoScroll = null;
  //        locoScroll = new LocomotiveScroll({
  //         el: scEl,
  //         smooth: true,
  //         multiplier: 0.81,
  //         scrollbarContainer: document.querySelector('html') ,
  //         smartphone: {smooth: true},
  //         tablet: {smooth: true},
   

  //         lerp:0.12,
    
  //       });
  //       locoScroll.on('scroll', (args) => {
  //         ScrollTrigger.update();

  //           var header = document.querySelector(".header__1");
  //           if(location.pathname.includes("/creators/")){
			
  //               				header.classList.add("active")
                        
  //               		}else{
  //               			if(args.scroll.y > 20){
  //               				header.classList.add("active")
                            
  //               			}else{
  //               				header.classList.remove("active")
                
                
                
  //               			}
  //               		}
  //       });
  //       ScrollTrigger.scrollerProxy("#viewport", {
  //         scrollTop(value) {
  //           console.log("working")

  //           if (locoScroll){
  //             console.log(locoScroll)

  //               console.log("working")
  //           return arguments.length
  //             ? locoScroll.scrollTo(value, 0, 0)
  //             : locoScroll.scroll.instance.scroll.y;
  //           }
  //           return null;
  //         },
  //         getBoundingClientRect() {
           
  //           return {
  //             top: 0,
  //             left: 0,
  //             width: window.innerWidth,
  //             height: window.innerHeight,
  //           };
  //         },
  //         pinType: document.querySelector("#viewport").style.transform
  //           ? "transform"
  //           : "fixed",
  //       });
    
  //       const lsUpdate = () => {

  //         if (locoScroll) {
  //           locoScroll.update();
  //         }
  //       }; 
    
  //       ScrollTrigger.addEventListener("refresh",lsUpdate);
  //       ScrollTrigger.refresh();
    
       
    
      
  //       const timer = setTimeout(function(){
  //         locoScroll.update()
   
  //         }, 100);
       
        
  //       return () => {
  //         if (locoScroll) {
  //           ScrollTrigger.removeEventListener("refresh", lsUpdate);
  //           ScrollTrigger.scrollerProxy(scEl, null);
  //           locoScroll.destroy();
  //           locoScroll = null;
  //           console.log("Kill", locoScroll);
  //           clearTimeout(timer);
  //         }
  //       };
  //     },[props , resetLoco]);
    
  
}

export default useLoco