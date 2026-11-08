import { readFile } from 'node:fs/promises';
import path from 'node:path';

const site = 'https://www.cricbreakdown.com';
const distDir = path.resolve('dist');
const key = '5f94f1c8dd164fceb616943af67b67f2';
const keyLocation = `${site}/${key}.txt`;

function getLocs(xml) {
  return [...xml.matchAll(/<loc>(.*?)<[/]loc>/gs)].map((match) =>
    match[1].trim().replaceAll('&amp;', '&')
  );
}

async function collectUrls(file, visited = new Set()) {
  const absolute = path.resolve(file);
  if (visited.has(absolute)) return [];
  visited.add(absolute);

  const xml = await readFile(absolute, 'utf8');
  const locs = getLocs(xml);
  if (!xml.includes('<sitemapindex')) {
    return locs.filter((url) => {
      try { return new URL(url).hostname === 'www.cricbreakdown.com'; }
      catch { return false; }
    });
  }

  const nested = [];
  for (const loc of locs) {
    const childPath = path.join(distDir, path.basename(new URL(loc).pathname));
    try { nested.push(...await collectUrls(childPath, visited)); }
    catch (error) { console.warn(`[IndexNow] Could not read sitemap ${loc}: ${error.message}`); }
  }
  return nested;
}

try {
  const indexPath = path.join(distDir, 'sitemap-index.xml');
  const urls = [...new Set(await collectUrls(indexPath))];
  if (!urls.length) {
    console.log('[IndexNow] No canonical URLs found in sitemap; skipping submission.');
  } else {
    console.log(`[IndexNow] Submitting ${urls.length} URLs to IndexNow.`);
    for (let i = 0; i < urls.length; i += 10000) {
      const batch = urls.slice(i, i + 10000);
      const response = await fetch('https://api.indexnow.org/indexnow', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify({
          host: 'www.cricbreakdown.com',
          key,
          keyLocation,
          urlList: batch
        })
      });
      console.log(`[IndexNow] Batch ${Math.floor(i / 10000) + 1}: HTTP ${response.status}`);
      if (!response.ok) {
        console.warn(`[IndexNow] Submission was not accepted: ${(await response.text()).slice(0, 500)}`);
      }
    }
  }
} catch (error) {
  console.warn(`[IndexNow] Skipped: ${error.message}`);
}
