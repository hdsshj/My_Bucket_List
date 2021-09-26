//Detail.js
// 리액트 패키지를 불러옵니다.
import React from "react";
// 라우터 훅을 불러옵니다.
import { useParams, useHistory } from "react-router-dom";
// redux hook을 불러옵니다.
import { useSelector, useDispatch } from "react-redux";
import { removeBucket, removeBucketFB, updateBucket, updateBucketFB } from './redux/modules/bucket';

import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';



const Detail = (props) => {
    // 스토어에서 상태값 가져오기
    const bucket_list = useSelector((state) => state.bucket.list);
    
    //
    const dispatch = useDispatch();
    // url 파라미터에서 인덱스 가져오기
    const params = useParams();
    const history = useHistory();
    const bucket_index = params.index;

    const remove = () => {
        // dispatch(removeBucket(bucket_index));
        
        dispatch(removeBucketFB(bucket_list[bucket_index].id));
        history.push('/')
    };

    

    return (
        <div>
            <h1>{bucket_list[bucket_index] ? bucket_list[bucket_index].text : ''}</h1>
            <Button style = {{margin : '10px'}} variant="contained" color='primary' onClick = {()=>{
                // dispatch(updateBucket(bucket_index))
                dispatch(updateBucketFB(bucket_list[bucket_index].id))
                history.push('/')
            }}>완료하기</Button>
            <Button style = {{margin : '10px'}} variant="contained" onClick={remove}>삭제</Button>
        </div>
    );
};



export default Detail;