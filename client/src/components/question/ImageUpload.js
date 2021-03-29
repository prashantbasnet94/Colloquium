import React,{useEffect,useState} from "react";
import {useDispatch,useSelector} from "react-redux";
import {Button} from "@material-ui/core";
import {clearPreviousSavedImageUrl,uploadImage} from "../../actions/imageUpload";

export const ImageUpload = (props) => {
    const dispatch = useDispatch();
    const [images, setImages] =useState(null);
    const [imageUrls, setImageUrls] =useState([]);

    //triggers onInputChange
    const handleChanges = ( e ) => {
        //checks if files is selected
        let imageArray  = [];
        if (e.target.files[0]) {

            //local array stores files



            setImages(e.target.files[0])

            console.log(images)

        }
    }

    //executes when upload is pressed
    const handleUpload = ( e  ) => {
        e.preventDefault ();
        dispatch(clearPreviousSavedImageUrl())
        setUploadClicked ( true )
        if (images != null ) {
            //calls firebase to store images
            dispatch ( uploadImage ( images ) )
        }
    }

    const [uploadClicked , setUploadClicked] = useState ( false )
    let imageUpload = useSelector ( ( state ) => state.imageUpload.imageUpload )
    useEffect ( () => {
        if (imageUpload) {
            //remove the the progress bar once images is uploaded
            setUploadClicked ( false )
        }


    } , [imageUpload] )

    return (
        <form>
            <div>
                <div>

                    <div>
                        <div>
                            <div> Upload pictures</div>
                            <input
                                accept="image/*"
                                type="file"
                                onChange={ ( e  ) => {
                                    handleChanges ( e )
                                }
                                }
                                multiple
                                    ={ true }
                            />
                        </div>
                    </div>
                </div>
                <div>
                    { imageUrls.length > 0 ? (
                        imageUrls.map ( ( item ) => {
                            return (
                                <div>
                                    <img src={ item }/>
                                </div>
                            )
                        } )
                    ) : '' }
                </div>
                <div>
                    {/*execute the progress bar once the user clicks update*/ }
                    { uploadClicked ? (
                        <d type="indeterminate">Image upload on progress</d>
                    ) : ('') }
                    <Button
                        color="tertiary" shape="round" expand="full"
                        onClick={ ( e  ) => {
                            handleUpload ( e )
                        } }
                    >
                        Upload
                    </Button>
                </div>
            </div>
        </form>
    )
}
