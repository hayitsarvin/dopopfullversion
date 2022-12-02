import React, { useEffect, useState } from 'react';

const TimeCounter = (props) => {
  const {time} = props
  const [hour , setHour] = useState(time-1)
  const [minute , setMinutes] = useState(59)
  const [second , setSeconds] = useState(59)
 

  useEffect(() => {
    var x = setInterval(function() {
      var endTime = new Date("29 April 2023 0:31:10 GMT+01:00");
      endTime.setHours(time)
      endTime = (Date.parse(endTime) / 1000);
      var now = new Date();



      now = (Date.parse(now) / 1000);


      var timeLeft = endTime - now;


      var days = Math.floor(timeLeft / 86400);
      var hours = Math.floor((timeLeft - (days * 86400)) / 3600);
      var minutes = Math.floor((timeLeft - (days * 86400) - (hours * 3600)) / 60);
      var seconds = Math.floor((timeLeft - (days * 86400) - (hours * 3600) - (minutes * 60)));
    
      setHour(hours)
      setMinutes(minutes)
      setSeconds(seconds)


    }, 1000);

    return () => {
      clearInterval(x);
    }
  }, [])
  return (
    <div className="d-flex countdown_item
													align-items-center font-18">
													<div className="item">
														<div className="number hours"><p>{hour < 10 ? `0${hour}` : hour}</p><span></span></div>
													</div>
													<div className="dots"><p>:</p></div>
													<div className="item">
														<div className="number minutes"><p>{minute < 10 ? `0${minute}` : minute}</p><span></span></div>
													</div>
													<div className="dots"><p>:</p></div>
													<div className="item">
														<div className="number seconds"><p>{second < 10 ? `0${second}` : second}</p><span></span></div>
													</div>
												</div>
  );
};

export default TimeCounter;
