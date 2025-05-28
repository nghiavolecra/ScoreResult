import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainLayout from './layout/main-layout'
import DashboardPage from './pages/DashboardPage'
import ReportsPage from './pages/ReportsPage'
import SearchScoresPage from './pages/SearchScoresPage'
import { SidebarProvider } from './components/ui/sidebar'
import SettingsPage from './pages/SettingsPage'

function App() {
  return (
    <SidebarProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<MainLayout />}>
            <Route index path='/' element={<DashboardPage />} />
            <Route path='/report' element={<ReportsPage />} />
            <Route path='/search-scores' element={<SearchScoresPage />} />
            <Route path='/settings' element={<SettingsPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </SidebarProvider>
  )
}

export default App
