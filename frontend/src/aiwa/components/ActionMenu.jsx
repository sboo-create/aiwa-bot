import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Text } from "../lib/tma";

const MARGIN = 8;
const GAP = 6;

function computePosition(triggerRect, menuRect, align) {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  // A trigger pinned to the right edge (the calendar FAB) has to hang its menu
  // off its own right edge; anchoring by `left` and letting the viewport clamp
  // it lands the menu a few px off that edge instead.
  let left = align === "end" ? triggerRect.right - menuRect.width : triggerRect.left;
  left = Math.min(left, vw - menuRect.width - MARGIN);
  left = Math.max(MARGIN, left);

  const below = triggerRect.bottom + GAP;
  const above = triggerRect.top - GAP - menuRect.height;
  const fitsBelow = below + menuRect.height <= vh - MARGIN;
  const top = fitsBelow || above < MARGIN ? below : above;
  const originY = fitsBelow || above < MARGIN ? "top" : "bottom";
  return { top, left, originY };
}

/**
 * Portal action menu: icon + label rows, each firing its own onSelect.
 * Local fork of the Deslop TMA DropdownMenu, adapted for actions (no motion dep).
 * @param {{label: string, icon?: import("react").ReactNode, onSelect: () => void}[]} props.items
 * @param {import("react").ReactNode} props.trigger Element that toggles the menu.
 * @param {string} [props.className] Goes on the trigger wrapper, not the trigger:
 *   the wrapper is what the menu measures, so a host screen that positions the
 *   trigger has to position that wrapper or the menu is placed off a 0×0 box.
 */
export function ActionMenu({ items, trigger, align = "start", className = "" }) {
  const [isOpen, setIsOpen] = useState(false);
  const [pos, setPos] = useState({ top: 0, left: 0, originY: "top" });
  const triggerRef = useRef(null);
  const menuRef = useRef(null);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  useLayoutEffect(() => {
    if (!isOpen || !menuRef.current || !triggerRef.current) return;
    const place = () => {
      const t = triggerRef.current.getBoundingClientRect();
      // Layout size, not the client rect: the open animation starts at scale(0),
      // so the rect measured on the first frame is 0×0 and the menu gets placed
      // against a box of no width — off the right edge when the trigger sits there.
      const m = { width: menuRef.current.offsetWidth, height: menuRef.current.offsetHeight };
      setPos(computePosition(t, m, align));
    };
    place();
    window.addEventListener("resize", place);
    window.addEventListener("scroll", place, true);
    return () => {
      window.removeEventListener("resize", place);
      window.removeEventListener("scroll", place, true);
    };
  }, [isOpen, align]);

  useEffect(() => {
    if (!isOpen) return;
    const onPointer = (event) => {
      if (menuRef.current?.contains(event.target)) return;
      if (triggerRef.current?.contains(event.target)) return;
      close();
    };
    const onKey = (event) => {
      if (event.key === "Escape") close();
    };
    document.addEventListener("pointerdown", onPointer, true);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer, true);
      document.removeEventListener("keydown", onKey);
    };
  }, [isOpen, close]);

  const handleSelect = (item) => {
    close();
    item.onSelect?.();
  };

  return (
    <>
      <div
        ref={triggerRef}
        className={`aiwa-action-menu-trigger${className ? ` ${className}` : ""}`}
        onClickCapture={(event) => {
          event.preventDefault();
          event.stopPropagation();
          isOpen ? close() : setIsOpen(true);
        }}
        role="button"
        tabIndex={0}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        onKeyDownCapture={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            event.stopPropagation();
            isOpen ? close() : setIsOpen(true);
          }
        }}
      >
        {trigger}
      </div>
      {isOpen &&
        createPortal(
          <div
            ref={menuRef}
            role="menu"
            className="aiwa-action-menu"
            data-align={align}
            style={{
              position: "fixed",
              top: pos.top,
              left: pos.left,
              transformOrigin: `${align === "end" ? "right" : "left"} ${pos.originY}`,
            }}
          >
            {items.map((item) => (
              <button
                key={item.label}
                type="button"
                role="menuitem"
                className="aiwa-action-menu-item"
                onClick={() => handleSelect(item)}
              >
                {item.icon ? (
                  <span className="aiwa-action-menu-icon" aria-hidden="true">
                    {item.icon}
                  </span>
                ) : null}
                <Text variant="body" weight="regular">
                  {item.label}
                </Text>
              </button>
            ))}
          </div>,
          document.body
        )}
    </>
  );
}
