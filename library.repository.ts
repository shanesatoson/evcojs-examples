import {
  CloudEvent,
  registerEventhandler,
  registerStateLoadingFunction,
} from "evcojs";
import { CONTEXT } from "./library.model";

const inMemoryEvents: CloudEvent<any>[] = [];
registerEventhandler("event.book.cataloged", (event) =>
  inMemoryEvents.push({ ...event })
);
registerStateLoadingFunction(CONTEXT, async (subjects: string[]) => {
  const events = inMemoryEvents.filter((event) =>
    subjects.includes(event.subject)
  );
  console.log("loading events", events);
  return events;
});
