import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { CrosshairIcon, FlagIcon, FullscreenIcon, ZoomInIcon, ZoomOutIcon } from 'lucide-react'
import type { FC } from 'react'

type GraphControlsProps = {
  onFocusSelected: () => void
  onFocusStart: () => void
  onFitAll: () => void
  onZoomIn: () => void
  onZoomOut: () => void
}

export const GraphControls: FC<GraphControlsProps> = ({
  onFocusSelected,
  onFocusStart,
  onFitAll,
  onZoomIn,
  onZoomOut,
}) => (
  <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
    <Tooltip delayDuration={800}>
      <TooltipTrigger asChild={true}>
        <Button
          size="icon"
          variant="outline"
          className="cursor-pointer rounded-full"
          onClick={onFocusSelected}
        >
          <CrosshairIcon size={16} />
        </Button>
      </TooltipTrigger>
      <TooltipContent side="left">選択アニメを中心にズーム</TooltipContent>
    </Tooltip>

    <Tooltip delayDuration={800}>
      <TooltipTrigger asChild={true}>
        <Button
          size="icon"
          variant="outline"
          className="cursor-pointer rounded-full"
          onClick={onFitAll}
        >
          <FullscreenIcon size={16} />
        </Button>
      </TooltipTrigger>
      <TooltipContent side="left">グラフ全体を表示</TooltipContent>
    </Tooltip>

    <Tooltip delayDuration={800}>
      <TooltipTrigger asChild={true}>
        <Button
          size="icon"
          variant="outline"
          className="cursor-pointer rounded-full"
          onClick={onFocusStart}
        >
          <FlagIcon size={16} />
        </Button>
      </TooltipTrigger>
      <TooltipContent side="left">最初のアニメに戻る</TooltipContent>
    </Tooltip>

    <Tooltip delayDuration={800}>
      <TooltipTrigger asChild={true}>
        <Button
          size="icon"
          variant="outline"
          className="cursor-pointer rounded-full"
          onClick={onZoomIn}
        >
          <ZoomInIcon size={16} />
        </Button>
      </TooltipTrigger>
      <TooltipContent side="left">拡大</TooltipContent>
    </Tooltip>

    <Tooltip delayDuration={800}>
      <TooltipTrigger asChild={true}>
        <Button
          size="icon"
          variant="outline"
          className="cursor-pointer rounded-full"
          onClick={onZoomOut}
        >
          <ZoomOutIcon size={16} />
        </Button>
      </TooltipTrigger>
      <TooltipContent side="left">縮小</TooltipContent>
    </Tooltip>
  </div>
)
