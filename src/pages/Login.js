
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import LoginMessagePopup from '../components/LoginMessagePopup'
import CurtainBtn from '../helpers/CurtainBtn'
import ThreeJsSecene from '../helpers/ThreeJsSecene'
import useLoco from '../hooks/useLoco'

const Login = () => {
	const [loginPopupOpen , setLoginPopupOpen] = useState(false)
	const [email , setEmail] = useState("")
	const [password , setPassword] = useState("")
	const [error , setError] = useState("")
	const [errorPassword , setErrorPassword] = useState("")

	const LoginHandler = (e) => {
		e.preventDefault()
		var passwordIsOk = false
		var emailIsOk = false
		if (email) {
			let lastAtPos = email.lastIndexOf("@");
			let lastDotPos = email.lastIndexOf(".");
	  
			if (
			  !(
				lastAtPos < lastDotPos &&
				lastAtPos > 0 &&
				email.indexOf("@@") == -1 &&
				lastDotPos > 2 &&
				email.length - lastDotPos > 2
			  )
			) {

			  setError("Email is not valid");
			}else{
				setError("");
				emailIsOk= true

			}
		  }else{
			setError("Email is required!")
		  }
		  if(password){
			setErrorPassword("")
			passwordIsOk = true

		}else{
			setErrorPassword("Password is required!")
		}
		if(emailIsOk , passwordIsOk){
			setLoginPopupOpen(true)

		}
	}
	// useEffect(() => {
	// 	const body =  document.querySelector("body");
	// 	body.classList.add("body-login")
	// 	return(() => {
	// 	body.classList.remove("body-login")

	// 	})
	// })
	var x = window.matchMedia("(max-width: 992px)")
    useEffect(() => {
		window.addEventListener('resize', () => {
			x = window.matchMedia("(max-width: 992px)")
		
		}
		);
		
	},[x])
	// useLoco(x.matches)
    return (
		<div id="viewport" data-scroll-container>
        <div id='stick-login' data-scroll-section >

        <div className="edit_profile register login login-back" >
		<ThreeJsSecene />

		<div className="container">
			
				<div className="container">
					<div className="row items-center">
						{/* <div className="col-lg-7"></div> */}
						<div className="col-lg-4">
							<div className="right_part space-y-20">
								<h1 className="color_white">Sign in</h1>
								<p className="color_white" style={{color: "white !important"}}>New user? <span><Link to="/register">Create an account</Link></span>
								</p>
								<div className="box edit_box w-full space-y-20 back-blur back-glass-effect mt-0">
									<div className="space-y-10 login-input-border">
										{/* <span className="nameInput">Email </span> */}
										<div className="confirm">
											<input type="text" className="form-control" placeholder="Username"  value={email} onChange={(e) => setEmail(e.target.value)}/>
										</div>
									</div>
									<p className="error">{error}</p>

										<div className="space-y-10 login-input-border">
										{/* <span className="nameInput">Password</span>  */}
										<div className="confirm">
											<input type="password" className="form-control" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
										</div>

									</div>
									<p className="error">{errorPassword}</p>

										{/* <a className="btn btn-white btn-sm color_green"> Click to verify </a> */}
										<div>
										<a href="#" onClick={(e) => LoginHandler(e)} className="btn box-shadow-none btn-grad w-full btn-mobile mt-3 boxshadow-none" placeholder="Create an account">
											<CurtainBtn mode="login-btn-color"/>
											Login
											</a>
											</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				</div>
			</div>
			
			<Footer />
            </div>
			{
				loginPopupOpen ? (
					<LoginMessagePopup loginOpen={loginPopupOpen} exit={() => setLoginPopupOpen(false)} />
				) :
				""
			}


			</div>
    )
}

export default Login
