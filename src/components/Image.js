import React from "react";

function Image() {
  let imagePath = "./Images/helena.png";
  let altText = "helena";

  return (
    <div>
      <img className="card__photo" src={imagePath} alt={altText} />
    </div>
  );
}

export default Image
