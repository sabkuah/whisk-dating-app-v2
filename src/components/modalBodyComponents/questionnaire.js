import React, { useState, useEffect } from 'react';
import { API } from 'aws-amplify';
import {
    Button, TextField, Accordion, AccordionSummary, FormControlLabel, FormGroup, Radio, RadioGroup, Checkbox, AccordionDetails,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const Questionnaire = () => {
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);

    const handleChange = (event) => {
        console.log(event.target.value);
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
            setQuestions(response)
        })();
    }, [])


    return (
        <div>
            <form>
                {
                    questions.map((x, i) => {
                        //Need to add question id and answer into object
                        return (
                            <div>
                                <Accordion>
                                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                        <h2 key={i}>{i + 1 + ". "}{x.question}</h2>
                                    </AccordionSummary>
                                    {x.answers.map((j, p) => {

                                        if (x.category === "radio") {
                                            return (
                                                <AccordionDetails>
                                                    <FormGroup style={{ flexDirection: "row" }}>
                                                        <FormControlLabel key={p}
                                                            value={j}
                                                            control={<Radio />}
                                                            label={j}
                                                            onChange={handleChange} />
                                                    </FormGroup>
                                                </AccordionDetails>
                                            )
                                        } else if (x.category === "multiple choice") {
                                            return (
                                                <AccordionDetails>
                                                    <FormGroup row>
                                                        <FormControlLabel key={p} value={j} control={<Checkbox />} label={j} />
                                                    </FormGroup>
                                                </AccordionDetails>
                                            )

                                        } else if (x.category === "text") {
                                            return (
                                                <AccordionDetails>
                                                    <TextField id="outlined-full-width"

                                                        style={{ margin: 8 }}
                                                        placeholder="Answer Here!"
                                                        fullWidth
                                                        margin="normal"
                                                        InputLabelProps={{
                                                            shrink: true,
                                                        }}
                                                        variant="outlined" />
                                                    {/* <FormControlLabel key={p} value={j} control={<Checkbox />} label={j} /> */}

                                                </AccordionDetails>
                                            )

                                        }


                                    })}
                                </Accordion>
                            </div>
                        )
                    })
                }
                <Button className='submit-btn' type='submit'>
                    Save
        </Button>
            </form>
        </div>
    )
}

export default Questionnaire


