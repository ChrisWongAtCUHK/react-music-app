import { Outlet } from 'react-router-dom'
import AppHeader from '../components/AppHeader'
import Player from '../components/Player'

function Layout() {
  return (
    <>
      <AppHeader />
      <Outlet />
      <Player />
    </>
  )
}

export default Layout
