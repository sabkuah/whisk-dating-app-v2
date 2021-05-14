# Dating App

### Description

An "Experience First" approach to meeting new people. Experience ideas are listed and people can sign up for a specific idea then those users are matched. Details of experience are released a few days prior. For Dating, meeting new people, exploring the city and more!

### Names

- Xperienz
- Whisk

### Functional Requirements

- Experience Idea's
- User Accounts
- User Questionnaire
- Matching Algorithm
- User Registration/Auth
- Confirmation

### Non-Functional Requirements

- User Profiles
- Performance
- Capacity
- Privacy
- Security

### Features

- Interesting question prompts
- Icons for experiences

### Future Features

- Private Messaging
- Time/Date Picking
- Remember Declined/Previous Matches
- After date questionnaire
- PWA (progressive web app)

[Figma Prototype](https://www.figma.com/file/dNutQTKExjVcfV2GK0fTsv/Whisk?node-id=0%3A1)

### Inspirations

- The Adventure Challenge - [Date Ideas](https://ca.theadventurechallenge.com/)
- AirBnB - [Experiences](https://www.airbnb.ca/s/experiences)
- Bumble - Profile prompts

### Tech

- Front-End: React
- Authentication: AWS Cognito
- Database: NoSql

### Installation Instructions

### Minimum Viable Products

#### MVP 1: (1 week)

- users can sign up for accounts
- users can view whisks available
- users can receive details about their whisks (their match, time/location)
- users can confirm/decline whisks
- users can view confirmed whisks

#### MVP 2: (2 weeks)

- users can DM their matches
- users can add images to their profile
- users can view their match's profile

#### Nice to have:

- Users can receive notifications from the app
- Users can select the dates they are available

##### SASS

```
$ sass src/styles/App.scss src/styles/main.css
$ sass --watch scss:css
```

## Whisk V2

- PassportJS for authentication -
  - chose not to do authentication from scratch because it has been bullet tested
  - from scratch - hash the passwords
