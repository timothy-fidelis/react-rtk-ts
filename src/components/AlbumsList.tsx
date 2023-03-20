import { useAddAlbumMutation, useFetchAlbumsQuery } from '../store/api/albumsApi';
import { User } from '../store/slices/usersSlice';
import Button from './Button';
import ExpandablePanel from './ExpandablePanel';
import Skeleton from './Skeleton';

type AlbumsListProps = {
  user: User;
};

const AlbumsList = ({ user }: AlbumsListProps) => {
  const { data, error, isLoading, isFetching } = useFetchAlbumsQuery(user);
  const [addAlbum, results] = useAddAlbumMutation();
  let content;

  const handleAddAlbum = () => {
    addAlbum(user);
  };

  if (isLoading || isFetching) {
    content = <Skeleton className="h-10 w-full" times={3} />;
  } else if (error) {
    content = <div>Error loading albums.</div>;
  } else {
    content = data?.map((album) => {
      const header = <div>{album.title}</div>;

      return (
        <ExpandablePanel key={album.id} header={header}>
          {album.title}
        </ExpandablePanel>
      );
    });
  }

  return (
    <div>
      <div className="flex flex-row justify-between items-center m-2">
        <h3 className="text-lg font-bold">Albums for {user.name}</h3>
        <Button loading={results.isLoading} onClick={handleAddAlbum}>
          + Add Album
        </Button>
      </div>
      <div>{content}</div>
    </div>
  );
};

export default AlbumsList;
