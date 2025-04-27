import { Badge } from '@/components/ui/badge'

export const Cards = () => (
  <div className="-bottom-4 absolute mx-auto flex w-full items-center justify-center gap-x-8">
    <div
      className="rounded-lg border border-border bg-background p-2 shadow-xs"
      style={{
        transformOrigin: 'bottom center',
        rotate: '-12deg',
        translate: '0 24px',
      }}
    >
      <img
        src="https://zatsutabi.com/og-image2b.jpg"
        alt="ざつ旅 -That's Journey-"
        className="aspect-video w-60 rounded-md"
      />
      <div className="flex flex-col gap-y-2 py-2">
        <h2 className="font-bold text-sm">ざつ旅 -That's Journey-</h2>
        <div className="flex items-center gap-x-2">
          <Badge variant="secondary">TV</Badge>
          <Badge variant="secondary">2025年春</Badge>
        </div>
      </div>
    </div>
    <div className="rounded-lg border border-border bg-background p-2 shadow-xs">
      <img
        src="https://maidragon.jp//img/ogp.jpg"
        alt="小林さんちのメイドラゴン"
        className="aspect-video w-60 rounded-md"
      />
      <div className="flex flex-col gap-y-2 py-2">
        <h2 className="font-bold text-sm">小林さんちのメイドラゴン</h2>
        <div className="flex items-center gap-x-2">
          <Badge variant="secondary">TV</Badge>
          <Badge variant="secondary">2017年冬</Badge>
        </div>
      </div>
    </div>
    <div
      className="rounded-lg border border-border bg-background p-2 shadow-xs"
      style={{
        transformOrigin: 'bottom center',
        rotate: '12deg',
        translate: '0 24px',
      }}
    >
      <img
        src="https://yorukura-anime.com/ogimage.png"
        alt="夜のクラゲは泳げない"
        className="aspect-video w-60 rounded-md"
      />
      <div className="flex flex-col gap-y-2 py-2">
        <h2 className="font-bold text-sm">夜のクラゲは泳げない</h2>
        <div className="flex items-center gap-x-2">
          <Badge variant="secondary">TV</Badge>
          <Badge variant="secondary">2024年春</Badge>
        </div>
      </div>
    </div>
  </div>
)
