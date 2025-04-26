export const getSearchLink = (query: string) => ({
  dAnimeStore: `https://animestore.docomo.ne.jp/animestore/sch_pc?searchKey=${encodeURIComponent(query)}`,
  primeVideo: `https://www.amazon.co.jp/s?k=${encodeURIComponent(query)}&i=instant-video`,
  hulu: `https://www.hulu.jp/search?q=${encodeURIComponent(query)}`,
  abemaTV: `https://abema.tv/search?q=${encodeURIComponent(query)}`,
  netflix: `https://www.netflix.com/search?q=${encodeURIComponent(query)}`,
})
