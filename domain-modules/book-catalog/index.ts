import { registerCommandAndStateRebuilder } from "./book-catalog.domain";
import { registerEventhandlerAndStateloading } from "./book-catalog.repository";

let registered = false;

/**
 * Registers all commands, state rebuilder functions, and event handlers
 * for the book catalog domain. This function ensures that these registrations
 * occur only once, even if called multiple times.
 * @category Domain
 */

export function registerCatalogBookDomain() {
  if (registered) return;
  registered = true;
  registerCommandAndStateRebuilder();
  registerEventhandlerAndStateloading();
}
