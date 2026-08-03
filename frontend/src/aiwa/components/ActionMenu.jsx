import { cloneElement, isValidElement, useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Text } from "../lib/tma";

const MARGIN = 8;
const GAP = 6;
const MENU_ITEM_SELECTOR = '[role="menuitem"]:not(:disabled)';
const PAGE_FOCUS_SELECTOR = [
  'a[href]',
  'button:not(:disabled)',
  'input:not(:disabled)',
  'select:not(:disabled)',
  'textarea:not(:disabled)',
  '[role="button"][tabindex]:not([tabindex="-1"])',
  '[tabindex]:not([tabindex="-1"])',
].join(",");
const OVERLAY_FOCUS_SCOPE_SELECTOR = '[data-aiwa-calendar-modal="true"],[aria-modal="true"]';

export function actionMenuFocusIndex(key, currentIndex, count) {
  if (count < 1) return -1;
  if (key === "Home") return 0;
  if (key === "End") return count - 1;
  if (key === "ArrowDown") return currentIndex < 0 ? 0 : (currentIndex + 1) % count;
  if (key === "ArrowUp") return currentIndex < 0 ? count - 1 : (currentIndex - 1 + count) % count;
  return currentIndex;
}

export function actionMenuRestoresFocusAfterSelect(item) {
  return item?.restoreFocus !== false;
}

export function actionMenuRelativeFocusIndex(currentIndex, count, direction) {
  if (count < 1) return -1;
  if (currentIndex < 0) return direction < 0 ? count - 1 : 0;
  return (currentIndex + (direction < 0 ? -1 : 1) + count) % count;
}

export function actionMenuPageFocusCandidate(element, menuElement = null) {
  if (!element || menuElement?.contains?.(element)) return false;
  if (element.closest?.('.hidden,[inert],[hidden],[aria-hidden="true"]')) return false;
  if (element.getAttribute?.("aria-disabled") === "true") return false;

  const style = globalThis.getComputedStyle?.(element);
  if (style && (
    style.display === "none"
    || style.visibility === "hidden"
    || style.visibility === "collapse"
    || style.contentVisibility === "hidden"
  )) return false;

  const rects = element.getClientRects?.();
  return !rects || rects.length > 0;
}

export function actionMenuFocusScope(triggerElement, ownerDocument = globalThis.document) {
  return triggerElement?.closest?.(OVERLAY_FOCUS_SCOPE_SELECTOR) || ownerDocument;
}

export function actionMenuRelativeFocusTarget(
  triggerElement,
  direction,
  menuElement = null,
  ownerDocument = globalThis.document,
) {
  if (!triggerElement || !ownerDocument) return null;
  const scope = actionMenuFocusScope(triggerElement, ownerDocument);
  const candidates = [...(scope?.querySelectorAll?.(PAGE_FOCUS_SELECTOR) || [])].filter(
    (element) => actionMenuPageFocusCandidate(element, menuElement),
  );
  const index = candidates.indexOf(triggerElement);
  const targetIndex = actionMenuRelativeFocusIndex(index, candidates.length, direction);
  return candidates[targetIndex] || triggerElement;
}

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
 * @param {{label: string, icon?: import("react").ReactNode, disabled?: boolean, restoreFocus?: boolean, onSelect: () => void}[]} props.items
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
  const initialFocus = useRef("first");
  const menuId = useId();
  const generatedTriggerId = useId();
  const triggerId = isValidElement(trigger) && trigger.props.id
    ? trigger.props.id
    : generatedTriggerId;

  const triggerTarget = useCallback(() => triggerRef.current?.querySelector(
      'button, a[href], input, [role="button"], [tabindex]:not([tabindex="-1"])',
    ), []);

  const focusTrigger = useCallback(() => {
    triggerTarget()?.focus?.({ preventScroll: true });
  }, [triggerTarget]);

  const focusRelativeToTrigger = useCallback((direction) => {
    const triggerElement = triggerTarget();
    if (!triggerElement) return;
    actionMenuRelativeFocusTarget(
      triggerElement,
      direction,
      menuRef.current,
      triggerElement.ownerDocument || document,
    )?.focus?.({ preventScroll: true });
  }, [triggerTarget]);

  const close = useCallback((restoreFocus = false) => {
    setIsOpen(false);
    if (restoreFocus) setTimeout(focusTrigger, 0);
  }, [focusTrigger]);

  const open = useCallback((focus = "first") => {
    initialFocus.current = focus;
    setIsOpen(true);
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
    const menuItems = [...menuRef.current.querySelectorAll(MENU_ITEM_SELECTOR)];
    const focusTarget = initialFocus.current === "last"
      ? menuItems[menuItems.length - 1]
      : menuItems[0];
    (focusTarget || menuRef.current).focus?.({ preventScroll: true });
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
      if (event.key === "Escape") {
        event.preventDefault();
        close(true);
      }
    };
    document.addEventListener("pointerdown", onPointer, true);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer, true);
      document.removeEventListener("keydown", onKey);
    };
  }, [isOpen, close]);

  const handleSelect = (item) => {
    if (item.disabled) return;
    close(actionMenuRestoresFocusAfterSelect(item));
    item.onSelect?.();
  };

  const handleMenuKeyDown = (event) => {
    if (event.key === "Escape") {
      event.preventDefault();
      event.stopPropagation();
      close(true);
      return;
    }
    if (event.key === "Tab") {
      event.preventDefault();
      close();
      setTimeout(() => focusRelativeToTrigger(event.shiftKey ? -1 : 1), 0);
      return;
    }
    if (!["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) return;
    const menuItems = [...(menuRef.current?.querySelectorAll(MENU_ITEM_SELECTOR) || [])];
    if (!menuItems.length) return;
    event.preventDefault();
    const currentIndex = menuItems.indexOf(document.activeElement);
    const nextIndex = actionMenuFocusIndex(event.key, currentIndex, menuItems.length);
    menuItems[nextIndex]?.focus?.({ preventScroll: true });
  };

  // The wrapper only measures/positions. The supplied button remains the one
  // semantic and keyboard target, avoiding nested roles and a duplicate Tab stop.
  const accessibleTrigger = isValidElement(trigger)
    ? cloneElement(trigger, {
      id: triggerId,
      "aria-haspopup": "menu",
      "aria-expanded": isOpen,
      "aria-controls": isOpen ? menuId : undefined,
      onClick: (event) => {
        trigger.props.onClick?.(event);
        if (event.defaultPrevented) return;
        isOpen ? close() : open("first");
      },
      onKeyDown: (event) => {
        trigger.props.onKeyDown?.(event);
        if (event.defaultPrevented) return;
        if (event.key === "ArrowDown" || event.key === "ArrowUp") {
          event.preventDefault();
          open(event.key === "ArrowUp" ? "last" : "first");
        } else if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          isOpen ? close() : open("first");
        } else if (event.key === "Escape" && isOpen) {
          event.preventDefault();
          close(true);
        }
      },
    })
    : trigger;

  return (
    <>
      <div
        ref={triggerRef}
        className={`aiwa-action-menu-trigger${className ? ` ${className}` : ""}`}
      >
        {accessibleTrigger}
      </div>
      {isOpen &&
        createPortal(
          <div
            ref={menuRef}
            id={menuId}
            role="menu"
            aria-labelledby={triggerId}
            aria-orientation="vertical"
            tabIndex={-1}
            className="aiwa-action-menu"
            data-align={align}
            onKeyDown={handleMenuKeyDown}
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
                tabIndex={-1}
                disabled={item.disabled || undefined}
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
