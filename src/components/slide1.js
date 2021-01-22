import '../App.css';
import repair from '../images/repair.svg';
import {Dropdown,InputGroup,FormControl,DropdownButton} from 'react-bootstrap';

function slide(){
    return <div className="slide1">
        <img  src={repair} alt="logo" width="900" height="500"/>
     <div className="areabg">   
    <DropdownButton
    className="getlocation"
      variant="outline-primary"
      title="Select your location                  "
      id="input-group-dropdown-2"
    >
      <Dropdown.Item href="#rs">Seethammadhara</Dropdown.Item>

    </DropdownButton>
    </div>
    </div>
    
}
export default slide;