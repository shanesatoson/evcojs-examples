import {
  CloudEvent,
  registerEventhandler,
  registerStateLoadingFunction,
} from "evcojs";
import { inMemoryDatabase } from "../../database/in-memory-database";
import {
  BookCatalogedEvent,
  BookTitleChangedEvent,
  CATALOG_CONTEXT,
} from "./book-catalog.model";

/**
 * Handles the event.book.cataloged event.
 * Stores the event in the fake in-memory-database.
 * @param event the event which should be handled
 */
function handleBookCatalogedEvent(event: CloudEvent<BookCatalogedEvent>) {
  //fake database ... you usually would store your events here persistently
  inMemoryDatabase.push({ ...event });
}

/**
 * Handles the event.book.title.changed event.
 * Stores the event in the fake in-memory-database.
 * @param event the event which should be handled
 */
function handleBookTitleChangedEvent(event: CloudEvent<BookTitleChangedEvent>) {
  //fake database ... you usually would store your events here persistently
  inMemoryDatabase.push({ ...event });
}

/**
 * Loads the events from the fake in-memory-database, which is used for simplicity of the example.
 * In a real application you would use a real database connection here.
 * @param subjects the subjects for which the events should be loaded
 * @returns the events which are relevant for the given subjects
 */
async function getStaterebuildingEvents(
  subjects: string[]
): Promise<CloudEvent<any>[]> {
  //fake database ... you usually would load your events from database here
  const events = inMemoryDatabase.filter((event) =>
    subjects.includes(event.subject)
  );
  return Promise.resolve(events);
}

/**
 * Registers the eventhandlers for the events from the book-catalog domain.
 * These eventhandlers store the events in the fake in-memory-database.
 * Additionally registers the state loading function, which is used by the state-rebuilder to load the initial state.
 * @category Eventhandler
 */
export function registerEventhandlerAndStateloading() {
  registerEventhandler("event.book.cataloged", handleBookCatalogedEvent);
  registerEventhandler("event.book.title.changed", handleBookTitleChangedEvent);
  registerStateLoadingFunction(CATALOG_CONTEXT, getStaterebuildingEvents);
}
