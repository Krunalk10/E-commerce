import { demoUsers } from '../../../data/local-db'
import { delay, makeApiResponse, readStorage, writeStorage } from '../../client/localApiClient'

const USERS_KEY = 'chronora_users'
const SESSION_KEY = 'chronora_session'

function getUsers() {
  const storedUsers = readStorage(USERS_KEY, null)

  if (storedUsers) {
    return storedUsers
  }

  writeStorage(USERS_KEY, demoUsers)
  return demoUsers
}

function sanitizeUser(user) {
  const safeUser = { ...user }
  delete safeUser.password
  return safeUser
}

export async function loginUser({ email, password }) {
  await delay(220)
  const normalizedEmail = email.trim().toLowerCase()
  const user = getUsers().find(
    (candidate) =>
      candidate.email.toLowerCase() === normalizedEmail &&
      candidate.password === password,
  )

  if (!user) {
    throw new Error('Invalid email or password.')
  }

  const session = sanitizeUser(user)
  writeStorage(SESSION_KEY, session)
  return makeApiResponse(session)
}

export async function signupUser(payload) {
  await delay(260)
  const users = getUsers()
  const normalizedEmail = payload.email.trim().toLowerCase()

  if (users.some((user) => user.email.toLowerCase() === normalizedEmail)) {
    throw new Error('An account already exists with this email.')
  }

  const user = {
    id: `usr-${Date.now()}`,
    createdAt: new Date().toISOString(),
    email: normalizedEmail,
    name: payload.name.trim(),
    password: payload.password,
    phone: payload.phone.trim(),
    role: 'customer',
  }

  const nextUsers = [...users, user]
  writeStorage(USERS_KEY, nextUsers)

  const session = sanitizeUser(user)
  writeStorage(SESSION_KEY, session)
  return makeApiResponse(session)
}

export async function getCurrentUser() {
  await delay(120)
  return makeApiResponse(readStorage(SESSION_KEY, null))
}

export async function logoutUser() {
  await delay(80)
  window.localStorage.removeItem(SESSION_KEY)
  return makeApiResponse(true)
}
