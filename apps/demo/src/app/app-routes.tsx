import { Navigate, Route, Routes } from 'react-router-dom'
import { AppDashboard } from './app-dashboard'
import { ServerRoutes } from './server/feature'

export function AppRoutes() {
  return (
    <Routes>
      <Route index element={<Navigate to="/dashboard" replace />} />
      <Route path="dashboard" element={<AppDashboard />} />
      <Route path="servers/*" element={<ServerRoutes />} />
    </Routes>
  )
}
