import React from 'react'


//import {BrowserRouter, Routes, Route } from 'react-router-dom'

import logoImage from '../../assets/Logo-nlw-esports.svg'
import '../../styles/main.css'

//import {MagnifyingGlassPlus } from 'phosphor-react'

import { useState, useEffect } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import DotLoader from "react-spinners/DotLoader";


import CreateAdModal from '../CreateAdModal'
import GameBanner from '../GameBanner';
import CreateAdBanner from '../CreateAdBanner';

interface Game {
  id: number;
  title: string;
  bannerUrl: string;
  _count: {
    Ads: number;
  }

}
const Home = () => {

  const [games, setGames] = useState<Game[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    setLoading(true)
    const fetchGames = async () => {
      try {
        const res = await fetch('http://localhost:3333/games')
        const games = await res.json()

        setLoading(false)
        setGames(games[0])
      } catch (err) {
        console.log(err);
      }
    }

    fetchGames()
    console.log()
  }, [])


  return (

    <div className="max-w-[1344px] mx-auto flex flex-col items-center my-20">
      <img src={logoImage} alt='logo' />



      <h1 className='text-6xl text-white font-black mt-20 mb-20'>
        Seu <span className=' text-transparent bg-nlw-gradient bg-clip-text'>duo</span> está aqui.
      </h1>

      {loading && <DotLoader className='mt-20' color='#5c1894' size={40} loading={loading} />}

      <div className='grid grid-cols-6 gap-6 mt-6 '>
        {games.map(({ id, title, bannerUrl, _count }) => {
          return (

            <GameBanner
              key={id}
              id={id}
              title={title}
              bannerUrl={bannerUrl}
              adsCount={_count.Ads}
            />

          )
        })}
      </div>
      <Dialog.Dialog>
        <Dialog.Root>
          <CreateAdBanner />

          <CreateAdModal />
        </Dialog.Root>
      </Dialog.Dialog>
    </div>
  )
}

export default Home 