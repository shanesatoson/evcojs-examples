import {
  CloudEvent,
  registerEventhandler,
  registerStateLoadingFunction,
} from "evcojs";
import { inMemoryDatabase } from "../../database/in-memory-database";
import {
  BookBorrowedEvent,
  BookCopyRegisteredEvent,
  INVENTORY_CONTEXT,
  State,
} from "./book-inventory.model";

/**
 * Handles the event.book.copy.registered event.
 * Stores the event in the fake in-memory-database.
 * @param event the event which should be handled
 * @param state the current state of the domain, can be null
 */

function onBookRegistered(
  event: CloudEvent<BookCopyRegisteredEvent>,
  state?: State
) {
  inMemoryDatabase.push({ ...event });
}

/**
 * Handles the event.book.copy.borrowed event.
 * Stores the event in the fake in-memory-database.
 * @param event the event which should be handled
 * @param state the current state of the domain, can be null
 */
function onBookBorrowed(event: CloudEvent<BookBorrowedEvent>, state?: State) {
  inMemoryDatabase.push({ ...event });
}

/**
 * Handles the event.book.copy.returned event.
 * Stores the event in the fake in-memory-database.
 * @param event the event which should be handled
 * @param state the current state of the domain, can be null
 */
function onBookReturned(event: CloudEvent<BookBorrowedEvent>, state?: State) {
  inMemoryDatabase.push({ ...event });
}

/**
 * Loads the events from the fake in-memory-database, which is used for simplicity of the example.
 * In a real application you would use a real database connection here.
 * @param subjects the subjects for which the events should be loaded
 * @returns the events which are relevant for the given subjects
 */
function stateLoading(subjects: string[]): Promise<CloudEvent<any>[]> {
  //fake database ... you usually would load your events from database here
  const events = inMemoryDatabase.filter((event) =>
    subjects.includes(event.subject)
  );
  return Promise.resolve(events);
}

/**
 * Registers the eventhandlers for the events from the inventory domain.
 * These eventhandlers store the events in the fake in-memory-database.
 * Additionally registers the state loading function, which is used by the state-rebuilder to load the initial state.
 * @category Eventhandler
 */
export function registerEventhandlerAndStateloading() {
  registerEventhandler("event.book.copy.registered", onBookRegistered);
  registerEventhandler("event.book.copy.borrowed", onBookBorrowed);
  registerEventhandler("event.book.copy.returned", onBookReturned);

  registerStateLoadingFunction(INVENTORY_CONTEXT, stateLoading);
}
