# Getting Started with Create React App

Link: https://edistyping.github.io/priceisart/
https://i.stack.imgur.com/fYFze.png


# To Do
= How to bring Win data into prepareDataforSubmit(); 
= Submit your response is active if switch to Ranking and back 


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