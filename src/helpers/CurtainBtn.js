import React, { useEffect, useRef } from 'react'

import gsap from 'gsap'

import './curtain.scss'

export default function CurtainBtn({ mode = '', moveEffect = true }) {
  
  const hoverBg = useRef(null)

  const curtain1 = useRef(null)
  const curtain2 = useRef(null)

  useEffect(() => {
  var mobileCheck = window.matchMedia("(max-width: 992px)")
  if(!mobileCheck.matches){

  }

    
    if( window.innerWidth > 768 && hoverBg.current ) {
      hoverBg.current.parentElement.addEventListener('mouseover', onMouseHover)
      hoverBg.current.parentElement.addEventListener('mouseout', onMouseOut)
    }
  
    return () => {
      if( window.innerWidth > 768 && hoverBg.current ) {
        hoverBg.current.parentElement.removeEventListener('mouseover', onMouseHover)
        hoverBg.current.parentElement.removeEventListener('mouseout', onMouseOut)
      }
    }
  }, [])
  
  
  const onMouseHover = () => {
    // const btnBack = document.querySelector(".creator-hero-btn-color")
    
    gsap.to( hoverBg.current, {
      scaleX: 1.05,
      scaleY: 0.97,
      ease: 'elastic.out(1, 0.4)',
      duration: 1.5,
      overwrite: true
      // background: "white"
    })

    // Curtains passing in bg
    gsap.fromTo([curtain1.current,curtain2.current], {
      x: '-101%',
    }, {
      x: 0,
      opacity: 1,
      ease: 'expo.out',
      duration: 1,
      stagger: 0.2,
      overwrite: true
    })
    
  }

  const onMouseOut = () => {

    // Jelly Effect for BG
    gsap.to( hoverBg.current, {
      scaleX: 1,
      scaleY: 1,
      ease: 'elastic.out(1, 0.4)',
      duration: 1.5,
      overwrite: true
    })

    // Curtains passing in bg
    gsap.fromTo([curtain2.current,curtain1.current], {
      x: 0,
    }, {
      x: '101%',
      opacity: 1,
      ease: 'expo.out',
      duration: 1,
      stagger: 0.2,
      overwrite: true
    })

  }

  const btnmove = (e) => {
	
    if ( !moveEffect ) return
		const {target}= e;
		const ofTop = target.getBoundingClientRect().top;
		const ofLeft = target.getBoundingClientRect().left;
		var s = e.clientX - ofLeft;
		var o = (e.clientY - ofTop)/130;
	  // setMoveBtn(true);
	  // console.log(ofTop, o, e.clientY )
	  gsap.to(hoverBg.current.parentNode.parentNode, {
		x: ((s - target.offsetWidth / 2) / target.offsetWidth) * 40,
		y:( o - .5) * 30,
		// x:e.clientX,
		// y: e.clientY,
		ease: "Power3.inOut",
    // ease: 'elastic.out(1, 0.4)',
		duration: .3,
	  });
	  

		
	}
	const mouseLeave = (e) => {
    if ( !moveEffect ) return

		const btnDiv = document.querySelector(".hero-btn-div")
		gsap.to(hoverBg.current.parentNode.parentNode, {
			x: 0,
			y:0,
			// x:e.clientX,
			// y: e.clientY,
			ease: "Power3.inOut",
      // ease: 'elastic.out(1, 0.4)',
			duration: .3,
		  });
		  
	}

  return (
    <>
    
   {window.innerWidth > 768 && moveEffect ?  
   <span onMouseMove={btnmove} onMouseLeave={mouseLeave}  className="btn-area" >
   </span>
  : ''
  }
    

   

    <div className={`dvb-hover-bg ${ mode ? mode : '' }`} ref={hoverBg} >
      { mode === 'noBg' ? <div className='border-bg'></div> : '' }
     
      <div className="curtain-wrapper">
        <div className="curtain curtain-1" ref={curtain1} ></div>
        <div className="curtain curtain-2" ref={curtain2} ></div>
      </div>
    </div>
    </>
  )
}