import cookie from 'cookie'

export function parseCookie(req) {
  return cookie.parse(req.headers.cookie ? req.headers.cookie || '' : '')
}
