const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const phonePattern = /^[6-9]\d{9}$/

export function validateEmail(email) {
  if (!email.trim()) {
    return 'Email is required.'
  }

  if (!emailPattern.test(email.trim())) {
    return 'Enter a valid email address.'
  }

  return ''
}

export function validatePassword(password) {
  if (!password) {
    return 'Password is required.'
  }

  if (password.length < 8) {
    return 'Password must be at least 8 characters.'
  }

  if (!/[A-Z]/.test(password) || !/[a-z]/.test(password)) {
    return 'Use uppercase and lowercase letters.'
  }

  if (!/\d/.test(password)) {
    return 'Add at least one number.'
  }

  if (!/[^A-Za-z0-9]/.test(password)) {
    return 'Add at least one special character.'
  }

  return ''
}

export function validateLogin(values) {
  return {
    email: validateEmail(values.email),
    password: values.password ? '' : 'Password is required.',
  }
}

export function validateSignup(values) {
  return {
    confirmPassword:
      values.confirmPassword === values.password ? '' : 'Passwords do not match.',
    email: validateEmail(values.email),
    name: values.name.trim().length >= 2 ? '' : 'Name must be at least 2 characters.',
    password: validatePassword(values.password),
    phone: phonePattern.test(values.phone.trim())
      ? ''
      : 'Enter a valid 10-digit Indian mobile number.',
    terms: values.terms ? '' : 'Please accept the terms to continue.',
  }
}

export function hasErrors(errors) {
  return Object.values(errors).some(Boolean)
}
