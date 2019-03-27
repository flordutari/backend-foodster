<!-- # Project Name

Foodster

## Description

Foodster is a platform to buy and sell food in tuppers.

## User Stories

-  **404:** As an anon/user I can see a 404 page if I try to reach a page that does not exist so that I know it's my fault

-  **Signup:** As an anon I can sign up in the platform so that I can start buying tuppers

-  **Login:** As a user I can login to the platform so that I can see my tuppers to buy

-  **Logout:** As a user I can logout from the platform so no one else can use it

-  **List categories** As a user I want to see the tuppers categories so that I can choose one to explore

-  **Add tuppers** As a user I can add a tupper so that I can sell it to the community

-  **List tuppers** As a user I want to see the tuppers so that I can choose one to buy

-  **See tupper detail** As a user I want to see what the tupper contains so I can decide if it fits in what I want

-  **Edit tuppers** As a tupper owner I want to edit my tupper so I can change it if I put wrong information

-  **Delete tuppers** As a tupper owner I want to delete my tupper if I already eat it

-  **Search tuppers** As a user I want to search tupper by ingredient so that I know if there is something that I want to eat

-  **Buy tuppers** As a user I want to buy the tupper so I can eat something

-  **See profile** As a user I want to see my user profile so I can see my status

-  **Edit profile** As a user I want to edit my profile so I can update my information

-  **See others' profile** As a user I want to others my user profile so I can see their 'status'


## Backlog

User profile:
- upload my profile picture
- list of tuppers created by the user
- add other user to favourites so that I can see when he/her post tuppers that I liked
- qualify seller

tupper clasification:
- clasify tupper by type

Geo Location:
- add geolocation to tupper when published
- show tupper location in a map in its detail page
- show tuppers in a map

Homepage:
- ...
  
# Client

## Routes
| Method | Path | Component | Permissions | Behavior | 
|--------|------|--------|--| -------|
| `get`  | `/` | HomePageComponent| public | just promotional copy|
| `post` | `/auth/signup` | SignupPageComponent| anon only| signup form, link to login, navigate to homepage after signup|
| `post` | `/auth/login` | LoginPageComponent | anon only |login form, link to signup, navigate to homepage after login |
| `post` | `/auth/logout` | n/a | user only | navigate to homepage after logout, expire session |
| `get`  | `/categories` | tuppersCategoriesListPageComponent| public | shows all categories, links to details, search tuppers by category
| `get`  | `/tuppers` | AlltuppersListPageComponent| public | shows all tuppers, links to details
| `post` | `/tuppers/new` | tupperCreatePageComponent | user only | creates a new tupper, navigates to tupper's detail page after creation
| `get` | `/tupper/:id` | tupperDetailPageComponent  | public/user | details of one tupper, if logged in 
| `put` | `/tupper/:id` | EdittupperDetailPageComponent  | public/user | edit tupper
| `delete` | `/tupper/:id` | n/a | user only | delete tupper
| `put` | `/buy` | BuyDetailPageComponent | user only | add tupper to bought tupper
| `get` | `/profile/me` | ProfilePageComponent | user only | my details, my favorite tuppers, tuppers created by me
| `put` | `/profile/me` | EditProfilePageComponent | user only | form to edit my profile
| `get` | `/profile/:id` | ProfilePageComponent | user only | others' details, others' favorite tuppers, tuppers created by the user
| `get` | `**` | NotFoundPageComponent | public | 


## Components

## Services

- Auth Service
  - auth.login(user)
  - auth.signup(user)
  - auth.logout()
  - auth.me()
  - auth.getUser() // synchronous
- tupper Service
  - tupper.list()
  - tupper.search(terms)
  - tupper.create(data)
  - tupper.edit(id, data)
  - tupper.delete(id)
  - tupper.detail(id)   
- profile Service
  - profile.detail(id)

# Server

## Models

User model

```
username - String // required
email - String // required & unique
password - String // required
imageUrl - String
status - Number
saldo - Number
following - [ObjectID<User>]
favorites - [ObjectID<tupper>]
tupperHistory - [ObjectID<tupper>]
```

tupper model

```
owner - ObjectID<User> // required
name - String // required
image - String
location - String
status - String // enum // default
category - String // enum // required
value - Number // enum 
```

## API Endpoints (backend routes)

- GET /auth/me
  - 404 if no user in session
  - 200 with user object
- POST /auth/signup
  - 401 if user logged in
  - body:
    - username
    - email
    - password
  - validation
    - fields not empty (422)
    - user not exists (409)
  - create user with encrypted password
  - store user in session
  - 200 with user object
- POST /auth/login
  - 401 if user logged in
  - body:
    - username
    - password
  - validation
    - fields not empty (422)
    - user exists (404)
    - passdword matches (404)
  - store user in session
  - 200 with user object
- POST /auth/logout
  - body: (empty)
  - 204
- PUT /profile/me
  - body:
    - tuppersId
  - validation
    - id is valid (404)
    - id exists (404)
  - updates user in session
- GET /tuppers
  - body:
    - name
    - image
    - distance
  - 200 with tuppers array
- POST /tuppers
  - body:
    - name
    - image
    - distance
  - create tupper
  - 200 with tupper object
- GET /tupper/:id
  - body:
    - name
    - decription
    - distance
  - 200 with tupper object
- PUT /tupper/:id
  - body:
    - name
    - image
    - distance
  - edit tupper
  - 200 with tupper object
- DELETE /tupper/:id
  - body: (empty)
  - 204
  
## Tasks

- setup
- backend routes
- high fidelity wireframes
- user model
- tupper model
- define components
- services
- login view
- signup view
- list view
- list tuppers
- tupper detail
- edit tupper
- delete tupper
- buy tupper
- see profile
- see others profile
---------------------------------
- edit profile
- list tuppers fav-own-bougth
- user qualification
- geolocation 
- show tupper location
- show tuppers in a map

## Links

### Trello/Kanban

[Link to your trello board](https://trello.com) or picture of your physical board

### Git

The url to your repository and to your deployed project

[Client repository Link](http://github.com)
[Server repository Link](http://github.com)

[Deploy Link](http://heroku.com)

### Slides

The url to your presentation slides

[Slides Link](https://slides.com/florenciadutari/foodster) -->