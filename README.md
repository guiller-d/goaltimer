# GoalTimer - Daily Activity Log Tracker
### Fall 2021: 195B/F Sec 01 Senior Project
### Contributors
 * Ahmad Abuzaina
 * Guiller Dalit
 * Saima Yunus

### Project Overview
For our project, we have developed a daily activity log mobile application, GoalTimer, that records and analyses various activities performed by users. The application will ultimately better meet user needs by providing a broader range of advice, thus increasing user engagement.

Three things should be running to run the Goal Timer - Daily Activity Log Tracker; Backend Spring Boot, Front End React Native, and Google Cloud Storage. We’ll go through installation of required software and configurations. All the installation link and configuration guides are provided on this file. Then after the installation required framework and cloud configuration, we’ll be running the backend and frontend on a physical mobile device in iOS or Android. So, let’s first go through the hardware and software used. 

### Hardware and software used:
* **IDE** <br />
  * Visual Studio Code Version: 1.62.3 ([Installation Link](https://code.visualstudio.com/download))
* **Backend Environment Setup
  * Gradle 5.6 ([Installation guide](https://gradle.org/install/))
  * SDKMAN ([Installation guide](https://sdkman.io/install))
  * 11.0.11.hs-adpt (Java version)
* **Frontend Environment Setup** <br />
  * React Native Development Environment ([Installation Guide](https://reactnative.dev/docs/environment-setup))
* **Backend and Frontend Programming Language** <br />
  * Spring Boot Framework ([Backend](https://spring.io/projects/spring-boot))
  * React Native ([Frontend](https://reactnative.dev/docs/accessibilityinfo))
* **Cloud Configuration** <br />
  * Google Cloud Bucket ([Initialize guide](https://cloud.google.com/sdk/gcloud/reference/init))
  * Cloud sdk ([Installation guide](https://cloud.google.com/sdk/docs/install))
  * To setup the Google Cloud you need to sign up for a Google Cloud account ([Google Cloud Signup](https://cloud.google.com/free/?gclid=EAIaIQobChMIz_rayv-79AIVKG1vBB067wviEAAYASABEgIfjfD_BwE&gclsrc=aw.ds))
  * After creating a Google Cloud account navigate to Cloud storage and create a new Bucket and named it 'goaltimer'
   ![alt text](https://github.com/guiller-d/goaltimer/blob/main/documentation/readMe_screenshots/cloud_1.png)
   ![alt text](https://github.com/guiller-d/goaltimer/blob/main/documentation/readMe_screenshots/cloud_2.png)
   ![alt text](https://github.com/guiller-d/goaltimer/blob/main/documentation/readMe_screenshots/cloud_3.png)
  * Then after creating a bucket and installing Cloud sdk on your system, open terminal and type 'gcloud init'. Login with your created Google Cloud and select the goaltimer project you just created on Google Cloud. This would configure the created Cloud bucket into your system in order to run GoalTimer. The GoalTimer app would automatically recognized the bucket with the name 'goaltimer' and would attempt to connect to it. 
   ![alt text](https://github.com/guiller-d/goaltimer/blob/main/documentation/readMe_screenshots/cloud_4.png)
* **Testing** <br />
  * Postman ([API Testing](https://www.postman.com/downloads/))
  * Apache JMeter ([Performance Testing](https://jmeter.apache.org/))
* **Expo GO (Running the app on phone iOS/Android)** <br />
  * Install Expo Go on iOS ([Installation](https://apps.apple.com/us/app/expo-go/id982107779))
  * Install Expo Go on Android ([Installtion](https://play.google.com/store/apps/details?id=host.exp.exponent&hl=en_US&gl=US))
  
### Application languages
* Java, React Native, JavaScript

### Running the Backend 
After the installation of Backend Environment and & Cloud configuration Open the 'goaltimer-backend' on the terminal and type 'gradle bootRun'. GoalTimer backend would run and connects to the Goaltimer Google Cloud Bucket. 
![alt text](https://github.com/guiller-d/goaltimer/blob/main/documentation/readMe_screenshots/gradle_bootRun.png)

### Running the Frontend 
REQUIRED: YOUR COMPUTER AND PHONE MUST BE CONNECTED TO THE SAME WIFI. 
After the installation of the Frontend Environment and Expo CLI, 
In the goaltimer-frontend folder > api > api.js change the IP address to your IP address.
![alt text](https://github.com/guiller-d/goaltimer/blob/main/documentation/readMe_screenshots/ip_address_update.png)

open the 'goaltimer-frontend' on the terminal and type 'expo start'. GoalTimer will run on browser and display user for the options to run the app.
![alt text](https://github.com/guiller-d/goaltimer/blob/main/documentation/readMe_screenshots/expo_start.png)

For this case, we'll run the app on Expo Go. Open the Expo Go app on your phone and login with
Username: smarttracker.expo@gmail.com
Password: activitylogtracker

You should be able to see the running GoalTimer. Click on it under "recently in development" and you'll be redirected to the login screen.
<p float="left">
 <kbd> <img src="https://github.com/guiller-d/goaltimer/blob/main/documentation/readMe_screenshots/expo_go.jpg" width="320" height="720"> </kbd> 
 <kbd> <img src="https://github.com/guiller-d/goaltimer/blob/main/documentation/readMe_screenshots/expo_go1.PNG" width="320" height="720"> </kbd>
</p>

## Goal Timer - Activity Log Tracker
Welcome Screen - Sign Up Screen <br />
<p float="left">
 <kbd> <img src="https://github.com/guiller-d/goaltimer/blob/main/documentation/readMe_screenshots/IMG_8928.PNG" width="250" height="550"> </kbd> 
 <kbd> <img src="https://github.com/guiller-d/goaltimer/blob/main/documentation/readMe_screenshots/IMG_8929.PNG" width="250" height="550"> </kbd> 
 <kbd> <img src="https://github.com/guiller-d/goaltimer/blob/main/documentation/readMe_screenshots/IMG_8930.PNG" width="250" height="550"> </kbd> 
</p>
Login Screen - Home Screen - Adding Activity  <br />
<p float="left">
 <kbd> <img src="https://github.com/guiller-d/goaltimer/blob/main/documentation/readMe_screenshots/IMG_8931.PNG" width="250" height="550"> </kbd> 
 <kbd> <img src="https://github.com/guiller-d/goaltimer/blob/main/documentation/readMe_screenshots/IMG_8932.PNG" width="250" height="550"> </kbd> 
 <kbd> <img src="https://github.com/guiller-d/goaltimer/blob/main/documentation/readMe_screenshots/IMG_8933.PNG" width="250" height="550"> </kbd> 
</p>
Home Screen with Added Activity - Activity Timer Screen  <br />
<p float="left">
 <kbd> <img src="https://github.com/guiller-d/goaltimer/blob/main/documentation/readMe_screenshots/IMG_8934.PNG" width="250" height="550"> </kbd> 
 <kbd> <img src="https://github.com/guiller-d/goaltimer/blob/main/documentation/readMe_screenshots/IMG_8935.PNG" width="250" height="550"> </kbd> 
 <kbd> <img src="https://github.com/guiller-d/goaltimer/blob/main/documentation/readMe_screenshots/IMG_8936.PNG" width="250" height="550"> </kbd> 
</p>
Home Screen with Activity Time on Graph - Adding Available Time  <br />
<p float="left">
 <kbd> <img src="https://github.com/guiller-d/goaltimer/blob/main/documentation/readMe_screenshots/IMG_8937.PNG" width="250" height="550"> </kbd> 
 <kbd> <img src="https://github.com/guiller-d/goaltimer/blob/main/documentation/readMe_screenshots/IMG_8938.PNG" width="250" height="550"> </kbd> 
 <kbd> <img src="https://github.com/guiller-d/goaltimer/blob/main/documentation/readMe_screenshots/IMG_8939.PNG" width="250" height="550"> </kbd> 
</p>
Challenge Screen(Addtional Feature) - Setting Screen - Overall Activity Time Usage Screen(Addtional Feature)  <br />
<p float="left">
 <kbd> <img src="https://github.com/guiller-d/goaltimer/blob/main/documentation/readMe_screenshots/IMG_8940.PNG" width="250" height="550"> </kbd> 
 <kbd> <img src="https://github.com/guiller-d/goaltimer/blob/main/documentation/readMe_screenshots/IMG_8941.PNG" width="250" height="550"> </kbd> 
 <kbd> <img src="https://github.com/guiller-d/goaltimer/blob/main/documentation/readMe_screenshots/IMG_8943.PNG" width="250" height="550"> </kbd> 
</p>







