const fs = require('fs');

let webhookUrl = process.env.WEBHOOK_URL;

if (!webhookUrl && fs.existsSync('.env')) {
  const envContent = fs.readFileSync('.env', 'utf-8');
  const match = envContent.match(/^WEBHOOK_URL=(.+)$/m);
  webhookUrl = match ? match[1].trim() : '';
}

fs.writeFileSync(
  'config.js',
  `const WEBHOOK_URL = '${webhookUrl || ''}';\n`
);
console.log('config.js generated' + (webhookUrl ? '' : ' (empty WEBHOOK_URL)'));
