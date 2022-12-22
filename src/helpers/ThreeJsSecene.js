
import gsap from 'gsap/all';
import React, { useEffect ,useRef, useState } from 'react'
import { useLocation } from 'react-router';
import * as THREE from 'three';
import { useAppContext } from '../contexts/appcontext';
import { vertexShader , fragmentShader } from './WebGL';

const ThreeJsSecene = ({row}) => {
	const { isMobile } = useAppContext();
	
	// var x = window.matchMedia("(max-width: 992px)")
	var cols;
	var rows;
	const [myRow , setMyRow]= useState(45)
	var onWindowResize ;
	var camera, scene, renderer;
	// useEffect(() => {
	// 	window.addEventListener('resize', () => {

	// 		x = window.matchMedia("(max-width: 992px)")
	// 	}
	// 	);
		
	// },[x])
    // const container = useRef(null)
	const Location = useLocation()
	

    const addVertex = () => {

        const existingVertexScript = document.getElementById('vertexShader')
        const existingFragmentScript = document.getElementById('fragmentShader')
    
        if( existingVertexScript || existingFragmentScript ) return
    
        const vertexShaderScript = document.createElement("script");
        const fragmentShaderScript = document.createElement("script");
    
        vertexShaderScript.innerHTML = vertexShader
        fragmentShaderScript.innerHTML = fragmentShader
    
        vertexShaderScript.type = 'x-shader/x-vertex'
        fragmentShaderScript.type = 'x-shader/x-vertex'
    
        vertexShaderScript.id = 'vertexShader'
        fragmentShaderScript.id = 'fragmentShader'
    
        document.body.appendChild(vertexShaderScript)
        document.body.appendChild(fragmentShaderScript)
      }
    
    useEffect(() => {
		if(!isMobile){
			var main;
			// var content;
			var container;
			
			var uniforms;
			var startTime;
			
			
			var canvasWidth;
			var canvasHeight;
			var resPoster = 841.0/594.0;
			var minWidth = 450;
			var minHeight = minWidth * resPoster;
			var margin = 50;
			
			 cols = 1.;
			 rows  = 200;
			 onWindowResize = (event) => {
				// var mainHeight =  window.innerHeight - margin * 2.0;
				// var mainWidth =  mainHeight / resPoster;
				// var contentHeight = content.offsetHeight;
				// var contentMargin = margin  * 0.25;
				var containerHeight ;
				if(Location.pathname == "/"){
					if(isMobile){
						containerHeight =  100;
					}else{
						containerHeight =  100;
					}
			
				}else if(Location.pathname == "/creators"){
					containerHeight =  170;
			
				}else if(Location.pathname == "/contact"){
					containerHeight =  100;
			
				}
				else if(Location.pathname == "/login" || Location.pathname == "/register"){
					containerHeight =  100;
			
				}
				var containerMinHeight = 100;
				
				// main.style.height = mainHeight+"px";
				// main.style.width = mainWidth+"px";
				// main.style.minHeight = minHeight+"px";W
				// main.style.minWidth = minWidth+"px";
				// main.style.padding = margin*0.5+"px";
				// content.style.margin = "0 0 "+"px 0";
				container.style.height = containerHeight+"%";
				if(Location.pathname == "/creators"){
				container.style.height = containerHeight+"vh";
			
				}
				if(Location.pathname == "/"){
				container.style.height = containerHeight+"vh";
			
				}
				container.style.width = 100+"%";
			
				container.style.minHeight = containerMinHeight+"px";
			
				canvasWidth = 40 + container.offsetWidth  ;
				canvasHeight = container.clientHeight;
				//send new size value to the shader and resize the window
				uniforms.resolution.value.x = canvasWidth;
				uniforms.resolution.value.y = canvasHeight;
				
				
				//var res = canvasWidth / cols;
				//rows = canvasHeight / res;
				uniforms.colsrows.value.x = cols;
				uniforms.colsrows.value.y = 23;//rows;
				
				renderer.setSize(canvasWidth, canvasHeight);
			}
			function onMouseMove(event) {
				var pageWidth;
				var pageHeight ;
				if(Location.pathname == "/creators"){
					const creatorHero = document.querySelector(".creator-hero-div")
					if(creatorHero){
						pageWidth = creatorHero.clientWidth
						pageHeight = creatorHero.clientHeight
					}
			   }if(Location.pathname == "/"){
				   const hero2 = document.querySelector(".hero__2")
				   if(hero2){
					pageWidth = hero2.clientWidth
					pageHeight = hero2.clientHeight
				   }
					
			   }
			   if(Location.pathname == "/contact"){
				const contact = document.querySelector(".contact")
				if(contact){
					pageWidth = contact.clientWidth
					pageHeight = contact.clientHeight
				}
			}
			if(Location.pathname == "/login"){
				const login = document.querySelector(".login")
				if(login){
					pageWidth = login.clientWidth
					pageHeight = login.clientHeight
				}
			}
			if(Location.pathname == "/register"){
				const register = document.querySelector(".register")
				if(register){
					pageWidth = register.clientWidth
					pageHeight = register.clientHeight
				}
			}
				if(event){
				
					
					
					const mouseX  =  event.screenX;
					const mouseY = event.screenY;
					// uniforms.colsrows.value.y = 
					// const AniSpeed = uniforms.time.value
					gsap.to(uniforms.colsrows.value , {y : () => 160 * (mouseX / pageWidth) + 80 , duration: 1, ease: 'expo.out'})
					// gsap.to(uniforms.time , {value : AniSpeed * (mouseY / pageHeight) , duration: 1 })
					// uniforms.time.value =  0
			
				}
			}
			
			function init() {
				//get contenaire
				// main = document.getElementById('main');
				// content = document.getElementById('content');
				container = document.getElementById('container');
				
				//Create THREE.JS scene and timer
				startTime = Date.now();
				camera = new THREE.Camera();
				camera.position.z = 1;
				scene = new THREE.Scene();
				
				//create a simple plance
				var geometry = new THREE.PlaneBufferGeometry(16, 9);
				
				//create uniform table which provide all our GLSL binding
				uniforms = {
					time: { type: "f", value: 1.0 },
					resolution: { type: "v2", value: new THREE.Vector2() },
					colsrows: {type: "v2", value: new THREE.Vector2()}
				};
				
				//create THREE.JS material
				var material = new THREE.ShaderMaterial( {
				//set shaders and uniforms into material
					uniforms: uniforms,
					vertexShader: document.getElementById('vertexShader').textContent,
					fragmentShader: document.getElementById('fragmentShader').textContent
				} );
			
				//create mesh, add it to the scene
				var mesh = new THREE.Mesh(geometry, material);
				scene.add(mesh);
				
				//create renderer and add it to the DOM
				renderer = new THREE.WebGLRenderer();
				container.appendChild(renderer.domElement);
				
				//check window for resize This will give us the proper resolution values to bind
				onWindowResize();
				window.addEventListener('resize', onWindowResize , false);
				onMouseMove();
				window.addEventListener('mousemove', onMouseMove, false);
				
			}
			function render() {
				var currentTime = Date.now();
				var elaspedSeconds =  (currentTime - startTime) / 2000.0;
				var maxTime = 4.0;
				var normTime = (elaspedSeconds % maxTime) / maxTime;
				uniforms.time.value = elaspedSeconds * 1.0;
			
				if ( renderer && renderer.render ) renderer.render(scene, camera)
			}
			
			function animate() {
			
				render();
			
				requestAnimationFrame(animate);
			}
			
			addVertex()
			 init(); 
			animate(); 
				return () => {destroyer()}
		}

    },[] )
    function destroyer() {
		
		if(onWindowResize){
		

			window.removeEventListener("resize", onWindowResize, false);
		}
	
		if(scene){
			scene = null;

		}
		if(camera){
			camera = null;

		}
		// if(_primitive){
		// 	_primitive = null;

		// }
		// if(mat){
		// 	mat = null;
		// }
		if(renderer){
			renderer.dispose()
			renderer = null;
			console.log("r",renderer)
		}
		// if(shapeGroup){
		// 	shapeGroup = new THREE.Group();
		// }
      
        // while ( bubbleContainer.firstElementChild ) {
        //   bubbleContainer.firstElementChild.remove()
        // }
      }
	  if(!isMobile){
		return (
    
			<>
		{/* <div id="main">
			<div id="content">
				<div id="title">Color<br/>Storm</div>
				<div id="header-1">	  	
					<div id="baseline">
						<p id="date">2017/11/06</p>
						<h1>#Codevember 06</h1>
						<p id="description">GLSL fragment experiment<br/>made for #codevember 2017.<br/>The theme of the day was "Storm".</p>
					</div>		  	
					<div id="author">— Code & Design by </div>
				</div>
			</div> */}
			{
				Location.pathname == "/" ?
				(
		<div id="container" className="threejs-back" data-scroll data-scroll-sticky data-scroll-target="#stick" >
				<div  className="threejs-grad"></div>
		
			<div className='threejs-dark-back'></div>
			<div className='threejs-blue-back'></div>
		
				</div>	
				):
				(
					<div id="container" className="threejs-back"  >
				<div  className="threejs-grad"></div>
		
		
				</div>	
				)
			}
			
		{/* </div> */}
		
			</>
		  )
	  }else{
		return null
	  }
  
}

export default ThreeJsSecene