import { Link } from 'react-router-dom'

interface GameBannerProps {
    bannerUrl: string;
    title: string;
    adsCount: Number;
    id: number;
}

const GameBanner = (props: GameBannerProps) => {
    return (
        <Link to={`/AdGames/${props.id}`} className='relative rounded-lg overflow-hidden transition delay-130 hover:scale-110 '>
            <img src={props.bannerUrl} alt='' />

            <div className='w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0'>
                <strong className='font-bold text-white'>{props.title}</strong>
                <span className='text-zinc-300 text-sm block mt-1'>{props.adsCount} anúncio(s)</span>
            </div>
        </Link>
    )
}

export default GameBanner