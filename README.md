# Embark: Timetable

A web app for public transport users to view and print departure timetables for each stop.

Please note that this project (including this README) is a work in progress.

### Setup

Node.js 20.6.0 or higher is required to install and run the server.

```bash
# Install the dependencies
npm install

# Create the ".env" config file
cp .env.example .env

# Build the project
npm run build

# Start the server
npm run start
```

The server will be hosted on localhost at the port specified in `.env`.

The `.env` file contains the configuration for the server and can be edited. The `.env.example` file contains an example of the options available.

### Development

Additional scripts are available for development:

```bash
# Clean the output folders
npm run clean

# Clean then build the project
npm run build

# Clean then build the project in watch mode
npm run watch

# Start the server and auto-restart on changes
npm run nodemon
```

The following sub-scripts are available if a more granular approach is required:

```bash
# Clean a module's output directory:
npm run clean:client
npm run clean:server

# Build a module:
npm run build:client
npm run build:server

# Build a module in watch mode:
npm run watch:client
npm run watch:server
```