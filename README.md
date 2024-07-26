# Evently

## Getting Started

First, clone the Evently repo,

Run the 'init-db.mjs' script to create new tables:

```node
node src/scripts/init-db.mjs
```

Afterwards, run

```bash
npm install

```

then

```bash
npm run dev
```

to start up the project on your local machine;

The project requires that you create a .env file and any random string as the value of the 'NEXT_PRIVATE_JWT_SECRET' key.

#### DESCRIPTION
This project is an attempt at solving IntelRegion's assessment test.
The project is built using Nextjs and Typescript. This is my go-to framework whenever I need to build a simple fullstack project, which this frontend assessment ends up becoming. Styling is done using TailwindCss and I brought in some shadcn components to help speed up the development process. I decided to use as little shadcn components as possible because I wanted the app to be a bare-metal as possible.

### Deployment

The app is currently deployed on Vercel and can be accessed via (https://events-manager.vercel.app)

