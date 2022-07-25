# Getting Started with Create React App

Link: https://edistyping.github.io/priceisart/
https://i.stack.imgur.com/fYFze.png

https://www.parkwestgallery.com/browse-artwork/gallery/matt-beyrer

# To Do
1. Finish up Ranking
    Option 1
        - Fetch top 10 artworks_id
        - check if it's in artwork_iamges
        - load up if not in 
    Option 2 (more convinenet) 
        - Start loading top 10 images once the game is over

2. After Response is submitted, change it to "Thank you!" 

3. Add a button for "Report a Bug!"
    - Prompt: Ask for a category (Computer issue, Mobile issue, Suggestions)
    - Subject, Detail

4. (Possible Issue): While testing, I think I saw two same picture come up 

5. A new page for recently sold art from any api 

# Goals
2. Click Image to Enlarge them 
3. Improve visuals + Organize Codes

    - Start Page
    - Game Page
        - Counts and Time
        - Image Components
            - Header, Image

    - Result Page
        - Stay the Same
    - Results Page
        - Show (# of votes picked / total)
        - Show (# of times won / total)
        

## Available Scripts
git add frontend 
git commit -m "frontend subtree commit"
 
# RUN THIS TO PUSH TO GH-PAGES!!!!!!!!
npm run deploy

# Others
// create a subtree/branch
git subtree push --prefix frontend origin gh-pages

// delete a branch
git push origin --delete gh-pages

// 
npm list
npm list --depth=0

npm view react-native version
npm view react version 



# Done
+ How game is started
    1. randomize order
    2. load 10 images 

+ How should replay be loaded
    1. randomize order
    2. load 10 more images 
        skip if needed

+ Hovering the image will show the cost 
    => Cancelled; it will just annoy users

1. Shows 'You Picked This' by adding a border to picture chosen by user 
2. Show Number of correct items 
3. Confirm Replay button re-assign images 
1. Add a button for show Ranking page 
7. Update with Routers
    => Cancelled; not really needed and want to try the vanilla way

- (Done) Submit your response is active if switch to Ranking and back 

- (Done) Ranking page - Finish API to get top 10 
    = ranking API will return top 10 artwork_id 


= (Done) How to bring Win data into prepareDataforSubmit(); 
    - A new array to store a picture id of correct answer. if wrong, then -1
        = (Done) need to fix the logic for wrong answer ()
    - submitting for api
        = Done
