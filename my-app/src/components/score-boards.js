
import {Card,Button} from 'react-bootstrap'


export const ScoreBoard = ({score}) => {
    
    return(

    <div>
        

        <Card
       
        style={{
            backgroundColor:"rgb(250, 168, 182)",
            width: '18rem' }}
            text="white"
            >

 
      <Card.Body
      >
        <Card.Title >Livesafers Crush</Card.Title>
        <Card.Text>
        {score}
        </Card.Text>
        <Button variant="danger">Save</Button>
      </Card.Body>
    </Card>
    </div>
    )
}

export default ScoreBoard
