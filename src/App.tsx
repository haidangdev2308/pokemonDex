import React, { useState, useEffect } from 'react'
import PokemonCollection from './component/PokemonCollection'
import './App.css'
import axios from 'axios'
import { Pokemon, Detail } from './interface'

interface pokemons {
  name: string,
  url: string
}



const App: React.FC = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([])
  const [nextUrl, setNextUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [viewDetail, setDetail] = useState<Detail>({
    id: 0,
    isOpened: false,
  });

  useEffect(() => {
    const getPokemon = async () => {
      const res = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=20&offset=20") //lấy các pokemon
      setNextUrl(res.data.next);
      res.data.results.forEach(async (pokemon: pokemons) => {
        const poke = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`) //lấy data từng pokemon
        setPokemons((p) => [...p, poke.data]) //chuyển thành array
      })

    }
    getPokemon()
  }, [])

  const nextPage = async () => {
    setLoading(true);
    let res = await axios.get(nextUrl);
    setNextUrl(res.data.next);
    res.data.results.forEach(async (pokemon: pokemons) => {
      const poke = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
      );
      setPokemons((p) => [...p, poke.data]);
      setLoading(false);
    });
  };

  return (
    <>
      <div className="h-screen flex flex-col items-center my-[1rem] mx-[2rem]">
        <header className="text-center text-[2.5rem] tracking-[0.25rem] font-bold text-[#ee4f4f]">PokéDex</header>
        <PokemonCollection
          pokemons={pokemons}
          viewDetail={viewDetail}
          setDetail={setDetail} />

        {!viewDetail.isOpened && (
          <div className="w-6/12 mt-6 flex justify-around">
            <button className='cursor-pointer bg-white text-red-950 p-4 text-xl rounded-[12px]
          hover:opacity-50 transition-opacity drop-shadow-md hover:drop-shadow-xl' onClick={nextPage}>
              {loading ? "Loading..." : "Load more"}{" "}
            </button>
          </div>
        )}
      </div>
    </>
  )
}

export default App
