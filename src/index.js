// tools 
const crawl = require('./Crawl')

let SearchTerm = 'cooking'
const Tools_Bing_Yt = `https://www.bing.com/search?q=site%3Ayoutube.com+${SearchTerm}&qs=n&form=QBRE&sp=-1&lq=0&pq=site%3Ayoutube.com+&sc=9-17&sk=&cvid=281C7DBD9E7E474EB3693076042F739A&ghsh=0&ghacc=0&ghpl=`
const yt = 'https://www.youtube.com/results?search_query=video'

const reddit = 'https://www.reddit.com/'


crawl(yt,4,10)



// JsonWrite({
//   'website': {
//       'link': 'reddit.com',
//       'tittle': 'Reddit - Dive into anything'
//   }
// });