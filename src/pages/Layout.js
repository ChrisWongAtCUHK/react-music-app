import { Outlet } from 'react-router-dom'
import AppHeader from '../components/AppHeader'

function Layout() {
  return (
    <>
      <AppHeader />
      <Outlet />
    </>
  )
}

export default Layout
