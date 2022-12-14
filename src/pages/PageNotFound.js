import React from 'react'

const PageNotFound = () => {
    return (
        <div className="not__found">
			    <div className="container">
			        <div className="row justify-content-center align-items-center pt-100">
			            <div className="col-lg-3 d-none d-lg-block">
			                <img className="img-fluid" src="/img/bg/left-Skull.png" alt="" />
			
			            </div>
			            <div className="col-lg-6">
			
			
			                <div className="space-y-30 content">
			                    <div className="space-y-20 d-flex flex-column
			                        justify-content-center align-items-center">
			                        <img src="/img/bg/404.png" alt="" />
			                        <h2 className="text-center">whooops 🥺! Page not Found</h2>
			                        <p className="text-center">Maybe bigfoot has broken this
			                            page.
			                            Come back to the Homepage
			                        </p>
			                        <div><a href="/" className="btn btn-grad">Go Back</a></div>
			                    </div>
			                </div>
			
			            </div>
			            <div className="col-lg-3 d-none d-lg-block">
			                <img className="img-fluid" src="/img/bg/right-Skull.png" alt="" />
			
			            </div>
			
			
			
			        </div>
			    </div>
			</div>
    )
}

export default PageNotFound
