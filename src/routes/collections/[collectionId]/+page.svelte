<script>
	export let data;

  let title = '';
  let url = '';
  let rating = 1;
  let comments = '';
</script>

<main>
  <h1>Bookmark Manager</h1>
	{JSON.stringify(data.bookmarks)}
  
  <form method="POST" action="?/addbookmark">
    <div>
      <label for="title">Title:</label>
      <input id="title" name="title" bind:value={title} required>
    </div>
    <div>
      <label for="url">URL:</label>
      <input id="url" name="url" type="url" bind:value={url} required>
    </div>
    <div>
      <label for="rating">Rating:</label>
      <select id="rating" name="rating" bind:value={rating}>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
      </select>
    </div>
    <div>
      <label for="comments">Comments:</label>
      <textarea id="comments" name="comments" bind:value={comments}></textarea>
    </div>
    <button type="submit">Add Bookmark</button>
  </form>

  <h2>Saved Bookmarks</h2>
  <ul>
    {#each data.bookmarks as bookmark}
      <li>
        <div class="bookmark-info">
          <strong>{bookmark.title}</strong> - 
          <a href={bookmark.url} target="_blank" rel="noopener noreferrer">{bookmark.url}</a>
          <br>
          Rating: {bookmark.rating}/4
          {#if bookmark.comments}
            <br>
            Comments: {bookmark.comments}
          {/if}
        </div>
        {#if bookmark.preview}
          <div class="link-preview">
            {#if bookmark.preview.image}
              <img src={bookmark.preview.image} alt="Link preview" />
            {/if}
            <div class="preview-content">
              <h3>{bookmark.preview.title}</h3>
              <p>{bookmark.preview.description}</p>
            </div>
          </div>
        {/if}
      </li>
    {/each}
  </ul>
</main>

<style>
	main {
		font-family: Arial, sans-serif;
		max-width: 600px;
		margin: 0 auto;
		padding: 20px;
	}

	form {
		display: grid;
		gap: 10px;
		margin-bottom: 20px;
	}

	label {
		font-weight: bold;
	}

	input,
	select,
	textarea {
		width: 100%;
		padding: 5px;
	}

	button {
		background-color: #4caf50;
		color: white;
		padding: 10px;
		border: none;
		cursor: pointer;
	}

	button:hover {
		background-color: #45a049;
	}

	ul {
		list-style-type: none;
		padding: 0;
	}

	li {
		margin-bottom: 20px;
		border-bottom: 1px solid #ccc;
		padding-bottom: 20px;
	}

	.link-preview {
		display: flex;
		margin-top: 10px;
		border: 1px solid #ddd;
		border-radius: 4px;
		overflow: hidden;
	}

	.link-preview img {
		width: 100px;
		height: 100px;
		object-fit: cover;
	}

	.preview-content {
		padding: 10px;
		flex-grow: 1;
	}

	.preview-content h3 {
		margin: 0 0 5px 0;
		font-size: 16px;
	}

	.preview-content p {
		margin: 0;
		font-size: 14px;
		color: #666;
	}
</style>
