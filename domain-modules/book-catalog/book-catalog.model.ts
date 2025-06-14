/**
 * Defines the context of the catalog domain to identiy the event-, stateloading- and staterebuilder handler
 */
export const CATALOG_CONTEXT = "domain:book-catalog";

/**
 * Defines the command to catalog a book
 */
export interface CatalogBookCommand {
  isbn: string;
  title: string;
  author: string;
}

/**
 * Defines the command to change the title of a book
 */
export interface ChangeBookTitleCommand {
  isbn: string;
  title: string;
}

/**
 * Defines the event which is generated when a book is cataloged
 */
export interface BookCatalogedEvent {
  isbn: string;
  title: string;
  author: string;
}

/**
 * Defines the event which is generated when a book title is changed
 */
export interface BookTitleChangedEvent {
  isbn: string;
  title: string;
}

/**
 * Defines the state of the book catalog domain
 */
export interface State {
  isbn: string;
  title: string;
  author: string;
}
