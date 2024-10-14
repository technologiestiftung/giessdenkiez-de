# Setup Gieß den Kiez

**Attention: Setting up Gieß den Kiez requires software development expertise.** We offer various level of help in setting up the project, for more information visit: https://deinestadt.giessdenkiez.de/

⚠️ **For sucessfully setting up Gieß den Kiez for your city, you need a dataset of the trees which should be shown on the map.** ⚠️ 

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
    - Tree Data Importer: `git clone git@github.com:technologiestiftung/giessdenkiez-de-tree-data.git`
- Prepare database and API:
    - In order to see trees on the map, you need a dataset with information about every single tree.
    - To store the tree data, you need to setup the database:
    - `cd giessdenkiez-de-postgres-api`
    - `npm ci` 
    - `cp .env.example .env`
    - In `.env`, set `ACCESS_CONTROL_ALLOW_ORIGIN=*`
    - `npx supabase start`
    - Now the database is running locally in a Docker container.
    - To see all credentials / tokens, use `npx supabase status`
- Prepare the Mapbox layer including rain and weather data:
    - Create a Mapbox account (https://www.mapbox.com/)
    - Create a Mapbox token (https://account.mapbox.com/)
    - Have your Mapbox account name ready
    - `cd giessdenkiez-de-dwd-harvester/harvester`
    - `cp sample.env .env`
    - Populate the `.env` file:
        - Change `MAPBOXTOKEN` value to your own Mapbox token
        - Change `SURROUNDING_SHAPE_FILE` value to `./assets/berlin.shp`
        - Change `SUPABASE_SERVICE_ROLE` value to your local Supabase service role key
        - Load the `.env` file: `direnv allow`
    - Create a Python virtual environment:
        - `python3 -m venv venv`
        - `source venv/bin/activate`
    - Install Python dependencies:
        - `pip install -r requirements.txt`
        - This step is prone to errors depending on your system, try installing the dependencies manually and refer to the the readme: https://github.com/technologiestiftung/giessdenkiez-de-dwd-harvester
    - Run the Rain (DWD) Harvester:
        - `cd giessdenkiez-de-dwd-harvester/harvester/prepare`
        - `SHAPE_RESTORE_SHX=YES python create-buffer.py`
        - `python create-grid.py`
        - `cd giessdenkiez-de-dwd-harvester/harvester/prepare`
        - `python src/run_harvester.py` This may take ~ 30 minutes or more!
        - Go to https://studio.mapbox.com/tilesets and verify that the tileset is present
    - Run the historical weather harvester:
        - `python src/run_daily_weather.py` This may take several minutes!
- Prepare the water pumps file:
    - `cd giessdenkiez-de-osm-pumpen-harvester`
    - `python3 -m venv venv`
    - `source venv/bin/activate`
    - Install Python dependencies:
        - `pip install -r requirements.txt`
        - This step is prone to errors depending on your system, try installing the dependencies manually and refer to the the readme: https://github.com/technologiestiftung/giessdenkiez-de-osm-pumpen-harvester
    - `python harvester/main.py pumps.geojson ` generates a `pumps.geojson` file
    - Upload this file manually to the Supabase bucket (http://localhost:54323/project/default/storage/buckets/data_assets)
    - Copy the URL of the uploaded file
- Download the Geojson file for Berlin districts:
    - Go to https://daten.odis-berlin.de/de/dataset/bezirksgrenzen/ and download the GeoJSON manually
    - Upload the file to your Supabase instance at http://localhost:54323/project/default/storage/buckets/data_assets
    - Copy the URL of the uploaded file
- Setup the Frontend:
    - `cd giessdenkiez-de`
    - `npm ci`
    - `npm run dev`
    - `cp .env.sample .env`
    - `npm run start`
    - Open `http://localhost:5173/` in the browser, you will see an eternal loading screen indicating that trees are loading. In the browser console, you will see many errors. **This is expected**, continue with the next setup steps.
    - Prepare the correct values in the `.env` file:
        - `VITE_MAPBOX_API_KEY=<your-mapbox-api-key>` set to your Mapbox API key
        - `VITE_MAPBOX_TREES_TILESET_URL=<your-trees-tileset-url>` set to the tileset URL, e.g. `VITE_MAPBOX_TREES_TILESET_URL=mapbox://<account_name>.<tileset_id>` use your Mapbox account name and tileset ID.
        - `VITE_MAP_PUMPS_SOURCE_URL=<your-pumps-source-url>` the URL to your `pumps.geojson` file, as previously uploaded
        - `VITE_BEZIRKE_URL=<your_bezirke_geojson_url>`
    - `direnv allow` to reload the environment
    - `npm run dev` to reload the App
    - Open `http://localhost:5173/map?treeId=00008100%3A001f2573` in the browser.

## Step 2: Adapt to your city
### After executing the following steps, you will have a working version of Gieß den Kiez (for your own city) running locally.
- In the `giessdenkiez-de` directory, do the following:
    - Change values in the `.env`:
        - `VITE_MAP_CENTER_LNG=13.388836926491992` change the value to the longitude of the center of your city
        - `VITE_MAP_CENTER_LAT=52.494590307846366` change the value to the latitude of the center of your city
        - `VITE_MAP_BOUNDING_BOX=13.0824446341071,52.3281202651866,13.7682544186827,52.681600197973` change the value to the top left and bottom right corner coordinates of your city
    - Reload the `.env` file: `direnv allow`
    - Restart the App: `npm run dev`
- In the `giessdenkiez-de-postgres-api` directory, do the following:
    - Connect to your local Gieß den Kiez database and delete all rows in all tables in the `public` scheme
        - either manually
        - or by removing the `seed.sql` file in the `giessdenkiez-de-postgres-api/supabase` directory and restarting Supabase via `npx supabase stop` and `npx supabase start` and `npx supabase db reset`)
    - ⚠️ **Obtain a dataset of trees for your own city.** ⚠️ 
        - Import it into the `trees` table of the database.
        - Make sure to follow the schema of the `trees` table, you need the following columns: `id, lat, lng, art_dtsch, gattung_deutsch, pflanzjahr, bezirk, geom`. All other columns are either ignored or populated automatically by some upcoming steps.
        - The `geom` column must be in the format: `SRID=4326;POINT(13.44828414775829 52.44315190724164)`
        - Only proceed after verifying that you have succesfully imported all trees into the database table.
- In the `giessdenkiez-de-dwd-harvester` directory, do the following:
    - Obtain a [Shapefile](https://desktop.arcgis.com/en/arcmap/latest/manage-data/shapefiles/what-is-a-shapefile.htm) of your city which outlines the geographical city borders. One source for obtaining the shapefile could be the [Geofabrik Portal](https://www.geofabrik.de/de/data/shapefiles.html). The Shapefile `your_city.shp` comes with a project file `your_project.proj`. Save both files in the `giessdenkiez-de-dwd-harvester/harvester/assets` directory.
    - Attention: Code changes needed! In the file `giessdenkiez-de-dwd-harvester/harvester/prepare/create-buffer.py` file, change line 5 to fit the Shapefile of your city: `berlin = geopandas.read_file("../assets/your_city.shp")`.
    - Run `SHAPE_RESTORE_SHX=YES python create-buffer.py` to re-generate the Shapefile buffers.
    - Run `python create-grid.py` to re-populate the `radolan_geometry` table in the database.
    - Edit the `.env` file:
        - `MAPBOXTILESET=your_city_tileset` change value to a choice that fits your city, e.g. `your_city_tileset`
        - `MAPBOXLAYERNAME=your_city_layer` change value to a choice that fits your city, e.g. `your_city_layer`
        - `SURROUNDING_SHAPE_FILE=your_city_shapefile.shp` change value to the path of your citys shapefile
    - Reload the `.env` file: `direnv allow`
