# Implementing RESTful APIs with ONLY CORE Node JS Modules
### No NPM Challenge

### Steps to follow:
3. Implementing Router (replacement of Express Router)
- It accepts the client's path, and then give appropriate response to the request.

//Server Modes:
// Preproduction testing : Staging Mode
// All set and deplyed on cloud : Production Mode

4. To create SSL Keys (paste this in shell):
openssl req -newkey rsa:2048 -new -nodes -x509 -days 3650 -keyout key.pem -out cert.pem

#### Day 2 Summary : 
- Implemented algorithm to Design a Router and Router Handlers (Usually Express Router automatically does this)
- Wrote alogorithm to deal with Process Environment Variables and global configs (Usually config npm module does this)
- Created https server and implemented SSL certificates uisng openssl to encrypt the req-res cycle. (Usually nginx does this)