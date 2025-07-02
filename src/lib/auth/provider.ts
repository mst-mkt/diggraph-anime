// import type { OAuthConfig, OAuthUserConfig } from 'next-auth/providers'

// type AnnictProfile = {
//   // ref: https://developers.annict.com/docs/rest-api/v1/users#%E3%83%95%E3%82%A3%E3%83%BC%E3%83%AB%E3%83%89-1
//   id: number // ユーザID
//   username: string // URLなどで使用されているユーザ名
//   name: string // ユーザの名前
//   description: string // プロフィール
//   url: string // ユーザのURL
//   avatar_url: string // アバター画像
//   background_image_url: string // 背景画像
//   records_count: number // 記録数
//   followings_count: number // ユーザがフォローしている人の数
//   followers_count: number // ユーザをフォローしている人の数
//   wanna_watch_count: number // ステータスを「見たい」にしている作品の数
//   watching_count: number // ステータスを「見てる」にしている作品の数
//   watched_count: number // ステータスを「見た」にしている作品の数
//   on_hold_count: number // ステータスを「中断」にしている作品の数
//   stop_watching_count: number // ステータスを「中止」にしている作品の数
//   created_at: string // ユーザ登録した日時
//   email: string // ユーザのメールアドレス
//   notifications_count: number // 通知数
// }

// type AnnictProviderConfig = OAuthUserConfig<AnnictProfile> & {
//   redirectUri: string
//   scope: ('read' | 'write')[]
// }

// export const AnnictProvider = (config: AnnictProviderConfig): OAuthConfig<AnnictProfile> => ({
//   id: 'annict',
//   name: 'Annict',
//   type: 'oauth',
//   authorization: {
//     url: 'https://api.annict.com/oauth/authorize',
//     params: {
//       client_id: config.clientId,
//       response_type: 'code',
//       redirect_uri: config.redirectUri,
//       scope: config.scope.join(' '),
//     },
//   },
//   token: {
//     url: 'https://api.annict.com/oauth/token',
//     params: {
//       client_id: config.clientId,
//       client_secret: config.clientSecret,
//       grant_type: 'authorization_code',
//       redirect_uri: config.redirectUri,
//     },
//   },
//   userinfo: 'https://api.annict.com/v1/me',
//   profile: (profile) => ({
//     id: profile.id.toString(),
//     name: profile.name,
//     email: profile.email,
//     image: profile.avatar_url,
//   }),
//   options: config,
// })
