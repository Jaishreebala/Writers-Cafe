# Writers-Cafe-API

A backend API for managing user's written works.

## API Specifications

### Written Work
- Display Written Work from the database (GET)
    * GET all Written Works: Advanced Features:
        * Display Specific Fields
        * Filter results (by genre, author, published date etc.)
        * Limit number of results per page
        * Pagination
    * GET a Written Work by ID
    * Private/Public Works feature
- Create new written work
    * Authentication: Only logged in users can create a new written work.
    * Field validation using mongoose
 - Update written work
    * Only owner can update their written work
    * Field validation using mongoose 
- Delete written work
    * Only owner can update their written work
- Upload cover photo for the written work
- Calculate average rating for the specific written work.

### Ratings
- GET all ratings for a specific written work
- GET all ratings (advancd filtering features)
- GET a single rating by ID
- POST (add) rating
    * Authenticate that only logged in users can create a rating
    * The creator of story can not add ratings to their own story
- UPDATE rating
    * Only creator of rating can update rating
- DELETE rating
    * Only creator can delete their own rating

### Users & Authentication
- Authentication using JWT & cookies
  * JWT and cookie will expire in 30 days
- User registration
  * Once registered, a token will be sent along with a cookie (token = xxx)
  * Passwords must be hashed
- User login
  * User can login with email and password
  * Plain text password will compare with stored hashed password
  * Once logged in, a token will be sent along with a cookie using JWT
- User logout
  * Cookie will be sent to set token = none
- Get user (Profile page)
  * Route to get the currently logged in user (via token)
- Password reset (lost password)
  * User can request to reset password
  * A hashed token will be emailed to the users registered email address
  * A put request can be made to the generated url to reset password
  * The token will expire after 10 minutes
- Update user info
  * Authenticated user only
  * Separate route to update password