import { GameController } from 'phosphor-react';


type ButtonProps = {
  idAd:string;
  children:string;
}


const Button = ({ children }: ButtonProps) => {
  return (
    <button      
      type="submit"
      className='bg-violet-500 px-5 h-10 rounded-md text-white font-semibold flex items-center gap-3 hover:bg-violet-600'>
      <GameController size={24} />
      {children}
    </button>
  )
}

export default Button