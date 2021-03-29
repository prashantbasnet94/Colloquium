import {
    FIREBASE_ERROR ,
    REMOVE_ITEM ,
    REMOVE_PREVIOUS_IMAGE_URLS ,
    SET_IMAGE_UPLOAD_TRACKER_TO_DEFAULT ,
    UPLOAD_IMAGE
} from "./types";
import {storage} from '../firebase/index';

const short = require ( 'short-uuid' );

export let progressUpdate=0;
export const uploadImage=(image)=>{

    try{
        //takes extension from real file,  & concat it with random id
        let str = image.name;
        let extArray = str.split ( "." );
        let ext = extArray[extArray.length - 1];
        //following image name is prepared
        let imageName = short.generate () + '.' + ext;

        //following is firebase function
        const uploadTask = storage.ref ( `colloquial/${ imageName }` ).put ( image );


        return (dispatch)=>{
            uploadTask.on ( 'state_changed' ,
                ( snapshot ) => {

                    progressUpdate = (snapshot.bytesTransferred / snapshot.totalBytes);

                    console.log('Upload is ' + progressUpdate + '% done');
                    console.log(snapshot)
                    //progress func
                } ,
                ( error ) => {
                    //error func
                    console.log ( error )
                } ,
                () => {
                    // complete func
                    //@ts-ignore

                    storage.ref ( 'images' ).child ( imageName ).getDownloadURL ()
                        .then ( ( url ) => {
                            if(url){
                                dispatch ( {
                                    type : UPLOAD_IMAGE ,
                                    payload : url
                                } )
                            }else{
                                dispatch({
                                    type:FIREBASE_ERROR,

                                })
                            }

                        } )
                } )
        }
    }catch ( e ) {

    }


}

export const setImageUploadProgressTrackerToDefault =()=>{
    return(dispatch)=>{
        dispatch({
            type:SET_IMAGE_UPLOAD_TRACKER_TO_DEFAULT,
            payload:true
        })
    }
}
export const clearPreviousSavedImageUrl =()=>{
    return(dispatch)=>{
        dispatch({
            type:REMOVE_PREVIOUS_IMAGE_URLS,
            payload:true
        })
    }
}
