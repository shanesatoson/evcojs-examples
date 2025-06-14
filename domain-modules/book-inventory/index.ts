import { registerInventoryCommandAndStateRebuilder } from "./book-inventory.domain";
import { registerEventhandlerAndStateloading as registerInventoryEventhandlerAndStateloading } from "./book-inventory.repository";

let registered = false;

/**
 * Registers all commands and state rebuilder functions of the book-inventory domain.
 * Additionally registers the eventhandlers for the events from the book-inventory domain.
 * These eventhandlers store the events in the fake in-memory-database.
 * This function can be called multiple times and only executes once.
 * @category Domain
 */
export function registerBookInventoryDomain() {
  if (registered) return;
  registered = true;
  registerInventoryCommandAndStateRebuilder();
  registerInventoryEventhandlerAndStateloading();
}
