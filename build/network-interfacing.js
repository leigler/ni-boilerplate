/* NETWORK INTERFACING 
	- prebuilt functions, 1.0

	available functions: 
	- loadProfile
		get profile object
	- loadPosts 
		get a list of a user's posts
	- loadPostContent
		get content of each post and append

	- loadUsersCentral
		get a list of users from an external source
	- usersProfiles
		use a list of users and return their profile
	- userAndTheirPosts
		use a list of users and return their profile + all their posts

	- isOwner
		check if you are the site's owner
	- writePost
		submit a post interface
	
*/

/******************************************************************************/

async function loadProfile(archive){
	var profile = await archive.readFile('/profile.json')
	profile = JSON.parse(profile)

	var userInfo = {
		"profile" : profile,
		"archive" : archive
	}

	return userInfo
}

/******************************************************************************/

async function loadPosts(archive){
	var posts = await archive.readdir('/posts/', {stat: true});
	
	var userPosts = {
		"posts" : posts,
		"archive" : archive
	}

	return userPosts
}

/******************************************************************************/

async function loadPostContent(archive, post){
	var postLink = '/posts/' + post.name;
	// console.log(postLink)
	var postContent = await archive.readFile(postLink)
	
	var postAndArchive = {
		"post" : JSON.parse(postContent),
		"archive" : archive
	}

	return postAndArchive
}

/******************************************************************************/

async function loadUsersCentral(archive, fileName){
	var getUserList = await archive.readFile(fileName);
	getUserList = JSON.parse(getUserList)

	var userList = {
		"users" : getUserList.users,
		"archive" : archive
	}

	return userList;
}

/******************************************************************************/

async function isOwner(archive){
	var pageInfo = await archive.getInfo();
	return pageInfo.isOwner;
}

/******************************************************************************/

function writePost(archive, postSubmission){
	var archive = archive;

	// when someone clicks submit:
	postSubmission.addEventListener("submit",function(e) {
  	e.preventDefault(); // avoid default behavior
  	var formRecieved = e.target,
  			formTitle = formRecieved.elements["Title"].value.toString(),
  			formContents = formRecieved.elements["Content"].value.toString(),
  			timestamp = new Date().getTime();

  	// set up object to submit to post:
  	var postContent = {
  		"title" : formTitle,
  		"timestamp" : timestamp,
  		"content" : formContents
  	}

  	// use archive (the DatArchive) to write a file
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


/******************************************************************************/
/* RECURSIVE FUNCTIONS BELOW */
/* https://en.wikipedia.org/wiki/Recursion_(computer_science) */
/******************************************************************************/



function usersProfiles(userCounter, userList, profilesContainer){
	// recursive function listing all users
	var userUrl = new DatArchive(userList[userCounter]),
			userAmount = userList.length;

	loadProfile(userUrl)
	.then(function(userInfo){

		profilesContainer.insertAdjacentHTML("beforeend", `
			<li>
				<hr />
				<h2>
					<a href="${userInfo.archive.url}" target="_blank">
						${userInfo.profile.username}
					</a>
				</h2>
				<p>${userInfo.profile.bio}</p>
				<h3>${userInfo.profile.email}</h3>
			</li>
		`)

		if(userCounter < userAmount - 1){
			//foreach appending posts for this user is over
			userCounter++;
			usersProfiles(userCounter, userList, profilesContainer) // move to next user
		}

	})
	.catch(function(error){
		console.log("error thrown\n", error)
	})
}

/******************************************************************************/

function userAndTheirPosts(userCounter, userList, watchingContainer){
	// get username from dat url
	var userUrl = new DatArchive(userList[userCounter]);
			userAmount = userList.length;

	// load user profile:
	loadProfile(userUrl)
	.then(function(userInfo){
		var userId = "user-" + userInfo.archive.url.replace("dat://", ""); // dynamically generated id to be populated later

		watchingContainer.insertAdjacentHTML("beforeend", `
			<li>
				<hr />
				<h2>
					<a href="${userInfo.archive.url}" target="_blank">
						${userInfo.profile.username}
					</a>
				</h2>
				<p>${userInfo.profile.bio}</p>
				<h3>${userInfo.profile.email}</h3>
				<ul id="${userId}"></ul>
			</li>
		`)

		return userInfo.archive;

	})
	.then(function(userArchive){

		// load posts of user:
		loadPosts(userArchive)
		.then(function(userPosts){
			// this user's posts: 
			console.log(userPosts)
			var userId = "user-" + userPosts.archive.url.replace("dat://", ""); // dynamically generated id

			var amountOfPosts = userPosts.posts.length,
					postCounter = 0;

			userPosts.posts.forEach(function(post){
				
				loadPostContent(userUrl, post)
				.then(function(postAndArchive){
					
					var post = postAndArchive.post;
					var thisPostContent = post.content;
					
					// rough image replacement: 
					var userPostContainer = document.getElementById(userId) // dynamically generated id
					if(JSON.stringify(post.content).includes('src=\\"')){
						thisPostContent = JSON.stringify(thisPostContent).replace('src=\\"', 'src="' + postAndArchive.archive.url + "/");
					}else if(JSON.stringify(post.content).includes("src=\\'")){						
						thisPostContent = JSON.stringify(thisPostContent).replace("src=\\'", "src='" + postAndArchive.archive.url + "/");
					}

					userPostContainer.insertAdjacentHTML("beforeend", `
						<li>
							<hr />
							<h2>${post.title}</h2>
							<h4>${post.timestamp}</h4>
							<div>${thisPostContent}</div>
						</li>
					`)

					postCounter++;
					// console.log(postCounter, amountOfPosts, userCounter, userAmount)
					if(postCounter >= amountOfPosts && userCounter < userAmount - 1){
						//foreach appending posts for this user is over
						userCounter++;
						userAndTheirPosts(userCounter, userList, watchingContainer) // move to next user
					}
				})
			})
		})
		.catch(function(error){
			console.log("error thrown\n", error)
		}) //end of loadPosts.then
	})
	.catch(function(error){
		console.log("error thrown\n", error)
	})
} // end of function