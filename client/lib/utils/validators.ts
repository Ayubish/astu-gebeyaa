export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const validatePassword = (password: string): boolean => {
  return password.length >= 8
}

export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^[0-9]{10}$/
  return phoneRegex.test(phone.replace(/\D/g, ""))
}

export const validateForm = (data: Record<string, string>): Record<string, string> => {
  const errors: Record<string, string> = {}

  if (data.email && !validateEmail(data.email)) {
    errors.email = "Please enter a valid email address"
  }

  if (data.password && !validatePassword(data.password)) {
    errors.password = "Password must be at least 8 characters"
  }

  if (data.confirmPassword && data.password !== data.confirmPassword) {
    errors.confirmPassword = "Passwords do not match"
  }

  if (data.phone && !validatePhone(data.phone)) {
    errors.phone = "Please enter a valid phone number"
  }

  return errors
}
