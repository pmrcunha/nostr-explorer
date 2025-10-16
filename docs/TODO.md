# TODO

## Setup and Scaffold
- [ ] Cleanup the existing code
- [ ] Setup mock UI for queries page
- [ ] Setup SQLite
- [ ] Setup Drizzle
- [ ] Write CRUD endpoints for queries

## Search Engine
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
- [ ] Make function to fetch relay information
- [ ] Make function to fetch npub metadata
- [ ] Add data about all event kinds

## Frontend
- [ ] Turn left panel into a fixed sidebar
- [ ] Setup CRUD operations for queries
- [ ] Make filter as you type search box with inline filters
- [ ] Make filters panel
- [ ] Make kinds panel
- [ ] Make event card with raw JSON display
- [ ] Make text note event preview
- [ ] Make reaction event preview
- [ ] Add settings button at the bottom of the sidebar

