//import fs from 'fs';
//import path from 'path';

// Before using got, run: npm install got@9.6.0
import got from 'got';

//const dataDir = path.join(process.cwd(), 'data');
const dataURL = "https://dev-srjc-fall-2025-cs55-13.pantheonsite.io/wp-json/twentytwentyone-child/v1/latest-posts/1";

export async function getSortedPostsData() {
  // const filePath = path.join(dataDir, 'posts.json');
  // const jsonString = fs.readFileSync(filePath, 'utf8');
  let jsonString;
  try {
    //next line uses got synchronously to retrive via https our json data from wp site
    jsonString = await got(dataURL);
    console.log(jsonString.body);
  } catch (error) {
    jsonString.body = '[]';
    console.log(error);
  }

  // convert string from file into JSON array object
  //const jsonObj = JSON.parse(jsonString);

   const jsonObj = JSON.parse(jsonString.body);
  

   ///use map() on array to extract just id property into  new array of object values
  jsonObj.sort(function (a, b) {
    return a.post_title.localeCompare(b.post_title);
});
}

export async function getAllPostIds() {
 // const fileNames = fs.readdirSync(postsDirectory);
  //return fileNames.map((fileName) => {
    let jsonString;
  try {
    //next line uses got synchronously to retrive via https our json data from wp site
    jsonString = await got(dataURL);
    console.log(jsonString.body);
  } catch (error) {
    jsonString.body = '[]';
    console.log(error);
  }

  // convert string from file into JSON array object
  //const jsonObj = JSON.parse(jsonString);

   const jsonObj = JSON.parse(jsonString.body);
  return jsonObj.map((post) => {
    return {
      params: {
        id: post.ID.toString(),
        name: post.post_title,
      },
    };
  });
}

export async function getPostData(id) {
  //const fullPath = path.join(postsDirectory, `${id}.md`);
  //const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  //  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string
 // const processedContent = await remark()
    //.use(html)
   // .process(matterResult.content);
  //const contentHtml = processedContent.toString();

  // Combine the data with the id and contentHtml
   let jsonString;
  try {
    //next line uses got synchronously to retrive via https our json data from wp site
    jsonString = await got(dataURL);
    console.log(jsonString.body);
  } catch (error) {
    jsonString.body = '[]';
    console.log(error);
  }
  
}