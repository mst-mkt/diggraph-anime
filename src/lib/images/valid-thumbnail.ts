import 'server-only'
import type { Work } from '../api/annict-rest/schema/works'
import { jikanApiClient } from '../api/jikan'

const httpRegex = /^http:\/\//

const checkImage = async (url: string) => {
  try {
    const res = await fetch(url, { method: 'HEAD' })
    if (res.ok) return true
  } catch {
    return false
  }
  return false
}

export const getValidWorkImage = async (work: Work) => {
  // 1st. check annictWork.images.facebook.og_image_url
  const ogpImage = work.images.facebook.og_image_url.replace(httpRegex, 'https://')

  if (ogpImage !== '') {
    const isValid = await checkImage(ogpImage)
    if (isValid) return ogpImage
  }

  // 2nd. check malWork.images.webp.image_url
  const malId = work.mal_anime_id

  if (malId !== '') {
    const { data } = await jikanApiClient.GET('/anime/{id}', {
      params: { path: { id: Number.parseInt(malId) } },
    })

    const malImage = data?.data?.images?.webp?.image_url?.replace(httpRegex, 'https://')

    if (typeof malImage === 'string' && malImage !== '') {
      return malImage
    }
  }

  // 3rd. check annictWork.images other properties
  const urls = [
    work.images.recommended_url,
    work.images.twitter.image_url,
    work.images.twitter.normal_avatar_url,
    work.images.twitter.original_avatar_url,
  ].map((url) => url.replace(httpRegex, 'https://'))

  for (const url of urls) {
    if (url !== '') {
      const isValid = await checkImage(url)
      if (isValid) return url
    }
  }

  return null
}

export type WorkWithThumbnail = Work & {
  thumbnail: string | null
}
