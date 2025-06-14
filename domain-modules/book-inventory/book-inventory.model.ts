/**
 * Defines the context of the inventory domain to identiy the event-, stateloading- and staterebuilder handler
 */
export const INVENTORY_CONTEXT = "domain:book-inventory";

/**
 * Register a copy of a book
 */
export interface RegisterCopyCommand {
  isbn: string;
}

/**
 * Return a copy
 */
export interface ReturnBookCommand {
  isbn: string;
}

/**
 * borrow a copy
 */
export interface BorrowBookCommand {
  isbn: string;
}

//event from book-catalog domain
/**
 * A book was cataloged
 */
export interface BookCatalogedEvent {
  isbn: string;
}

//inventory events

/**
 * A copy of a book was registered
 */
export interface BookCopyRegisteredEvent {
  isbn: string;
}

/**
 * A copy of a book was returned
 */
export interface BookReturnEvent {
  isbn: string;
}

/**
 * A copy of a book was borrowed
 */
export interface BookBorrowedEvent {
  isbn: string;
}

/**
 * The state of the inventory domain
 */
export interface State {
  isbn: string;
  amount: number;
  maxCopies: number;
}
