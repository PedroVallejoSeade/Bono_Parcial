import React from 'react'

export const Card = ({character}) => {
    return (
    <div className="character" style={{border: 'solid', margin : '100px', backgroundColor: 'brown'}}>
        <img className="char-img" src={`${character.thumbnail.path}.${character.thumbnail.extension}`} alt="Marvel Character Picture"/>
            <h1 className="char-name">{character.name}</h1>
            <p className="char-description"><a style={{fontWeight: 'bold'}}>Description</a> : {character.description}</p>
            <p className="char-mod">Modified : {character.modified}</p>
    </div>
    )
}

export default Card;