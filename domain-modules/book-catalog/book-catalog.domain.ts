import {
  CloudEvent,
  registerCommandHandler,
  registerStateRebuilder,
} from "evcojs";
import {
  BookCatalogedEvent,
  BookTitleChangedEvent,
  CATALOG_CONTEXT,
  CatalogBookCommand,
  ChangeBookTitleCommand,
  State,
} from "./book-catalog.model";

/**
 *
 * @param command the command to execute
 * @param state the state after state rebuilding
 * @returns the events which changes the state of the domain after successful call
 */
function catalogBook(
  command: CatalogBookCommand,
  state?: State
): CloudEvent<BookCatalogedEvent>[] {
  if (state?.isbn) {
    throw new Error("Book already cataloged");
  }
  return [
    {
      type: "event.book.cataloged",
      subject: "/book/123",
      data: {
        isbn: command.isbn,
        title: command.title,
        author: command.author,
      },
    },
  ];
}

/**
 *
 * @param event the event to apply to the current state
 * @param state the previous calculated state | can be null
 * @returns the new state | can be null
 */
function onBookCataloged(event: BookCatalogedEvent, state?: State): State {
  const newState = {
    isbn: event.isbn,
    title: event.title,
    author: event.author,
  };

  return newState;
}

/**
 * Changes the title of a book
 * @param command the command with the isbn and the new title of the book
 * @param state the current state of the domain, can be null
 * @returns the events which are generated by the command
 * @throws if the book is not cataloged
 */
function changeBookTitle(
  command: ChangeBookTitleCommand,
  state?: State
): CloudEvent<BookTitleChangedEvent>[] {
  checkIfBookIsAvailable(state, command);

  return [
    {
      type: "event.book.title.changed",
      subject: "/book/" + command.isbn,
      data: {
        isbn: command.isbn,
        title: command.title,
      },
    },
  ];
}

/**
 * Handles the event.book.title.changed event.
 * The event is generated by the book catalog domain when a book title is changed.
 * @param event the event which should be handled
 * @param state the previous calculated state | can be null
 * @returns the new state
 */
function onBookTitleChanged(event: BookTitleChangedEvent, state?: State) {
  const newState = {
    isbn: event.isbn,
    title: event.title,
    author: state?.author,
  };

  return newState;
}

/**
 * Checks if the book is available in the catalog.
 * Throws an error if the book is not cataloged or the ISBN does not match.
 * @param state The current state of the book catalog.
 * @param command The command containing the ISBN of the book to check.
 */

function checkIfBookIsAvailable(
  state: State | undefined,
  command: ChangeBookTitleCommand
) {
  if (!state?.isbn) {
    throw new Error("Book is not cataloged");
  }
  if (state?.isbn !== command.isbn) {
    throw new Error("Book is not the same");
  }
}

/**
 * Registers all commands and state rebuilder functions of the book-catalog domain.
 * This function can be called multiple times and only executes once.
 */
export function registerCommandAndStateRebuilder() {
  registerCommandHandler(
    "command.book-catalog.catalog.book", //must be app wide unique
    CATALOG_CONTEXT, //defines the context to execute event-, stateloading- and staterebuilder handler
    catalogBook
  );
  registerStateRebuilder(
    "event.book.cataloged",
    CATALOG_CONTEXT,
    onBookCataloged
  );

  registerCommandHandler(
    "command.book-catalog.change.book.title", //must be app wide unique
    CATALOG_CONTEXT, //defines the context to execute event-, stateloading- and staterebuilder handler
    changeBookTitle
  );
  registerStateRebuilder(
    "event.book.title.changed",
    CATALOG_CONTEXT,
    onBookTitleChanged
  );
}
