# Nostr Explorer

## Architecture

```mermaid
architecture-beta
    group nostr(internet)[NOSTR]
    group backend(cloud)[BACKEND]
    group frontend(internet)[FRONTEND]

    service relays(internet)[RELAY] in nostr
    service client(internet)[UI] in frontend
    service db(database)[SQLite] in backend
    service meili(database)[Meilisearch] in backend
    service server(server)[NOSTR Service] in backend

    db:L <--> R:server
    meili:R <--> L:server
    client:T <--> B:server
    relays:B --> T:server
```

## Commands for testing

**Download my kind 1 events and save as JSON**  
`echo npub1k2vcw6agtcea54exjfrl07g6acp97k7jhs3f42zu0yy0xlqsequqsjfh9l | nak fetch --relay wss://relay.damus.io --kind 1 | jq -s '.' > kind1.json`

**Run a discardable relay**  
`nak serve`

**Upload events in a JSON file to Meilisearch**  
```
curl \
  -X POST 'http://localhost:7700/indexes/events/documents?primaryKey=id' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer aSampleMasterKey' \
  --data-binary @kind1.json
```

**Get API Keys for Meilisearch**  
```
curl -X GET 'http://localhost:7700/keys' \
-H 'Authorization: Bearer MASTER_KEY'
```
