# evcojs-examples

Examples how to use evcojs lib

# Usage

```bash
# Install dependencies
npm i

# Run the development server
npm run dev

# Watch for changes and recompile automatically
npm run watch
```

## output

```bash
here you can do anything with the current state { isbn: '123', title: '123', author: '123' }
catalog state: { isbn: '123', title: '123', author: '123' }
inventory state:  { isbn: '123', amount: 1, maxCopies: 2 }

# ----------------------------------------------- #
projections:
# ----------------------------------------------- #
Map(1) {
  '123' => { isbn: '123', title: '123', author: '123', amount: 1, maxCopies: 2 }
}

# ----------------------------------------------- #
events:
# ----------------------------------------------- #
[
  {
    source: 'https://library.evcojs.org',
    subject: '/book/123',
    type: 'event.book.cataloged',
    id: 'fb098042-9a93-4ea6-9eb7-3433f0920bb7',
    timestamp: 2025-06-14T16:18:15.578Z,
    data: { isbn: '123', title: '123', author: '123' }
  },
  {
    source: 'https://library.evcojs.org',
    subject: '/book/123',
    type: 'event.book.copy.registered',
    id: 'ce1dd149-6a55-4260-9ad7-2494ab35a40b',
    timestamp: 2025-06-14T16:18:15.578Z,
    data: { isbn: '123' }
  },
  {
    source: 'https://library.evcojs.org',
    subject: '/book/123',
    type: 'event.book.copy.registered',
    id: 'c5475ef8-385e-4f31-b168-a668b26a9956',
    timestamp: 2025-06-14T16:18:15.578Z,
    data: { isbn: '123' }
  },
  {
    source: 'https://library.evcojs.org',
    subject: '/book/123',
    type: 'event.book.copy.borrowed',
    id: 'd4468205-28af-4adf-b661-5240af92d48d',
    timestamp: 2025-06-14T16:18:15.578Z,
    data: { isbn: '123' }
  },
  {
    source: 'https://library.evcojs.org',
    subject: '/book/123',
    type: 'event.book.copy.borrowed',
    id: '4c1b0283-1370-4a3b-84e6-f4bb0ac2cbff',
    timestamp: 2025-06-14T16:18:15.578Z,
    data: { isbn: '123' }
  },
  {
    source: 'https://library.evcojs.org',
    subject: '/book/123',
    type: 'event.book.copy.returned',
    id: '6fbf717e-db30-44b0-9626-e346d083ccdc',
    timestamp: 2025-06-14T16:18:15.578Z,
    data: { isbn: '123' }
  }
]

```

# Structure

## 'database' folder

The `database` folder contains a simple in-memory database which is a fake in-memory-database
for the purpose of this example. It is not intended to be used in production.
In a real application you would create a database connection to your SQL or NoSQL or eventsourcingdb to load and store the events and to build projections

## 'example-domain-usage' folder

The `example-domain-usage` folder contains a simple example of how to use the domain modules.
It contains a fake HTTP server which implements the commands and queries of the domain.
This would usually be implemented with a framework like Express.js, Sveltekit, NestJS, Koa.js, Fastify, Hapi.js etc.

## 'domain-modules' folder

The `domain-modules` folder contains the encapsulated business domain logic in CQRS + Eventsourcing style.

### context variable

The context is important for the registration of commands, eventhandlers and staterebuilders.
When a command is registered to a context, the context defines which stateloader, eventrebuilder and eventhandlers are used.
This ensures that the commandhandler is executed in the correct context.
The command type must be unique app wide, but staterebuilder, eventhanlder and stateloader are unqiue within a context.

### Commandhandler

The command handlers are implemented in the `.domain.ts` files and execute the domain logic and publish a CloudEvents to create a new state.

### Staterebuilder

The state rebuilders are implemented in the `.domain.ts` files and will be executed before the command handler and after the stateloading handler are called. They are responsible for building the state based on the stored events and will be called in the correct order to ensure the state reflects the sequence of events that occurred.

The events can be reused between the domains in staterebuilder to build flexible domain logic (BookCatalogedEvent for example), but the commands are unique assigned to every domain.

### stateLoader

The state loading is implemented in the `.repository.ts` files and loads all events by provided subjects. The staterebuilder will be executed afterwards.

### Eventhandler

The event handlers are implemented in the `.repository.ts` files and are responsible for persisting the events and projections. They are executed after the command handler and staterebuilder

## index.ts

just to run the whole stuff to see, that it works.
