import React from 'react'

export const Card = ({character}) => {
    return (
    <div className="card" style={{width: '14rem'}}>
        <img className="card-img-top" src={`${character.thumbnail.path}.${character.thumbnail.extension}`} alt="Card image cap"/>
        <div className="card-body">
            <h5 className="card-title">{character.name}</h5>
            <p className="card-text">Description : {character.description}</p>
            <p className="card-text">Modified : {character.modified}</p>
        </div>
    </div>
    )
}

export default Card;