/* NETWORK INTERFACING 
	- prebuilt functions, 1.0

	available: 
	- loadProfile
	- loadPosts
	- loadPostContent

	in dev:
	- loadUsers
	
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

async function loadUsers(archive){
	// load users
	// ideally should be able to load users and then load posts for each user
}

async function writeFile(archive, post){

	await archive.writeFile('/posts/' + post.name + "json", post)
	return "post accepted";
}