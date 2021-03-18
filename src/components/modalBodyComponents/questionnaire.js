import React, { useState, useContext, useEffect } from 'react';
import { API } from 'aws-amplify';
import { Button, TextField, Accordion, AccordionSummary, FormControlLabel, FormGroup, Radio, RadioGroup, Checkbox, AccordionDetails } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import UserContext from '../../context/user/userContext';

const Questionnaire = () => {
  const [questions, setQuestions] = useState([]);
  const [userQs, setUserResponses] = useState(null);
  const userContext = useContext(UserContext)
  const { user, updateProfile } = userContext

  useEffect(() => {
    (async () => {
      const response = await getData();
      console.log("grabbing questions", response)
      setQuestions(response)

      console.log("user profile qs?", user.profileQuestionnaire)
      setUserResponses(user.profileQuestionnaire)

    })();
  }, [])

  const handleChange = (q, a, mc) => {
    var qObj = new Array(...userQs)
    var findCurrentQ = qObj.find(question => question.ID === q.ID)
    
    if (mc) {
      if (findCurrentQ) {
        findCurrentQ.answer.includes(a) ? findCurrentQ.answer.splice(a, 1) : findCurrentQ.answer.push(a)
      } else {
        let question = { ID: q.ID, answer: [a] }
        qObj.push(question)
      }
    } else {
      let question = { ID: q.ID, answer: a }
      if (findCurrentQ) {
        qObj.splice(findCurrentQ, 1)
        qObj.push(question)
      } else {
        qObj.push(question)
      }
    }
    setUserResponses(qObj)
  };


  function getData() {
    const apiName = 'WhiskPro';
    const path = '/api/Question';
    const myInit = { // OPTIONAL
      headers: {}, // OPTIONAL
    };

    // const response = await 
    return API.get(apiName, path, myInit)
    // setQuestion(response)
  }

  const submit = (e) => {
    e.preventDefault();
    var userObject = Object.assign(user)
    userObject.profileQuestionnaire = userQs
    console.log("update profile with this info", userObject)
    updateProfile(userObject)
  }

  return (
    <form onSubmit={submit}>
      <div id="Q-container">
        {
          questions.map((q, i) => (
            <div key={i}>
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <h4 key={i}>{`${i + 1}. ${q.question}`}</h4>
                </AccordionSummary>
                {
                  q.category === "radio" ?
                    <AccordionDetails>
                      <RadioGroup aria-label="gender" name="gender1" onChange={(e) => handleChange(q, e.target.value)}>
                        {q.answers.map(opt =>
                          <FormControlLabel key={opt} value={opt} control={<Radio />} label={opt} />
                        )}
                      </RadioGroup>
                    </AccordionDetails>
                    :
                    q.category === "multiple choice" ?
                      <AccordionDetails>
                        <FormGroup>
                          {userQs && q.answers.map(opt => {
                            var findCurrentA = userQs.find(question => question.ID === q.ID)
                            let checked = findCurrentA ? findCurrentA.answer.includes(opt) : false
                            return <FormControlLabel key={`${q.question}-${opt}`}
                              control={<Checkbox checked={checked} onChange={() => handleChange(q, opt, 'mc')} name={opt} />}
                              label={opt}
                            />
                          }
                          )}
                        </FormGroup>
                      </AccordionDetails>
                      :
                      q.category === "text" ?
                        <AccordionDetails>
                          <TextField id={`${q.question}-textfield`}
                            placeholder="Answer Here!"
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                            variant="outlined"
                            onChange={(e) => handleChange(q, e.target.value)}
                            style={{textAlign: "left"}}
                          />
                        </AccordionDetails>
                        : ""
                }
              </Accordion>
            </div>
          ))
        }
      </div>
      <Button className='submit-btn' type='submit' style={{marginTop: "1em"}}>
        Save
      </Button>
    </form>
  )
}

export default Questionnaire


