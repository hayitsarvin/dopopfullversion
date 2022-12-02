

export const LikesCount = (likes) => {
  if(likes <1000){
      return likes
  }else{
      return (likes/1000).toFixed(1) + "k"
  } 
};


