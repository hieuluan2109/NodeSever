const {google} = require('googleapis');
const OAuth2Data = require('./credentials.json');

const [CLIENT_ID, CLIENT_SECRET, REDIRECT_URI] = [OAuth2Data.web.client_id, OAuth2Data.web.client_secret, OAuth2Data.web.redirect_uris[0] ];
const OAuth2 = new google.auth.OAuth2({
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI,
});
const SCOPES = ['https://www.googleapis.com/auth/drive.metadata.readonly'];
const TOKEN_PATH = 'token.json';
