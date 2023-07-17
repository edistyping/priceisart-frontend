# Price is Art! 
## https://priceisart.com/

# To Do	
In Ranking, artwork is not matching with Game/Result (id is -1 or something. )
	- Game/Result: id: 	53 Boy and Dog
	- Rank: id: 		52|00 Flag

	- conflict 
		- In database, ID starts at 1 
		- In Code, Array starts at 0
		  

Update "You're now signed in." to include username



- Implementing OpenAI 
	- generate an image, download it, store it in my web app?
		- storing it in the webapp will require my app to reload so maybe azure storage
	- update postgres 
- Convert to Typescript Typescript Typescript Typescript Typescript 
- Consider using CDN 



https://medium.com/@techsuneel99/jwt-authentication-in-nodejs-refresh-jwt-with-cookie-based-token-37348ff685bf 


//////////////////////////////////////////////////////////////////////////
- Limit 'POST comment' call to 3 + 1per day (one for each plus bonus)
- jwt (refreshing accessToken)

User makes a request.

if the accessToken is valid everything is fine, backend does not check the refreshToken at all

if the accessToken is invalid, error response

if error response, get JWT auth with refreshToken

backend checks refreshToken and issues new accessToken if refresh is valid, otherwise error response

frontend retries the original request

//////////////////////////////////////////////////////////////////////////



- Lazy Load for images 







Make a request with accessToken https://miro.medium.com/v2/resize:fit:1400/0*KZrqOGCKh6Ee48Bc.png
	1. If accessToken is invalid (expired), send error 401. 
	2. request the token again 
		- in backend, if refreshToken is valid, just send back accessToken
	3. make request again with the new token 

########################
Almost everyone does JWT wrong in SPAs. Never use local storage. Refresh token in an HTTP Only, Secure cookie set when the user logs in. Access token only stored in memory.

On every first load you send a request to the server, the server checks if the refresh token cookie is set and if it's valid. If it is, return a fresh access token to the client and keep it in memory. After that you send another request for the actual data with the Authorization header set.

Every time a user reloads a page or closes their browser you go through the same process. When the access token expires you request a new one using the refresh token cookie. When the refresh token expires you ask your users to login again.

I usually go with 1 month refresh tokens and 15 minute access tokens. There is no need to worry about request count or unnecessary traffic.
########################


Cache is not setting at Frontend browser -> Fixed;  
1. Fixing adding comments
	= Fixed; Added a hook variable for tracking and added separate function for show/hide 
2. Implement upvoting/downvoting a comment
	= Not Now
4. Allow only logged in users to submit a comment 
	= Updated Express
	- when user click 'Add a commenet' button without being logged in, throw error message 
	- Now update frontend to include jwt token
5. Refreshing the page keeps the login session
	- sessionStorage (if users refreshes, keep him logged in)
6. Turn off Login form if anywhere else is touched. 
	- can other components be non-clickable when Login Form is opened?
7. Pop-up message for Add a Comment is only showing for top button  

1. Limit 5 times per 15 mins;
	- actually, do some calculations 
	- DAU * all that 
	=> Daily Average Users: 1 Million
	=> On Average 5 games a day

	// can't upvote same comments more than 3 times in a 60 mins

3. Lazy loading for picture 
	

![Trust the Process!](src/static/resources/process.png?raw=true)

# Summary
	Notable Statae Variables: 
		Artworks: For showing info (title and artist)
		Artworks_top: data about top 10 
		Images: For showing image
		Order: For tracking which artworks to display 
		Selections: An array of number to be sent to parent Component
		currentView: This is used to switch between Start, Game, Result, and Ranking component to display (pretty much my router)

	Resources and Tools:
		React, JavaScript, Django, Heroku Cloud Hosting, Heroku Postgres Cloud Database, Azure Blob Storage

1. Start Component: 
	- User clicks 'Start' button and it will make a request to Postgres for artworks (id, name, artist, file_path). We store this data into an array 'Artworks' and also create another array 'Order' to get 10 random numbers from 0 to Artworks.length. 
	- We also use 'file_path' column 'Artworks' to get image files from Azure Blob Storage, and save them into an array 'Images' as Image datatype. These three arrays are also passed to Game, Result, and Ranking component 
	- Once the data is loaded, direct users to Game component (This currently takes a little long).
    - For Start and Replay, load next 10 images if not exists in the state variable

2. Game Component:
	Props: Artworks, Images, Order

	- Three arrays (Artworks, Images, and Order) are passed down as a prop and we use this to show a pair of images for 5 times. Two containers will include basic info (title and artist) and corresponding image for each pair. 
	- Once selections are made by a user for all 5 pairs of images, they (Selections) will be sent to parent component 'Apps' and save it in an array state variable so we can use this for Result component later. Lastly, 'Result' will now display for users to check their choices/result.  
		
3. Result component: (My concerns: A lot of props being passed here...)
	Props: Artworks, Images, Order, UserResponse

	- Show all 5 pairs of images and details using 'Artworks', 'Images', 'Order', and 'Selections' state variables 
	- The component has 3 buttons they can interact with (Ranking, Replay, and Submit). 
		
		'Replay' button will get 10 random numbers between 0 to artworks.length and load iamges to 'Images' array if not yet added. 
		'Submit' button will submit user's response to my Postgres database 
		'Ranking' will direct users to Ranking component. 
	
4. Ranking component:
	Props: Artworks, artworks_top, Images

	- Request a call to Postgres to get Top-10 selected Images by users (id, selected, artwork_id).
	- Check using 'artwork_id' to verify if they were already loaded in 
	- Display the images and show info about each (Artwork name, artist, # of selected by users). 
	- Back to Result: Simply go back to 'Result' component for users to Replay or Submit 
 

### Available Scripts
```
git add frontend 
git commit -m "frontend subtree commit"
```

### RUN THIS TO PUSH TO GH-PAGES!!!!!!!!
```
npm run deploy
```

### Others
```
// create a subtree/branch
git subtree push --prefix frontend origin gh-pages

// delete a branch
git push origin --delete gh-pages

npm list
npm list --depth=0
npm view react-native version
npm view react version 
```

## Resources
Link: https://edistyping.github.io/priceisart/
https://i.stack.imgur.com/fYFze.png
https://www.parkwestgallery.com/browse-artwork/gallery/matt-beyrer

## Done
+ How game is started
    1. randomize order
    2. load 10 images 
+ How should replay be loaded
    1. randomize order
    2. load 10 more images 
        skip if needed
+ Hovering the image will show the cost 
    => Cancelled; it will just annoy users
+ Shows 'You Picked This' by adding a border to picture chosen by user 
+ Show Number of correct items 
+ Confirm Replay button re-assign images 
+ Add a button for show Ranking page 
+ Update with Routers
    => Cancelled; not really needed and want to try the vanilla way
+ Submit your response is active if switch to Ranking and back 
+ Ranking page - Finish API to get top 10 
    = ranking API will return top 10 artwork_id 
+ How to bring Win data into prepareDataforSubmit(); 
    - A new array to store a picture id of correct answer. if wrong, then -1
        = (Done) need to fix the logic for wrong answer ()
    - submitting for api
        = Done
+ Finish up Ranking
    Option 1
        - Fetch top 10 artworks_id
        - check if it's in artwork_iamges
        - load up if not in 
    Option 2 (more convinenet) 
        - Start loading top 10 images once the game is over
+ After Response is submitted, change it to "Thank you!" 
+ Need a way to refresh data for 'Ranking' page. 
    - Might need to create a separate function
    - Call it whenever a 'Ranking' button is clicked or other way