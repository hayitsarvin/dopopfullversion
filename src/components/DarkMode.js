import React,{useEffect, useState} from 'react';
import { useAppContext } from '../contexts/appcontext';


const DarkMode = (props) => {
  const {screen} = props;
  const { isMobile } = useAppContext();
  // const [modeHandle , setModeHandle] =  useState(true)
  var modeHandle = true
  const modeHandler = () => {
    modeHandle = !modeHandle
    if(modeHandle) {
      darkMode()
     
    }else{
      lightMode()
      
    }
  }
  // var x = window.matchMedia("(max-width: 992px)")
	// const [deviceChange , setDeviceChange] = useState(x.matches)

	// useEffect(() => {
	// 	window.addEventListener('resize', () => {

	// 		x = window.matchMedia("(max-width: 992px)")
  //     if(deviceChange === x.matches){
			
	// 		}else{
	// 			setDeviceChange(prev => x.matches)
	
	// 		}
	// 	}
	// 	);
		
	// },[screen])
    const lightMode = () => {
      const light =document.querySelector(".mode .mode-icon")

        // const dark =document.querySelector(".dark")
        const body =document.querySelector("body")
        
          body.classList.add("is__light")
          body.classList.remove("is__dark")
          // light.classList.add("is_active")
          // dark.classList.remove("is_active")
          if(isMobile){
            light.classList.remove("mode")
          light.classList.add("arvin")
          }
          light.classList.remove("ri-sun-fill")
          light.classList.add("ri-moon-fill")
          document.getElementById("logo_js").src = "/img/logos/new-logo-black.svg";
          // document.getElementById("brand_js").src = "/img/logos/blackBrandName.svg";
          document.getElementById("logo_js_f").src = "/img/logos/new-logo-black.svg";

          if(!isMobile){
          document.getElementById("logo_js_f").src = "/img/logos/new-logo-black.svg";
          // document.getElementById("brand_js_f").src = "/img/logos/blackBrandName.svg";
          }
          
          document.getElementById("copyright-logo-f").src = "/img/logos/ourLogoBlack.svg";


      
        localStorage.setItem("darkMode" , "light")
      }
      const darkMode = () => {
        const light =document.querySelector(".mode .mode-icon")

        // const dark =document.querySelector(".dark")
        const body =document.querySelector("body")
        
          body.classList.remove("is__light")
          body.classList.add("is__dark")


          light.classList.remove("ri-moon-fill")

          light.classList.add("ri-sun-fill")

          document.getElementById("logo_js").src = "/img/logos/new-logo-white.svg";
          // document.getElementById("brand_js").src = "/img/logos/darkBrandName.svg";
          document.getElementById("logo_js_f").src = "/img/logos/new-logo-white.svg";

          if(!isMobile){
          // document.getElementById("brand_js_f").src = "/img/logos/darkBrandName.svg";
          document.getElementById("logo_js_f").src = "/img/logos/new-logo-white.svg";
          }
          document.getElementById("copyright-logo-f").src = "/img/logos/ourLogoWhite.svg";
        localStorage.setItem("darkMode" , "dark")

  
    }
    useEffect(() => {
      const mode = localStorage.getItem("darkMode") ? localStorage.getItem("darkMode") : "dark"
      if(mode == "dark"){
          darkMode()
      }else if( mode =="light"){
        lightMode()
      }
    },[])
  return (
    // <div className="bg-dark py-10">
    <div className="container dark-mode-div">
        <div className="text-center
            d-flex
            justify-content-between
            space-x-10
            align-items-center">
            {/* <div className="space-x-10 d-flex align-items-center">
                <lottie-player src="https://assets6.lottiefiles.com/private_files/lf30_kqshlcsx.json" background="transparent" speed="2" style={{width: "50px" , height: "50px"}} loop="" autoplay=""></lottie-player>
                <p className="color_white">
                    Dark mode is now
                    <span style={{color: "rgb(0, 255, 170)"}}>Available </span>
                </p>
            </div> */}

            <div className="mode_switcher space-x-10">
                <div className="light d-flex align-items-center  mode"  onClick={(e) => modeHandler(e)}>
                    {/* <i className="ri-sun-fill"></i> */}

                     <i className="ri-sun-fill mode-icon"></i>
                  
                    {/* <p className="mode_switcher_text">Light</p> */}
                </div>
                {/* <div  className="dark d-flex align-items-center mode"  onClick={(e) => darkMode(e)}>
                {
                    screen ? (
                      <i className="ri-moon-fill"></i>

                    ): null
                  } */}
                    
                    {/* <p className="mode_switcher_text">Dark</p> */}

                {/* </div> */}
            </div>
        </div>
    </div>
// </div>
  )
};

export default DarkMode;
