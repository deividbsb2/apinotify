
import * as express from 'express';
import { Application } from 'express';
import { readAllLessons } from './read-all-lessons.route';
import { addPushSubscriber } from './add-push-subscriber.route';
import { sendNewsletter } from './send-newsletter.route';
const bodyParser = require('body-parser');

const webpush = require('web-push');

const vapidKeys = {
    'publicKey': 'BM4aBw57wuiFGY6MHvgEv2KvBbdD2LgH644l89w6fY3d5A8G5xful4P3d6tyoAvlt_JsuhgsYIDeYIjuuZI5DXU',
    'privateKey': 'v0sAM6neL5B3NL2FaPegEHziNiDKeMqGwsdI8MjeTMw'
};


webpush.setVapidDetails(
    'mailto:example@yourdomain.org',
    vapidKeys.publicKey,
    vapidKeys.privateKey
);

const app: Application = express();

app.use(bodyParser.json());

// REST API
app.route('/api/lessons')
    .get(readAllLessons);

app.route('/api/notifications')
    .post(addPushSubscriber);

app.route('/api/newsletter')
    .post(sendNewsletter);

// launch an HTTP Server
const httpServer = app.listen(9000, () => {
    console.log('HTTP Server running at http://localhost:' + httpServer.address().port);
});









