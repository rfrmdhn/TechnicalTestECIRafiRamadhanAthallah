export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  if (body.email === 'test@example.com' && body.password === 'Test123!') {
    return {
      success: true,
      token: 'dummy-token-123'
    }
  }

  return {
    success: false,
    message: 'Invalid credentials'
  }
})
