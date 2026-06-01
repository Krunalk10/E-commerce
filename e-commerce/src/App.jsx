import { useEffect } from 'react'
import { AppRouter } from './app/router/AppRouter'
import { useAuthStore } from './store/slices/useAuthStore'

export default function App() {
  const bootstrap = useAuthStore((state) => state.bootstrap)

  useEffect(() => {
    bootstrap()
  }, [bootstrap])

  return <AppRouter />
}
