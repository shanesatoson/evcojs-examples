import { setSource } from "evcojs";
import { eventStore, projectionTable } from "./database/in-memory-database";
import {
  GET_CATALOG_STATE,
  POST as POST_CATALOG,
} from "./example-domain-usage/fake-http-catalog-controller";
import {
  GET_INVENTORY_STATE,
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

const catalogState = await GET_CATALOG_STATE();
console.log("catalog state:", catalogState);
const inventoryState = await GET_INVENTORY_STATE();
console.log("inventory state: ", inventoryState); //amount 1, maxCopies 2

console.log("");
console.log("# ----------------------------------------------- #");
console.log("projections:");
console.log("# ----------------------------------------------- #");
console.log(projectionTable);

console.log("");
console.log("# ----------------------------------------------- #");
console.log("events:");
console.log("# ----------------------------------------------- #");
console.log(eventStore);
