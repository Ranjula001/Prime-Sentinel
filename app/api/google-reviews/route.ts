import { NextResponse } from 'next/server'

type GoogleReview = {
  author_name: string
  profile_photo_url?: string
  rating: number
  relative_time_description: string
  text: string
}

type GooglePlaceResponse = {
  result?: {
    name?: string
    rating?: number
    user_ratings_total?: number
    url?: string
    reviews?: GoogleReview[]
  }
  status?: string
  error_message?: string
}

export const revalidate = 21600

export async function GET() {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY
  const placeId = process.env.GOOGLE_PLACE_ID

  if (!apiKey || !placeId) {
    return NextResponse.json(
      {
        error:
          'Missing GOOGLE_MAPS_API_KEY or GOOGLE_PLACE_ID in environment variables.',
      },
      { status: 500 }
    )
  }

  const fields = [
    'name',
    'rating',
    'user_ratings_total',
    'url',
    'reviews',
  ].join(',')

  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=${fields}&reviews_sort=newest&key=${apiKey}`

  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 5000)

    const response = await fetch(url, {
      signal: controller.signal,
      next: {
        revalidate: 21600,
        tags: ['google-reviews'],
      },
    }).finally(() => clearTimeout(timeout))

    const data = (await response.json()) as GooglePlaceResponse

    if (!response.ok || data.status !== 'OK') {
      return NextResponse.json(
        {
          error: data.error_message || 'Failed to fetch Google reviews.',
          status: data.status,
        },
        { status: 500 }
      )
    }

    return NextResponse.json(
      {
        name: data.result?.name ?? 'Prime Sentinel Insurance',
        rating: data.result?.rating ?? 5,
        totalReviews: data.result?.user_ratings_total ?? 0,
        googleUrl: data.result?.url ?? process.env.NEXT_PUBLIC_GOOGLE_REVIEW_URL,
        reviews: data.result?.reviews ?? [],
      },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=21600, stale-while-revalidate=86400',
        },
      }
    )
  } catch {
    return NextResponse.json(
      {
        error: 'Something went wrong while fetching Google reviews.',
      },
      { status: 500 }
    )
  }
}
