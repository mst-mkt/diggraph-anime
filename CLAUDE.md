# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 開発コマンド

### 開発環境の起動
```sh
pnpm dev
```

### ビルド
```sh
pnpm build
```

### コードチェック・フォーマット
```sh
# コードチェック
pnpm check

# 自動修正
pnpm fix

# 型チェック
pnpm typecheck
```

### GraphQLスキーマ生成
```sh
# Jikan APIスキーマの生成
pnpm generate:jikan
```

## アーキテクチャ概要

### プロジェクト構造
- **Next.js 15** を使用したアニメ作品関係図表示アプリケーション
- **App Router** を採用
- **TypeScript** での完全型安全な実装

### 主要ディレクトリ構成
- `src/app/` - Next.js App Routerのページとレイアウト
  - `(app)/` - メインアプリケーション（グラフ表示）
  - `(lp)/` - ランディングページ
  - `(main)/` - ユーザー向けメインページ（作品選択）
  - `actions/` - Server Actions（API呼び出し、認証）
- `src/lib/` - 共通ライブラリとユーティリティ
  - `api/` - 外部API（Annict、AniList、Jikan）のクライアント
  - `auth/` - NextAuth.jsを使用した認証設定
- `src/components/` - 再利用可能なUIコンポーネント

### 外部API統合
1. **Annict** - 日本のアニメトラッキングサービス
   - OAuth認証による統合
   - GraphQLとREST APIの両方を使用
   - gql.tadaによる型安全なGraphQLクエリ

2. **AniList** - 国際的なアニメデータベース
   - GraphQL APIを使用
   - gql.tadaによる型生成

3. **Jikan** - MyAnimeListのAPIラッパー
   - OpenAPI仕様から型生成
   - openapi-fetchを使用

### 認証フロー
- NextAuth.js (Auth.js) を使用
- Annictプロバイダーによる認証
- JWTトークンにアクセストークンを保存
- サーバーサイドでのセッション管理

### スタイリング
- **Tailwind CSS v4** を使用
- **shadcn/ui** コンポーネントライブラリ
- レスポンシブデザイン対応

### 開発ツール
- **Biome** - リンティングとフォーマット
- **Lefthook** - pre-commitフックで自動フォーマット
- **TypeScript** - strict modeで完全な型安全性

### 環境変数
必須の環境変数（`.env.local`に設定）:
- `BASE_URL` - アプリケーションのベースURL
- `ANNICT_CLIENT_ID` - Annict OAuthクライアントID
- `ANNICT_CLIENT_SECRET` - Annict OAuthクライアントシークレット
- `AUTH_SECRET` - NextAuth.jsのシークレットキー

### 重要な実装パターン
- Server Componentsを優先的に使用
- クライアントコンポーネントは`.client.tsx`サフィックスを付ける
- `server-only`インポートでサーバー専用コードを明示
- 環境変数はValibotでバリデーション
- 外部APIクライアントは専用のディレクトリで管理