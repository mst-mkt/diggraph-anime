const PROXY_URL = 'https://images.weserv.nl/'

export const proxiedImage = (url: string) => {
  const searchParams = new URLSearchParams()
  searchParams.set('url', url)

  return `${PROXY_URL}?${searchParams.toString()}`
}
