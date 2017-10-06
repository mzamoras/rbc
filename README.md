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
![alt text](https://raw.githubusercontent.com/mzamoras/rbc/master/documentation/ss.png)

# Index
	
Github automatically parses anchor tags out of your headers. So you can do the following:

1. [Configuration File](#start-script-option)  
1. [Editing Configuration File](#start-script-option)  
1. [Folder Structure](#start-script-option)  
1. [Main Script](#start-script-option)  
1. [Using Proxied Server](#start-script-option)  
1. [Using Static Server](#start-script-option)  

# Configuration file
When you run this package for the first time, you will be required to answer some questions in order to create the configuration file:
* **rbc.config.js**

1. Project <span style='color:#aaaaff'>Name</span>
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

### Calling the script
Once you add this pack to your dependencies, you will be able to call the main script trough this command:
```sh
    npm run rbc::start
```
### First Run
The first time you run this script, it will check for configuration file existence ( rbc.config.js ) on your project root, if it doesn't exist, the script will help you to create it, just answer a few question and that will be it.

The questions are:  
1. Project Name: 

### Script Options
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
        
        
| Name      | Type   | Description                      | Required   |
| --------- | ------ | -------------------------------- | :--------: |
| public    | folder | Here goes all the compiled files | yes        |
| react     | folder | React main files                 | yes        |
| electron  | folder | Electron main files              | yes        |
| assets    | folder | Files needed to create the app   | yes        |


# Using Laravel
## New Project
1. Install Laravel Installer
2. run `laravel new projectName`

Install Laravel and create a 


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

# Using Storyboard
|Options|Description|
|---|---|
|<span style="color:#EC407A;font-size:1.1em;">Servers</span>|
|Run Server|x|
|Run Electron App|x|
|Run Both|x|
|<span style="color:#EC407A;font-size:1.1em;">Testing</span>|
|Test with Karma|x|
|Launch Storybook|x|
|<span style="color:#EC407A;font-size:1.1em;">Configuration</span>|
|Re configure|x|
|Start Over|x|

---
#### <span style="color:#EC407A;font-size:1.1em;">Running Servers</span>
When running a server some options are configurable. The default options are configured to run as DEVELOPMENT MODE.

|Option|Default|
|---|:---:|
|1. Run in <span style="color:#EC407A">**Production Mode**</span> ?| false |
|2. Enable Hot Module Replacement ( <span style="color:#EC407A">**HMR**</span> ) ?| true |
|3. Enable <span style="color:#EC407A">**gzip**</span> for compiled files ?| true |
|4. <span style="color:#EC407A">**Minify**</span> compiled files ?| false |

---
#### <span style="color:#EC407A;font-size:1.1em;">Running Electron Only</span>
When running Electron App the default options are configured to run as DEVELOPMENT MODE.

**Note:** Running Electron only does not allow HMR, but you can use **watch mode** to lisent for changes and recompile when they happen. To Enable HMR, run Server instead.

|Option|Default|
|---|:---:|
|1. Run in <span style="color:#EC407A">**Production Mode**</span> ?| false |
|2. <span style="color:#EC407A">**Watch**</span> Mode ?| true |

