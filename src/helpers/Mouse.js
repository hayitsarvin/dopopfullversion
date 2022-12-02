import React, { useEffect, useState } from 'react'
import gsap from 'gsap'
import { useLocation } from 'react-router'

const Mouse = () => {
  const location = useLocation();

    const cardItems = document.querySelectorAll(".card__item")
    const sliderItems = document.querySelectorAll(".slider-item")
    const [pageLocation , setPageLocation] = useState(location.pathname)
    // useEffect(() => {
    //   console.log(location)
    // },location.pathname)
   
    useEffect(() => {
      
        const mouseCircle = document.querySelector(".mouse-circle")
        const mouseText = document.querySelector(".mouse-text")
    // const cardItem = document.querySelectorAll(".card__item.auction_card .card_head .card-nft-image ")
    // const btnAuctionCard = document.querySelectorAll(".auction_card .btn_auction")
    const titleSpan = document.querySelectorAll(".explore-span")
    const exploreSpan = document.querySelectorAll(".discover-span")
    
    // const sliderItem = document.querySelectorAll(".slider-item .card-media .card-nft-image")

        const mouseDiv = document.querySelector(".mouse-div")
        // const heroTitle1 = document.querySelector(".hero__title .text-1")
        // const heroTitle2 = document.querySelector(".hero__title .text-2")

        // const headerLinks = document.querySelectorAll(".header__1 li a")
        const devebLink = document.querySelector("#copyright-web")
        // const sectionTitle = document.querySelectorAll(".section__title")
        const btns = document.querySelectorAll(".btn")
        
        function onMouseMove(e) {
            gsap.to([mouseDiv], {
                duration: 0.4,
              x: e.pageX ,
              y: e.pageY,
              ease: "Power3.easeOut"
              
            })

          }
          function onMouseHoverOnTitleSpan(){
            gsap.set([mouseDiv ] , {
              mixBlendMode: "difference"
            })
            gsap.to(mouseCircle, {
              duration: 0.3 ,
              scale: 7
            })
          }
          function onMouseHoverOutOnTitleSpan(){
            gsap.set([mouseDiv ] , {
              mixBlendMode: "unset"
            })
            gsap.to(mouseCircle, {
              duration: 0.3 ,
              scale: 1
            })
          }
          function onMouseHoverOnLinks() {
            gsap.set([mouseDiv ] , {
              mixBlendMode: "difference"
            })
            gsap.to(mouseCircle, {
              duration: 0.3 ,
              scale: 8
            })
            gsap.set(mouseText , {scale: 1})
          }
          function onMouseHoverOnTitle() {
            gsap.set(mouseDiv , {
              mixBlendMode: "soft-light"
            })
            gsap.to(mouseCircle, {
              duration: 0.4 ,
              scale: 15
            })
          }
          function onMouseHover() {
            gsap.to(mouseCircle, {
              duration: 0.3 ,
              scale: 0.8
            })
            gsap.set(mouseText, {
              opacity: 0
            })
          }
          function onMouseHoverOutOnLinks() {
            gsap.set(mouseDiv , {
              mixBlendMode: "unset"
            })
            gsap.to(mouseCircle, {
              duration: 0.3 ,
              scale: 1
            })
          }
          function onMouseHoverOutOnTitle() {
            gsap.set(mouseDiv , {
              mixBlendMode: "unset"
            })
            gsap.to(mouseCircle, {
              duration: 0.4 ,
              scale: 1
            })
          }
          function onMouseHoverOut() {
            
            gsap.to(mouseCircle, {
              duration: 0.3 ,
              scale: 1
            })
          }
          // function onMouseHoverOnCards() {
            
          //   gsap.to(mouseCircle, {
          //     duration: 0.3 ,
          //     scale: 8,
          //     backgroundColor: "rgba(0, 0, 0, 0.4)",
          //     backdropFilter: "blur(2px)"
          //   })
          //   gsap.set(mouseText, {
          //     opacity: 1,
          //     color:"white"
          //   })
          // }
          // function onMouseHoverOutOnCards() {
            
          //   gsap.to(mouseCircle, {
          //     duration: 0.3 ,
          //     scale: 1,
          //     backgroundColor: "white",
          //     backdropFilter: "blur(0px)"
          //   })
          //   gsap.set(mouseText, {
          //     opacity: 0,
          //     color:"black"
          //   })
          // }
          // function onMouseHoverOutBtnAuction() {
          //   gsap.to(mouseCircle, {
          //     duration: 0.3 ,
          //     scale: 7
          //   })
          //   gsap.set(mouseText, {
          //     opacity: 1
          //   })
          // }
          // if(headerLinks){
          //   headerLinks.forEach((link , i) => {
          //     link.addEventListener('mouseenter', onMouseHoverOnLinks)
          //     link.addEventListener('mouseleave', onMouseHoverOutOnLinks)
          //   })
          // }
         
        if(devebLink){
          
          devebLink.addEventListener('mouseenter', onMouseHoverOnLinks)
          devebLink.addEventListener('mouseleave', onMouseHoverOutOnLinks)
         
        }
        
        // sectionTitle.forEach((title , i) => {
        //   title.addEventListener('mouseenter', onMouseHoverOnTitle)
        //   title.addEventListener('mouseleave', onMouseHoverOutOnTitle)
        // })
        if(btns){
          btns.forEach((btn , i) => {
            btn.addEventListener('mouseenter', onMouseHover)
            btn.addEventListener('mouseleave', onMouseHoverOut)
          })
        }
       
        // if(cardItem){
        //   cardItem.forEach((card , i) => {
        //     card.addEventListener('mouseenter', onMouseHoverOnCards)
        //     card.addEventListener('mouseleave', onMouseHoverOutOnCards)
        //   })
        // }
        
        
        // if(sliderItem){
        //   sliderItem.forEach((slider , i) => {
        //     slider.addEventListener('mouseenter', onMouseHoverOnCards)
        //     slider.addEventListener('mouseleave', onMouseHoverOutOnCards)
        //   })
        // }
        
        // if(titleSpan){
        //   titleSpan.forEach((span , i) => {

        //     span.addEventListener('mouseenter', onMouseHoverOnTitleSpan)
        //     span.addEventListener('mouseleave', onMouseHoverOutOnTitleSpan)
        //   })
        // }
        // if(exploreSpan){
        //   exploreSpan.forEach((span , i) => {

        //     span.addEventListener('mouseenter', onMouseHoverOnTitleSpan)
        //     span.addEventListener('mouseleave', onMouseHoverOutOnTitleSpan)
        //   })
        // }
        document.body.addEventListener('mousemove', onMouseMove);
        
        // if(btnAuctionCard){
        //   btnAuctionCard.forEach((btn , i) => {
        //     btn.addEventListener('mouseenter', onMouseHoverOnBtnAuction)
        //     btn.addEventListener('mouseleave', onMouseHoverOutBtnAuction)
        //   })
        // }
        // if(location.pathname == "/"){
          // heroTitle1.addEventListener('mouseenter', onMouseHoverOnTitle)
          // heroTitle1.addEventListener('mouseleave', onMouseHoverOutOnTitle)
          // heroTitle2.addEventListener('mouseenter', onMouseHoverOnTitle)
          // heroTitle2.addEventListener('mouseleave', onMouseHoverOutOnTitle)
          // heroTitle.addEventListener('mouseClick', onMouseHoverOutOnTitle)s
        // }
    } , [location,cardItems , sliderItems])
    useEffect(() => {
      const mouseCircle = document.querySelector(".mouse-circle")
      const mouseText = document.querySelector(".mouse-text")
      // const mouseDiv = document.querySelector(".mouse-div")

      gsap.to(mouseCircle, {
        duration: 0.3 ,
        scale: 1
      })
      gsap.set([mouseCircle ] , {
        mixBlendMode: "unset",
        backgroundColor: "white",
        backdropFilter: "blur(0px)"
      })
      gsap.set(mouseText , {opacity: 0})

    },[location.pathname])
  return (
    <div className="mouse-div">
    <div className="mouse-circle">
      {/* <div className="mouse-circle-text"></div> */}

      </div>
      <p className="mouse-text">BUY</p>
    </div>
  )
}

export default Mouse