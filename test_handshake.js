const https = require('https');

const url = 'https://architect-landing-hosteleria.vercel.app/api/webhook?hub.mode=subscribe&hub.verify_token=architect_sys_2026&hub.challenge=SUCCESSHANDSHAKE';

https.get(url, (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    console.log('STATUS:', res.statusCode);
    console.log('CONTENT-TYPE:', res.headers['content-type']);
    console.log('BODY:', data);
  });
}).on('error', (err) => {
  console.error('Error:', err.message);
});
