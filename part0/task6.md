```mermaid
sequenceDiagram
    participant browser
    participant server

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa { "content": ...}
    activate server
    server-->>browser: HTTP 201 created { "message": "note created" }
    deactivate server
```
