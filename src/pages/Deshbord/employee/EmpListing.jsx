import { VerifiedUser } from '@mui/icons-material';
import { number } from 'prop-types';
import React from 'react'
import "./style.css"



const EmpListing = (props) => {
    console.log(props);

    const name = props.name
    const number = props.number

    return (
        <div className="container">
            <div className="card" style={{padding: '2rem'}}>
                <div className="card-title">
                    <h3>{name}</h3>
                </div>
                <div className="cardBody" style={{display:'flex', justifyContent:'space-between', padding:'20px'}} >
                    <div className="number">
                       <h2>{number}</h2>
                    </div>
                    <div className="cardBodyIcon">
                       <VerifiedUser/>
                    </div>
                    
                </div>
            </div>
        </div>
    );
}

export default EmpListing;
