import { createClient } from "tinacms/dist/client";
import { queries } from "./types";
export const client = createClient({ cacheDir: '/Users/yi/Documents/morgenzhou-blog/tina/__generated__/.cache/1778069898608', url: 'https://content.tinajs.io/2.3/content/local-client-id/github/main', token: 'local-token', queries,  });
export default client;
  