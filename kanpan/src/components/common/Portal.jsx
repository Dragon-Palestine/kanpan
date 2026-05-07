import { createPortal } from "react-dom";

/**
 * Portal - Renders children into document.body (or a custom container)
 * Solves z-index stacking context issues for modals, tooltips, dropdowns.
 *
 * Usage:
 *   <Portal>
 *     <Modal ... />
 *   </Portal>
 */
const Portal = ({ children, containerId = "portal-root" }) => {
  // Lazily create the portal container if it doesn't exist
  let container = document.getElementById(containerId);
  if (!container) {
    container = document.createElement("div");
    container.id = containerId;
    document.body.appendChild(container);
  }

  return createPortal(children, container);
};

export default Portal;
