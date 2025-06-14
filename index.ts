import { createState, setSource } from "evcojs";
import { inMemoryDatabase } from "./database/in-memory-database";
import { CATALOG_CONTEXT } from "./domain-modules/book-catalog/book-catalog.model";
import { INVENTORY_CONTEXT } from "./domain-modules/book-inventory/book-inventory.model";
import { POST as POST_CATALOG } from "./example-domain-usage/fake-http-catalog-controller";
import {
  POST_BORROW,
  POST_REGISTER,
  POST_RETURN,
} from "./example-domain-usage/fake-http-inventory-controller";

setSource("https://library.evcojs.org"); //For CloudEvents.source field globally

// add a book to our catalog
await POST_CATALOG({
  isbn: "123",
  title: "123",
  author: "123",
});

// register 2 copies
await POST_REGISTER({
  isbn: "123",
});

await POST_REGISTER({
  isbn: "123",
});

// borrow both copies
await POST_BORROW({
  isbn: "123",
});

await POST_BORROW({
  isbn: "123",
});

// return one copy
await POST_RETURN({
  isbn: "123",
});

const catalogState = await createState(CATALOG_CONTEXT, ["/book/123"]);
console.log("catalog state:", catalogState);
const inventoryState = await createState(INVENTORY_CONTEXT, ["/book/123"]);
console.log("inventory state: ", inventoryState); //amount 1, maxCopies 2

console.log("");
console.log("# ----------------------------------------------- #");
console.log("events:");
console.log("# ----------------------------------------------- #");
console.log(inMemoryDatabase);
