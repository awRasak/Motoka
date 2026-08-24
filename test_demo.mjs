import { chromium } from 'playwright';
const browser = await chromium.launch({ headless: true, args: ['--no-sandbox'] });
const page = await browser.newPage();
page.on('console', msg => console.log('CONSOLE:' + msg.text().slice(0,1000)));
page.on('pageerror', err => console.log('PAGEERR:' + err.message + '\n' + (err.stack||'').slice(0,3000)));
console.log('goto start');
await page.goto('http://127.0.0.1:3002/admin/renewals?demo=1', { waitUntil: 'domcontentloaded', timeout: 10000 });
console.log('goto done');
await new Promise(r=>setTimeout(r,4000));
try {
  const html = await page.evaluate(() => document.documentElement.outerHTML.slice(0,10000));
  console.log('HTML_SNIP:' + html);
} catch(e){ console.log('eval err '+e.message)}
await browser.close();
console.log('done');
