import { CloudEvent } from "evcojs";

export interface BookProjection {
  isbn: string;
  title: string;
  author: string;
  amount?: number;
  maxCopies?: number;
}

// just a fake database ... you would usually build a database connection anywhere, but not here
export const eventStore: CloudEvent<any>[] = [];

export const projectionTable = new Map<string, BookProjection>();
