import {
  CqrsEvent,
  registerCommandHandler,
  registerStateRebuilder,
} from "evcojs";
import {
  BookCatalogedEvent,
  CatalogBookCommand,
  CONTEXT,
  State,
} from "./library.model";

function catalogBook(
  command: CatalogBookCommand,
  state?: State
): CqrsEvent<BookCatalogedEvent>[] {
  console.log("command arrived", command);
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
registerCommandHandler("command.catalog.book", CONTEXT, catalogBook);

function onBookCataloged(event: BookCatalogedEvent, state?: State): State {
  const newState = {
    isbn: event.isbn,
    title: event.title,
    author: event.author,
  };
  console.log("event arrived", event, newState);
  return newState;
}
registerStateRebuilder("event.book.cataloged", CONTEXT, onBookCataloged);
