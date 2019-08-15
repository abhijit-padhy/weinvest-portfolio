import React, { Component } from 'react';

function CardImage() {
  return (
    <div className="position-relative">
    <svg class="bd-placeholder-img card-img-top" width="100%" height="180" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: Image cap"><title>Placeholder</title><rect width="100%" height="100%" fill="#868e96"></rect><text x="40%" y="50%" fill="#dee2e6" dy=".3em">Image cap</text></svg> 
    <div className="position-absolute text-center w-100 text-light" style={{ bottom: "0"}}>HONKONG TECHNOLOGIES</div>
    </div>
  )
}

export default CardImage;