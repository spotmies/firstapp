import React, { Component } from 'react'
import pic from '../images/logo192.png'
 
class App extends Component {
  render() {
    
 
    return (
        <div>
            <div style={{
               display:"flex",
               justifyContent:"space-around",
               
              
           }}>
                <div>
                <img style={{width:"160px",height:"160px",borderRadius:"80px"}}
                   src={pic}
                   />
                   <h4>sekhar javvadi</h4>
                </div>
            </div>
        </div>
    )
  }
}
 
export default App