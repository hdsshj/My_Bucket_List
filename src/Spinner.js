import React from "react";
import styled from "styled-components";
import {HourglassFull} from '@material-ui/icons'


const Spinner = (props) => {
    return (
        <Outter>
            <HourglassFull style = {{
                color: '#3864ff',
                fontSize : '150px'
            }}/>
        </Outter>
    );
};

const Outter= styled.div`
    background-color: #8ab6ff;
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left:0;
    display: flex;
    align-items: center;
    justify-content: center;
`

export default Spinner;