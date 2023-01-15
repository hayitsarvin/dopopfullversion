import React,{useEffect, useRef, useState} from 'react'
import Header from "./components/Header";
import Hero from "./components/Hero";
import PopularCreators from "./components/PopularCreators";
import TodaysPick from "./components/TodaysPick";
import {
  BrowserRouter as Router,
  Routes ,
  Route,
  Link
} from "react-router-dom";
import "./styles/css/plugins/remixicon.css"
import { useSelector, useDispatch } from 'react-redux'
import "./styles/css/plugins/bootstrap.min.css"
// import "./styles/css/style.css"
import "./style1.css"
import "./style.scss"
import TopGallery from "./components/TopGallery";
import GlobalCommunity from "./components/GlobalCommunity";
import MarketData from "./components/MarketData";
import Footer from "./components/Footer";
import Explore from "./pages/Explore";
import Creators from "./pages/Creators";
import Home from "./pages/Home";
import ArtDetail from "./pages/ArtDetail";
import CreatorsPage from "./pages/CreatorsPage";
import ConnectWallet from "./pages/ConnectWallet";
import PageNotFound from "./pages/PageNotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DarkMode from "./components/DarkMode";
import BidSuccessPopup from "./components/BidSuccessPopup";
import PlaceBidPopup from "./components/PlaceBidPopup";
import ScrollToTop from "./helpers/ScrollToTop";
import BuyPopup from "./components/BuyPopup";
import { listUser } from './actions/userActions';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';
import Privacy from './pages/Privacy';
import imagesLoaded from 'imagesloaded';
import SiteLoader from './components/SiteLoader';
import gsap from 'gsap';
import "./locomotive-scroll.css"
import useWindowSize from './hooks/useWindowSize';
import { LocomotiveScrollProvider } from 'react-locomotive-scroll'
import useLoco from './hooks/useLoco';
import Mouse from './helpers/Mouse';
import { useAppContext } from "./contexts/appcontext.js";
import ThreeJsSecene from './helpers/ThreeJsSecene';
// import LocomotiveScroll from "locomotive-scroll";
// import "./locomotive-scroll.css";

function App() {
  const { isMobile, setMobileTrue, setMobileFalse } = useAppContext();
  function checkForMobileBg() {
    const width = window.innerWidth;

    if (width > 992 ) {
      setMobileFalse();
    } else if (width <= 992 ) setMobileTrue();
  }
  useEffect(() => {
    checkForMobileBg();

    window.addEventListener("resize", checkForMobileBg);

    return () => window.removeEventListener("resize", checkForMobileBg);
  }, [isMobile]);
  
  useLoco()
  // var x = window.matchMedia("(max-width: 992px)")
	// const [deviceChange , setDeviceChange] = useState(x.matches)
  const appRef = useRef();
const q = gsap.utils.selector(appRef);
  const dispatch = useDispatch()
	const userList = useSelector(state => state.userList)
	const {loading , users} = userList
  const [isLoading , setIsLoading] = useState(true)
  const [imagesDoneLoading , setImagesDoneLoading] = useState(false)

  const [loadingProcess , setLoadingProcess] = useState(0)
  var temp =0;
  const [number , setNumber] = useState(0)
  const  loadingEnd = () => {
    gsap.set(q(".hero__2"), { clearProps: "transform"});
  }
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
		dispatch(listUser())

	}, [dispatch])
  
  useEffect(() => {
  
    // gsap.set(q(".home-page-loading"),{delay: 0 , display: "none" } )

    var posts = document.querySelectorAll('img');


imagesLoaded( posts, function() {
  setLoadingProcess(100)
  setTimeout(function() {
    gsap.to(q(".loader-change-color-div"), { height: "100vh" })
    gsap.to(q(".loader-div"), {delay: 0.5 , height: "0" })
    // gsap.from(".hero__2 ", {delay: 0.5 , opacity: 0, y: 100, duration: 1,ease: "expo" });
    // gsap.set(q(".home-page-loading"),{delay: 0.2 , display: "block" } )

    gsap.set(q(".loader-div"),{delay: 1 , display: "none" } );
    loadingEnd()
 
   
  },  500);
}).on( 'progress', function( instance, image ) {
  setLoadingProcess(prev => (temp/posts.length)*100)

  temp = temp + 1;

});

  }, [])





    return (

   
      <div   className="overflow-hidden app-div" ref={appRef} >
         
      <SiteLoader number={number}  imageLoaded={loadingProcess}/> 
      
        {/* <Router> */}
        <BidSuccessPopup />
      <PlaceBidPopup />
      <BuyPopup />
      <Header />
      { isMobile ? null : <Mouse />}
      {/* <ThreeJsSecene /> */}
      <ScrollToTop >
         
  
            {/* <Switch >
            
           
            <Route exact path='/' >
              <Home />
            </Route>
            <Route path='/explore' >
              <Explore />
            </Route>
              
          
            <Route exact path='/creators' >
              <Creators />
            </Route>
            <Route path='/artdetail/:id' >
              <ArtDetail />
            </Route>
            <Route path='/creators/:id'>
              <CreatorsPage />
            </Route>
            <Route path='/connectwallet' >
              <ConnectWallet />
            </Route>
            <Route path='/login' >
              <Login />
            </Route>
            <Route path='/register' >
              <Register />
            </Route>
            <Route path='/contact' >
              <Contact />
            </Route>
            <Route path='/FAQ' >
              <FAQ />
            </Route>
            <Route path='/privacy' >
              <Privacy />
            </Route>
            <Route path='*' >
              <PageNotFound />
            </Route>
  
  
  
            
          </Switch > */}
          {/* <div > */}
          <Routes >
            <Route path='/explore' element={  <Explore />} />
              
          
            <Route path='/creators' element={<Creators />} />
           
            <Route path='/' element={<Home />} />
            <Route path='/artdetail/:id' element={<ArtDetail />} />
            <Route path='/creators/:id' element={<CreatorsPage />} />
            <Route path='/connectwallet' element={<ConnectWallet />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/contact' element={<Contact />} />
            {/* <Route path='/FAQ' element={<FAQ />} /> */}
            <Route path='/privacy' element={<Privacy />} />
  
  
            <Route path='/*' element={<PageNotFound />} />
  
  
  
            
          </Routes >
       {/* </div> */}

          </ScrollToTop>
          {/* <Footer /> */}
          {/* </Router> */}
          </div>
          // </LocomotiveScrollProvider>
       
    );
  
 
}

export default App;
