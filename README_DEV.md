# Setup Gieß den Kiez

**Attention: Setting up Gieß den Kiez requires software development expertise.** We offer various level of help in setting up the project, for more information visit: https://deinestadt.giessdenkiez.de/

### The following setup was tested on this environment:

- macOS Ventura (Version 13.5.1)
- Apple MacBook M2
- Required software installed:
  - Docker (https://docs.docker.com/desktop/install/mac-install/)
  - Node / npm (https://nodejs.org/en/download/package-manager)
  - direnv (https://direnv.net/docs/installation.html)
  - Python 3 (https://docs.python-guide.org/starting/install3/osx/)
  - Software of your choice for accessing Postgres database

## Step 1: Setup with demo trees in Berlin

### After executing the following steps, you will have a working demo version of Gieß den Kiez (Berlin) running locally.

- Open terminal
- Create empty directory `mkdir gdk-setup && cd gdk-setup`
- Clone all relevant GdK repositories:
  - Frontend: `git clone git@github.com:technologiestiftung/giessdenkiez-de.git`
  - Backend / Database: `git clone git@github.com:technologiestiftung/giessdenkiez-de-postgres-api.git`
  - DWD Harvester: `git clone git@github.com:technologiestiftung/giessdenkiez-de-dwd-harvester.git`
  - Pumpen Harvester: `git clone git@github.com:technologiestiftung/giessdenkiez-de-osm-pumpen-harvester.git`
- Prepare database and API ([Supabase](https://supabase.com/) setup):
  - Change directory to `giessdenkiez-de-postgres-api` repository
  - `npm ci`
  - `cp .env.example .env`
  - In `.env`, set `ACCESS_CONTROL_ALLOW_ORIGIN=*`
  - `npx supabase start` which will start a local [Supabase](https://supabase.com/) instance
  - Now the Postgres database (and all other Supabase services) are running locally in Docker containers
  - To see all local Supabase credentials and tokens, use `npx supabase status`
- Generate the Mapbox tileset including rain data:
  - Create a Mapbox account (https://www.mapbox.com/)
  - Create a Mapbox access token (https://account.mapbox.com/)
  - Add `http://localhost:5173` to the list of allowed domains for your access token at https://account.mapbox.com/access-token 
  - Have your Mapbox account name ready
  - Change directory to `giessdenkiez-de-dwd-harvester` repository
  - `cp sample.env .env`
  - Populate the `.env` file:
    - Change `MAPBOXTOKEN` value to the previously created Mapbox access token
    - Change `SUPABASE_SERVICE_ROLE` value to your local Supabase service role key
    - Load the `.env` file: `direnv allow`
  - Create a Python virtual environment:
    - `python3 -m venv venv`
    - `source venv/bin/activate`
  - Install Python dependencies:
    - `pip install -r requirements-mac.txt`
    - Install `GDAL` dependency manually on your system, refer to the README at https://github.com/technologiestiftung/giessdenkiez-de-dwd-harvester
    - 🚨 Attention: This step can be prone to errors, depending on your system. For troubleshooting help, refer to the README at https://github.com/technologiestiftung/giessdenkiez-de-dwd-harvester
  - Run preparation steps:
    - `cd giessdenkiez-de-dwd-harvester/harvester/prepare`
    - `SHAPE_RESTORE_SHX=YES python create-buffer.py`
    - `python create-grid.py`
  - Run the actual script (harvests DWD rain data for last 30 days, generates Mapbox tileset):
    - `cd giessdenkiez-de-dwd-harvester/harvester/`
    - `python src/run_harvester.py` **This may take ~30 minutes or more!**
    - Go to https://studio.mapbox.com/tilesets and verify that the tileset is present
- Run the script for harvesting historical weather data via [BrightSky API](https://brightsky.dev/docs/#/):
  - `python src/run_daily_weather.py` **This may take several minutes!**
  - Verify that the `daily_weather_data` table in your database is populated
- Create the water pumps GeoJson file:
  - Change directory to `giessdenkiez-de-osm-pumpen-harvester` repository
  - `python3 -m venv venv`
  - `source venv/bin/activate`
  - Install Python dependencies:
    - `pip install -r requirements-mac.txt`
    - 🚨 Attention: This step can be prone to errors, depending on your system. For troubleshooting help, refer to the README at: https://github.com/technologiestiftung/giessdenkiez-de-osm-pumpen-harvester
  - Run `python harvester/main.py pumps.geojson` to generate a `pumps.geojson` file
  - Upload this file manually to the Supabase bucket (http://localhost:54323/project/default/storage/buckets/data_assets)
  - Copy the Supabase URL of the uploaded file
- Download the Geojson file for Berlin districts:
  - Go to https://daten.odis-berlin.de/de/dataset/bezirksgrenzen/ and download the GeoJSON manually
  - Upload the file to your Supabase instance at http://localhost:54323/project/default/storage/buckets/data_assets
  - Copy the URL of the uploaded file for later use as `VITE_BEZIRKE_URL` variable
- Change directory to `giessdenkiez-de-postgres-api/supabase` to start the Supabase Edge functions
  - `cp .env.sample .env` and change the variables:
    - `PUMPS_URL=<url_to_your_pumps_file>` set value to the URL of your pumps file
  - Run `supabase functions serve --env-file supabase/.env` in `giessdenkiez-de-postgres-api` directory
- Setup the Frontend:
  - Change directory to `giessdenkiez-de` repository
  - `npm ci`
  - `npm run dev`
  - `cp .env.sample .env`
  - `npm run start`
  - Open `http://localhost:5173/` in the browser, you will see an eternal loading screen indicating that trees are loading. In the browser console, you will see many errors. **This is expected**, continue with the next setup steps.
  - Prepare the correct values in the `.env` file:
    - `VITE_MAPBOX_API_KEY=<your-mapbox-api-key>` set to your Mapbox access token
    - `VITE_MAPBOX_TREES_TILESET_URL=<your-trees-tileset-url>` set to the Mapbox tileset URL, e.g. `VITE_MAPBOX_TREES_TILESET_URL=mapbox://<account_name>.<tileset_id>` use your Mapbox account name and tileset ID.
    - `VITE_MAP_PUMPS_SOURCE_URL=<your-pumps-source-url>` the URL to your `pumps.geojson` file, as previously uploaded
    - `VITE_BEZIRKE_URL=<your_bezirke_geojson_url>` set to the URL of the previously generated and uploaded GeoJson file of the districts
  - `direnv allow` to reload the environment
  - `npm run dev` to reload the App
  - Open `http://localhost:5173/map?treeId=00008100%3A001f2573` in the browser.

## Step 2: Adapt to your city

### After executing the following steps, you will have a working version of Gieß den Kiez (for your own city) running locally.

- In the `giessdenkiez-de-postgres-api` directory, do the following:
  - Connect to your local Gieß den Kiez database and delete all rows in all tables in the `public` scheme
    - either manually
    - or by removing the `seed.sql` file in the `giessdenkiez-de-postgres-api/supabase` directory and restarting Supabase via `npx supabase stop` and `npx supabase start` and `npx supabase db reset`
    - Add a row with `collection_date` set to todays date in table `radolan_harvester` (all other columns NULL).
  - 🚨 **Attention, important manual step:** Obtain a dataset of trees for your own city.
    - Manually it into the `trees` table of the database.
    - Make sure to follow the schema of the `trees` table, you need the following columns: `id, lat, lng, art_dtsch, gattung_deutsch, pflanzjahr, bezirk, geom`. All other columns are either ignored or populated automatically by some upcoming steps.
    - The `geom` column must be in the format: `SRID=4326;POINT(13.44828414775829 52.44315190724164)`
    - Only proceed after verifying that you have succesfully imported all trees into the database table.
  - 🚨 **Attention, important manual step:**
    - In `giessdenkiez-de-postgres-api/supabase/functions/gdk_stats/index.ts`, change the hardcoded values `MOST_FREQUENT_TREE_SPECIES` and `TREE_COUNT` to fit your city trees.
- In the `giessdenkiez-de-dwd-harvester` directory, do the following:
  - 🚨 **Attention, important manual step:** Obtain a [Shapefile](https://desktop.arcgis.com/en/arcmap/latest/manage-data/shapefiles/what-is-a-shapefile.htm) of your city which outlines the geographical city borders.
  - One source for obtaining the shapefile could be the [Geofabrik Portal](https://www.geofabrik.de/de/data/shapefiles.html). The Shapefile `your_city.shp` comes with a project file `your_project.proj`. Save both files in the `giessdenkiez-de-dwd-harvester/harvester/assets` directory.
  - 🚨 **Attention, important manual step:** In the file `giessdenkiez-de-dwd-harvester/harvester/prepare/create-buffer.py` file, change line 5 to fit the Shapefile of your city: `berlin = geopandas.read_file("../assets/your_city.shp")`.
  - Change directory to `giessdenkiez-de-dwd-harvester/harvester/prepare`
    - Run `SHAPE_RESTORE_SHX=YES python create-buffer.py` to re-generate the Shapefile buffers.
    - Run `python create-grid.py` to re-populate the `radolan_geometry` table in the database.
  - Change directory to `giessdenkiez-de-dwd-harvester/harvester`
    - Edit the `.env` file:
      - `MAPBOXTILESET=your_city_tileset` change value to a choice that fits your city, e.g. `your_city_tileset`
      - `MAPBOXLAYERNAME=your_city_layer` change value to a choice that fits your city, e.g. `your_city_layer`
      - `SURROUNDING_SHAPE_FILE=./assets/your_city_shapefile.shp` change value to the path of your citys shapefile
      - `WEATHER_HARVEST_LAT=52.520008` change value to the latitude of your city center
      - `WEATHER_HARVEST_LNG=13.404954` change value to the longitude of your city center
    - Reload the `.env` file: `direnv allow`
    - Run `python src/run_harvester.py` **This may take ~30 minutes or more!**
    - Go to https://studio.mapbox.com/tilesets and verify that the new Mapbox tileset is present
    - Run `python src/run_daily_weather.py` **This may take several minutes!**
    - Verify that the `hourly_weather_data` table is populated
- Back in the `giessdenkiez-de` directory, do the following:
  - Change values in the `.env`:
    - `VITE_MAP_CENTER_LNG=13.388836926491992` change the value to the longitude of the center of your city
    - `VITE_MAP_CENTER_LAT=52.494590307846366` change the value to the latitude of the center of your city
    - `VITE_MAP_BOUNDING_BOX=13.0824446341071,52.3281202651866,13.7682544186827,52.681600197973` change the value to the top left and bottom right corner coordinates of your city
    - `VITE_MAPBOX_TREES_TILESET_URL` change value to point to the newly created Mapbox layer containing the trees of your city
  - Reload the `.env` file: `direnv allow`
  - Restart the App: `npm run dev`
  - Visit `http://localhost:5173` in the browser, you should see a map with the trees of your city. 🎉

## Step 3: Deploy and automate

### After executing the following steps, you will have a working version of Gieß den Kiez (for your own city) deployed and automated.

### Disclaimer: This is the stack we are using for production. You are free to choose the technology by yourself.

- Create accounts for the following services:
  - Mapbox https://www.mapbox.com/ for providing the Map
  - Supabase https://supabase.com/ for hosting Database + API
  - Vercel https://vercel.com/ for hosting the Frontend
  - Pipedream https://pipedream.com/ for regularly scheduling Github actions
- Fork the repositories into your organization:
  - Frontend: `technologiestiftung/giessdenkiez-de.git`
  - Backend / Database: `technologiestiftung/giessdenkiez-de-postgres-api.git`
  - DWD Harvester: `technologiestiftung/giessdenkiez-de-dwd-harvester.git`
  - Pumpen Harvester: `technologiestiftung/giessdenkiez-de-osm-pumpen-harvester.git`
- Deploy Database / API:
  - Create a Supabase account at https://supabase.com/ and create a new project. Save project ID and database password for later use.
  - In **your own forked** `giessdenkiez-de-postgres-api` repository, go to Settings -> Environments and create an environment, e.g. "production"
  - Set environment secrets:
    - `DB_PASSWORD` set value to the database password which you entered when creating the Supabase project
    - `PROJECT_ID` set value to the project ID of your newly created Supabase project
    - `SUPABASE_ACCESS_TOKEN` Your personal Supabase access token
  - Make use of [Github Actions](https://docs.github.com/en/actions) to deploy the Supabase configuration to production:
    - refer to the Github Actions template in `giessdenkiez-de-postgres-api/.github/workflows/deploy-to-supabase-production.yml`
    - adapt this Github Action to your needs and run it, on each run it will deploy the Supabase migrations and functions to your Supabase production instance
- Deploy Mapbox Tileset:
  - Create a Mapbox account at https://www.mapbox.com/ which hosts your tilesets (if not done already)
  - In **your own forked** `giessdenkiez-de` repository, go to Settings -> Environments and crate an environment, e.g. "production"
  - Set environment variables accordingly
    - `PG_SERVER=...`
    - `PG_PORT=...`
    - `PG_USER=...`
    - `PG_PASS=...`
    - `PG_DB=...`
    - `SUPABASE_URL=...`
    - `SUPABASE_BUCKET_NAME=...`
    - `SUPABASE_SERVICE_ROLE_KEY=...`
    - `OUTPUT=...`
    - `LOGGING=...`
    - `MAPBOXUSERNAME=...`
    - `MAPBOXTOKEN=...`
    - `MAPBOXTILESET=...`
    - `MAPBOXLAYERNAME=...`
    - `SKIP_MAPBOX=...`
    - `LIMIT_DAYS=...`
    - `SURROUNDING_SHAPE_FILE=...`
    - `WEATHER_HARVEST_LAT=...`
    - `WEATHER_HARVEST_LNG=...`
  - make use of [Github Actions](https://docs.github.com/en/actions) to run the Github Actions of the `giessdenkiez-de-dwd-harvester`
    - refer to the Github Actions template in `giessdenkiez-de/.github/workflows/rain.yml`
    - make sure to setup all environment variables correctly
    - adapt this Github Action to your needs and run it, on each run it will generate the Mapbox tileset and popuplate the `daily_weather_data` table in the database
- Upload the Pumps file:
  - make use of [Github Actions](https://docs.github.com/en/actions) to run the Github Actions of the `giessdenkiez-de-pumpen-harvester`
  - make sure to setup the environment variables:
    - `SUPABASE_URL=...`
    - `SUPABASE_DATA_ASSETS_BUCKET=...`
    - `SUPABASE_SERVICE_ROLE_KEY=...`
  - refer to the Github Actions template in `giessdenkiez-de/.github/workflows/pumps.yml`
  - make sure to setup all environment variables correctly
  - adapt this Github Action to your needs and run it, on each run it will generate and upload the pumps file to your Supabase
- Upload the districts Geojson:
  - This step is not yet automated. Follow instructions in Step 1 and Step 2 to download the districts geojson and upload it to your Supabase instance.
- Deploy the Frontend:
  - Create a Vercel account at https://vercel.com/ for hosting the Frontend
  - Connect to **your own forked** `giessdenkiez-de` repository
  - Use `Vite` as framework preset
  - Set all environment variables:
    - `VITE_BEZIRKE_URL`
    - `VITE_MAPBOX_TREES_TILESET_URL`
    - `VITE_BASE_URL`
    - `VITE_RECOVERY_AUTH_REDIRECT_URL`
    - `VITE_MAPBOX_API_ENDPOINT`
    - `VITE_MATOMO_SITE_ID`
    - `VITE_MATOMO_URL`
    - `VITE_MAPBOX_TREES_TILESET_LAYER`
    - `VITE_MAPBOX_STYLE_URL`
    - `VITE_MAPBOX_API_KEY`
    - `VITE_MAP_PUMPS_SOURCE_URL`
    - `VITE_SUPABASE_ANON_KEY`
    - `VITE_SUPABASE_URL`
    - `VITE_MAP_LOCATION_ZOOM_LEVEL`
    - `VITE_MAP_CENTER_LNG`
    - `VITE_MAP_CENTER_LAT`
    - `VITE_MAP_PITCH_DEGREES`
    - `VITE_MAP_MAX_ZOOM_LEVEL`
    - `VITE_MAP_MIN_ZOOM_LEVEL`
    - `VITE_MAP_INITIAL_ZOOM_LEVEL`
    - `VITE_API_ENDPOINT`
  - Follow the Vercel instructions to deploy the Frontend
  - Add the Vercel domain or your custom domain to the list of allowed domains for your Mapbox access token at https://account.mapbox.com/access-token 
- Schedule CRON jobs to regularly update the Mapbox Tileset and Pumps
  - Create a Pipedream account at https://pipedream.com/
  - Schedule a CRON job (workflow) that regularly (every day at 01:00 AM) invokes the Github actions:
    - `giessdenkiez-de/.github/workflows/pumps.yml` and
    - `giessdenkiez-de/.github/workflows/rain.yml`
  - This ensures that:
    - the rain and watering data inside the Mapbox tileset is always up-to-date and
    - the pumps file is up to date

## Step 4: Regular maintenance

- In regular intervals, check if the districts GeoJson file of your city needs an update (this is handled manually)
- Monitor the Github Actions, especially the ones that are triggered daily by Pipedream workflows (pumps.yml and rain.yml)
  - make sure they are working as expected
  - in case of failures, the rain and watering data of the trees in the Mapbox layer might not be in sync with the database
- Whenever trees change in your city, make sure to manually update the `trees` table in the database
  - In case of changes, also update the hardcoded values `MOST_FREQUENT_TREE_SPECIES` and `TREE_COUNT` in `giessdenkiez-de-postgres-api/supabase/functions/gdk_stats/index.ts` to fit your new tree situation
- Sync your fork with our upstream repositories if you want to follow our latest development updates

## Troubleshooting
