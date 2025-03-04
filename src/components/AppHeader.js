import { Link } from "react-router-dom"

function AppHeader() {
  return (
  <header id='header' className='bg-gray-700'>
    <nav className="container mx-auto flex justify-start items-center py-5 px-4">
      {/* App Name */}
      <Link to='/' className="text-white font-bold uppercase text-2xl mr-4">Music</Link>
      <div className="flex flex-grow items-center">
        {/* Primary Navigation */}
        <ul className="flex flex-row mt-1">
          {/* Navigation Links */}
          <li>
            <Link className="px-2 text-white" to="/about">About</Link>
          </li>
        </ul>
      </div>
    </nav>
  </header>)
}

export default AppHeader
