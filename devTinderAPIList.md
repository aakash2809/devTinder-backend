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


notes:
pagination
/feed?page=1&limit=10 .skip(0) limit(10)                 1-10
/feed?page=2&limit=20 .skip(10) limit (10)               11-20 
/feed?page=3&limit=30 .skip(20) limit (10)               21-30
/feed?page=4&limit=40 .skip(30) limit (10)               31-40  
 
 formula skip = (page-1) * limit
                 (1-1)   * 10  = 0
                 (2-1)   * 10  = 10
                 (3-1)   * 10  =20 
    
status: ignored, intrested, rejected, accepted    