import { LogIn } from 'lucide-react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FormField } from '../../components/forms/FormField'
import { Button } from '../../components/ui/Button'
import { Container } from '../../components/ui/Container'
import { useAuthStore } from '../../store/slices/useAuthStore'
import { hasErrors, validateLogin } from '../../features/auth/validation/authValidation'

const initialValues = {
  email: '',
  password: '',
}

export function LoginPage() {
  const [errors, setErrors] = useState({})
  const [values, setValues] = useState(initialValues)
  const navigate = useNavigate()
  const error = useAuthStore((state) => state.error)
  const isLoading = useAuthStore((state) => state.isLoading)
  const login = useAuthStore((state) => state.login)

  function handleChange(event) {
    const { name, value } = event.target
    setValues((current) => ({ ...current, [name]: value }))
  }

  function handleBlur() {
    setErrors(validateLogin(values))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    const nextErrors = validateLogin(values)
    setErrors(nextErrors)

    if (hasErrors(nextErrors)) {
      return
    }

    const user = await login(values)

    if (user) {
      navigate('/profile')
    }
  }

  return (
    <main className="auth-page">
      <Container className="auth-card">
        <div>
          <p className="eyebrow">Welcome back</p>
          <h1>Login to continue your watch journey.</h1>
          <p>Demo account: aarav@example.com / Demo@12345</p>
        </div>

        <form className="auth-form" noValidate onSubmit={handleSubmit}>
          <FormField
            autoComplete="email"
            error={errors.email}
            label="Email"
            name="email"
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder="you@example.com"
            type="email"
            value={values.email}
          />
          <FormField
            autoComplete="current-password"
            error={errors.password}
            label="Password"
            name="password"
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder="Your password"
            type="password"
            value={values.password}
          />
          {error ? <p className="form-error">{error}</p> : null}
          <Button disabled={isLoading} icon={LogIn} isFullWidth type="submit">
            {isLoading ? 'Signing in...' : 'Login'}
          </Button>
          <p>
            New to Chronora? <Link to="/signup">Create an account</Link>
          </p>
        </form>
      </Container>
    </main>
  )
}
