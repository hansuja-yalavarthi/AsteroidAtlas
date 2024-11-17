// Fetch and display posts
function getPosts() {
  fetch("/posts")
    .then((response) => response.json())
    .then((posts) => {
      const postList = document.getElementById("postList");
      postList.innerHTML = "";
      posts.forEach((post) => {
        const postDiv = document.createElement("div");
        postDiv.className = "post";
        postDiv.innerHTML = `
          <h3>${post.title}</h3>
          <p>${post.description}</p>
          <p><strong>Tags:</strong> ${post.tags}</p>
          <p><strong>Posted:</strong> ${new Date(
            post.timestamp
          ).toLocaleString()}</p>
          <button onclick="upvotePost(${post.id})">Upvote (${post.upvotes})</button>
        `;
        postList.appendChild(postDiv);
      });
    });
}

// Add a new post
document.getElementById("postForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const tags = document.getElementById("tags").value;

  fetch("/posts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, description, tags }),
  }).then(() => {
    getPosts();
    document.getElementById("postForm").reset();
  });
});

// Upvote a post
function upvotePost(id) {
  fetch(`/posts/${id}/upvote`, { method: "POST" }).then(() => getPosts());
}

// Filter posts by tags
function filterPosts(tag) {
  fetch("/posts")
    .then((response) => response.json())
    .then((posts) => {
      const filtered = posts.filter((post) => post.tags.includes(tag));
      const postList = document.getElementById("postList");
      postList.innerHTML = "";
      filtered.forEach((post) => {
        const postDiv = document.createElement("div");
        postDiv.className = "post";
        postDiv.innerHTML = `
          <h3>${post.title}</h3>
          <p>${post.description}</p>
          <p><strong>Tags:</strong> ${post.tags}</p>
          <p><strong>Posted:</strong> ${new Date(
            post.timestamp
          ).toLocaleString()}</p>
          <button onclick="upvotePost(${post.id})">Upvote (${post.upvotes})</button>
        `;
        postList.appendChild(postDiv);
      });
    });
}

// Load posts on page load
getPosts();

// NASA data placeholder (you can enhance it further with API integration)
document.getElementById("nasaFeed").innerText = "NASA live data coming soon!";
