import React, { useState } from 'react';
import { Button, TextField, Accordion, AccordionSummary, FormControlLabel, FormGroup, Radio, RadioGroup, Checkbox, AccordionDetails, Typography } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const Questionnaire = ({questions, submit, user, setInfo}) => {
  const [userQs, setUserResponses] = useState(user.profileQuestionnaire);


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
    var newUserObj =  Object.assign(user)
    newUserObj.profileQuestionnaire = qObj
    console.log("newUserObj", newUserObj)
    setInfo(newUserObj)
  };

  return (
    <form onSubmit={submit}>
      <Typography variant="h5" style={{paddingBottom: "1em"}}>Profile Questionnaire</Typography>
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
                        {q.answers.map(opt => {
                          var findCurrentA = userQs.find(question => question.ID === q.ID)
                          let checked = findCurrentA ? findCurrentA.answer === opt  : false
                          return <FormControlLabel key={opt} value={opt} control={<Radio checked={checked}/>} label={opt} />
                        }
                        )}
                      </RadioGroup>
                    </AccordionDetails>
                    :
                    q.category === "multiple choice" ?
                      <AccordionDetails>
                        <FormGroup>
                          {q.answers.map(opt => {
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


