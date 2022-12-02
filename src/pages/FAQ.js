
import React, { useState } from 'react'

const FAQ = () => {
    const [openQ , setOpenQ] = useState(0)
  return (
    <>
    <div className="hero_questions" style={{backgroundColor:"transparent", border:"none"}}>
			    <div className="container">
			        <div className="space-y-20">
			            <h1 className="text-center">Frequently asked questions</h1>
			            {/* <p className="text-center">You can set preferred display name, create your profile URL and manage other personal settings.</p> */}
			        </div>
			    </div>
			</div>
            <div className="questions__page mt-100">
			    <div className="row justify-content-center">
			        <div className="col-lg-8">
			            <div className="row">
			                {/* <div className="col-lg-3 col-md-3 col-sm-4">
			                    <div className="box side">
			                        <div className="sidenav">
			                            <ul>
			                                <li className="d-flex align-items-center
			                                    space-x-10">
			                                    <i className="ri-home-2-line"></i>
			                                    <h6 className="text__reset" >General</h6>
			                                </li>
			                                <li className="d-flex align-items-center
			                                    space-x-10">
			                                    <i className="ri-chat-1-line"></i>
			                                    <h6 className="text__reset">Support</h6>
			                                </li>
			                                <li className="d-flex align-items-center
			                                    space-x-10">
			                                    <i className="ri-cloudy-line"></i>
			                                    <h6 className="text__reset" >Transaction</h6>
			                                </li>
			                                <li className="d-flex align-items-center
			                                    space-x-10">
			                                    <i className="ri-quill-pen-line"></i>
			                                    <h6 className="text__reset" >Fees</h6>
			                                </li>
			                            </ul>
			                        </div>
			                    </div>
			                </div> */}
			                <div className="col-lg-12 col-md-12 col-sm-12">
			                    <div className="questions__box space-y-30">
			                        <div className="accordion" id="accordionEx parent" role="tablist" aria-multiselectable="true">
			                            <a href="#" id="General"></a>
			                            <div className="accordion-header" role="tab" id="headingOne1">
			                                <a data-toggle="collapse" data-parent="#accordionEx" onClick={(e) => {setOpenQ(prev => prev == 1 ? 0 : 1); e.preventDefault()}} href="#collapseOne1" aria-expanded="false" aria-controls="collapseOne1" className="accordion-button collapsed">
			                                    What is an NFT?
			                                </a>
			                                <div id="collapseOne1" className={openQ == 1 ? "show" : "collapse"} role="tabpanel" aria-labelledby="headingOne1" data-parent="#accordionEx">
			                                    <div className="accordion-desc">
			                                        NFTs or non-fungible tokens, are
			                                        cryptographic assets on blockchain with
			                                        unique identification codes and metadata
			                                        that distinguish them from each other.
			                                        NFTs are unique and not mutually
			                                        interchangeable, which means no two NFTs
			                                        are the same. NFTs can be a unique
			                                        digital artwork, sneaker in a
			                                        limited-run fashion line, in-game item,
			                                        digital collectible etc.
			                                    </div>
			                                </div>
			                            </div>
			                        </div>
			                        <div className="accordion" id="accordionEx" role="tablist" aria-multiselectable="true">
			                            <a href="#" id="Support"></a>
			                            <div className="accordion-header" role="tab" id="headingOne2">
			                                <a data-toggle="collapse" data-parent="#accordionEx" href="#collapseOne2" onClick={(e) => {setOpenQ(prev => prev == 2 ? 0 : 2); e.preventDefault()}} aria-expanded="false" aria-controls="collapseOne2" className="accordion-button collapsed">
			                                    Customer support is available ?
			                                </a>
			                                <div id="collapseOne2" className={openQ == 2 ? "show" : "collapse"} role="tabpanel" aria-labelledby="headingOne2" data-parent="#accordionEx">
			                                    <div className="accordion-desc">
			                                        <div className="article-body"><p>You can
			                                                fill out a request for support
			                                                via email Please provide:</p>
			                                            <ul>
			                                                <li>Your email address</li>
			                                                <li>Your wallet address (if
			                                                    applicable)</li>
			                                                <li>Choose relevant categories</li>
			                                                <li>Provide detailed information
			                                                    regarding your inquiry.</li>
			                                            </ul></div>
			                                    </div>
			                                </div>
			                            </div>
			                        </div>
			                        <div className="accordion" id="accordionEx parent" role="tablist" aria-multiselectable="true">
			                            <a href="#" id="Transaction"></a>
			                            <div className="accordion-header" role="tab" id="headingOne3">
			                                <a data-toggle="collapse" data-parent="#accordionEx" href="#collapseOne3" onClick={(e) => {setOpenQ(prev => prev == 3 ? 0 : 3); e.preventDefault()}} aria-expanded="false" aria-controls="collapseOne3" className="accordion-button collapsed">
			                                    How do I find my transaction hash?
			                                </a>
			                                <div id="collapseOne3" className={openQ == 3 ? "show" : "collapse"} role="tabpane3" aria-labelledby="headingOne3" data-parent="#accordionEx">
			                                    <div className="accordion-desc">
			                                        Dopop staff often requires a
			                                        "transaction hash" from Etherscan or
			                                        Polygonscan to troubleshoot support
			                                        issues.
			                                        <br/>
			                                        Transaction hashes are unique IDs
			                                        recording each transaction on the
			                                        blockchain, this includes NFT purchases,
			                                        sales or even cancelling orders. All gas
			                                        fees paid will generate a transaction
			                                        hash.
			                                    </div>
			                                </div>
			                            </div>
			                        </div>
			                        <div className="accordion" id="accordionEx" role="tablist" aria-multiselectable="true">
			                            <a id="Fees" href="#"></a>
			                            <div className="accordion-header" role="tab" id="headingOne4">
			                                <a data-toggle="collapse" data-parent="#accordionEx" href="#collapseOne4" onClick={(e) => {setOpenQ(prev => prev == 4 ? 0 : 4); e.preventDefault()}} aria-expanded="false" aria-controls="collapseOne4" className="accordion-button collapsed">
			                                    What are gas fees on OpenSea?
			                                </a>
			                                <div id="collapseOne4" className={openQ == 4 ? "show" : "collapse"}  role="tabpane4" aria-labelledby="headingOne4" data-parent="#accordionEx">
			                                    <div className="accordion-desc">
			                                        Gas fees are like transaction fees on
			                                        the Ethereum blockchain. When you make
			                                        transactions, such as transfering crypto
			                                        to another wallet or purchasing an NFT
			                                        on Dopop, you'll need enough ETH in
			                                        your wallet for the initial transaction
			                                        and the associated gas fees.
			                                    </div>
			                                </div>
			                            </div>
			                        </div>
			                    </div>
			                </div>
			            </div>
			        </div>
			    </div>
			</div>
    </>
  )
}

export default FAQ