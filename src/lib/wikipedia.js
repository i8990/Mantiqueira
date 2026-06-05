const PT_API = 'https://pt.wikipedia.org/w/api.php'

export async function fetchWikipediaImage(wikiUrl) {
  if (!wikiUrl) return null
  const match = wikiUrl.match(/wikipedia\.org\/wiki\/(.+)/)
  if (!match) return null
  const title = decodeURIComponent(match[1])

  const params = new URLSearchParams({
    action: 'query',
    format: 'json',
    formatversion: '2',
    prop: 'pageimages',
    piprop: 'thumbnail',
    pithumbsize: 400,
    origin: '*',
    titles: title,
  })

  try {
    const res = await fetch(`${PT_API}?${params}`)
    if (!res.ok) return null
    const data = await res.json()
    const page = data.query?.pages?.[0]
    return page?.thumbnail?.source || null
  } catch {
    return null
  }
}
