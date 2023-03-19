import { useFetchAlbumsQuery } from '../store/api/albumsApi';
import { User } from '../store/slices/usersSlice';
import ExpandablePanel from './ExpandablePanel';
import Skeleton from './Skeleton';

type AlbumsListProps = {
  user: User;
};

const AlbumsList = ({ user }: AlbumsListProps) => {
  const { data, error, isLoading } = useFetchAlbumsQuery(user);
  let content;

  if (isLoading) {
    content = <Skeleton times={3} />;
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

  if (isLoading) {
    return;
  }

  if (error) {
    return;
  }

  return (
    <div>
      Albums for {user.name}
      {content}
    </div>
  );
};

export default AlbumsList;
