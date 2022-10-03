import React from "react"

export default function ProfileImage({ image, isSelected, toggle, id }) {
    return(
    <span>
        <img 
          src={image}
          alt="Waiting for connection...."
          className={isSelected ? "chosen-img" : "profile-img signup-img"}
          onClick={() => toggle(id)}
        />
    </span>
    )
}

