const functions = require("firebase-functions");
const google = require("googleapis").google;
const path = require('path')

const SCOPE = "https://www.googleapis.com/auth/calendar.readonly";

exports.getHolidays = functions.https.onRequest((req, res) => {
  const auth = new google.auth.GoogleAuth({
    keyFile: path.join(__dirname, "key.json"),
    scopes: SCOPE,
  });

  auth
    .getClient()
    .then((client) => {
      const calendar = google.calendar({
        version: "v3",
        auth: client,
      });

      return calendar.events.list({
        calendarId: "en.eg#holiday@group.v.calendar.google.com",
        orderBy: "startTime",
        timeMin: "2020-01-1T0:00:0.000Z",
        singleEvents: true,
      });
    })
    .then((resposne) => {
      res.send({ holidays: resposne.data.items });
      return;
    })
    .catch((error) => {
      res.send(error);
    });
});
