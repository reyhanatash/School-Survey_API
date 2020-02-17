// src/server.ts
import app from './app';
import * as compression from 'compression';
const PORT = 3000;

app.use(compression()); //Compress all routes

app.listen(PORT, () => {
    console.log('Express server listening on port ' + PORT);
});
