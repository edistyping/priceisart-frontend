# Getting Started with Create React App

Link: https://edistyping.github.io/priceisart/
https://i.stack.imgur.com/fYFze.png

# To Do
1. In Result page, users can click on image to get a bigger view 

1. Should Parents or Child host the image? 
    Good Read: https://stackoverflow.com/questions/66702644/should-the-parent-or-child-component-fetch-data-in-react

Resources:
1. Create and Initiailize 0 to N array: https://www.techiedelight.com/initialize-array-with-range-from-0-to-n-javascript/


# Goals
1. Shows 'You Picked This' by adding a border to picture chosen by user 
2. Show Number of correct items 
3. Confirm Replay button re-assign images 
4. Add a button for show Ranking 
5. Click Image to Enlarge them 
6. Improve visuals + Organize Codes
7. Update with Routers
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
1. How game is started
    1. randomize order
    2. load 10 images 

2. How should replay be loaded
    1. randomize order
    2. load 10 more images 
        skip if needed

