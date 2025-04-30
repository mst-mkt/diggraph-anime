import { Badge } from '@/components/ui/badge'

export const Cards = () => (
  <div className="-bottom-16 sm:-bottom-8 absolute mx-auto flex w-full scale-75 select-none items-center justify-center gap-x-8 sm:scale-100">
    <div
      className="-rotate-12 hover:-rotate-6 hover:-translate-4 shrink-0 rounded-lg border border-border bg-background p-2 shadow-xs transition-[rotate,translate,scale] hover:scale-110"
      style={{
        transformOrigin: 'bottom center',
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
    <div className="-translate-y-6 hover:-translate-y-12 shrink-0 rounded-lg border border-border bg-background p-2 shadow-xs transition-[translate,scale] hover:scale-110">
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
      className="hover:-translate-y-4 shrink-0 rotate-12 rounded-lg border border-border bg-background p-2 shadow-xs transition-[rotate,translate,scale] hover:translate-x-4 hover:rotate-6 hover:scale-110"
      style={{
        transformOrigin: 'bottom center',
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
