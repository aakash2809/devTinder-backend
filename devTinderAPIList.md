## authRouters
- POST  /signUp
- POST  /login
- POST  /logout

## profileRouter
- GET   /profile/viewS
- PATCH  /profile/edit
- PATCH  profile/password

## connectionRequestRouter
- POST  /request/send/intrested/:userId
- POST  /request/send/ignored/:userId
- POST  /request/review/accepted/:requestId
- POST  /request/review/rejected/:requestId
## these above two can be consolidated to two
- POST /request/send/:status/:toUserId
- POST /request/send/:status/:requestId


## userRouters
- GET   /user/connections
- GET   /user/requests
- GET   /user/feed  ------------->gets you the profile of other users on platform



    
status: ignored, intrested, rejected, accepted    