<script>
var channelAccessToken = "t8lrt59yppWGstEp0ZKUmzoJWYrXgXFVmJr/UVY52WG5Wzq3BbBHA3bISGBHIMM4Qkfp7ohaOMVDrcLPvg3G+/Csrh/3DO5AOSHZWqXhvpaToA9IUGmzOqR8kYCtGn+HIzUFGrTiyxdBgpu8lDhyvgdB04t89/1O/w1cDnyilFU=";
const request = require('request-promise');
const LINE_MESSAGING_API = 'https://api.line.me/v2/bot/message';
const LINE_HEADER = {
  'Content-Type': 'application/json',
  'Authorization': 'Bearer ' + channelAccessToken;
};

exports.LineBot = functions.https.onRequest((req, res) => {
  if (req.body.events[0].message.type !== 'text') {
    return;
  }
  reply(req.body);
});

const reply = (bodyResponse) => {
  return request({
    method: `POST`,
    uri: `${LINE_MESSAGING_API}/reply`,
    headers: LINE_HEADER,
    body: JSON.stringify({
      replyToken: bodyResponse.events[0].replyToken,
      messages: [
        {
          type: `text`,
          text: bodyResponse.events[0].message.text
        }
	  ]
    })
  });
};
</script>