import { handleCommand } from "evcojs";
import { registerCatalogBookDomain as registerBookCatalogDomain } from "../domain-modules/book-catalog";

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
export async function POST(body: PostBodyDto) {
  try {
    await handleCommand({
      type: "command.book-catalog.catalog.book", //identifier of the command to find the handler
      subjects: ["/book/" + body.isbn], //events to rebuild the state
      data: {
        //payload data for the command
        isbn: body.isbn,
        title: body.title,
        author: body.author,
      },
    });
  } catch (e: unknown) {
    console.log(e);
  }
}
