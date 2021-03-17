import React, { useState, useEffect } from 'react';
import { API } from 'aws-amplify';
import {
  Button, TextField, Accordion, AccordionSummary, FormControlLabel, FormGroup, Radio, RadioGroup, Checkbox, AccordionDetails,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const Questionnaire = () => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);

  const handleChange = (q, a) => {
    console.log("question:", q, ":", a);
    var qObj = [] // { questionId: q.id, answer: a}
    // if questionId does not exist in qObj, push to array, else change answer
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

  useEffect(() => {
    (async function () {
      const response = await getData();
      console.log("grabbing questions", response)
      setQuestions(response)
    })();
  }, [])


  return (
    <div id="Q-container">
      <form>
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
                          {q.answers.map(opt =>
                            <FormControlLabel key={`${q.question}-${opt}`}
                              control={<Checkbox checked={false} onChange={(e) => handleChange(q, e.target.value)} name={opt} />}
                              label={opt}
                            />
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
                        />
                      </AccordionDetails> 
                    : ""
                }
              </Accordion>
            </div>
          ))
        }
        <Button className='submit-btn' type='submit'>
          Save
        </Button>
      </form>
    </div>
  )
}

export default Questionnaire


