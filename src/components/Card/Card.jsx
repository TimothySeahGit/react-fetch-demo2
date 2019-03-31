import React from "react";

function Card({ imageUrl, title, buttonPress }) {
  const styles = { width: "18rem" };

  return (
    <div key={title} className="card m-3" style={styles}>
      <img
        src={imageUrl}
        onClick={() => buttonPress(title)}
        className="card-img-top"
        alt="..."
      />

      <div className="card-body">
        <h5 className="card-title">{title}</h5>
      </div>
    </div>
  );
}

export default Card;
