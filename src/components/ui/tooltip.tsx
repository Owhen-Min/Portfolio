import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";

import { cn } from "@/lib/utils";

// 터치 환경 감지 함수
function isTouchDevice() {
  return (
    typeof window !== "undefined" && ("ontouchstart" in window || navigator.maxTouchPoints > 0)
  );
}

function TooltipProvider({
  delayDuration = 0,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Provider>) {
  return (
    <TooltipPrimitive.Provider
      data-slot="tooltip-provider"
      delayDuration={delayDuration}
      {...props}
    />
  );
}

function Tooltip({ children, ...props }: React.ComponentProps<typeof TooltipPrimitive.Root>) {
  const [open, setOpen] = React.useState(false);
  const isTouch = React.useRef(false);
  React.useEffect(() => {
    isTouch.current = isTouchDevice();
  }, []);

  // 바깥 터치 시 닫기
  React.useEffect(() => {
    if (!isTouch.current || !open) return;
    const handleTouch = () => {
      setOpen(false);
    };
    document.addEventListener("touchstart", handleTouch);
    return () => document.removeEventListener("touchstart", handleTouch);
  }, [open]);

  // Trigger에 onTouchStart를 주입하기 위해 children을 순회
  const enhancedChildren = React.Children.map(children, (child) => {
    if (React.isValidElement(child) && (child.type as any).displayName === "TooltipTrigger") {
      // 터치 환경에서만 onTouchStart 추가
      const onTouchStart = (e: any) => {
        e.stopPropagation();
        setOpen((prev) => !prev);
        const childProps = child.props as React.ComponentProps<typeof TooltipPrimitive.Trigger>;
        if (childProps.onTouchStart) childProps.onTouchStart(e);
      };
      let newProps = child.props;
      if (isTouch.current) {
        if (child.props && typeof child.props === "object") {
          newProps = { ...child.props, onTouchStart };
        } else {
          newProps = { onTouchStart };
        }
      }
      return React.cloneElement(child, newProps as any);
    }
    return child;
  });

  return (
    <TooltipProvider>
      <TooltipPrimitive.Root
        data-slot="tooltip"
        open={isTouch.current ? open : undefined}
        onOpenChange={isTouch.current ? setOpen : undefined}
        {...props}
      >
        {enhancedChildren}
      </TooltipPrimitive.Root>
    </TooltipProvider>
  );
}

Tooltip.displayName = "Tooltip";

function TooltipTrigger({ ...props }: React.ComponentProps<typeof TooltipPrimitive.Trigger>) {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />;
}
TooltipTrigger.displayName = "TooltipTrigger";

function TooltipContent({
  className,
  sideOffset = 0,
  children,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Content>) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        data-slot="tooltip-content"
        sideOffset={sideOffset}
        className={cn(
          "bg-primary text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-fit origin-(--radix-tooltip-content-transform-origin) rounded-md px-3 py-1.5 text-xs text-balance",
          className
        )}
        {...props}
      >
        {children}
        <TooltipPrimitive.Arrow className="bg-primary fill-primary z-50 size-2.5 translate-x-[calc(-750%)] translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px]" />
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  );
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
