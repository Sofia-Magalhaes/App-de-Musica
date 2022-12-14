/* eslint-disable */
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { DetailsHeader, Error, Loader, RelatedSongs } from '../components';


import { useGetArtistDetailsQuery } from '../redux/services/shazamCore';



const ArtistDetails = () => {
  const { id: artistid } = useParams();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data: artistData, isFetching: isFetchingArtistDetails, error } = useGetArtistDetailsQuery(artistid);

  if (isFetchingArtistDetails) return <Loader title="Carregando detalhes do artista" />;

  if (error) return <Error />;


  return (
    <div className='flex flex-col'>
      <DetailsHeader
        artistid={artistid}
        artistData={artistData}
      />

      <RelatedSongs
        data={Object.values(artistData?.songs)}
        artistid={artistid}
        isPlaying={isPlaying}
        activeSong={activeSong}
      />
    </div>
  );
};

export default ArtistDetails;
