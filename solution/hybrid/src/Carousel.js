import React,{useEffect, useState} from "react";
import "semantic-ui-css/semantic.min.css";
import {Card } from "semantic-ui-react";
import PersonCard from "./PersonCard"
import persons from "remote/persons";

const Carousel =() => {
    const [personData, setPersonData] = useState([]);
    useEffect(()=>{
    persons && setPersonData(persons);
    },[]);
    return( 
    <Card.Group>
        { personData?.map((person,p)=>
        <PersonCard {...person} key={p}/>
        )}
        </Card.Group>
    )
}

export default Carousel;