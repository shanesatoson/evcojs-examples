import { createState, handleCommand } from "evcojs";
import { registerBookInventoryDomain } from "../domain-modules/book-inventory";
import { INVENTORY_CONTEXT } from "../domain-modules/book-inventory/book-inventory.model";

//After that call the handle command function know the "book inventory" events,
//staterebuilder, stateloader and commands
registerBookInventoryDomain();

interface PostBodyDto {
  isbn: string;
}

/**
 * fake HTTP controller to show register a copy
 *
 * @param body http body
 */
export async function POST_REGISTER(body: PostBodyDto) {
  try {
    await handleCommand({
      type: "command.book-inventory.register.copy", //identifier of the command to find the handler
      subjects: ["/book/" + body.isbn], //events to rebuild the state
      data: {
        //payload data for the command
        isbn: body.isbn,
      },
    });
  } catch (e: unknown) {
    console.log(e);
  }
}

/**
 * fake HTTP controller to show borrow a copy
 *
 * @param body http body
 */
export async function POST_BORROW(body: PostBodyDto) {
  try {
    await handleCommand({
      type: "command.book-inventory.borrow.copy", //identifier of the command to find the handler
      subjects: ["/book/" + body.isbn], //events to rebuild the state
      data: {
        //payload data for the command
        isbn: body.isbn,
      },
    });
  } catch (e: unknown) {
    console.log(e);
  }
}

/**
 * fake HTTP controller to show return a copy
 *
 * @param body http body
 */
export async function POST_RETURN(body: PostBodyDto) {
  try {
    await handleCommand({
      type: "command.book-inventory.return.copy", //identifier of the command to find the handler
      subjects: ["/book/" + body.isbn], //events to rebuild the state
      data: {
        //payload data for the command
        isbn: body.isbn,
      },
    });
  } catch (e: unknown) {
    console.log(e);
  }
}

export async function GET_INVENTORY_STATE() {
  const inventoryState = await createState(INVENTORY_CONTEXT, ["/book/123"]);
  return inventoryState;
}
