const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const MIN_PASSWORD_LENGTH = 6;

export function isValidEmail(email: string) {
  return EMAIL_REGEX.test(email.trim());
}
