# Midlibrary Explorer

<img width="1262" alt="Screenshot 2024-07-25 at 6 14 46 PM" src="https://github.com/user-attachments/assets/b6e97524-dab1-4271-bece-fb10949b54f0">

This is a [demo](https://demo-midlibrary-explorer.vercel.app/) of Discovery Search powered by [Qdrant](https://qdrant.tech). It demonstrates how you can use vector similarity search in a scenario, where it is hard to construct a search query.


The demo uses the following major components

- [NextJS](https://nextjs.org/)
- [Qdrant JS Client](https://www.npmjs.com/package/@qdrant/js-client-rest)

## Quick Start

### Set up a Qdrant instance

You can create a free instance at <https://cloud.qdrant.io/>.

OR

For local deployment

```bash
docker run -p 6333:6333 qdrant/qdrant
```

### Prepare Qdrant Collection

Download the Midjourney dataset snapshot using the [Qdrant dashboard](https://qdrant.tech/documentation/web-ui/).

![Untitled](https://github.com/Anush008/demo-midlibrary-explorer/assets/46051506/529c93c5-4d04-4aef-957d-f56674508d96)

### Run The Project

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fqdrant%2Fdemo-midlibrary-explorer-nextjs&env=QDRANT_URL%2CQDRANT_API_KEY%2CQDRANT_COLLECTION_NAME&envDescription=Configure%20Qdrant%20credentials%20using%20environment%20variables&envLink=https%3A%2F%2Fgithub.com%2Fqdrant%2Fdemo-midlibrary-explorer-nextjs%2Fblob%2Fmaster%2F.env.example&demo-title=Qdrant%20Midjourney%20Explorer%20with%20NextJS&demo-url=https%3A%2F%2Fqdrant-next-midlibrary-explorer.vercel.app%2F)

OR

For local deployment

- Set the required [environment variables](https://github.com/qdrant/demo-midlibrary-explorer-nextjs/blob/master/.env.example) in a `.env` file.
- Run the following commands.

```bash
$ npm install

$ npm run dev
```

The application should now be accessible at `http://localhost:3000`

## ⚖️ LICENSE

Apache 2.0 © [Qdrant](LICENSE)
