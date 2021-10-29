import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'

const Joke = () => {
    const [joke, setJoke] = useState([])

    useEffect(() => {
        
    }, [])

    useEffect(()=>{
        if(!navigator.onLine){
            console.log('HOLA')
            if(localStorage.getItem("joke") === null) {
                setJoke("Loading...")
            } else {
                setJoke(localStorage.getItem("joke"));
            }
        } else {
            fetchJokes()
        }
    }, []);
    
    const fetchJokes = () => {
        axios.get('https://api.chucknorris.io/jokes/random')
        .then(res => {
            setJoke(res.data.value)
            localStorage.setItem("joke", res.data.value);
            // caches.open('joke')
            // .then(cache => {
            //     cache.put('joke', new Response(res.data.value))
            // })
        })
        .catch(err => {
            console.log(err)
        })
    }

    return (
        <div className="Joke">
            <h1>Joke</h1>
            <p>{joke}</p>
        </div>
    )
}

export default Joke
