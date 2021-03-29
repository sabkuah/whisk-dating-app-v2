import React, { useContext, useState } from 'react';
import {
  Button,
  TextField,
  Accordion,
  AccordionSummary,
  FormControlLabel,
  FormGroup,
  Radio,
  RadioGroup,
  Checkbox,
  AccordionDetails,
  Typography,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import UserContext from '../../context/user/userContext';

const Questionnaire = ({ questions, submit, setInfo }) => {
  const userContext = useContext(UserContext);
  const { user } = userContext;
  const [userQs, setUserResponses] = useState(user.profileQuestionnaire);

  const handleChange = (q, a, mc) => {
    var qObj = new Array(...userQs);
    var findCurrentQ = qObj.find((question) => question.ID === q.ID);
    var index = qObj.indexOf(findCurrentQ);
    var newUserObj = Object.assign(user);
    // --- multiple choice questions
    if (mc) {
      if (findCurrentQ) {
        if (findCurrentQ.answer.includes(a)) {
          var i = findCurrentQ.answer.indexOf(a);
          findCurrentQ.answer.splice(i, 1);
        } else {
          findCurrentQ.answer.push(a);
        }
        if (findCurrentQ.answer.length === 0) {
          qObj.splice(index, 1);
        }
      } else {
        let question = { ID: q.ID, answer: [a] };
        qObj.push(question);
      }
      // --- radio and checkbox questions
    } else {
      let question = { ID: q.ID, answer: a };
      if (findCurrentQ) {
        qObj.splice(index, 1);
        qObj.push(question);
      } else {
        qObj.push(question);
      }

      if (q.ID === '2') {
        // update user preferences
        switch (a) {
          case 'Women':
            newUserObj.preference = 'females';
            break;
          case 'Men':
            newUserObj.preference = 'males';
            break;
          case 'Other':
            newUserObj.preference = 'other';
            break;
          default:
            break;
        }
      }
    }
    setUserResponses(qObj);

    newUserObj.profileQuestionnaire = qObj;
    setInfo(newUserObj);
  };

  return (
    <form onSubmit={submit}>
      <Typography variant='h5' style={{ paddingBottom: '1em' }}>
        Profile Questionnaire
      </Typography>
      <div id='Q-container'>
        {questions.map((q, i) => {
          var answeredQ = userQs.find((question) => question.ID === q.ID);
          return (
            <div key={i}>
              <Accordion className={answeredQ?.answer ? 'completed-Q' : ''}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <h4 key={i}>{`${i + 1}. ${q.question}`}</h4>
                </AccordionSummary>
                {q.category === 'radio' ? (
                  <AccordionDetails>
                    <RadioGroup
                      aria-label='gender'
                      name='gender1'
                      onChange={(e) => handleChange(q, e.target.value)}
                    >
                      {q.answers.map((opt) => {
                        let checked = answeredQ
                          ? answeredQ.answer === opt
                          : false;
                        return (
                          <FormControlLabel
                            key={opt}
                            value={opt}
                            control={<Radio checked={checked} />}
                            label={opt}
                          />
                        );
                      })}
                    </RadioGroup>
                  </AccordionDetails>
                ) : q.category === 'multiple choice' ? (
                  <AccordionDetails>
                    <FormGroup>
                      {q.answers.map((opt) => {
                        let checked = answeredQ
                          ? answeredQ.answer.includes(opt)
                          : false;
                        return (
                          <FormControlLabel
                            key={`${q.question}-${opt}`}
                            control={
                              <Checkbox
                                checked={checked}
                                onChange={() => handleChange(q, opt, 'mc')}
                                name={opt}
                              />
                            }
                            label={opt}
                          />
                        );
                      })}
                    </FormGroup>
                  </AccordionDetails>
                ) : q.category === 'text' ? (
                  <AccordionDetails>
                    <TextField
                      id={`${q.question}-textfield`}
                      placeholder='Answer Here!'
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                      variant='outlined'
                      onChange={(e) => handleChange(q, e.target.value)}
                      style={{ textAlign: 'left' }}
                    />
                  </AccordionDetails>
                ) : (
                  ''
                )}
              </Accordion>
            </div>
          );
        })}
      </div>
      <Button className='submit-btn' type='submit' style={{ marginTop: '1em' }}>
        Save
      </Button>
    </form>
  );
};

export default Questionnaire;
