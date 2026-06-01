import { LogOut } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../../../components/ui/Button'
import { Container } from '../../../components/ui/Container'
import { useAuthStore } from '../../../store/slices/useAuthStore'

export function ProfilePage() {
  const navigate = useNavigate()
  const logout = useAuthStore((state) => state.logout)
  const user = useAuthStore((state) => state.user)

  async function handleLogout() {
    await logout()
    navigate('/')
  }

  if (!user) {
    return (
      <main className="page-section">
        <Container className="empty-state">
          <h1>Please login to view your profile.</h1>
          <Link className="button button--primary" to="/login">
            Login
          </Link>
        </Container>
      </main>
    )
  }

  return (
    <main className="page-section">
      <Container className="profile-card">
        <p className="eyebrow">Account</p>
        <h1>Hello, {user.name}</h1>
        <div>
          <span>Email</span>
          <strong>{user.email}</strong>
        </div>
        <div>
          <span>Phone</span>
          <strong>{user.phone}</strong>
        </div>
        <Button icon={LogOut} onClick={handleLogout} variant="secondary">
          Logout
        </Button>
      </Container>
    </main>
  )
}
