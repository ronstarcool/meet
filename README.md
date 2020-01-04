# This readme includes: 
- Done
- Todo
- How to get this repo started??

## Done
vue
express

## Todo
- config postgres: 1: db-setup, 2: routes, 3: seed
- add modals for the vue front-end / user-options
- make one start command / serve front-end on / or *
- create some clear info-window
- see if PWA is working

### Front-end should show on intuition:
- What is this?
- What do they have?
- What can i do here?
- Why should i be here, and not some place else?

### Info window expands on this, and tell more detail.
Words that come to mind here are:
- Anonimous
- No data gathering
- No user-capturing / computer-enslavement
- Meet real people
- Fast, easy, connect, internet, bars, trains, directions, advice, shared-interest, 

## How to get this stuff started??
Current master:
- pull
- cd into project
- run: yarn
- open an extra commandline
- on commandline 1 run: nodemon index.js
- on commandline 2 run: yarn serve
- open logged port on browser, probably 8080
- click button. see log on server-commandline
- hoeray, stuff is working

Current develop:
- have a postgres db running
- add a .env file looking something like this:
```
USER=postgres
PASSWORD=password
HOST=localhost
PORT=5433
DATABASE=meet
```