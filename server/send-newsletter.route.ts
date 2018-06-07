import {USER_SUBSCRIPTIONS} from "./in-memory-db";

const webpush = require('web-push');


export function sendNewsletter(req, res) {
    console.log('Total subscriptions', USER_SUBSCRIPTIONS.length);

    // sample notification payload
    const notificationPayload = {
        "notification": {
            "title": "ISF - Notificação",
            "body": req.body.mensagem,
            "icon": "assets/img/logo-sem-nome.png",
            "vibrate": [100, 50, 100],
            "data": {
                "dateOfArrival": Date.now(),
                "primaryKey": 1
            },
            "actions": [{
                "action": "onClick",
                "title": "Ir para o site",
                'url': 'https://aluno-2.firebaseapp.com'
            }]
        }
    };
    console.log(webpush);
    Promise.all(USER_SUBSCRIPTIONS.map(sub => webpush.sendNotification(
        sub, JSON.stringify(notificationPayload) )))
        .then(() => res.status(200).json({message: 'Newsletter sent successfully.'}))
        .catch(err => {
            console.error("Error sending notification, reason: ", err);
            res.sendStatus(500);
        });
}

