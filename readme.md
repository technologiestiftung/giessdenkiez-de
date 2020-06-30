# giessdenkiez.de  

Source repo for [giessdenkiez.de](https://www.giessdenkiez.de) project by Technologiestiftung Berlin and CityLAB Berlin.  

## Used Resources

This is a short list of the things that are needed for running this project yourselves.

- Netlify.com for hosting
- vercel.com for serverless functions to interact with the database
- AWS RDS Postgres
- auth0.com + vercel.com for user management
- AWS Fargate python script in docker for rain data aggreagation from Deutsche Wetterdientst (DWD) + Mapbox API for creating vector tiles for mobile

These are the related repos:  

- [React frontend (this is here)](https://github.com/technologiestiftung/tsb-trees-frontend)
- [vercel.com  DB API](https://github.com/technologiestiftung/tsb-tree-api-now-express)
- [vercel.com Auth0 API (currently only for username and user deletion)](https://github.com/technologiestiftung/tsb-trees-api-user-management)
- [AWS Fargate Service for DWD rain data and Mapbox API vector tiles](https://github.com/technologiestiftung/dwd-radolan-tree-harvester) 

Below is a rough sketch of the architecture:

![software architecture](./docs/images/software-architecture.png)

## Development

To get the map tiles loaded you need to create a `.env` file and add the following:

```plain
API_KEY=****************
AUTH0_DOMAIN=***********
AUTH0_CLIENT_ID=********
AUTH0_AUDIENCE=*********
USER_DATA_API_URL=******
```

Start the project via  

```plain
npm start
```

