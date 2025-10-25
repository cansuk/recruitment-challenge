import "@testing-library/cypress/add-commands";
import "./commands";

// Prevent failing tests due to 3rd-party overlays or browser extensions
Cypress.on("uncaught:exception", () => false);

// Hide Next.js dev overlay if present
function injectOverlayHider(doc: Document) {
  const style = doc.createElement("style");
  style.setAttribute("data-cy", "hide-next-overlay");
  style.innerHTML =
    "[data-nextjs-dialog-backdrop], [data-nextjs-dialog]{display:none!important}";
  doc.head.appendChild(style);
}

beforeEach(() => {
  cy.document().then(injectOverlayHider);
});
