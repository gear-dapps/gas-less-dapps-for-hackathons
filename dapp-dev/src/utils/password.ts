import bcrypt from 'bcrypt';

export function IsValidPassword(password: string, encrypted: string): Promise<boolean> {
  return bcrypt.compare(password, encrypted);
}
