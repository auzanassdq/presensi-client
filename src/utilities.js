import Cookies from 'js-cookie'

export function authHeader () {
  const token = Cookies.get('token')
  return {
    Authorization: 'Bearer ' + token
  }
}