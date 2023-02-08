# **Stargazers**

## Table of Contents
* [Run Localy](#run-localy)
* [Abstract](#abstract)
* [Home Page](#home-page)
* [Login and Registration](#login-and-registration)
* [User Profile Page](#user-profile-page)
* [Edit-Delete Page](#edit-delete-page)
* [Search Events Page](#search-events-page)
* [Explore Page](#explore-page)
* [Event Form Page](#event-form-page)
* [Nasa Api Page](#nasa-api-page)
* [Chat Page](#chat-page)
* [About Us Page](#about-us-page)
* [Technologies Used](#technologies-used)
* [Done by](#done-by)
* [Superviser](#superviser)



## Run Localy

```npm start in command prompt``` then navigate to  [127.0.0.1:3000](https://localhost:3000).
## **Abstract:**
#### *Stargazers website is a place for astronomy and space lovers to enjoy stargazing and star-camping events, and share their interests with other astronomy fans. The website allows individuals and institutions to create stargazing and star-camping events for educational, research and/or entertainment purposes. It’s a hub for all astronomy fans and learners to have access to all related space events and be able to book the ones that suit them based on location, date and type of astronomical phenomenon to observe. Users can also enjoy daily astronomy pictures provided by NASA APIs for images and information. Users can make chat together in chat page using socket.io.*
## Home Page:
* Features:
     *  Home Page have a navigation bar contains a route to (Home), (Search Events), (Chat Page), (About Us), (My Profile), and(Logout).
     *  Home Page contains buttons to fast access Explore, Nasa Api, and Chat Page.
     *  Users are able to see the avilable events in website ,if they press on Search Events on top of the navigation bar.
     *  Once users click on Chat Page on top of the navigation bar, go to the chat page.
     *  When users click on About Us on top of the navigation bar, navigate to About Us Page.
     *  If user click on My Profile on top of the navigation bar, navigate to user profile page.
     *  Logout redirect to sign in page. 
   ### Home Page Preview:
   ![Home page](https://user-images.githubusercontent.com/110983334/216769699-096a30be-730b-4bfa-bf03-e652325c7229.png)
## Login and Registration:
* Features
    *	Users are able to register:
    *	Users will not be able to register with two different accounts with same email.
    *	Username must contain 2 characters at least.
    *	Password must contain at least 8 characters.
    *	Passwords are encrypted.
    *	Validations are done in real time
    *	User information are saved in session, so they don’t need to log in again.
    *   User will be able to login.
    *	User is only able to login with a valid password and email.
    *	User should be saved in session when registered successfully.
  ### Login/Register Preview
  ![Sign in](https://user-images.githubusercontent.com/110983334/216768396-e9f5e130-b52e-49ce-ac02-61ee9c9c427c.png)
  ![Sign up](https://user-images.githubusercontent.com/110983334/216768403-c44f41b1-ccfe-4519-81f1-da5571a80049.png)
## User Profile Page:
* Features:
     *  User Profile Page have a navigation bar contains a route to (Home), (Search Events), (Chat Page), (About Us), (My Profile), and(Logout).
     *  User Profile Page contains, user events who created before.
     *  If user need to create a new event just click on Create Event button.
     *  Once user who create the event want to edit or delete event, just click on event name to send him to edit-delete page.
   ### User Profile Page Preview:
   ![user profile](https://user-images.githubusercontent.com/110983334/216777776-6787aad2-636f-4e32-9659-c7e4a1af24f2.png)
   ![profile page](https://user-images.githubusercontent.com/110983334/216780680-d0b9301a-a468-41bd-9661-6e19accf70f7.png)
## Edit-Delete Page:
* Features:
     *  Edit-Delete Page have a navigation bar contains a route to (Home), (Search Events), (Chat Page), (About Us), (My Profile), and(Logout).
     *  Edit-Delete Page contains, event details, edit button, and delete button.
     *  If user need to edit event just click on Edit button, then send him to edit form, after make changes just click on Update button.
     *  Once user want to delete event just click on Delete button.
   ### Edit-Delete Page Preview:
   ![edit ](https://user-images.githubusercontent.com/110983334/216782024-7725d29b-a881-48b9-953a-5449fc7f40ae.png)
   ![edit-1](https://user-images.githubusercontent.com/110983334/216782028-a071e00e-4767-4c27-836a-af516b850d31.png)
## Search Events Page:
* Features:
     *  Search Events Page have a navigation bar contains a route to (Home), (Search Events), (Chat Page), (About Us), (My Profile), and(Logout).
     *  Search Events Page contains all avilable events .
   ### Search Events Page Preview:
   ![search event](https://user-images.githubusercontent.com/110983334/216779177-1718213d-e226-44f9-a71c-d2a2c6815dd3.png)
   ![search](https://user-images.githubusercontent.com/110983334/216780964-28f4bee7-46ca-48bd-9a7b-0bb27fc4cfa3.png)
## Explore Page:
* Features:
     *  Explore Page have a navigation bar contains a route to (Home), (Search Events), (Chat Page), (About Us), (My Profile), and(Logout).
     *  Explore Page contains all available events .
   ### Explore Page Preview:
   ![explore](https://user-images.githubusercontent.com/110983334/216780795-54c7e21c-d81a-4901-a0f9-c9ebb586015a.png)
## Event Form Page:
* Features:
     *  Event Form Page have a navigation bar contains a route to (Home), (Search Events), (Chat Page), (About Us), (My Profile), and(Logout).
     *  Event Form Page contains form to create event, in future data.
   ### Event Form Page Preview:
   ![create event](https://user-images.githubusercontent.com/110983334/216780112-c5427010-c831-498c-b702-3c98f5464a18.png)
## Nasa Api Page:
* Features:
     *  Nasa Api Page have a navigation bar contains a route to (Home), (Search Events), (Chat Page), (About Us), (My Profile), and(Logout).
     *  Nasa Api Page contains search for any data in the past will show you some thing on that date about space.
   ### Nasa Api Page Preview:
   ![nasa api](https://user-images.githubusercontent.com/110983334/216779978-d6d96e49-8c06-4339-9f66-132fc89e5079.png)
   ![nasa api 1](https://user-images.githubusercontent.com/110983334/216779981-21fb8c11-f539-4766-b4f4-f16be778df9f.png)
## Chat Page:
* Features:
     *  Chat Page have a navigation bar contains a route to (Home), (Search Events), (Chat Page), (About Us), (My Profile), and(Logout).
     *  Chat Page contains a chat feature between all users.
   ### Chat Page Preview:
   ![chat](https://user-images.githubusercontent.com/110983334/216780183-d1167457-a59e-458c-bb16-06bc993d0c61.png)
## About Us Page:
* Features:
     *  About Us Page have a navigation bar contains a route to (Home), (Search Events), (Chat Page), (About Us), (My Profile), and(Logout).
     *  About Us Page contains summary about our website.
   ### About Us Page Preview:
   ![aboutus](https://user-images.githubusercontent.com/110983334/216782736-619348d6-b2bf-4e16-ad15-d3c1d70757c7.png)
## Technologies Used:
   ![mernjpg](https://user-images.githubusercontent.com/110983334/210658109-4acdd6c5-60ba-479c-85ae-79fe9042070d.jpg)
   ![material-ui](https://user-images.githubusercontent.com/110983334/210716024-bb5faaf3-1d8b-4a98-8bdb-3e629d93dbec.png)
   ![socket io](https://user-images.githubusercontent.com/110983334/210716027-3d13985a-9d93-414a-8ceb-a81e0575200d.png)
- MongoDB.      - Express      - React.js     - Node.js
- Material UI.
- Socket.io.

## Done by:
- Jamal Harb.
- Haneen Saymeh.
- Laith Albarq.
- Amin Hotari.
## Superviser:
- Amin Eid.
- Fatima Harahsheh.
