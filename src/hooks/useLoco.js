import LocomotiveScroll from "locomotive-scroll";
import React, { useEffect,useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLocation } from 'react-router-dom';


gsap.registerPlugin(ScrollTrigger);

const useLoco = (mobile) => {
	const location = useLocation();
  // var x = window.matchMedia("(max-width: 992px)")
	// const [deviceChange , setDeviceChange] = useState(x.matches)
  // useEffect(() => {
	// 	window.addEventListener('resize', () => {

	// 		x = window.matchMedia("(max-width: 992px)")
	// 		if(deviceChange === x.matches){
			
	// 		}else{
	// 			setDeviceChange(prev => x.matches)
	
	// 		}
	// 	}
	// 	);
		
	// },[x])
    useEffect(() => {
        if(mobile) return;
        // console.log("run loco reset")
        const scEl = document.querySelector("#viewport");
        let locoScroll = null;
         locoScroll = new LocomotiveScroll({
          el: scEl,
          smooth: true,
          // multiplier: 1,
          multiplier: 0.81,
          
          scrollbarContainer: document.querySelector('html') ,
          smartphone: {smooth: true},
          tablet: {smooth: true},
        //   lerp:0.2,
          lerp:0.12,
    
        });
        locoScroll.on('scroll', (args) => {
            var header = document.querySelector(".header__1");
            if(location.pathname.includes("/creators/")){
			
                				header.classList.add("active")
                        
                		}else{
                			if(args.scroll.y > 20){
                				header.classList.add("active")
                            
                			}else{
                				header.classList.remove("active")
                
                
                
                			}
                		}
        });
        ScrollTrigger.scrollerProxy("#viewport", {
          scrollTop(value) {
            // console.log("working")

            if (locoScroll){
              // console.log(locoScroll)

                // console.log("working")
            return arguments.length
              ? locoScroll.scrollTo(value, 0, 0)
              : locoScroll.scroll.instance.scroll.y;
            }
            return null;
          },
          getBoundingClientRect() {
           
            return {
              top: 0,
              left: 0,
              width: window.innerWidth,
              height: window.innerHeight,
            };
          },
          pinType: document.querySelector("#viewport").style.transform
            ? "transform"
            : "fixed",
        });
    
        const lsUpdate = () => {
          // console.log("Redsasdas")
          if (locoScroll) {
            locoScroll.update();
          }
        }; 
    
        ScrollTrigger.addEventListener("refresh",lsUpdate);
        ScrollTrigger.refresh();
    
       
    
        //   // if (callonce && btnobj){
        //     var locodata="";
        //     if (args.currentElements[btnobj] === "undefiend" ){
        //       locodata= ""} 
        //       else if (args.currentElements[btnobj]){locodata = args.currentElements[btnobj].top;}
        //       var pay ={ btnname : btnobj , value: locodata};
        //       updateNeeded(pay)
        //       setCallonce(false)
        //       console.log(pay)
        // // }
        // });
        
        // locoScroll.on("call", (obj, status)=>{
          // if (status === "enter"){
          // oncallfunc(obj);
          // setCallonce(true);
          // console.log(obj, status)
        // }
        // })
        const timer = setTimeout(function(){
          locoScroll.update()
          // console.log("updating")
          }, 100);
       
          locoScroll.on("scroll" , (args) => {
              ScrollTrigger.update();
          });
        return () => {
          if (locoScroll) {
            ScrollTrigger.removeEventListener("refresh", lsUpdate);
            ScrollTrigger.scrollerProxy(scEl, null);
            locoScroll.destroy();
            locoScroll = null;
            // console.log("Kill", locoScroll);
            clearTimeout(timer);
          }
        };
      },[]);
    
  
}

export default useLoco