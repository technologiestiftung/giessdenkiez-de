const fs = require('fs');
const envVars = `
# these are only generated on netlify deploy
API_KEY=${process.env.API_KEY}\n
AUTH0_DOMAIN=${AUTH0_DOMAIN}\n
AUTH0_CLIENT_ID=${AUTH0_CLIENT_ID}\n
AUTH0_AUDIENCE=${AUTH0_AUDIENCE}\n
`;
fs.writeFileSync('./.env', envVars);
