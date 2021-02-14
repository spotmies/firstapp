import React from 'react'
import 'semantic-ui-css/semantic.min.css'
import { Card, Icon, Image,Button,Segment } from 'semantic-ui-react'
import '../rental.css';
import {SiCoronaengine} from 'react-icons/si'
import {BsFillGearFill} from 'react-icons/bs'



function Rentals(){
  var num=100_00;
  console.log(num)
    var count=[1,2,3,4,1,2,3,4];
    return <div>
        <div>
            <div style={{padding:"10px",marginLeft:"auto",marginRight:"auto"}}>
            <Card.Group>     
                {count.map((nap)=>     
  <Card className="rentcard"> 
    <Image src='https://www.electrive.com/wp-content/uploads/2020/01/tata-motors-nexon-ev-indien-india-2020-04.png' wrapped ui={true} />
    <Card.Content>
      <Card.Header style={{textAlign:"center"}}>Nexon</Card.Header>

      <Card.Description>
     <b> &#8377; 1000/Day</b>
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
      <div style={{display:"inline-flex"}}>
      <p ><a>
        <BsFillGearFill />
        &nbsp; automatic 
        </a></p>
        <p style={{marginLeft:"25px"}}><a>
        <SiCoronaengine />
        &nbsp; petrol 
                  </a></p>
                  <p style={{marginLeft:"25px"}}> <a>
        <Icon name='wheelchair' />
        5 seat
       
      </a></p>
      </div>
    </Card.Content>
    <Button>Book now</Button>
  </Card>
)}


</Card.Group>
            </div>
        </div>
    </div>
}

export default Rentals