import { UserPlus } from 'lucide-react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FormField } from '../../components/forms/FormField'
import { Button } from '../../components/ui/Button'
import { Container } from '../../components/ui/Container'
import { useAuthStore } from '../../store/slices/useAuthStore'
import { hasErrors, validateSignup } from '../../features/auth/validation/authValidation'

const initialValues = {
  confirmPassword: '',
  email: '',
  name: '',
  password: '',
  phone: '',
  terms: false,
}

export function SignupPage() {
  const [errors, setErrors] = useState({})
  const [values, setValues] = useState(initialValues)
  const navigate = useNavigate()
  const error = useAuthStore((state) => state.error)
  const isLoading = useAuthStore((state) => state.isLoading)
  const signup = useAuthStore((state) => state.signup)

  function handleChange(event) {
    const { checked, name, type, value } = event.target
    setValues((current) => ({
      ...current,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  function handleBlur() {
    setErrors(validateSignup(values))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    const nextErrors = validateSignup(values)
    setErrors(nextErrors)

    if (hasErrors(nextErrors)) {
      return
    }

    const user = await signup(values)

    if (user) {
      navigate('/profile')
    }
  }

  return (
    <main className="auth-page">
      <Container className="auth-card auth-card--wide">
        <div>
          <p className="eyebrow">Create account</p>
          <h1>Signup with secure form validation.</h1>
          <p>
            We validate email, phone, password strength, matching password, and
            consent before creating a local account.
          </p>
        </div>

        <form className="auth-form" noValidate onSubmit={handleSubmit}>
          <FormField
            autoComplete="name"
            error={errors.name}
            label="Full name"
            name="name"
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder="Your name"
            value={values.name}
          />
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
            autoComplete="tel"
            error={errors.phone}
            label="Phone"
            name="phone"
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder="9876543210"
            value={values.phone}
          />
          <FormField
            autoComplete="new-password"
            error={errors.password}
            label="Password"
            name="password"
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder="Must be at least 8 characters"
            type="password"
            value={values.password}
          />
          <FormField
            autoComplete="new-password"
            error={errors.confirmPassword}
            label="Confirm password"
            name="confirmPassword"
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder="Confirm your password"
            type="password"
            value={values.confirmPassword}
          />
      
          {error ? <p className="form-error">{error}</p> : null}
          <Button disabled={isLoading} icon={UserPlus} isFullWidth type="submit">
            {isLoading ? 'Creating account...' : 'Create account'}
          </Button>
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </form>
      </Container>
    </main>
  )
}
