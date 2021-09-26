import React from "react";
import styled,{keyframes}from "styled-components";
import {useSelector} from 'react-redux'

const Progress = (props) => {
    const bucket_list = useSelector((state)=>state.bucket.list)
    console.log(bucket_list)

    let count = 0
    bucket_list.map((l, idx)=>{
        if (l.completed === true){
            count ++;
        }
    })

    console.log(count)
    return (
        <ProgressBar>
            <HighLight width = {(count/bucket_list.length)*100+'%'}/>
                <Item/>
            
        </ProgressBar>
        
    );
};

const ProgressBar = styled.div`
    background-color: #eee;
    width: 90%;
    height: 25px;
    border-radius: 30px;
    display: flex;
    align-items: center;
    margin: auto;
`;

const HighLight = styled.div`
background-color: #3864FF;
    transition: 1.5s;
    width: ${(props)=>props.width};
    height: 25px;
    border-radius: 30px;
`;

const Item = styled.div`
    width: 30px;
    height: 30px;
    background-color: #FFF;
    border: 5px solid #3864FF;
    border-radius: 30px;
    margin: 0px 0px 0px -20px;
`;

export default Progress;

