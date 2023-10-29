import React from 'react'
import { Pokemon, Detail, PokemonDetail } from '../interface'
import PokemonList from './PokemonList'

interface Props {
  pokemons: PokemonDetail[] //khai báo type prop pokemons truyền vào là array
  viewDetail: Detail;
  setDetail: React.Dispatch<React.SetStateAction<Detail>>;
}


const PokemonCollection: React.FC<Props> = (props) => {

  const { pokemons, viewDetail, setDetail } = props

  const selectPokemon = (id: number) => {
    if (!viewDetail.isOpened) {
      setDetail({
        id: id,
        isOpened: true,
      });
    }
  }

  return (
    <div>
      <section
        className={
          viewDetail.isOpened
            ? "overflow-y-hidden mt-8 font-semibold flex justify-center items-center flex-wrap"
            : " mt-8 font-semibold flex justify-center items-center flex-wrap"
        }>
        {
          pokemons.map((pokemon) => (
            <div
              onClick={() => selectPokemon(pokemon.id)}
              className='hover:opacity-70 transition-opacity drop-shadow-md hover:drop-shadow-xl relative'>
              <PokemonList
                viewDetail={viewDetail}
                setDetail={setDetail}
                key={pokemon.id}
                name={pokemon.name}
                id={pokemon.id}
                abilities={pokemon.abilities}
                image={pokemon.sprites?.front_default}
              />
            </div>
          ))
        }
      </section>
    </div>
  )
}

export default PokemonCollection