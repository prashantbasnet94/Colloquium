let initial = {
    url:[],
    error:null,
    imageUpload:false
}
export default function (state=initial,action){
    switch (action.type) {
        case 'UPLOAD_IMAGE':
            let tempUrl = state.url;

            tempUrl.push(action.payload)

            state = {
                ...state,
                url:tempUrl,
                imageUpload:true
            }
            return state
        case 'FIREBASE_ERROR':
            state={
                ...state,
                error:'Problem uploading images retry !'
            }
            return state;
        case 'SET_IMAGE_UPLOAD_TRACKER_TO_DEFAULT':
            if(action.payload){
                state={
                    ...state,
                    imageUpload:false
                }
            }
            return state;
        case 'REMOVE_PREVIOUS_IMAGE_URLS':
            state={
                ...state,
                url:[]
            }
            return state;
        default:
            return state;
    }

}
