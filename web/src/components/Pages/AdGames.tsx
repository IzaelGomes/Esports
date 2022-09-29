//import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Logo from '../../assets/Logo-nlw-esports.svg'
import Button from '../Button';
import * as Dialog from '@radix-ui/react-dialog'




interface Ads {
  id: number;
  name: string;
  hourEnd: string;
  hourStart: string;
  useVoiceChannel: boolean;
  weekDays: [];
  yearsPlaying: number;
}

const AdGames = () => {

  const { id } = useParams()
  const [ads, setAds] = useState<Ads[]>([])

  useEffect(() => {

    async function getAdGamer() {
      const ad = await fetch(`http://localhost:3333/games/${id}/ads`)
      const adGamer = await ad.json()
      setAds(adGamer)
      // console.log(adGamer)

    }
    getAdGamer()


    /* async function getGamerInformation(){
       const data  = await fetch(`http://localhost:3333/${id}`)
       const game = await data.json()
       console.log(game)

     }
     getGamerInformation()
*/
  }, [])


  return (
    <>
      <Dialog.Root>
        <div className='max-w-[1344px] mx-auto flex flex-col items-center my-20'>
          <img src={Logo} alt='Logo' className='mb-20' />
          <h1 className='text-white text-5xl max-w-[680px] text-center font-bold'> Adcione o jogador mais compatível com sua rotina e <span className='text-transparent bg-nlw-gradient bg-clip-text'>LETS PLAY</span></h1>
        </div>

        {ads.length == 0 ? <p className='text-white ml-24 font-bold'>Esse jogo não tem anúncios🙁</p> : <h2 className='font-bold text-white mb-10 ml-24 '>Conecte-se e começe a jogar!</h2>}


        <div className='max-w-[1344px] mx-auto pt-15 flex gap-7 pb-20'>

          {ads.map(({ name, id, hourEnd, hourStart, yearsPlaying, weekDays, useVoiceChannel }) => {
            return (
              <div key={id} className='bg-[#2A2634] max-w-[280px] px-7 py-3 rounded-md'>
                <span className='text-zinc-400 block'>Nome</span>
                <p className='text-white pb-3'>{name}</p>

                <span className='text-zinc-400 block'>Tempo de jogo</span>
                <p className='text-white pb-3'>{yearsPlaying} anos(s)</p>

                <span className='text-zinc-400 block'>Disponibilidade</span>
                <p className='text-white pb-3'>{weekDays.length} Dias, {hourStart}-{hourEnd}</p>

                <span className='text-zinc-400 block'>Chamada de áudio</span>
                <p className='text-white pb-3 text-'>{useVoiceChannel ? <span className='text-green-500 font-semibold'>SIM</span> : 'NÃO'}</p>

                <Dialog.Trigger>
                  <Button>Conectar</Button>
                </Dialog.Trigger>
              </div>
            )
          })}

          <Dialog.Portal>
            <Dialog.Overlay className='bg-black/60 inset-0 fixed' />
            <Dialog.Content className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
              <div className='flex flex-col w-60 items-center bg-[#2A2634] px-5 py-20 rounded-md'>
                <h2 className='text-white text-lg font-semibold text-center'>Let's play!</h2>
                <span className='text-zinc-300 pb-3 text-center text-xs'>agora é só começar a jogar</span>
                <span className='text-white text-sm pb-1 text-center '>Adcione no Discord</span>
                <button className='bg-black text-white w-40 px-1 py-1 rounded-md'>izael#123</button>
              </div>
            </Dialog.Content>
          </Dialog.Portal>

        </div>
      </Dialog.Root>
    </>
  )
}

export default AdGames