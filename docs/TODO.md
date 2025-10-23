# TODO

## Setup and Scaffold
- [ ] Cleanup the existing code
- [x] Delete settings button from sidebar
- [x] Get rid of the relays page
- [ ] Change link to queries page to be a settings button in the right side
- [ ] Setup mock UI for queries/settings page
- [x] Setup SQLite
- [x] Setup Drizzle
- [ ] Write CRUD endpoints for queries

## Search Engine
- [ ] Figure out how to get API keys for Meilisearch securely
- [ ] Write function to get API keys from Meilisearch
- [ ] Setup filtering and faceting in Meilisearch

## API Definition
- [ ] Write schemas for queries endpoints

## Nostr service
- [ ] Fetch data from a relay and upload to Meilisearch
- [ ] Get all queries and fetch from their relays
- [ ] Instead of immediately fetching, setup a cron job that runs the queries
- [ ] Stop and remove cron job when the queries is deleted

## Nostr library
- [ ] Add data about all event kinds
- [ ] Make function to fetch relay information
- [ ] Make function to fetch npub metadata

## Frontend
- [x] Turn left panel into a fixed sidebar
- [ ] Setup CRUD operations for queries
- [ ] Setup API calls for search and filtering
- [ ] Make filter as you type search box with inline filters
- [ ] Make filters panel
- [ ] Make kinds panel
- [ ] Make event card with raw JSON display
- [ ] Make text note event preview
- [ ] Make reaction event preview

