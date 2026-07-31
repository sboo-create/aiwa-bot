import { useEffect } from "react";
import { createPortal } from "react-dom";
import { useBackButton } from "../lib/backButton";

/**
 * Full-screen page pushed over the app, navigated with Telegram's native header
 * and BackButton — no bottom sheet, backdrop, drag, or slide animation. Product
 * panels compose this instead of an in-app navbar. `onBack` handles the native
 * back press (defaults to onClose); panels with internal sub-views pass their
 * own onBack to pop a view before closing.
 */
export function AiwaModalView({ isOpen, onClose, onBack, children, ...props }) {
  useBackButton(isOpen, onBack || onClose);

  useEffect(() => {
    if (!isOpen) return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div className="aiwa-page" role="dialog" aria-modal="true" {...props}>
      {children}
    </div>,
    document.body,
  );
}
