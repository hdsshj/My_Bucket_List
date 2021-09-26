import React from "react";
import {useHistory} from 'react-router-dom';
const NotFound = (props) => {
    const history = useHistory();
    const Back = ()=>{
        history.push('/');
    };
    return (
        <>
            <h1>주소가 올바르지 않아요!</h1>
            
            <button onClick = {Back}>홈으로 돌아가기</button>
            
        </>
    );
};

export default NotFound;