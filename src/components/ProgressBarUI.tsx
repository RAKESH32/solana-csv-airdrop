import React from 'react'
import StepProgressBar from 'react-step-progress';
import 'react-step-progress/dist/index.css';

export const ProgressBarUI = () => {

    const step1Content = <p></p>;
    const step2Content = <p></p>;
    const step3Content = <p></p>;

    function step2Validator() {
return false;      }
      
      function step3Validator() {
        // return a boolean
      }
      
      function onFormSubmit() {
        // handle the submit logic here
        // This function will be executed at the last step
        // when the submit button (next button in the previous steps) is pressed
      }
      


    return (
        <div>
            <StepProgressBar
  startingStep={0}
  onSubmit={onFormSubmit}
  buttonWrapperClass={"_rai"}
  steps={[
    {
      label: 'Date',
      name: 'ate',
      content: step1Content
    },
    {
      label: 'Step 2',
      name: 'step 2',
      content: step2Content,
      validator: step2Validator
    },
    {
      label: 'Step 3',
      name: 'step 3',
      content: step3Content
    }
  ]}
/>
        </div>
    )
}
