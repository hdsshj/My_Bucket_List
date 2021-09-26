import {db} from '../../firebase';
import {collection, getDoc, doc, getDocs, addDoc, updateDoc, deleteDoc} from 'firebase/firestore'
import { async } from '@firebase/util';


// 액션 타입을 정해줍니다.
const LOAD = 'bucket/LOAD'
const CREATE = "bucket/CREATE";
const UPDATE = "bucket/UPDATE";
const LOADED = 'bucket/LOADED';
const REMOVE = "bucket/REMOVE";

// 초기 상태값을 만들어줍니다.
const initialState = {
    is_loaded:false,
    list: [],
    
};

// 액션 생성 함수예요.
// 액션을 만들어줄 함수죠!

export const loadBucket = (bucket_list) => {
    return { type: LOAD, bucket_list };
};

export const createBucket = (bucket) => {
    return { type: CREATE, bucket };
};

export const updateBucket = (bucket_index) => {
    return { type: UPDATE, bucket_index };
};

export const isLoaded = (loaded) => {
    return {type : LOADED, loaded}
}

export const removeBucket = (bucket_index) => {
    return { type: REMOVE, bucket_index };
};

//middlewares
export const loadBucketFB = () => {
    return async function(dispatch) {
        const bucket_data = await getDocs(collection(db, 'bucket'));
        

        let bucket_list = [];
        
        bucket_data.forEach((doc)=>{
            console.log(doc.data())
            bucket_list.push({id : doc.id, ...doc.data()});
        })

        console.log(bucket_list);

        dispatch(loadBucket(bucket_list))
        
    }
}

export const addBucketFB = (bucket) => {
    return async function (dispatch){
        dispatch(isLoaded(false))
        const docRef = await addDoc(collection(db,'bucket'), bucket);
        // const _bucket = await getDoc(docRef);
        const bucket_data = {id : docRef.id, ...bucket}
        // console.log((await getDoc(docRef)).data());
        console.log(bucket_data)

        dispatch(createBucket(bucket_data))

    }
}

export const updateBucketFB = (bucket_id) => {
    return async function (dispatch, getState) {
        // console.log(bucket_id)
        const docRef = doc(db, 'bucket', bucket_id)
        await updateDoc(docRef, {completed : true})

        
        const _bucket_list = getState().bucket.list;
        const bucket_index = _bucket_list.findIndex((b)=>{
            return b.id === bucket_id;
        })

        dispatch(updateBucket(bucket_index))
        console.log(bucket_index)
        
    }
}

export const removeBucketFB = (bucket_id) => {
    return async function (dispatch, getState) {
        if(!bucket_id){
            window.alert('아이디가 없네용')
            return;
        }

        dispatch(isLoaded(false))
        
        const docRef = doc(db, 'bucket', bucket_id)
        await deleteDoc(docRef)

        const _bucket_list = getState().bucket.list;
        const bucket_index = _bucket_list.findIndex((b)=>{
            return b.id === bucket_id;
        })

        
        console.log(bucket_index,'인덱스임')
        dispatch(removeBucket(bucket_index))
        
    }
}

// 리듀서예요.
// 실질적으로 store에 들어가 있는 데이터를 변경하는 곳이죠!
export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case 'bucket/LOAD' : {
            return {list : action.bucket_list, is_loaded : true};
        }
        case "bucket/CREATE": {
            const new_bucket_list = [...state.list, action.bucket];
            return {...state, list: new_bucket_list, is_loaded : true };
        }
        case 'bucket/UPDATE':{
            console.log('이제 완료 할거야!');
            console.log(state, action);
            const new_bucket_list = state.list.map((l, i)=>{
                if(parseInt(action.bucket_index) === i){
                    return {...l, completed : true};
                }else{
                    return l;
                }
            })
            console.log(new_bucket_list)
            return {...state, list : new_bucket_list};
        }  
        case 'bucket/REMOVE': {
            console.log('삭제할거야!');
            console.log(state.list);
            const new_bucket_list = state.list.filter((l, idx) => {
                return parseInt(action.bucket_index) !== idx
            });
            console.log(new_bucket_list.length);
            return {...state, list: new_bucket_list, is_loaded : true};
        }
        case 'bucket/LOADED':{
            return {...state, is_loaded : action.loaded}
        }
        default:
            return state;
    }
}