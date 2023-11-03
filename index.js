const puppeteer = require('puppeteer');
let SearchTerm = 'cooking'
const Tools_Bing_Yt = `https://www.bing.com/search?q=site%3Ayoutube.com+${SearchTerm}&qs=n&form=QBRE&sp=-1&lq=0&pq=site%3Ayoutube.com+&sc=9-17&sk=&cvid=281C7DBD9E7E474EB3693076042F739A&ghsh=0&ghacc=0&ghpl=`

// async function crawl(url, depth) {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();

//   async function visit(pageUrl, currentDepth) {
//     if (currentDepth > depth) {
//       return;
//     }
//     try{
//       await page.goto(pageUrl);
      
//       // Filter Data here
//       if (pageUrl.includes('https://www.youtube.com/watch?v=')) {
//         console.log(`- Yt Video ${pageUrl}`)
//       }else{
//         console.log(`- Web Visited: ${pageUrl}`);
//       }
//       // b_results
//       const links = await page.$$eval('a', (links) => links.map((link) => link.href));
//       for (const link of links) {
//         await visit(link, currentDepth + 1);
//       }
//     }catch(error){
//       console.log(`🔴 we got an error : ${error}`)
//     }
//   }

//   await visit(url, 0);

//   await browser.close();
// }

async function WebSpider(url,depth){

}