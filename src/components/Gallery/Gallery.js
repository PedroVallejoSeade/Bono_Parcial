import React from 'react'
import Card from '../Card/Card'
import axios from 'axios'
import { useEffect, useState } from 'react'
const md5 = require('md5')

const PRIVATE_KEY = '6d38b9b71623b6f9a3b72d1057a9449911a20ec8'
const PUBLIC_KEY = '39812a11e05b5d45c4723a44ca060140'
const TS = Date.now()

export const Gallery = () => {
    
    const [characters, setCharacters] = useState([])

    let hash = md5(`${TS}${PRIVATE_KEY}${PUBLIC_KEY}`)
    let URL = `https://gateway.marvel.com:443/v1/public/characters?ts=${TS}&apikey=${PUBLIC_KEY}&hash=${hash}`

    useEffect(()=>{
        if(!navigator.onLine){
            let charCache = null
            caches.open('characters').then(cache => {
                cache.match('/characters')
                .then(res => {
                    res.text().then(text => {
                        charCache=(JSON.parse(text))
                    })
                })
            })
            
            if(localStorage.getItem("characters") !== null) {
                setCharacters(JSON.parse(localStorage.getItem("characters")));
            } 
            // else if(charCache !== null)
            // {
            //     //Caso para hacerlo con cache... (Por terminar)
            // }
            else {
                const ch = {
                    name : 'Loading...',
                    description : 'Loading...',
                    Modified: 'Loading...'
                }

                const chrs = [ch,ch,ch,ch,ch,ch]

                setCharacters(chrs)
            }
        } else {
            fetchCharacters()
        }
    }, [])

    const fetchCharacters = () => {
        axios.get(URL)
        .then(res => {
            setCharacters(res.data.data.results)
            localStorage.setItem('characters', JSON.stringify(res.data.data.results));
            caches.open('characters')
            .then(cache => {
                cache.put('characters', new Response(JSON.stringify(res.data.data.results)))
            })
        })
        .catch(err => {
            console.log(err)
        })
        
        axios.get(URL)
        .then(res => {
            setCharacters(res.data.data.results)
        })
        .catch(err => {
            console.log(err)
        })
    }

    return (
        <div className="container-fluid">
            {characters.map((character) => (
                <Card key = {character.id} character = {character} />
            ))}
        </div>
    )
}


export default Gallery;