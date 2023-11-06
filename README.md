hello !!


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
// crawl(Tools_Bing_Yt,10)



// async function WebSpider(url, depth) {
// //   const browser = await puppeteer.launch({ headless: false });
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();

//   async function visit(pageUrl, depth_rn) {
//     try {
//         if (depth_rn > depth) {
//             return;
//         } else {
//             await page.goto(pageUrl, { waitUntil: 'domcontentloaded' });

//             if (pageUrl.includes('https://www.youtube.com/watch?v=')) {
//                 console.log(`- YouTube Video: ${pageUrl}`);
//             } else {
//                 console.log(`- Web Visited: ${pageUrl}`);
                
//                 if (pageUrl.includes('https://www.bing.com/search?')) {
//                     try {
//                         const links = await page.$$eval('#b_results .b_algo a', (anchors) => {
//                             return anchors.map((anchor) => anchor.href);
//                         });

//                         console.log(`Links from Bing search results:`, links);
//                         for (const link of links) {
//                             await visit(link, depth_rn + 1);
//                         }
//                     } catch (error) {
//                         console.error('Error extracting links:', error);
//                     }
//                 }
//             }

//             const pageLinks = await page.$$eval('a', (anchors) => {
//                 return anchors.map((anchor) => anchor.href);
//             });

//             for (const link of pageLinks) {
//                 await visit(link, depth_rn + 1);
//             }
//         }
//     } catch (error) {
//         if (error.message.includes('net::ERR_ABORTED')) {
//             console.error(`Error loading page: ${pageUrl}`);
//         } else {
//             console.error('An unexpected error occurred:', error);
//         }
//     }
// }
//   await visit(url, 0);
//   await browser.close();
// }
// WebSpider(Tools_Bing_Yt, 2); // Adjust the depth as needed

//  const element = await page.waitForSelector('div > .class-name');