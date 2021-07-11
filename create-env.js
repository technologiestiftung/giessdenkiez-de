/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const envVars = `
# these are only generated on netlify deploy
MAPBOX_API_KEY=${process.env.MAPBOX_API_KEY}\n
MAPBOX_TREES_TILESET_URL=${process.env.MAPBOX_TREES_TILESET_URL}\n
MAPBOX_TREES_TILESET_LAYER=${process.env.MAPBOX_TREES_TILESET_LAYER}\n
AWS_TREES_URL=${process.env.AWS_TREES_URL}\n
AUTH0_DOMAIN=${process.env.AUTH0_DOMAIN}\n
AUTH0_CLIENT_ID=${process.env.AUTH0_CLIENT_ID}\n
AUTH0_AUDIENCE=${process.env.AUTH0_AUDIENCE}\n
USER_DATA_API_URL=${process.env.USER_DATA_API_URL}\n
API_ENDPOINT=${process.env.API_ENDPOINT}\n
`;
fs.writeFileSync('./.env', envVars);
