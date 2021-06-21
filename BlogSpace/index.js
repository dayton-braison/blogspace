let postsArray = [];
let titleInput = document.getElementById("post-title");
let bodyInput = document.getElementById("post-body");

function renderPosts() {
  let blogList = document.getElementById("blog-list");
  let blogContent = "";

  for (let post of postsArray) {
    blogContent += `
        <h2 style='font-size: 28px;'>${post.title.toUpperCase()}</h2>
        <p style='font-size: 20px;'>${post.body}</p>
        <hr style='border: 1px solid green;'/>
        `;
  }
  blogList.innerHTML = blogContent;
}

fetch("./blog.json")
  .then((response) => response.json())
  .then((data) => {
    postsArray = data;
    renderPosts();
  });

let newPost = document.getElementById("new-post");

newPost.addEventListener("submit", (e) => {
  e.preventDefault();

  let postTitle = titleInput.value;
  let postBody = bodyInput.value;

  let content = { title: postTitle, body: postBody };
  let options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(content),
  };

  fetch("https://apis.scrimba.com/jsonplaceholder/posts", options)
    .then((response) => response.json())
    .then((post) => {
      postsArray.unshift(post);
      renderPosts();

      titleInput.value = "";
      bodyInput.value = "";
    })
    .catch((error) => {
      console.log("Error:", error);
    });
});
