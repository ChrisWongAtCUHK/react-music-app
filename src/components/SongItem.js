import { Link } from 'react-router-dom'

function SongItem({ song }) {
  return (
    <li className='flex justify-between items-center p-3 pl-6 cursor-pointer transition duration-300 hover:bg-gray-50'>
      <div>
        <Link
          to={`/song/${song.docID}`}
          className='font-bold block text-gray-600'
        >
          {song.modified_name}
        </Link>
        <span className='text-gray-500 text-sm'>{song.display_name}</span>
      </div>

      <div className='text-gray-600 text-lg'>
        <Link to={`/song/${song.docID}`}>
          <span className='comments'>
            <i className='fa fa-comments text-gray-600 router-link'></i>
            {song.comment_count}
          </span>
        </Link>
      </div>
    </li>
  )
}

export default SongItem
