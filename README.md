## Boxing Simulator

Blog: https://achefthatcodes.com/

### A comprehensive, simulation based project in React.
#### Notes: The randomization of a sequence of events has yielded a strong demand for data management. Rather than focusing on a game, I want to focus on the collecting and outputing the data, and creating a historical directory of fight metrics locally and on the cloud.

### Gif of prototype below. UI is *not* finalised.

![ezgif com-gif-maker (4)](https://user-images.githubusercontent.com/100096239/182052991-a6f1cf5c-8690-4357-b022-2bcda9c467b6.gif)

- Fight engine tracks realtime 12 round fight, with damage, punch stats, and commentary.
- Create a boxer and follow their rise or fall in the world rankings
- User creates a boxer and faces 30 other randomly generated boxers
- User's attributes are dictated by questionnaire
- Dashboard tracks wins and losses, ranking, basic info.

### Technologies Used:
  - React 18
  - Axios
  - CSS/SCSS
  - Chart.js
  - MongoDB Atlas
  - Express/Node
  - Postman
  - Git Version Control

### MVP Components:
  - Dashboard / Home Gym Page
  - Fight Night Page
  - Boxer Profiles (User or CPU same)
  - Training Module
  - End Of Round Options Module

### Collections:
  - `pbp` aka "Play-by-Play": an array of objects containing the boxers overall engagement. The attacker, defender, round, and total damage.
  - `finalTotals`: an array holding objects that document the total accumulative values of match-winning data.
  - `punchCount`: an array of objects containing each back-and-forth trade in the pbp. Similar to pbp in bite sized pieces.
    -Boxer objects contain punchCount key (how many punches thrown in that exchange), damage or total damage from that exchange.
  - `dmgTracker`: also an array of objects that hold values in the roundCount, engagementCount (the number of initiated), exchangeCount (sorted list of fight sequences), and dmgScale (originally intended to scale the damage in a percentage later)

### Pending features to implement (in order of importance):
- Graphs to show punch stats round-by-round
- Graphs to show punch stats total post-Fight
- Judges Decision Scorecard
- User Input boxes to customize and test different events.


## Here is a slightly overwhelming, but all-in-one diagram that helps me visualize the process:

<img width="4621" alt="BOXING SIM" src="https://user-images.githubusercontent.com/100096239/179266251-4985e5d8-0b0f-44f4-ba8b-dc2b797f8905.png">


### Notes:
- Boxer conditioning affects most actions, as humans with low rate of recovery will perform actions weaker over a shorter period of time. In this program it represent a percentage of the highest possible value.
  - example: if strength = 100, condition is 60, the highest strength value is 100 but the lowest on any random punch can be as low as 60.
- Using React Spring for animation library.

## To Run The Program:
- Clone the repo
- Go to the directory `boxing-simulator/client/`
- Run `npm install` to install all required dependencies
- Run `npm start` to load locally
