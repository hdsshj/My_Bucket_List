import React from "react";
import styled from "styled-components";
import { Route, Switch } from "react-router-dom";
// useDispatch를 가져와요!
import { useDispatch, useSelector } from "react-redux";
// 액션생성함수도 가져오고요!
import { createBucket, loadBucketFB, addBucketFB } from "./redux/modules/bucket";
import './App.css'

import {db} from './firebase'
import {collection, getDoc, doc, getDocs, addDoc, updateDoc, deleteDoc} from 'firebase/firestore'


import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';


// BucketList 컴포넌트를 import 해옵니다.
// import [컴포넌트 명] from [컴포넌트가 있는 파일경로];
import Progress from "./progress";
import BucketList from "./BucketList";
import Detail from "./Detail";
import NotFound from "./NotFound";
import Spinner from "./Spinner";

function App() {

    const text = React.useRef(null);
    // useHistory 사용하는 것과 비슷하죠? :)
    const dispatch = useDispatch();
    const is_loaded = useSelector((state)=>state.bucket.is_loaded)

    React.useEffect(() => {
        dispatch(loadBucketFB());        
        
 
    },[]);

    const addBucketList = () => {
        // 스프레드 문법! 기억하고 계신가요? :)
        // 원본 배열 list에 새로운 요소를 추가해주었습니다.
        // 여긴 이제 주석처리!
        // setList([...list, text.current.value]);

        // dispatch(createBucket({ text: text.current.value, compelted: false }));
        dispatch(addBucketFB({text: text.current.value, compelted: false}))
    };



    return (
        <Wrap  className="App">
            <Container>
                <Title>내 버킷리스트</Title>
                <Progress />
                <Line />
               
                {/* 컴포넌트를 넣어줍니다. */}
                {/* <컴포넌트 명 [props 명]={넘겨줄 것(리스트, 문자열, 숫자, ...)}/> */}
                <Switch>                    
                    <Route exact path="/" component={BucketList} />                    
                    <Route exact path="/detail/:index" component={Detail} />
                    <Route component={NotFound} />
                </Switch>
                
            </Container>
            {/* 인풋박스와 추가하기 버튼을 넣어줬어요. */}
            <Input>
                <input id = 'addBucketInput' type="text" ref={text} />
                <button id = 'addBucketBtn' onClick={addBucketList}>추가하기</button>
            </Input>
            {!is_loaded && <Spinner/>}
            
        </Wrap>
        
    );
}

const Wrap = styled.div`
position: fixed; 
  top: 0; 
  left: 0; 
  background-color: #3864FF;
    
  /* Preserve aspet ratio */
  min-width: 100%;
  min-height: 100%;
  

  font-family: 'Jua', cursive;
`;

const Container = styled.div`
min-width: 288px;
max-width: 500px;
min-height: 600px;
max-height: 600px;
background-color: #fff;
padding: 16px;
margin: 20px auto;
border-radius: 5px;
border: 1px solid #ddd;
`;

const Title = styled.h1`
color: #3864FF;
text-align: center;
`;

const Line = styled.hr`
margin: 16px 0px;
border: 1px dotted #ddd;
`;

// const ContentsBox = styled.div`
// /* background-color: #ddd; */
// max-height: 345px;
// overflow-y: scroll;
// `;

const Input = styled.div`
min-width: 288px;
max-width: 500px;
min-height: 10vh;
background-color: #fff;
padding: 16px;
margin: 20px auto;
border-radius: 5px;
border: 1px solid #ddd;
display: flex;
flex-direction: column;


#addBucketInput {
    width: 50%;
    height: 30px;
    margin: 10px auto;
    border-color: #3864FF;
    border-radius: 30px;
    padding: 0px 30px;
    font-family: 'Jua', cursive;
    
    
    &:focus{
        box-shadow: 0 1px 1px #3864FF inset, 0 0 8px #3864FF;
        /* border : 2px solid #3864FF; */
        border-radius: 20px;
        outline: none;
    }
}

#addBucketBtn {
    width: 100px;
    height: 40px;
    background-color: #3864FF;
    color: #FFF;
    
    padding: 5px;
    margin: 10px auto;
    border : 2px solid #3864FF;
    border-radius: 20px;
    font-family: 'Jua', cursive;
    &:hover{
        background-color: #FFF;
        color: #3864FF;
    }
}

`;

export default App;