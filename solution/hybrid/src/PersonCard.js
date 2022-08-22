import React from "react";
import {Card, Image } from "semantic-ui-react";
const PersonCard = ({image,name,age,profession})=>{
    return (<Card>
        <Card.Content>
          <Image
            floated='right'
            size='mini'
            src={image}
          />
          <Card.Header>{name}</Card.Header>
          <Card.Meta>Age: {age}</Card.Meta>
          <Card.Description>
            Profession: {profession}
          </Card.Description>
        </Card.Content>
      </Card>)
}

export default PersonCard;