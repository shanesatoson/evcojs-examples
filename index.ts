import { handleCommand, registerEventhandler, setSource } from "evcojs";
import "./library.domain";
import "./library.repository";
setSource("https://library.evcojs.org");

registerEventhandler("event.book.cataloged", (events) => {
  console.log("event arrived in own event handler", events);
});
await handleCommand({
  type: "command.catalog.book",
  subjects: ["/book/123"],
  data: {
    isbn: "123",
    title: "123",
    author: "123",
  },
});

await handleCommand({
  type: "command.not.available",
  subjects: ["/book/123"],
  data: {
    isbn: "123",
    title: "123",
    author: "123",
  },
});

await handleCommand({
  type: "command.catalog.book",
  subjects: ["/book/123"],
  data: {
    isbn: "123",
    title: "123",
    author: "123",
  },
});

await handleCommand({
  type: "command.not.available",
  subjects: ["/book/123"],
  data: {
    isbn: "123",
    title: "123",
    author: "123",
  },
});
