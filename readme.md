# network interfacing
## boilerplate profile page

### features
a list of available functions: 
- `loadProfile(archive)`
	- get profile object
- `loadPosts(archive)` 
	- get a list of a user's posts
- `loadPostContent(archive, post)`
	- get content of each post and append
- `loadUsersCentral(archive, jsonName)`
	- get a list of users from an external source
- `usersProfiles(userCounter, userList, mountingContainer)`
	- use a list of users and return their profile
- `userAndTheirPosts(userCounter, userList, mountingContainer)`
	- use a list of users and return their profile + all their posts
- `isOwner(archive)`
	- check if you are the site's owner
- `writePost(archive, postSubmission)`
	- submit a post interface


### reference
- [fritter](https://github.com/beakerbrowser/fritter)