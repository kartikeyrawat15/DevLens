// Juice Shop-style JWT verification — exercises sec-jwt-no-alg, including the
// multi-line options case that must NOT false-positive.
import * as jwt from 'jsonwebtoken';

export function insecure(token: string, publicKey: string) {
  // Vulnerable: no algorithms allow-list → 'none' / RS256→HS256 confusion accepted.
  return jwt.verify(token, publicKey);
}

export function secure(token: string, secret: string) {
  // Safe: algorithms pinned, even across multiple lines (should NOT flag).
  return jwt.verify(token, secret, {
    algorithms: ['HS256']
  });
}
