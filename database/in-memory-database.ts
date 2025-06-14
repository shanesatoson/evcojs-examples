import { CloudEvent } from "evcojs";

// just a fake database ... you would usually build a database connection anywhere, but not here
export const inMemoryDatabase: CloudEvent<any>[] = [];
