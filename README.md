# Price is Art!

### Future Update
1. Click Image to Enlarge them (Result and Ranking page)

![Trust the Process!](src/static/resources/process.png?raw=true)

# Summary
	Notable Statae Variables: 
		Artworks: For showing info (title and artist)
        Artworks_top: data about top 10 
		Images: For showing image
		Order: For tracking which artworks to display 
		Selections: An array of number to be sent to parent Component
		currentView: This is used to switch between Start, Game, Result, and Ranking component to display (pretty much my router)

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