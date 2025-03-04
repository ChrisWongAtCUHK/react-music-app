import { Link } from "react-router-dom"

function AppHeader() {
  return (<header id='header' className='bg-gray-700'>
    <nav className="container mx-auto flex justify-start items-center py-5 px-4">
      <Link to='/' className="text-white font-bold uppercase text-2xl mr-4">Music</Link>
    </nav>
  </header>)
}

export default AppHeader
