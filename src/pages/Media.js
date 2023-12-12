import { useEffect, useState } from "react"
import { NavBar } from "../components/NavBar"
import ReactStars from "react-rating-stars-component";
import { Outlet, useNavigate } from "react-router-dom";
import { Navbar } from "react-bootstrap";

export const Media = () => {

    
    return (
        <>

{/* find a way to initialize the outlet on first render */}

    <Outlet/>
        
     
            </>
       
    )
   
    };

   
