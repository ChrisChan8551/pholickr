import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
// import { getAllAlbums, deleteAAlbum, selectMyAlbums } from "../../../store/album";
import { getAllAlbums } from "../../store/album";
// import GridLayout from "../../GridLayout";
// import { AddAlbumningControls } from "../../AlbumterestLayout";

function AlbumPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const albums = Object.values(useSelector((state) => state.album))
  // const albums = useSelector((state) => state.album)
  // const album = Object.values(albums)
  console.log('****************ALBUMS***************',albums)
  // console.log('****************ALBUMS***************',album)


//   const albums = useSelector(selectMyAlbums);

  useEffect(() => {
    dispatch(getAllAlbums());
  }, [dispatch]);

//   if (!albums) {
//     return null;
//   }

//   const navigateToCreateAlbumForm = async (e) => {
//     history.push("/albumform");
//   };

//   const navigateToAlbumPage = (album) => {
//     history.push(`/albums/${album.id}`);
//   };

  return (
    <div>
      <div>
        <h1>ALBUMS I'VE CREATED</h1>
        {
            albums && albums.map((album) => {
                return (
                    <div key = {album.id}>
                      <div>
                         <img src={album.imageUrl}/>
                      </div>
                    </div>
                )
            })
        }
      </div>
    </div>
  );
}

export default AlbumPage;
