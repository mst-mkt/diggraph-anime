import { Skeleton } from '@/components/ui/skeleton'
import { TvIcon } from 'lucide-react'

const GraphLoading = () => (
  <div className="flex h-full w-full">
    <div className="w-full shrink" />
    <div className="h-full w-px bg-border" />
    <div className="@container/panel w-full shrink">
      <div className="flex min-w-80 flex-col gap-y-8 p-4">
        <div className="flex @md/panel:flex-row flex-col gap-8">
          <Skeleton className="@md/panel:aspect-square aspect-video @md/panel:w-48 w-full shrink-0" />
          <div className="flex grow flex-col justify-center gap-y-1">
            <Skeleton className="h-[1lh] w-2/3 text-lg" />
            <Skeleton className="h-[1lh] w-1/4 text-sm" />
            <div className="flex items-center gap-x-4 py-4">
              <Skeleton className="h-[1lh] w-1/3" />
              <Skeleton className="h-[1lh] w-1/3" />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-y-4">
          <hgroup className="flex items-center gap-x-2">
            <TvIcon size={24} className="text-diggraph-accent" />
            <h3 className="font-bold text-lg">関連作品</h3>
          </hgroup>
          <div className="grid @lg/panel:grid-cols-3 grid-cols-2 gap-x-4 gap-y-8">
            {[...Array(6)].map((_, i) => (
              <div
                // biome-ignore lint/suspicious/noArrayIndexKey: index of static array
                key={i}
                className="group flex h-fit flex-col gap-y-2 rounded-lg text-left"
              >
                <Skeleton className="aspect-video rounded-md" />
                <Skeleton className="h-[1lh] w-2/3 text-xs" />
                <Skeleton className="h-[1lh] w-1/3 text-xs" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
)

export default GraphLoading
