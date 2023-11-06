const puppeteer = require('puppeteer');
const {JsonRead , JsonSearch , JsonWrite} = require('./json')
async function crawl(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    let depth;
    const visitedUrls = new Set(); // To keep track of visited URLs
  
    async function visit(pageUrl, currentDepth) {
          if (currentDepth > depth || visitedUrls.has(pageUrl)) {
            return;
          }
          visitedUrls.add(pageUrl);
      
          try {
            await page.goto(pageUrl);
      
            let links = [];
      
            // Filter Data here
            if (pageUrl.includes('https://www.youtube.com/watch?v=')) {
              console.log(`- Yt Video ${pageUrl}`);
            } else {
              console.log(`- Web Visited: ${pageUrl}`);
              
              if (
                !pageUrl.includes('https://support.google.com/') &&
                !pageUrl.includes('https://accounts.google.com/') &&
                !pageUrl.includes('https://www.redditinc.com/') &&
                !pageUrl.includes('/login')&&
                !pageUrl.includes('https://ads.reddit.com/?utm_source=web3x_consumer&utm_name=user_menu_cta')&&
                !pageUrl.includes('https://play.google.com/')&&
                !pageUrl.includes('https://www.apple.com/')&&
                !pageUrl.includes('https://apps.apple.com/us/app/')&&
                !pageUrl.includes('https://apps.apple.com/')&&
                !pageUrl.includes('cloudflare')&&
                !pageUrl.includes('developers')
              ) {
                if (pageUrl.includes('https://www.bing.com/search?')) {
                  links = await page.$$eval('#b_results .b_algo a', (links) => links.map((link) => link.href));
                } else {
                  links = await page.$$eval('a', (links) => links.map((link) => link.href));
                }
              }
            }
      
            for (const link of links) {
              await visit(link, currentDepth + 1);
            }
          } catch (error) {
            console.log(`X -  we got an error: ${error}`);
            if(error.name === 'TimeoutError'){
              console.log(`⚠️ Timeout occurred for ${pageUrl}.`);
            }
          }
        }
      
        await visit(url, 0);
        await browser.close();
    }
module.exports = crawl;