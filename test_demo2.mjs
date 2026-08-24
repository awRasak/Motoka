import { chromium } from 'playwright';
const browser = await chromium.launch({ headless: true, args: ['--no-sandbox'] });
const page = await browser.newPage();
page.on('console', msg => { const t=msg.text(); if(t.includes('vite')||t.includes('Supabase')||t.includes('PAGEERR')){} else console.log('CONSOLE:'+t.slice(0,800)) });
page.on('pageerror', err => console.log('PAGEERR:' + err.message + '\n' + (err.stack||'').slice(0,2500)));
console.log('goto start');
await page.goto('http://127.0.0.1:3002/admin/renewals?demo=1', { waitUntil: 'domcontentloaded', timeout: 10000 });
console.log('goto done');
await new Promise(r=>setTimeout(r,3500));
try {
  const html = await page.evaluate(() => document.body.innerHTML.slice(0,8000));
  console.log('BODY_SNIP:' + html.replace(/\s+/g,' ').slice(0,4000));
  const count = await page.evaluate(() => document.body.innerText.slice(0,3000));
  console.log('TEXT:' + count.replace(/\s+/g,' ').slice(0,2000));
} catch(e){ console.log('eval err '+e.message)}
await browser.close();
console.log('done');
