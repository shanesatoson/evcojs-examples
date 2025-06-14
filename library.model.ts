export const CONTEXT = "book.catalog";

export interface CatalogBookCommand {
  isbn: string;
  title: string;
  author: string;
}

export interface BookCatalogedEvent {
  isbn: string;
  title: string;
  author: string;
}

export interface State {
  isbn: string;
  title: string;
  author: string;
}
