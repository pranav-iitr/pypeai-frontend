import { createClient } from 'contentful';


console.log(process.env.REACT_APP_CONTENTFUL_SPACE_ID)

const client = createClient({
   space:  process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID, // Store in env variables for security
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
});

export default client;
