import { match } from 'ts-pattern'

export const timeText = (time: string | Date) => {
  const input = new Date(time)
  const now = new Date()

  const diff = now.getTime() - input.getTime()

  return match(diff)
    .when(
      (diff) => diff < 1_000,
      () => 'たった今',
    )
    .when(
      (diff) => diff < 60_000,
      () => `${Math.floor(diff / 1_000)}秒前`,
    )
    .when(
      (diff) => diff < 3_600_000,
      () => `${Math.floor(diff / 60_000)}分前`,
    )
    .when(
      (diff) => diff < 86_400_000,
      () => `${Math.floor(diff / 3_600_000)}時間前`,
    )
    .when(
      (diff) => diff < 2_592_000_000,
      () => `${Math.floor(diff / 86_400_000)}日前`,
    )
    .when(
      (diff) => diff < 15_552_000_000,
      () => `${Math.floor(diff / 2_592_000_000)}ヶ月前`,
    )
    .when(
      () => input.getFullYear() === now.getFullYear(),
      () => input.toLocaleDateString('ja-JP', { month: 'short', day: 'numeric' }),
    )
    .otherwise(() =>
      input.toLocaleDateString('ja-JP', { year: 'numeric', month: 'short', day: 'numeric' }),
    )
}
