// Crawl.js
const puppeteer = require('puppeteer');
const { JsonWrite } = require('./json');

async function crawl(url, maxDepth, maxTime) {
  const timeLimit = maxTime * 60 * 1000; // Convert minutes to milliseconds
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const visitedUrls = new Set();
  const startTime = Date.now();
  const excludedWebsites = require('./excluded-websites.json').websites;

  function isExcluded(pageUrl) {
    return excludedWebsites.some(excludedUrl => pageUrl.includes(excludedUrl));
  }

  async function visit(pageUrl, currentDepth) {
    // console.log('Visiting:', pageUrl, 'at depth:', currentDepth);

    if (
      currentDepth > maxDepth ||
      visitedUrls.has(pageUrl) ||
      Date.now() - startTime > timeLimit ||
      isExcluded(pageUrl)
    ) {
      return;
    }

    visitedUrls.add(pageUrl);

    try {
      await page.goto(pageUrl);

      let links = [];

      // Console.log Data
      if (pageUrl.includes('https://www.youtube.com/')) {
        if (pageUrl.includes('watch?v')) {
          console.log(`- Yt Video :${pageUrl}`);
          JsonWrite('data.json', {
            'Youtube': { url: pageUrl, type: 'video' }
          });
        }
        if (pageUrl.includes('shorts/')) {
          console.log(`- Yt Shorts :${pageUrl}`);
          JsonWrite('data.json', {
            'Youtube': { url: pageUrl, type: 'shorts' }
          });
        }
      } else {
        console.log(`- Web Visited: ${pageUrl}`);
        if (pageUrl.includes('https://www.bing.com/search?')) {
          links = await page.$$eval('#b_results .b_algo a', (links) => links.map((link) => link.href));
        } else {
          links = await page.$$eval('a', (links) => links.map((link) => link.href));
        }
      }

      for (const link of links) {
        await visit(link, currentDepth + 1);
      }
    } catch (error) {
      console.log(`X -  we got an error: ${error}`);
      if (error.name === 'TimeoutError') {
        console.log(`⚠️ Timeout occurred for ${pageUrl}.`);
      }
    }
  }

  await visit(url, 0);
  await browser.close();

  const allVisitedUrls = Array.from(visitedUrls);
  console.log('All Visited URLs:', allVisitedUrls);

  for (const oneUrl of allVisitedUrls) {
    if (oneUrl.includes('https://www.youtube.com/watch?v=')) {
      JsonWrite('data.json', {
        'Youtube': { url: oneUrl, type: 'yt-video' }
      });
    }
    if (oneUrl.includes('https://www.youtube.com/shorts')) {
      JsonWrite('data.json', {
        'Youtube': { url: oneUrl, type: 'yt-shorts' }
      });
    } else {
      JsonWrite('data.json', {
        'Website': { url: oneUrl, type: 'other' }
      });
    }
  }
}

module.exports = crawl;
