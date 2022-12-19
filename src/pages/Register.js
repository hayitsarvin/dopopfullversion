import React, { useState , useEffect} from 'react'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import PrivacyCheck from '../components/PrivacyCheck'
import RegisterMessagePopup from '../components/RegisterMessagePopup'
import CurtainBtn from '../helpers/CurtainBtn'
import ThreeJsSecene from '../helpers/ThreeJsSecene'
import useLoco from '../hooks/useLoco'

const Register = () => {
	const [selectedFile, setSelectedFile] = useState()
    const [preview, setPreview] = useState()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
	const [nameError, setNameError] = useState("")
    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const [registerPopupOpen, setRegisterPopupOpen] = useState(false)
	var x = window.matchMedia("(max-width: 990px)")

	useEffect(() => {
		window.addEventListener('resize', () => {

			x = window.matchMedia("(max-width: 990px)")
		}
		);
		
	},[x])
	useEffect(() => {
        if (!selectedFile) {
            setPreview(undefined)
            return
        }

        const objectUrl = URL.createObjectURL(selectedFile)
        setPreview(objectUrl)

        return () => URL.revokeObjectURL(objectUrl)
    }, [selectedFile])
	const onSelectFile = e => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined)
            return
        }
        setSelectedFile(e.target.files[0])
    }
	const RegisterHandler = (e) => {
		e.preventDefault()
		var nameOk = false
		var emailOk = false
		var passwordOk = false
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

			  setEmailError("Email is not valid");
			}else{
				setEmailError("");
				emailOk = true

			}
		  }else{
			setEmailError("Email is required!")
		  }
		  if(password){
			setPasswordError("")
			passwordOk = true

		}else{
			setPasswordError("Password is required!")
		}
		if(name){
			setNameError("")
			nameOk = true

		}else{
			setNameError("name is required!")
		}
		if(nameOk && passwordOk && emailOk){
			setRegisterPopupOpen(true)
		}
	}
	// useEffect(() => {
	// 	const body =  document.querySelector("body");
	// 	body.classList.add("body-login")
	// 	return(() => {
	// 	body.classList.remove("body-login")

	// 	})
	// })
	// useLoco(x.matches)
    return (
		<div id="viewport" data-scroll-container>
        <div id="stick-register" data-scroll-section >
		
        <div className="edit_profile register register-back">
		<ThreeJsSecene />
		<div className="container">

				<div className="container">
					<div className="row items-center">
						{/* <div className="col-lg-3"></div> */}
						<div className="col-lg-4">
							<div className="right_part space-y-20">
								<h1 className="color_white">Sign up</h1>
								<p className="color_white" style={{color: "white !important"}}>Already have an account? <span><Link to="/login">Sign in</Link></span>
								</p>
								<div className="box edit_box w-full space-y-20 back-blur back-glass-effect mt-0">
									<div className="row">
										<div className="col-lg-12 account-info">
											
											{/* <h3 className="mb-20">Account info </h3> */}
											<div className="form-group space-y-10 mb-0">
												<div className="space-y-20">
												<div className="space-y-10 register-input-border">
														

														<div className="confirm">
															<input type="text" className="form-control" placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
															{/* <a href="#" className="confirm-btn btn btn-dark btn-sm">Confirm</a> */}
														</div>

													</div>
														<p className="error">{emailError}</p>

													<div className="space-y-10 register-input-border">
						
														<input type="text" className="form-control" placeholder="Username" onChange={(e) => setName(e.target.value)} />
													</div>
														<p className="error">{nameError}</p>

													<div className="space-y-10 register-input-border">
													
														<input type="text" className="form-control" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>

													</div>
													<p className="error">{passwordError}</p>
													
													
												</div> 
											</div>
										</div>
										
									</div>
									{/* <div className="hr"></div> */}
									{/* <p className="color_black">Please take a few minutes to read and understand Stacks Terms of
										Service. To continue, you’ll need to accept the terms of services
										by checking the boxes.</p> */}
										{
											x.matches ? null :<p className="mt-0 terms-check">By clicking Create account, I agree that I have read and accepted the <span>Terms of Use</span> and <span>Privacy Policy</span>.</p>
										}
										<div>
									<a href="#" className="btn box-shadow-none btn-grad btn-mobile my-mt-40 btn-full-width boxshadow-none"  onClick={(e) => RegisterHandler(e)}>
									<CurtainBtn mode="login-btn-color"/>

										Create account
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
				registerPopupOpen ? (
					<RegisterMessagePopup RegisterOpen={registerPopupOpen} exit={() => setRegisterPopupOpen(false)} />
				): null
			}
			</div>
    )
}

export default Register
