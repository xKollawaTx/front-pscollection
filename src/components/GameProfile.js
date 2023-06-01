import React from 'react'

const GameProfile = ({ image, name, publisher, platform, genre}) => {
  return (
<div className="card w-96 bg-base-100 shadow-xl">
  <figure><img src={image} /></figure>
  <div className="card-body">
    <h2 className="card-title">
      {name}
    </h2>
    <p>{publisher}</p>
    <div className="card-actions justify-end">
      <div className="badge badge-outline">{platform}</div>
      <div className="badge badge-outline">{genre}</div>
    </div>
  </div>
</div>
  )
}

export default GameProfile