/**
 * @Author: Ali
 * @Date:   2019-10-04T10:06:53+02:00
 * @Last modified by:   Ali
 * @Last modified time: 2019-10-04T11:31:51+02:00
 */

import React from 'react';
import { BrowserRouter as Router , Route} from 'react-router-dom'
import Join from './components/Join/Join'
import Chat from './components/Chat/Chat'

const  App = () => (
  <Router>
    <Route path='/' exact component={Join} />
    <Route path='/chat' component={Chat} />
  </Router>
)

export default App;
