import { match } from 'ts-pattern'

export const getCurrentSeason = () => {
  const currentDate = new Date()
  const currentYear = currentDate.getFullYear()
  const currentMonth = currentDate.getMonth() + 1
  const currentSeason = match(currentMonth)
    .when(
      (month) => month >= 4 && month <= 6,
      () => 'spring',
    )
    .when(
      (month) => month >= 7 && month <= 9,
      () => 'summer',
    )
    .when(
      (month) => month >= 10 && month <= 12,
      () => 'autumn',
    )
    .when(
      (month) => month >= 1 && month <= 3,
      () => 'winter',
    )
    .otherwise(() => '')

  return `${currentYear}-${currentSeason}`
}
