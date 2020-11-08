import { useState, useEffect } from 'react';

function GetChuckJoke() {
    const url = 'https://api.chucknorris.io/jokes/random';
    const [joke, setJoke] = useState('');

    function getJoke() {
        fetch(url, { headers: { 'Accept': 'application/json' } })
            .then(res => res.json())
            .then(data => {
                setJoke(data.value)
            })
    }

    return (
        <div>
            <h1>Ex2</h1>
            <button onClick={getJoke}>Get ChuckNorris</button>
            <p>{joke}</p>
        </div>
    )
}

function DadJoke() {
    const url = 'https://icanhazdadjoke.com/';
    const [joke, setJoke] = useState('');
    function getJoke() {
        fetch(url, { headers: { 'Accept': 'application/json' } })
            .then(res => res.json())
            .then(data => {
                setJoke(data.joke)
            })
    }

    useEffect(() => {
        const interval = setInterval(() => {
            getJoke()
        }, 10000)
        return () =>{
            clearInterval(interval)
        }
    }, [])

    return (
        <div>
            <h2>Dad Joke</h2>
            <p>{joke}</p>
        </div>
    )


}

export const DadJokes = DadJoke;
export const GetJokes = GetChuckJoke;