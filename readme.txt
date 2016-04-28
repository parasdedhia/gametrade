******************************                    Trade Application                    ******************************

Author: 
Paras Dedhia 	 11008024
Tanmay Nath 	 11008023
Charan Ravikumar 11008129
Date: 20th March 2016
Version: 1.0.0

Description: 
A small platform for people to write posts about the games they want to sell. These posts will be displayed to all the users. 
Users can then comment on the posts they are interested in. This is the primary source of communication provided in version 1.0.0.

Application flow:
1) The user needs to create an account for authentication and posting their ads. Only details required are name, email id and a password.
2) Logged in user will be directed to the main Posts page which lists all the current posts available. 
3) On swiping the posts from right to left he can mark the post as favorite.
4) Option to add a new post is provided by an overlay button on the bottom right corner of the page.
5) Selecting any post will take him to the post detail page which provides more details of the post. On this page the user can post comments.
6) A tab is provided for the logged in user to see his profile and the posts he has published. He can delete the post by swiping from right to left which reveals the delete post button.
7) Bottom right on the screen is a logout button which logs out the user.

Technical background:
The application is based on ionic framework, angularJS and firebase. All the user information is saved on the firebase server in the form of JSON document. Users and posts are two individual collections used to store user data and the posts respectively.
The UI is developed in HTML5 and ionic framework. AngularJS is used to tie up the front-end with the backend server using the AngularFire API.

Upcoming changes:
The current application is the first beta version. Upcoming version will define a more user friendly communications interface and more flexibility in choosing his/her profile. 