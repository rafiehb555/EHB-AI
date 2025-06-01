const detect = require('detect-port');
const { exec } = require('child_process');

const DEFAULT_PORT = 3000;

(async () => {
  const port = await detect(DEFAULT_PORT);
  if (port === DEFAULT_PORT) {
    console.log(`✅ Port ${DEFAULT_PORT} is free. Starting Next.js...`);
  } else {
    console.log(`⚠️ Port ${DEFAULT_PORT} is in use. Using available port ${port} instead.`);
    process.env.PORT = port;
  }
  exec(`npx next dev -p ${port}`, { stdio: 'inherit' });
})(); 