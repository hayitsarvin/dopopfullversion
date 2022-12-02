import React, { useEffect, useState } from 'react'
import Footer from '../components/Footer'
import WalletErrorPopup from '../components/WalletErrorPopup'
import useLoco from '../hooks/useLoco'

const ConnectWallet = () => {
	const [walletOpen,setWalletOpen] = useState(false)
	useEffect(() => {
		const wallet = document.querySelectorAll(".wallets .col-lg-4")
		wallet.forEach(w => {
			w.addEventListener("click", (e) => {
				if(!walletOpen){
					setWalletOpen(true)
					
				}
				e.preventDefault()
			});
		})
	}, [])
	var x = window.matchMedia("(max-width: 992px)")
    useEffect(() => {
		window.addEventListener('resize', () => {
			x = window.matchMedia("(max-width: 992px)")
		
		}
		);
		
	},[x])
	useLoco(x.matches)
    return (
		<div id="viewport">
		{walletOpen ? (
			<WalletErrorPopup  walletOpen={walletOpen} exit={() => setWalletOpen(false)}/>
		)
		: ""

	}
		
        <div className="effect">
		<div className="container">
			
				<div className="container">
					 {/* <a href="/" className="btn btn-white btn-sm mt-20">
						Back to home</a> */}
					<div className="hero__wallets pt-100 pb-50">
						<div className="space-y-20 d-flex flex-column align-items-center">
							{/* <div className="logo">
								<img src="/img/icons/logo.svg" alt="" />
							</div> */}
							<h2 className="text-center">Connect your wallet</h2>
							<p className="text-center">Choose one of the available wallet providers
							</p>
						</div>
					</div>		<div className="row justify-content-center">
						<div className="col-lg-9">
							<div className="wallets">
								<div className="row mb-20_reset">
									
									<div className="col-lg-4  ">
										<a href="#"  className="box in__wallet space-y-10" data-toggle="modal" data-target="#popup_connected">
											
										</a>
										<div className="wallet-content-div space-y-10 ">
										<div className="logo">
												<img src="/img/icons/coibase.svg" alt="logo_community" />
											</div>
											<h5 className="text-center">coinbase</h5>
											<p className="text-center">A wallet that works on both mobile and through a browser extension.</p>
										</div>
									</div>
									
									<div className="col-lg-4 ">
										<a href="#" className="box in__wallet space-y-10" data-toggle="modal" data-target="#popup_error">
											
										</a>
										<div className="wallet-content-div space-y-10 ">
										<div className="logo">
												<img src="/img/icons/metamask.svg" alt="logo_community" />
											</div>
											<h5 className="text-center">metamask</h5>
											<p className="text-center">A browser extension with great flexibility. The web's popular wallet</p>
										</div>
									</div>
									
									<div className="col-lg-4 ">
										<a href="#" className="box in__wallet space-y-10" data-toggle="modal" data-target="#popup_connected">
											
										</a>
										<div className="wallet-content-div space-y-10 ">
										<div className="logo">
												<img src="/img/icons/torus.svg" alt="logo_community" />
											</div>
											<h5 className="text-center">fortmatic</h5>
											<p className="text-center">A wallet that allows you to sign up with your phone number on any device.</p>
										</div>
									</div>
									
									<div className="col-lg-4 ">
										<a href="#" className="box in__wallet space-y-10 " data-toggle="modal" data-target="#popup_error">
											
										</a>
										<div className="wallet-content-div space-y-10 ">
										<div className="logo">
												<img src="/img/icons/fortmatic.svg" alt="logo_community" />
											</div>
											<h5 className="text-center">torus</h5>
											<p className="text-center">Log in with Google, Facebook, or other OAuth providers</p>
										</div>
									</div>
									
									<div className="col-lg-4 ">
										<a href="#" className="box in__wallet space-y-10 " data-toggle="modal" data-target="#popup_connected">
											
										</a>
										<div className="wallet-content-div space-y-10 ">
										<div className="logo">
												<img src="/img/icons/bitski.svg" alt="logo_community" />
											</div>
											<h5 className="text-center">bitski</h5>
											<p className="text-center">A wallet that allows you to sign in with an email and password</p>
										</div>
									</div>
									
									<div className="col-lg-4 ">
										<a href="#" className="box in__wallet space-y-10 " data-toggle="modal" data-target="#popup_error">
											
										</a>
										<div className="wallet-content-div space-y-10 ">
										<div className="logo">
												<img src="/img/icons/walletconnect.svg" alt="logo_community" />
											</div>
											<h5 className="text-center">walletconnect</h5>
											<p className="text-center">Log in with Google, Facebook, or other OAuth provider</p>
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
    )
}

export default ConnectWallet
