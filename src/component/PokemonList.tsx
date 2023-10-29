import React, { useEffect, useState } from 'react'
import { Detail } from '../interface';

interface Props {
    viewDetail: Detail;
    setDetail: React.Dispatch<React.SetStateAction<Detail>>;
    abilities:
    | {
        name: string;
        ability: string;
    }[]
    | undefined;
    name: string;
    id: number;
    image: string;
}

const PokemonList: React.FC<Props> = (props) => {

    const { name, id, image, abilities, viewDetail, setDetail } = props
    const [isSelected, setSelected] = useState(false);

    useEffect(() => {
        setSelected(id === viewDetail?.id);
    }, [viewDetail]);

    const closeDetail = () => {
        setDetail({
            id: 0,
            isOpened: false,
        });
    };

    return (
        <div className=''>
            {isSelected ? (
                <section className=" bg-white   rounded-[12px] w-[270px] h-[300px] text-center">
                    <div className="flex flex-col justify-center items-center z-[1000]">
                        <p className="cursor-pointer text-2xl text-red-600" onClick={closeDetail}>
                            X
                        </p>
                        <div className="bg-orange-300 w-full flex justify-center items-center"
                        style={{
                            backgroundImage: 'linear-gradient(0deg, #f2cc8f 0%, #f8f3d9 100%)'
                        }}>
                            <img src={image} alt="pokemon" className="detail-img" />
                            <p className="text-2xl text-indigo-900 font-bold"> {name}</p>
                        </div>
                        <div className="self-start flex-wrap flex gap-2 m-4 text-start">
                            <p className="text-indigo-900 font-bold text-xl"> Ablities: </p>
                            {abilities?.map((ab: any) => {
                                return <div className=""> {ab.ability.name}</div>;
                            })}
                        </div>
                    </div>
                </section>
            ) : (
                <section className="flex px-[1rem] rounded-[12px] cursor-pointer flex-col bg-white m-4 justify-center items-center">
                    <p className="mt-[0.5rem] text-red-950"> {name} </p>
                    <img src={image} alt="pokemon" />
                </section>
            )}
        </div>
    )
}

export default PokemonList