import { useEffect, useState, FormEvent } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import * as Checkbox from '@radix-ui/react-checkbox';
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import axios from 'axios';
import Button from './Button';
import { toast } from 'react-toastify';

import { Check } from 'phosphor-react';
import Input from './Form/Input'


interface Game {
  id: string;
  title: string;

}

const CreateAdModal = () => {


  const [games, setGames] = useState<Game[]>([])
  const [weekDays, setWeekDays] = useState<string[]>([])
  const [useVoiceChannel, setUseVoiceChannel] = useState<boolean>(false)

  useEffect(() => {

    axios.get('http://localhost:3333/games').
      then(response => {
        setGames(response.data[0])
        //  console.log(response.data[0])
      })

  }, [])

  async function handleCreateAd(e: FormEvent) {
    e.preventDefault()

    const formData = new FormData(e.target as HTMLFormElement)
    const data = Object.fromEntries(formData)
    console.log(formData)
    console.log(data)


    try {
      await axios.post(`http://localhost:3333/games/${data.game}/ads`, {
        name: data.name,
        yearsPlaying: Number(data.yearsPlaying),
        discord: data.discord,
        weekDays: weekDays.map(Number),
        hourStart: data.hourStart,
        hourEnd: data.hourEnd,
        useVoiceChannel: useVoiceChannel
      })
      toast.success('Anuncio criado com sucesso!', {autoClose:3000})
      
    } catch (err) {
      console.log(err)
      toast.error('erro ao criar um anúncio')
    }
  }

  return (
    <Dialog.Portal>
      <Dialog.Overlay className='bg-black/60 inset-0 fixed ' />

      <Dialog.Content className='fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/10'>
        <Dialog.Title className='text-3xl text-white font-black'> Publique um anúncio </Dialog.Title>


        <form onSubmit={handleCreateAd} className='mt-8 flex flex-col gap-4'>
          <div className='flex flex-col gap-2'>
            <label htmlFor='game' className='font-semibold'>Qual o game</label>
            <select
              id='game'
              name='game'
              placeholder='Selecione um game'
              className='bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500'
              defaultValue=''
            >

              <option disabled> Selecione o game que deseja jogar</option>

              {games.map((game) => {
                return (
                  <option key={game.id} value={game.id}>{game.title}</option>
                )
              })}

            </select>
          </div>

          <div className='flex flex-col gap-2' >
            <label htmlFor=''>Seu nome (ou Nickname)</label>
            <Input
              id="name"
              name="name"
              type='text'
              placeholder='Como te chamam dentro do game'
            />
          </div>
          <div className='grid grid-cols-2 gap-6'>

            <div className='flex flex-col gap-2'>
              <label htmlFor='yearsPlaying'>Joga a quantos anos</label>
              <Input
                id="yearsPlaying"
                name="yearsPlaying"
                type="number"
                placeholder='Tudo bem ser ZERO'
              />
            </div>


            <div className="flex flex-col gap-2">
              <label htmlFor='discord'>Qual o seu discord</label>
              <Input
                id="discord"
                name="discord"
                type='text'
                placeholder='Usuario#000' />
            </div>

          </div>

          <div className='flex gap-6'>
            <div className='flex flex-col gap-2'>
              <label htmlFor='weekDays'> Quando costuma jogar</label>

              <ToggleGroup.Root
                type='multiple'
                className='grid grid-cols-4 gap-2'
                value={weekDays}
                onValueChange={setWeekDays}>


                <ToggleGroup.Item
                  value='0'
                  title='domingo'
                  className={`w-8 h-8 rounde ${weekDays.includes('0') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                >
                  D
                </ToggleGroup.Item >

                <ToggleGroup.Item
                  value='1'
                  title='segunda'
                  className={`w-8 h-8 rounde ${weekDays.includes('1') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                >
                  S
                </ToggleGroup.Item >

                <ToggleGroup.Item
                  value='2'
                  title='terça'
                  className={`w-8 h-8 rounded ${weekDays.includes('2') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                >

                  T
                </ToggleGroup.Item >

                <ToggleGroup.Item
                  value='3'
                  title='quarta'
                  className={`w-8 h-8 rounded ${weekDays.includes('3') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                >
                  Q
                </ToggleGroup.Item >
                <ToggleGroup.Item
                  value='4'
                  title='quinta'
                  className={`w-8 h-8 rounded ${weekDays.includes('4') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                >
                  Q
                </ToggleGroup.Item >
                <ToggleGroup.Item
                  value='5'
                  title='sexta'
                  className={`w-8 h-8 rounded  ${weekDays.includes('5') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                >
                  S
                </ToggleGroup.Item >
                <ToggleGroup.Item
                  value='6'
                  title='sabado'
                  className={`w-8 h-8 rounded ${weekDays.includes('6') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                >
                  S
                </ToggleGroup.Item >
              </ToggleGroup.Root>

            </div>

            <div className='flex flex-col gap-2 flex-1'>
              <label htmlFor='hoursStart'> Qual o horário do dia</label>
              <div className='grid grid-cols-2 gap-2'>
                <Input
                  id='hourStart'
                  name='hourStart'
                  type='time'
                  placeholder='De'
                />
                <Input
                  id='hourEnd'
                  name='hourEnd'
                  type='time'
                  placeholder='Até' />
              </div>
            </div>
          </div>

          <label className='mt-2 flex gap-2 text-sm items-center'>
            <Checkbox.Root
              className='w-6 p-1 h-6 rounded bg-zinc-900'
              checked={useVoiceChannel}
              onCheckedChange={(Checked) => {
                if (Checked === true) {
                  setUseVoiceChannel(true)
                } else {
                  setUseVoiceChannel(false)

                }
              }}
            >

              <Checkbox.Indicator>
                <Check className='2-4 h-4 text-emerald-400' />
              </Checkbox.Indicator>
            </Checkbox.Root>
            Costumo me conectar ao chat de voz

          </label>

          <footer className='mt-2 flex justify-end gap-4'>
            <Dialog.Close
              className='bg-zinc-500 px-5 h-10 rounded-md font-semibold'
              type='button'
            >
              Cancelar
            </Dialog.Close>

            <Button>Encontre um duo</Button>
          </footer>

        </form>


      </Dialog.Content>
    </Dialog.Portal>
  )
}

export default CreateAdModal