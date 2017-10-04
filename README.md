# React Base Project Starter Kit

Create React projects without configuration time.

**Note:** This pack is still under development, there are still undocumented functionalities.

***Do not use for production***

# Quick Overview
Create a New folder or open the folder where you want this package installed.

1. Create your **package.json** file if not created already, 
```sh
npm init -y
````

2. Add this package to dependencies
```sh
yarn add https://github.com/mzamoras/rbc
```

3. Run the **React Base Project**
```sh
npm run rbc::start
````

# Configuration file
When you run this package for the first time, you will be required to answer some questions in order to create the configuration file:
* **rbc.config.js**

1. Project Name
2. Desired Local Address
3. Use of Proxy
4. Auto open Chrome 

# Editing Configuration File
In this file you will be able to setup your project and the main variables required to make it work:

1. Basic Paths

2. SSL Certificates 

3. Webpack Configuration:    
    * Entry
    * Output
    * Extensions to Resolve
    * Vendors to collect in the same chunk

# Folder Structure
* React
* Electron
* Public

# Start Script Option
* Run Server
* Run Electron
* Run Both
* ReConfigure
* Delete configuration and Start Over
* ReCompile RBC Package
* ReCompile RBC Package Hot 

# Using Proxied Server
To use a proxied server follow these steps:

1. Add the package to your package.json dependencies
       "yarn add https://github.com/mzamoras/rbc"

2. Run the Main Script for the first time
       npm run rbc::start

3. Fill in the questions:

    a. Project Name ( any name ).

    b. Local URL ( eg. http://localhost:5000 )
    
    c. Proxy URL ( eg. http://example.com:80 )

4. Run the Main Script again, and select to copy templates, or make sure to have the folder structure in your project.

    a. **public** Folder        ( required folder ).
    - remove any index.html, so the proxy can work.

    b. **react** Folder         ( required folder ).
    
    c. **electron** Folder      ( required folder ).
    
    d. **assets** Folder With:  ( required folder ).
    - **css**   ( optional folder )
    - **js**    ( optional folder )
    - **fonts** ( optional folder )
    - **media** ( optional folder )
    - **less**  ( optional folder )
        


# Includes
* To Create:
    * React App
    * Electron App ( with react )

* Server Side
    * Webpack ( for compiling )
    * Browsersync ( as server )

* React Utilities
    * PropTypes
    * Babel Env
    * Babel Stage 2
    * react-hmr ( hot module reload )
    * classnames
    * shallowEqual
    * Redux
    * React JSS
    * React Router
    * Helmet

* Additional Utilities
    * Less Processing
    * HTM5 Boilerplate
    * GZip Compiled Files ( optional )
    * Chunk Compiled Files ( optional )
    * Minification of Compiled Files ( optional )
    * Eslint code validation

* For Testing
    * Karma
    * Mocha
    * sinon
    * Jest



