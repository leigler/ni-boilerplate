/* NETWORK INTERFACING 
	- prebuilt functions, 1.0

	available: 
	- loadProfile
	- loadPosts
	- loadPostContent

	- writePost

	in dev:
	- loadUsers (local && central)
	
*/

async function loadProfile(archive){
	var profile = await archive.readFile('/profile.json')
	profile = JSON.parse(profile)
	return profile
}

async function loadPosts(archive){
	var posts = await archive.readdir('/posts/', {stat: true});
	return posts
	// should return an posts as json of links/content
}

async function loadPostContent(archive, post){
	var postLink = '/posts/' + post.name;
	console.log(postLink)
	var postContent = await archive.readFile(postLink)
	return JSON.parse(postContent)
}

async function loadUsersLocal(archive){
	// load users from profile
	// ideally should be able to load users and then load posts for each user
}

async function loadUsersCentral(archive){
	// load users from class list
	// ideally should be able to load users and then load posts for each user
}

function writePost(archive, postSubmission){
	var archive = archive;

	postSubmission.addEventListener("submit",function(e) {
  	e.preventDefault(); // before the code
  	var formRecieved = e.target,
  			formTitle = formRecieved.elements["Title"].value.toString(),
  			formContents = formRecieved.elements["Content"].value.toString(),
  			timestamp = new Date().getTime();

  	var postContent = {
  		"title" : formTitle,
  		"timestamp" : timestamp,
  		"content" : formContents
  	}

  	async function postFile(archive, postContent){
  		await archive.writeFile('/posts/post-' + postContent.timestamp + '.json', JSON.stringify(postContent));
  	}

  	postFile(archive, postContent)
  	.then(function(event){
  		console.log("post is posted!")
  	})
  	.catch(function(error){
  		console.log("error\n", error)
  	})
	});
}