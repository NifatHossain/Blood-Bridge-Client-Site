# Blood Bridge

Admin email: nifat@gmail.com

Admin Password: nN123456

live site: https://bloodbridgelive.netlify.app/

## Features

[Blood Bridge](https://bloodbridgelive.netlify.app/) is a demo website for connecting blood donors and Recipients

It is a full-stack website using MERN stack

There are three types of users in this platform. Admin(Have access to all information), Volunteer(admin can provide some special Accesses), Blood Donor.

Admin can promote donors to volunteer or even promote to another admin. Admin can also block users. Blocked users can not create any new request.

Donors(users) can request for Blood and other donors can accept requests and donate blood. User who requested for blood can not accept his own request.

This Website is responsible for all devices.

## Technologies

React, MongoDB, Node js, Express, Firebase, JWT, React Axios, tanstack query,vercel, Netlify

## How to run Locally

-> clone Blood-Bridge-Client-Site and Blood-Bridge-Server in you PC

-> Install node, nodemon in you PC

-> open command prompt in these two folders and run (npm i) to install the dependencies

-> create a .env.local file in root folder of client site code and setup your fireBase and ImageBB credentials

example:
VITE_apiKey=***

VITE_authDomain=***

VITE_projectId=***

VITE_storageBucket=***

VITE_messagingSenderId=***

VITE_appId=***

VITE_imageHostingKey=***

-> create a .env file in server site and setup mongodb credentials and jwt token 

example:
DB_USER=***

DB_PASS=***

ACCESS_TOKEN_SECRET=************************

->change baseurl from useAxiosPublic and useAxiosSecure hooks to http://localhost:5000

-> run (nodemon index.js) in server site command prompt

-> run (npm run dev) in the client site command prompt and open the link that you will get after running this command

