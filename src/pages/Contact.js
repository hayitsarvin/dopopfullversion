import React,{useState , useEffect} from 'react'
import ContactPopup from '../components/ContactPopup'
import Footer from '../components/Footer'
import PrivacyCheck from '../components/PrivacyCheck'
import CurtainBtn from '../helpers/CurtainBtn'
import ThreeJsSecene from '../helpers/ThreeJsSecene'
import useLoco from '../hooks/useLoco'

const Contact = () => {
	const [contactPopupOpen , setContactPopupOpen] = useState(false)
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
	useLoco(x.matches)
  return (

	  <div id="viewport"   >
	<div className='test123'id='stick-contact' data-scroll-section>

    <div className="contact items-center">

	<ThreeJsSecene />

			    <div className="row items-center">
			       
			        <div className="col-lg-4 contact__content">
			            <div className="container">
			                <div className="content__wrap space-y-20">
			                    <div className="space-y-20">
			                        <h1 className="text-center">{x.matches ? "Get in touch" : "Contact us"}</h1>
			                        
			                    </div>
			                    <div className="box is__big back-blur back-glass-effect">
			                        <div className="space-y-10 mb-0">
			                            <div className="row">
										<div className="col-sm-12 space-y-20 input-div-position">
			                                    <div className="space-y-10 name-margin-mobile contact-input-border">
			                                        {/* <span className="nameInput">Name</span> */}
			                                        <input type="text" className="form-control"
			                                            placeholder="Name" />
			                                    </div>
			                                    
			                                </div>
			                                <div className="col-sm-12 space-y-20 mt-3 input-div-position">
			                                    <div className="space-y-10 contact-input-border">
			                                        {/* <span className="nameInput">Email</span> */}
			                                        <input type="email" className="form-control"
			                                            placeholder="Email" />
			                                    </div>
			                                    {/* <div className="space-y-10">
			                                        <span className="nameInput">Select Country</span>
			                                        <select className="form-select
			                                            custom-select" aria-label="Default
			                                            select example">
			                                            <option>United States</option>
			                                            <option>Finland</option>
			                                            <option>Norway</option>
			
			                                        </select>
			                                    </div> */}
			                                </div>
			                                
											{/* <div className="col-12 mt-3">
											<div className="space-y-10">
			                                        <span className="nameInput">Subject</span>
			                                        <select className="form-select
			                                            custom-select" aria-label="Default
			                                            select example">
			
			                                            <option>Service Request</option>
			                                            <option>NFT items</option>
			                                            <option>Wallet</option>
			                                            <option>Purchase</option>
			                                            <option>Support</option>
			                                        </select>
			                                    </div>
											</div> */}
			                                <div className="col-12 mt-20 input-div-position">
			                                    <div className="space-y-10 contact-input-border message-border">
			                                        {/* <span className="nameInput">Message</span> */}
			                                        <textarea style={{minHeight: "120px"}}
			                                            className="mb-0" placeholder="Message">
			                                        </textarea>
			                                    </div>
			                                </div>
											<PrivacyCheck />
											<div className="send-btn-div mt-0">
											<a href="#" onClick={(e) =>{ e.preventDefault;setContactPopupOpen(true)}} className="btn box-shadow-none btn-grad w-full btn-mobile mt-5 boxshadow-none" placeholder="Create an account">
												<CurtainBtn mode="contact-btn-color"/>
												Send
												</a>
											</div>
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
				contactPopupOpen ? (

					<ContactPopup contactOpen={contactPopupOpen} exit={() => setContactPopupOpen(false)} />

				) :
				""
			}

			</div>
  )
}

export default Contact