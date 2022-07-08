## Boxing Simulator

Blog: https://achefthatcodes.com/


### A comprehensive personal project in React, MERN stack.
- Create a boxer and follow their rise or fall in the world rankings
- User creates a boxer and faces 30 other randomly generated boxers
- User's attributes are dictated by questionnaire
- Dashboard tracks wins and losses, ranking, basic info.
- Fight engine tracks realtime 12 round fight, with damage, punch stats, and commentary.


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

### Features to implement (in order of importance):
- Head and Body Image with colorized indicators
- Graphs to show punch stats round-by-round
- Graphs to show punch stats total post-Fight