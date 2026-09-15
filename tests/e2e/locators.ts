import { Locator } from "@playwright/test";

/**
 * Several parts of the UI are rendered twice - once for mobile, once for
 * desktop - and hidden with CSS, so a plain locator matches both. This keeps
 * the one that is actually on screen.
 */
export const visible = (locator: Locator) => locator.locator("visible=true");
