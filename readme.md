# [network interfacing](http://network-interfacing.teachinginter.net)
## boilerplate profile page

The features outlined below are all built with the DatArchive API. Please review and become comfortable traversing the [documentation](https://beakerbrowser.com/docs/apis/dat) provided by the Beaker Browser website. 


### Install
1. clone this repository
2. download the beaker browser
3. go to `New +` button and click "from folder"
4. add your directory
5. edit `profile.json` to update your profile
6. publish all changes
7. copy your `dat://` url to the class [spreadsheet](https://docs.google.com/spreadsheets/d/1VTTNBRftvCj-_L-M8hwBZuwXps4wBGrrRB6rER0Kqzc/edit?usp=sharing) and to your `profile.json` file. 
8. once the spreadsheet is full, feel free to copy the urls and add them to your `post.json` file. 


### Features
a list of initial available functions found in `build/network-interfacing.js`: 

#### DatArchive Instance

In order to use any of the functions below, you will need to construct a DatArchive instance with: 

```

	var archive = new DatArchive("dat://THE_URL_YOU_NEED")

```

This variable (`archive`) can then be passed through the functions below. There are certain functions though, that might need a custom instance (rather than your dat url). 

#### Template Literals
Most of the html you will write in this class will actually be in javascript and then appended to the DOM (i.e. your `index.html` document). There are various methods to append html with javascript, but we will primarily be using the `insertAdjacentHTML()` method with template literals. 

- Read and view examples of `insertAdjacentHTML()` [here](https://developer.mozilla.org/en-US/docs/Web/API/Element/insertAdjacentHTML). 
- Read and view examples of template literals [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals).

Example: 

```
	
	var yourElement = document.getElementById("ELEMENTID")

	yourElement.insertAdjacentHTML('beforebegin', `

		<h1>template literal</h1>
		<p>this is a template literal denoted by the \` \` characters.</p>
		<p class="a_class" style="color:red;">you can freely write and format html in here! :) </p>


	`)


```

#### Simple async functions

- `loadProfile(archive)` : get profile object
- `loadPosts(archive)`  : get a list of a user's posts
- `loadPostContent(archive, post)` : get content of each post and append
- `loadUsersCentral(archive, jsonName)` : get a list of users from an external source

the DatArchive API relies on [Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then). We run an asynchronous (i.e. `async`) function that calls an external source (usually another dat url) and then "wait" for a response. 

This is done in the general format of: 

```
	
	var archive = new DatArchive("dat://THE_URL_YOU_NEED") // construct your instance	


	loadProfile(archive)
	.then(function(returnedObject){
		// do something with the returnedObject
		
		console.log(returnedObject)

	})
	.catch(function(error){
		// sometimes there is an error (a request as "timedout" or something was miswritten)
		// it helps to have a catch that console logs any error for debugging
		
		console.log(error)

	})

```


#### Recursive async functions
A recursive function calls itself: 

```


function yourFunction(yourVariable){

	yourVariable++
	console.log(yourVariable)

	// and repeat:
	if(yourVariable < 10){
		yourFunction(yourVariable)

	}

}

var counter = 0;

yourFunction(counter)


```

These functions are a little more complex. You will have to enter the ` build/network-interfacing.js` file to alter their template literals. Feel free to play around and mess them up—you can always re-download a clean copy!

- `usersProfiles(userCounter, userList, mountingContainer)` : use a list of users and return their profile
- `userAndTheirPosts(userCounter, userList, mountingContainer)` : use a list of users and return their profile + all their posts


### Posting Methods
A key part of any network is the posting interface. The DatArchive API has a wonderful method built in that allows a site to recognize if you're the owner. If you are, you're given special permissions (like writing new files!). 

- `isOwner(archive)` : check if you are the site's owner (returns a boolean)
	- `isOwner()` is built out of the `getInfo()` method. Read more [here](https://beakerbrowser.com/docs/apis/dat#getinfo).
- `writePost(archive, postSubmission)` : submit a post interface
	- this function uses the API's `writeFile()` method. Read more [here](https://beakerbrowser.com/docs/apis/dat#writefile).


### References
We referenced [fritter](https://github.com/beakerbrowser/fritter)'s datastructure as a model for our network. 


