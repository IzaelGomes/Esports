import './styles/main.css'

import logoImage from './assets/Logo-nlw-esports.svg'
//import {MagnifyingGlassPlus } from 'phosphor-react'

import {useState, useEffect} from 'react'
import * as Dialog from '@radix-ui/react-dialog'

import GameBanner from  './components/GameBanner';
import CreateAdBanner from './components/CreateAdBanner';


interface Game {
  id : string;
  title: string;
  bannerUrl: string;
  _count: {
    Ads:number;
  }
}

function App() {

  const [games, setGames] = useState<Game[]>([])

  useEffect(() =>{
   
        const fetchGames = async () =>{
          try {
            const res = await fetch('http://localhost:3333/games')
            const games = await res.json()

            setGames(games[0])
          } catch(err){
            console.log(err);
          }
        }
        
        fetchGames()
  },[])

  return (
    <div className="max-w-[1344px] mx-auto flex flex-col items-center my-20">
        <img src={logoImage} alt='logo'/>

        <h1 className='text-6xl text-white font-black mt-20 mb-20'>
        Seu <span className=' text-transparent bg-nlw-gradient bg-clip-text'>duo</span> está aqui.
        </h1>

       <div className='grid grid-cols-6 gap-6 mt-6'>
          {games.map(({id, title, bannerUrl, _count}) => {
            return(
             
              <GameBanner 
              key={id} 
              title={title} 
              bannerUrl={bannerUrl} 
              adsCount={_count.Ads} 
              />
          
            )
          })}
      </div>

      <Dialog.Root>
        <CreateAdBanner/>

        <Dialog.Portal>
          <Dialog.Overlay className='bg-black/60 inset-0 fixed' />

            <Dialog.Content>
              <Dialog.Title> Publique um anúncio </Dialog.Title> 

              <Dialog.Content className='fixed bg-[#2A2634] py-8 px-10 text-white'> 
                ola aqui é um modal 
              </Dialog.Content>
            </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
     
  </div>
)
 
}

export default App
