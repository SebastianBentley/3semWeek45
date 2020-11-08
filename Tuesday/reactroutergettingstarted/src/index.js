import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
import App from './App2Nested'

const info = [
  {id: "rendering", title:"Rendering with React",info:"INFO 1"},
  {id: "components", title:"components",info:"INFO 2"},
  {id: "props-v-state", title:"Props v. State",info:"INFO 3"},
  {id: "react-routing", title:"Routing with react Router",info:"INFO 4"}
]


ReactDOM.render(
  <React.StrictMode>
    <App info={info}/>
  </React.StrictMode>,
  document.getElementById('root')
);

