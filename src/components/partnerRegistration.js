import React from 'react'
import { Button, Checkbox, Form } from 'semantic-ui-react'

function PartnerRegistration() {
    return (
        <div>
           <Form style={{width: "80%", margin: "0 auto"}}>
             <Form.Field>
               <label>First Name</label>
               <input placeholder='First Name' />
             </Form.Field>
             <Form.Field>
               <label>Email address</label>
               <input placeholder='Last Name' />
             </Form.Field>
             <Form.Field>
               <label>Profile picture</label>
               <input type="file" />
             </Form.Field>
             <Form.Field>
               <label>Profession</label>
               <input placeholder='Last Name' />
             </Form.Field>
             <Form.Field>
               <label>Experience</label>
               <input placeholder='Last Name' />
             </Form.Field>
             <Form.Group widths='equal'>
                <Form.Input type="file" fluid label='Aadhaar front' placeholder='Front' />
                <Form.Input type="file" fluid label='Aadhaar back' placeholder='back' />
             </Form.Group>   
             <Form.Field>
               <Checkbox label='I agree to the Terms and Conditions' />
             </Form.Field>
               <Button type='submit'>Submit</Button>
           </Form>
        </div>
    )
}

export default PartnerRegistration
