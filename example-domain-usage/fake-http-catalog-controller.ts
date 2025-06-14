import { createState, handleCommand } from "evcojs";
import { registerCatalogBookDomain as registerBookCatalogDomain } from "../domain-modules/book-catalog";
import { CATALOG_CONTEXT } from "../domain-modules/book-catalog/book-catalog.model";

//After that call the handle command function know the "book catalog" events,
// staterebuilder, stateloader and commands
registerBookCatalogDomain();

interface PostBodyDto {
  isbn: string;
  title: string;
  author: string;
}

/**
 * fake HTTP controller to show how to use
 *
 * @param body http body
 */
export async function POST_CATALOG_BOOK(body: PostBodyDto) {
  try {
    const state = await handleCommand({
      type: "command.book-catalog.catalog.book", //identifier of the command to find the handler
      subjects: ["/book/" + body.isbn], //events to rebuild the state
      data: {
        //payload data for the command
        isbn: body.isbn,
        title: body.title,
        author: body.author,
      },
    });
    console.log("here you can do anything with the current state", state);
  } catch (e: unknown) {
    console.log(e);
  }
}

export async function GET_CATALOG_STATE() {
  const catalogState = await createState(CATALOG_CONTEXT, ["/book/123"]);
  return catalogState;
}
