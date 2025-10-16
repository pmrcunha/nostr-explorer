# TODO

## Search Engine
- [x] Setup Meilisearch in docker container. Add events to it manually.
- [ ] Write function to get API keys from Meilisearch
- [ ] Setup filtering and faceting in Meilisearch

## Nostr service
- [ ] Fetch data from listed relays and upload to Meilisearch
- [ ] Setup SQLite
- [ ] Write CRUD endpoints for the list of relays
- [ ] Make function to fetch relay information
- [ ] Write CRUD endpoints for queries
- [x] Test using Effect to run Cron jobs
- [x] Remove Effect - use croner instead for cron jobs
- [ ] Read queries from database and setup Cron job based on them
- [ ] Write functions to download all NIPs from Github and store them in Meilisearch
- [ ] Write function to extract kinds list from NIPs README
- [ ] Make function to fetch npub metadata

## Frontend
- [x] Setup frontend and scaffold the UI
- [x] Setup API Client using Tanstack Query 
- [x] Setup Zod to validate API payloads and responses
- [ ] Scaffold the queries page
- [ ] Scaffold the relays page
- [ ] Setup CRUD operations for relays
- [ ] Setup CRUD operations for queries
- [ ] Make filter as you type search box with inline filters
- [ ] Make filters panel
- [ ] Make kinds panel
- [ ] Make event kind description modal
- [ ] Make event card with raw JSON display
- [ ] Make text note event preview
- [ ] Make reaction event preview
- [x] Fetch data from Meilisearch in the UI client
- [ ] Turn left panel into a fixed sidebar
- [ ] Add settings button at the bottom of the sidebar
- [x] Convert from Bun to Vite, vitest, pnpm

