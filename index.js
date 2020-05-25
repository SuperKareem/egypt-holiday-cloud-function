const functions = require("firebase-functions");
const google = require("googleapis").google;

const GOOGLE_APIS_CREDINTIALS = {
  type: "service_account",
  project_id: "vocal-invention-278307",
  private_key_id: "8058df0d2f58010de46ab5f8d8a33ec6cf79bdfd",
  private_key:
    "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDWHTBQyofXe+KY\nXMnsek3TQDtRFyw+jUMB+lxa3kwGHKoXPusUP+99oTozT2V4gHsxbWEkYqYaW2UJ\nzQYk9LCbA1W+WDGgAJf+2aNa8Ahe/GkttIvbaWQGSZ9TLlW8nsKjwVu8PVx8c5k+\nVOmpNaJOES43AqdMd2Ub2SkhZ20RrjY6aqoBf3HzxndrQXqANB2dPGrjdnwcj7rl\nBsqeSu1hKrAEivZn6yftCHrBEv0Wiv/jEpmWxGzJ+9cD3GOW5C2fULEnIvPb62by\nNYfURYLy5JOI//ue4dHGmqb86cmBc1jqeps7pfG1rauj/aFDvpTMsQSJvheaAuJa\n6BVZ5onDAgMBAAECggEAMhm8X3s0lAhp+irkGNB5e2/xMUVR1gUp48GYcK7JbTix\n2CShzygyutvKCY2PecXeja9BZskqgspV9xghUu5qkKsUGij626yn5Ds6zSGTY95+\nIfK4MwwTGqGJhWY3K56efsDU3VQiWwCVoA8waaaiJtBAVyDo0qyxXPXQeP+Bdvw1\n287YspNjg028AjJEgkDQU0Wc4RAMdv/SINyyKOl2mPV4o+EAKIKL91rehwvrW+97\nNOSqzZecXRsQsfXI/amlwwZG7hCiq+rh8PTorsJgfCI88nIZvwGEMg2SHAjMeJoE\ncxWt0GJf2TJISysq8+bV2wDF58BV2F5VlA8XKI/aoQKBgQD7sFb7t57HTZrYBTnx\nv9UhqLIFgckA+9Rdacnq7yClS68eT9dKrZ7XZDM5zwkxoistgwltUSPiHrvSvb1P\nkJFFV4I/cIgUbb8hUWm2LUvVFFqosQUuOBYwEDX/GPSovnZTrnJwCrw6E7H6JhHe\nvwgs2W7FujykDA9OloijxmNrswKBgQDZyBUswQlqLsFYLw1Qr1I8tY5IfWyMwXja\n0vM8pF7b0Ty09RiRV8rt7Pck5rZebfduzo0Xu/Z7dzEHaXRIzZqvCvTsm40wL5hd\n7+Cb2oIY3ka5Kwfe1ACMPBTSu8KjKtDdSNE22+egb3ttKA6MOphtj+L1XZl/S5Lj\nLFBuqR0hsQKBgAb2cOGTydOvpOn28wxqByZgOVSHq5zYWp6e75QNO3T3LAgFo2oQ\ndYV14yjlPlbeKp2es2MPzJNT0FRbJWKPGEW3zwWcQld2VcRBMVB13lQttPhXtVH7\nATohKK0+7n3AjxtvhwDsexqMMu89oF7uH/bFqRfVOBo9ryq4ZV1KfrObAoGAamZx\nyfrJ8cHEHqRmWfw+LoD5cfstVJuVwzt7MS6RVc4lXbe9eA0vjQzQNowtn3cUg2OQ\n1X60zt+N6bQg5wzkvQ6aWRsqYNdwFr0CvMKF+0ZlwUP/xWNInTshZU/sqTFa+DIC\nXU4VHXI6GDuQ1/wsyqKY3Q4M13+B1VGqPlaLcBECgYEA7+uYM/JCG2tBsR54xRCe\n0V388u50JLYLqPHy5iLG55GkVDGrLYN3Cs5KNQWcSXS95Lrf1479r2t476AOXSek\n3M0WWc29n1LCa62i4YAX01XbTVUWMW35akBkgZarksYvhWs9YcZKWtI6qKmX0Emx\nkwokcllxC8P+ml4TusgbeDQ=\n-----END PRIVATE KEY-----\n",
  iss: "calendar-holidays@vocal-invention-278307.iam.gserviceaccount.com",
  client_id: "112015729470029531519",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/calendar-holidays%40vocal-invention-278307.iam.gserviceaccount.com",
};

const SCOPE = "https://www.googleapis.com/auth/calendar";

function getTokenTimes() {
  const issued = Date.now();
  const expired = issued + 60 * 60 * 1000;

  return { issued, expired };
}

exports.getToken = functions.https.onRequest((req, res) => {
  new google.auth.GoogleAuth({
    credentials: GOOGLE_APIS_CREDINTIALS,
    scopes: [SCOPE],
  })
    .then((authClient) => authClient.getClient())
    .then((client) => {
      res.send({ client });

      return;
    })
    .catch((error) => {
      res.send({ error });
    });
});
