import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import '../src/styles/App.scss'; //SASS stylesheet
import Amplify from "aws-amplify"
import config from "./aws-exports"

Amplify.configure(config)
// Auth: {
//   mandatorySignId: false,
//   region: config.aws_cognito_region,
//   UserPoolId: config.aws_user_pools_id,
//   userPoolWebClient: config.aws_user_pools_web_client_id,
//   identityPoolId: config.aws_cognito_identity_pool_id
//   // clentId: config.aws_user_pools_web_client_id

// }


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
