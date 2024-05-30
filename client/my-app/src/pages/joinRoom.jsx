import React from "react";
import { useNavigate } from "react-router-dom";
import {Navigation2} from '../components/navigation2';


export const JoinRoom = ()=>{

    const navigate = useNavigate();

    return(
        <div>
           <Navigation2/>

        </div>
    )
}