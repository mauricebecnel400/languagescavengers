![Logo](https://github.com/mauricebecnel400/languagescavengers/blob/90a46c117e9a62225be061612fe40011b0fdf10a/lang_Logo.png)

## Authors:
Maurice Becnel, Jimmie Hagle, Boaz Cogan, Draven Pena

# Contents
## [Report](https://github.com/mauricebecnel400/languagescavengers/blob/master/README.md#report-1)
## [Installation Directions](https://github.com/mauricebecnel400/languagescavengers/blob/master/README.md#installation-directions-1)

# Report
### "Phase 3: Design"
### Language Scavengers
### CS 470 Fall 2018
#### Introduction:
      
Langauge learning is a challenging process, that even after years of classroom studies a high level of proficency is still difficult to achieve. The idea behind Language Scavenger is an application to be used as a supplementary tool to help with the language learning process. The app will use image recogintion software to connect words with objects in our everyday lives. The main feature is a scavenger hunt style game in which the user is provided a word in the language they wish to learn and their goal is to go out and capture the object with their phone/tablet. From our research into language learning nouns are pivotal step in the language learning process. According to a study with infants, 

> "native-language nouns can be reliably recognized in continuous speech by 6.0–7.5 month olds, similar performance with verbs does not appear to emerge until 11.0–13.5 months of age". 

  (https://www.sciencedirect.com/science/article/pii/S0010027714000870?via%3Dihub)

This idea of understanding nouns first when learning a language is what lead us to this app idea. When this app is used along side traditional language learning faster understanding can be achieved.

#### Previous Phase:

During the technology proposal our group decided on designing our app as a web app. The reasons for this decision was due to allow the user more accesability to the app. Since the goal of this project is to help the user learn a new language provideing access from differnt devices depending on what the user has avaible will help with this goal. Feedback questioned whether a web app is the best choice due to need for a camera when using this app. This is valid observation, but our due to the size of avaible image recognition software a web app is still the better technology choice. With todays technology most devices do have built in cameras and those that do not will not be able to run the image recognition aspects of this app. In these cases we will add a image maching mode if time premits it. This will keep with our word association theme while providing users without cameras a chance to learn.

#### Three Low-Fidelity Designs

##### Storyboard
![Storyboard](https://github.com/mauricebecnel400/languagescavengers/blob/Logo/Storyboard.png)

##### Wireframes
![Wireframes](https://github.com/mauricebecnel400/languagescavengers/blob/Logo/Wireframes.png)

##### Mock Prototype
![Cardboard_prototype](https://github.com/mauricebecnel400/languagescavengers/blob/Logo/Cardboard_prototype.png)

#### Mid-Fidelity Design

##### Youtube viedo found here
[![Video](http://img.youtube.com/vi/Ai96_kWtWCI/sddefault.jpg)](https://www.youtube.com/watch?v=Ai96_kWtWCI)


#### High-Fidelity Prototype:

![Home](https://github.com/mauricebecnel400/languagescavengers/blob/Logo/Home.png) ![Scavenge](https://github.com/mauricebecnel400/languagescavengers/blob/Logo/Scavenge.png) ![Book](https://github.com/mauricebecnel400/languagescavengers/blob/Logo/Word_Book.png)

#### Selected Design or Prototype

For our selected prototype we used the high-fidelity prototype previewed above. This prototype was designed through Figma an online UI designing website that lets you preview on different devices similar to how a web app will run. By using this the users get the feel on how that app will eventually look and feel. The demo let them click through both scavenger mode and word book mode with pre-captured images due to image processing not yet implemented. The language demoed was spanish, but the app will eventually support more. 

##### Evaluation Process:

1) Pre-Questions
      - Do you know any spanish?
      - Are you intrested in another learning another language?
      - Have you used any language learning apps like Duolingo?
      - What in your opinion would help you learn a language more effectivly?
      
2) App-Demo
      - Given phone with running app
      - Told to click through both modes
      - Answered questions regarding the different modes
      
3) Post-Quiz
      - Silla is a ______?
      - Lapiz is a ______?
      - Coche is a ______?
      - Escritorio is a ______?

The students we evaluated were all Sonoma State students that ended up having little understanding of the spanish language. Some students did how ever had experience with apps like Duolingo. When asked what they would like to see in a language learning app response tended to be toward somehow connecting what they are trying to learn with their everday lives. The results from the evaluation showed high accuracy on word recognition after only one run through the demo. This shows that this app has potential to be helpfull in suplementing the language learning process of the user.

### Installation Directions:

1) clone repository and cd into the directory
2) 'npm install' (this will install all node modules for this project)
3) 'npm install expo-cli --global' (skip if you have already done this)
4) make a branch and checkout to that branch.
5) download Expo Client on iPhone/Android
6) 'expo start'
7) scan QR code on phone and open in Expo client app