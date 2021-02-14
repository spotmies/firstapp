import React from 'react'
import 'semantic-ui-css/semantic.min.css'
import { Card, Icon, Image,Button,Segment } from 'semantic-ui-react'
import '../rental.css';





function Rentals(){
    var count=[1,2,3,4,1,2,3,4];
    return <div>
        <div>
            <div>
            <Card.Group>     
                {count.map((nap)=>     
  <Card className="rentcard"> 
    <Image src='https://www.electrive.com/wp-content/uploads/2020/01/tata-motors-nexon-ev-indien-india-2020-04.png' wrapped ui={true} />
    <Card.Content>
      <Card.Header>Matthew</Card.Header>
      <Card.Meta>
        <span className='date'>renatls in 2015</span>
      </Card.Meta>
      <Card.Description>
        Matthew is a musician living in Nashville.
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
      <a>
        <Icon name='user' />
        22 Friends
      </a>
  
    </Card.Content>
    <Button>Click Here</Button>
  </Card>
)}


</Card.Group>
            </div>
        </div>
    </div>
}

export default Rentals