import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
// import { getAllPhotos, deleteAPhoto, selectMyPhotos } from "../../../store/photo";
import { getAllPhotos } from "../../store/photo";
// import GridLayout from "../../GridLayout";
// import { AddPhotoningControls } from "../../PhototerestLayout";

function PhotoPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const photos = Object.values(useSelector((state) => state.photo))
  // const photos = useSelector((state) => state.photo)
  // const photo = Object.values(photos)
  console.log('****************PHOTOS***************',photos)
  // console.log('****************PHOTOS***************',photo)


//   const photos = useSelector(selectMyPhotos);

  useEffect(() => {
    dispatch(getAllPhotos());
  }, [dispatch]);

//   if (!photos) {
//     return null;
//   }

//   const navigateToCreatePhotoForm = async (e) => {
//     history.push("/photoform");
//   };

//   const navigateToPhotoPage = (photo) => {
//     history.push(`/photos/${photo.id}`);
//   };

  return (
    <div>
      <div>
        <h1>PHOTOS I'VE CREATED</h1>
        {
            photos && photos.map((photo) => {
                return (
                    <div key = {photo.id}>
                      <div>
                         <img src={photo.imageUrl}/>
                      </div>
                    </div>
                )
            })
        }
      </div>
    </div>
  );
}

export default PhotoPage;
