# authkit

Hook and components for integrating with [Pica AuthKit](https://docs.picaos.com/authkit). Compatible with React, Next.js, Vue, Svelte and more.

## Install

With npm:

```jsx
npm i @picahq/authkit
```

With yarn:

```jsx
yarn add @picahq/authkit
```

## Using the AuthKit component

You'll want to replace the `token URL` with your token endpoint URL, which can be securely generated from your backend using Pica's [AuthKit Node](https://www.npmjs.com/package/@picahq/authkit-node) library.

```jsx
import { useAuthKit } from "@picahq/authkit";

const { open } = useAuthKit({
  token: {
    url: "https://api.your-company-name.com/authkit-token",
    headers: {},
  },
  onSuccess: (connection) => {},
  onError: (error) => {},
  onClose: () => {},
});
```

## Full Documentation

Please refer to the official [Pica AuthKit](https://docs.picahq.com/authkit) docs for a more holistic understanding of Pica AuthKit.
