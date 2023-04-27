import React, { useState } from "react";
import persons from "remote/persons";
import PersonCard from "./PersonCard";
import { Card, Input } from "semantic-ui-react";

const PersonFilter = () => {
    const [filterValue,setFilterValue] = useState("");
return(
    <>
    <Input placeholder="Search by name" value={filterValue} onChange={(e)=> setFilterValue(e.target.value)}/>
    <Card.Group>
    {
  persons
    .filter(({name}) => name.toLowerCase().indexOf(filterValue.toLowerCase()) > -1)
    .map(person => (
        <PersonCard {...person}/>
    ))
}
    </Card.Group>
    </>
)
};
export default PersonFilter;