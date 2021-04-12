<!-- 4. How to deploy a React App on Github
Github Pages is a static website hosting service. This means it takes HTML, CSS, and Javascript files and hosts them as individual pages. This can be useful for documentation, or a portfolio, but requires more work if were hoping to make an API call from our front-end.

Therefore, we can deploy a React application with ease, but cannot set up a simple Node backend to secure our third-party API call or use a built-in serverless function (like some of the other deployment options).

We could set up a serverless function on a different service and configure the cross-origin resource sharing (CORS) to only allow access from our domain. Nonetheless, let’s deploy the application.

First, follow the instructions to fork the application.

1. Install and Configure Github Pages
Install the Github Pages library.

npm install gh-pages --save-dev

Next, open up package.json and paste in the homepage property at the top of the object.

"homepage": "https://yourusername.github.io/yourrepositoryname",

You will need to locate your username and repository name to modify the URL accordingly.

Next, add the following properties to the script object.

"scripts": {
  // ... other commands
  "predeploy": "npm run build",
  "deploy": "gh-pages -d build"
},
2. Deploy to Github Pages
Push your changes to your repository.

$ git add package.json package-lock.json
$ git commit -m "deploy setup for Github Pages"
$ git push
In a terminal located at the root of the project (where you installed gh-pages in the previous step), run the command npm run deploy.

This creates a new branch that hosts your React app named gh-pages.

3. Confirm Deployment on Github
Open a browser and navigate to your Github repository.

Click on the Settings tab and scroll down to the Github Pages section.

github pages setting
The Source attribute needs to be set to the gh-pages branch. You can also find your site URL and customize the domain name.

If you visit the page the API call for weather data will not work. There is not a function set up to fetch the data because we cannot secure our API key on the front end.

error message on website
The Axios API call URL in App.js could be modified to call a serverless function set up on a cloud provider. Check out one of the other deployment options for setting up serverless functions.

Regardless, it’s very easy to turn a React app into a website with Github Pages. -->
