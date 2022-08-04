## Boxing Simulator

Blog: https://achefthatcodes.com/

### A comprehensive personal project in React, MERN stack. (The focus of this project has shifted considerably.)
#### Notes: The randomization in a sequence of events (the punches thrown) has yielded a strong demand for data management. Rather than focusing on a game, I want to focus on the collecting and outputing the data, and creating a historical directory of fight metrics locally and on the cloud.

#### Gif of prototype below. UI is *not* finalised, this is just to help me visualize the seperation of components with a variety of colors.

![ezgif com-gif-maker (4)](https://user-images.githubusercontent.com/100096239/180483777-957c5106-3227-40e6-8f61-716a278aa2f7.gif)

- Fight engine tracks realtime 12 round fight, with damage, punch stats, and commentary.
- Create a boxer and follow their rise or fall in the world rankings
- User creates a boxer and faces 30 other randomly generated boxers
- User's attributes are dictated by questionnaire
- Dashboard tracks wins and losses, ranking, basic info.


### Major Project MVP Components:
- Front End:
  - Dashboard / Home Gym Page
  - Boxing Ring Page
  - Boxer Profiles (User or CPU same)
  - Rankings
  - Options Module
  - Training Module
  - End Of Round Module
  
- Logic:
  - Fight Engine
  - Ranking System (Adjust after every fight)
  - DamageHandler (Head and Body if (0) knockout() : engage())
  - Randomizer (target, min range, max range) for fight engine, boxer.props, and commentary

- Back End:
  - Save User Boxer (and subsequent career)
  - Persist Lists of Opponent Boxers.

### Collections: All these are similar but group different related values based on component needs.
  - pbp: an array of objects containing the boxers overall engagement. The attacker, defender, round, and total damage.
  - punchCount: an array of objects containing each back-and-forth trade in the pbp. Similar to pbp in bite sized pieces.
    -Boxer objects contain punchCount key (how many punches thrown in that exchange), damage or total damage from that exchange.
  - dmgTracker: also an array of objects that hold values in the roundCount, engagementCount (the number of initiated), exchangeCount (sorted list of fight sequences), and dmgScale (originally intended to scale the damage in a percentage later)

### Features to implement (in order of importance):
- Head and Body Image with colorized indicators
- Graphs to show punch stats round-by-round
- Graphs to show punch stats total post-Fight

## Here is a slightly overwhelming, but all-in-one diagram that helps me visualize the process:

<img width="4621" alt="BOXING SIM" src="https://user-images.githubusercontent.com/100096239/179266251-4985e5d8-0b0f-44f4-ba8b-dc2b797f8905.png">


### Notes:
- Boxer conditioning affects most actions, as humans with low rate of recovery will perform actions weaker over a shorter period of time. In this program it represent a percentage of the highest possible value.
  - example: if strength = 100, condition is 60, the highest strength value is 100 but the lowest on any random punch can be as low as 60.


## To Run The Program:
- Clone the repo
- Go to the directory `boxing-simulator/client/`
- Run `npm install` to install all required dependencies
- Run `npm start` to load locally