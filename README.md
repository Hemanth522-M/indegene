# Indegene Full Stack (React) Coding Assessment

## Overview

I used React and material UI(CSS) to create the entire application process.

## How did you decide which technologies to use as part of your solution?
   I choose react for this application, because of the following reasons
        #1 It facilitates the overall process of writing components. ...
        #2 It boosts productivity and facilitates further maintenance. ...
        #3 It ensures faster rendering. ...
        #4 It guarantees stable code. ...
        #5 It is SEO friendly. ...
        #6 It comes with a helpful developer toolset. ...

## What would you do differently if you were allocated more time?
  If i have really more time, i should more focus on performance of the application with help of some modules like lazy loading, code splitting, webpack & bundlers. And also trying to reduce the size of the code.

## How should the application work?

* On Home Page, Show the company logo, First tab, Second tab.

* Click on First tab, display the fields movie title, movie release year, submit button. After fill the fields 
  click on submit button displays, movie info and modal button. Click on more info button it display more information about movie.

* Click on Second tab, display the fields movie title, movie release year, submit button. After fill the fields 
  click on submit button displays, all movie info with poster.   

## Requirements

Implement Home page with two tabs. 

1. First tab Input: It should accept “movie title” and movie release year Output: Should display all movie info with pagination. In addition, a button to fetch more info about movie and displayed in modal. When displaying full info of movie in modal, if movie has rating more than 7 then show boxoffice: hit else boxoffice: flop 
 
Example:  api to use http://www.omdbapi.com/?s=x men&y=2000&apikey=      to fetch movie list.  http://www.omdbapi.com/?i=tt4853102&plot=full&apikey=       here “tt4853102” is “imdbID” in previous api. 
 
2. Second tab Input: It should accept “movie title” and movie release year Output: should display all movie info with poster. Example: First use api to use http://www.omdbapi.com/?s=x men&y=2000&apikey=  Display poster using “poster” field returned in response from above api. 


## Please follow the bellow instructions to run the application on machine

  #1 First clone the project, git clone... https://github.com/Hemanth522-M/indegene.git
  #2 After clone, enter this cd indegene
  #3 Then, npm install
  #4 Then npm start
  #5 Now to run the project on port 3000
  #6 Go to http://localhost:3000/ to view the app.

## Authors

   Hemanth M

