export const getSearchLink = (query: string) => ({
  dAnimeStore: `https://animestore.docomo.ne.jp/animestore/sch_pc?searchKey=${query}`,
  primeVideo: `https://www.amazon.co.jp/s?k=${query}&i=instant-video`,
  hulu: `https://www.hulu.jp/search?q=${query}`,
  abemaTV: `https://abema.tv/search?q=${query}`,
  netflix: `https://www.netflix.com/search?q=${query}`,
})
