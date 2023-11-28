"use client"
import { TbPlaylist } from 'react-icons/tb'
import { AiOutlinePlus } from 'react-icons/ai'
import { useUser } from '@/hooks/useUser'
import useUploadModal from '@/hooks/useUploadModal'
import UseAuthModal from '@/hooks/useAuthModal'
import { Song } from '@/types'
import MedialItem from './MedialItem'
import useOnPlay from '@/hooks/useOnPlayer'

interface LibraryProps{
    songs: Song[]
}

const Library: React.FC<LibraryProps> = ({
    songs
}) => {
    const authModal = UseAuthModal();
    const uploadModal = useUploadModal();
    const onPlay = useOnPlay(songs);
    const {user} =useUser ();
    const onClick = () =>{
        if (!user){
            return authModal.onOpen();
        }


        

        return uploadModal.onOpen();
    };
    return ( 
        <div className="flex flex-col">
        <div className="flex
        items-center
        justify-between
        px-5
        pt-4">
            <div className="inline-flex
            items-center
            gap-x-2">
        <TbPlaylist size={26} className='text-neutral-400 hover:text-white
            transition'/>
        <p className='text-neutral-400
        hover:text-white
        transition
        font-medium
        text-md'>
            Your Library
        </p>
            </div>
            <AiOutlinePlus
            onClick={onClick}
            size={20}
            className='text-neutral-400
            cursor-pointer
            hover:text-white
            transition'
            />
        </div>
        <div className='flex flex-col gap-y-2 mt-4 px-3'>
    {songs.map((item) =>(
        <MedialItem 
         onClicK={(id: string) =>onPlay(id)}
         key={item.id}
         data={item}
        />
    ))}
        </div>
        </div>
     );
}
 
export default Library;