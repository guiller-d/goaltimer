# GoalTimer -Activity Log Tracker
### Fall 2021: 195B/F Sec 01 Senior Project
### Contributors
 * Ahmad Abuzaina
 * Guiller Dalit
 * Saima Yunus

### Project Overview
For our project, we have developed a daily activity log mobile application, GoalTimer, that records and analyses various activities performed by users. The application will ultimately better meet user needs by providing a broader range of advice, thus increasing user engagement.


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
  * Then after creating a bucket and installing Cloud sdk on your system, open terminal and type 'gcloud init'. Login with your created Google Cloud and select the goaltimer project you just created on Google Cloud. This would configure the created Cloud bucket into your system in order to run GoalTimer. The GoalTimer app would automatically recognized the bucket with the name 'goaltimer' and would attempt to connect to it. 
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


### Running the Frontend 
After the installation of the Frontend Environment and Expo CLI, 
In the goaltimer-frontend folder > api > api.js change the IP address to your IP address.

open the 'goaltimer-frontend' on the terminal and type 'expo start'. GoalTimer will run on browser and display user for the options to run the app. For this case, we'll run the app on Expo Go. Open the Expo Go app on your phone and login with
Username: smarttracker.expo@gmail.com
Password: activitylogtracker






