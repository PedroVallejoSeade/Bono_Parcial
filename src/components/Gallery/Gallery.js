import React from 'react'
import Card from '../Card/Card'
import axios from 'axios'
import { useEffect, useState } from 'react'
const md5 = require('md5')

const PRIVATE_KEY = ''
const PUBLIC_KEY = ''
const TS = Date.now()

export const Gallery = () => {
    
    const [characters, setCharacters] = useState([])

    let hash = md5(`${TS}${PRIVATE_KEY}${PUBLIC_KEY}`)
    let URL = `https://gateway.marvel.com:443/v1/public/characters?ts=${TS}&apikey=${PUBLIC_KEY}&hash=${hash}`

    console.log(hash)
    console.log(TS)

    useEffect(()=>{
        fetchCharacters()
    }, [])

    const fetchCharacters = () => {
        axios.get(URL)
        .then(res => {
            setCharacters(res.data.data.results)
        })
        .catch(err => {
            console.log(err)
        })
    }

    return (
        <div className="container-fluid" style={{display: "flex", flexWrap: "wrap", gap: '10px', justifyContent: 'center', margin: '10px 0px 10px 0px', padding: '0vw', content: '100vw'}}>
            {characters.map((character) => (
                <Card key = {character.id} character = {character} />
            ))}
        </div>
    )
}


export default Gallery;