

/* 


User makes a request.

if the accessToken is valid everything is fine, backend does not check the refreshToken at all
    - Express middleware for checking accessToken 

if the accessToken is invalid, error response
    - request a new AccessToken

if error response, get JWT auth with refreshToken

backend checks refreshToken and issues new accessToken if refresh is valid, otherwise error response

frontend retries the original request

middleware function to insertComment or whatever
this middelware function will check accessToken. Refresh if fail 

*/

const API_URL = '';

const getLocalRefreshToken = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    return user?.refreshToken;
  };
  
  const getLocalAccessToken = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    return user?.accessToken;
  };
  
  const updateLocalAccessToken = (token) => {
    let user = JSON.parse(localStorage.getItem("user"));
    user.accessToken = token;
    localStorage.setItem("user", JSON.stringify(user));
  };
  
  const getUser = () => {
    return JSON.parse(localStorage.getItem("user"));
  };
  

class AuthService {
    
    // refreshToken 
    async refreshAccessToken() {
        const token = getLocalAccessToken();
        if (token) {
            const refreshToken = getLocalRefreshToken();
            const result = await fetch("/users/refreshtoken", {refreshToken: refreshToken});
            const newAccessToken = result.accessToken;
            updateLocalAccessToken(newAccessToken);
        }
    }


    login(username, password) {
    console.log('AuthService login here...');
      return fetch("/signin", {
          username,
          password
        })
        .then(response => {
          if (response.data.accessToken) {
            console.log(response.data);
            localStorage.setItem("user", JSON.stringify(response.data));
          }
  
          return response.data;
        });
    }
  
    logout() {
        localStorage.removeItem("user");
    }
  
    async register(username, email, password) {
        
        return await fetch("/auth/signup", {
        username,
        email,
        password
      });
    }
  
    getCurrentUser() {
      return getUser();
    }
  }
  
  export default new AuthService();