import got from 'got';

// API endpoint
const dataURL = "https://dev-srjc-fall-2025-cs55-13.pantheonsite.io/wp-json/twentytwentyone-child/v1/latest-posts/1";

// store fetched posts so all functions can use them
let cachedPosts = [];

/**
 * Fetch and sort posts
 */
export async function getSortedPostsData() {
  try {
    const response = await got(dataURL);
    const jsonObj = JSON.parse(response.body);

    // Save to global cache so other functions can use it
    cachedPosts = jsonObj;

    // Sort alphabetically
    cachedPosts.sort((a, b) =>
      a.post_title.localeCompare(b.post_title)
    );

    return cachedPosts;
  } catch (error) {
    console.error("Fetch error:", error);
    cachedPosts = [];
    return [];
  }
}

/**
 * Generate dynamic route params
 */
export async function getAllPostIds() {
  if (cachedPosts.length === 0) {
    await getSortedPostsData(); // ensure data exists
  }

  return cachedPosts.map((post) => ({
    params: {
      id: post.ID.toString(),
    },
  }));
}

/**
 * Get a single post's data
 */
export async function getPostData(id) {
  if (cachedPosts.length === 0) {
    await getSortedPostsData();
  }

  const post = cachedPosts.find((p) => p.ID.toString() === id);

  if (!post) {
    return { id, contentHtml: "<p>Post not found</p>" };
  }

  // WordPress already returns HTML content
  return {
    id,
    contentHtml: post.post_content || "",
    title: post.post_title,
    date: post.post_date,
  };
}
