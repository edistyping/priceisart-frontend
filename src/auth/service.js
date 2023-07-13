

// const addComment = async (username, email, password) => {
  
//     // verify accessToken
//     //  if fail, get accesscode 
//     // insertComment

//     const inputData = { parent_id: null, artwork_id: artwork_id, comment: comment, score: 1, user_id: user.user.id, username: user.user.username};
//     var url;

//     const requestOptions = {
//         method: 'POST',
//         headers: { 
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${user.accessToken}`
//         },
//         body: JSON.stringify(inputData)
//     };

//     // verify accesToken
//     // if fail, get new token 
//     url = preurl + '/users/validateAccessToken';
//     const result = await fetch(url, requestOptions)
//         .then(response => {
//             if (response.status === 200) {
//                 // once a comment is successfully added. 
//                 // added it to my clinet too \
//             }
//             return response.json();
//         })
//         .catch(error => {
//             console.log('addingComment() error.....');
//             console.log(error);
//             throw new Error(error);  // ***
//         });  
    

//     // insert comment    
//     await fetch(url, requestOptions)
//         .then(response => {
//             if (response.status === 200) {
//                 // once a comment is successfully added. 
//                 // added it to my clinet too \
//             }
//             return response.json();
//         })
//         .catch(error => {
//             console.log('addingComment() error.....');
//             console.log(error);
//             throw new Error(error);  // ***
//         });  
    
  
//     return api.post("/auth/signup", {
//     username,
//     email,
//     password
//   });
// };
