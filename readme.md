# Dhesend Node.js SDK

A Node.js library for interacting with the Dhesend API, designed to make email sending simple and efficient.
For full documentation, visit the [official website](https://dhesend.vercel.app/docs/introduction).

## Installation

Install the SDK using your preferred package manager:

```bash
npm install dhesend
# or
yarn add dhesend
```

## Examples

Discover example integrations with various frameworks:

- [Node.js Example](https://github.com/dhesend/dhesend-nodejs-example)
- [Next.js (App Router)](https://github.com/dhesend/dhesend-nextjs-app-router-example)
- [Next.js (Pages Router)](https://github.com/dhesend/dhesend-nextjs-pages-router-example)
- [Express Example](https://github.com/dhesend/dhesend-express-example)

## Setup

1. **Obtain an API Key:**  
      Get your API key from the [Dhesend Dashboard](https://dhesend.vercel.app/api-keys).

2. **Initialize the SDK:**  
      Use your API key to create an instance of the Dhesend client.

```js
import Dhesend from 'dhesend';

const dhesend = new Dhesend('your_api_key_here'); // Replace with your actual API key
```

## Usage

### Sending Your First Email

```js
const { data, error } = await dhesend.emails.send({
  from: "example@yourdomain.com",
  to: ['recipient@example.com'],
  subject: 'Welcome to Dhesend',
  textBody: 'Have a nice day!',
});
```

### Sending Emails with Custom HTML

```js
const { data, error } = await dhesend.emails.send({
  from: "example@yourdomain.com",
  to: ['recipient@example.com'],
  subject: 'Welcome to Dhesend',
  htmlBody: '<strong>Have a nice day!</strong>',
});
```

## Advanced Usage

### Sending Emails Using React Templates

#### Step 1: Create a React Component for Your Email Template

```jsx
import React from 'react';

export default function EmailTemplate({ firstName }) {
  return (
    <div>
      <h1>Welcome, {firstName}!</h1>
      <p>Thanks for signing up with Dhesend.</p>
    </div>
  );
}
```

#### Step 2: Convert the Component to HTML and Send the Email

```jsx
import ReactDOMServer from 'react-dom/server';
import EmailTemplate from '../components/EmailTemplate';

const { data, error } = await dhesend.emails.send({
  from: "Dhesend <example@domain.com>",
  to: ['recipient@example.com'],
  subject: 'Welcome to Dhesend',
  htmlBody: ReactDOMServer.renderToStaticMarkup(<EmailTemplate firstName="Ali" />),
});
```

## License
MIT License.