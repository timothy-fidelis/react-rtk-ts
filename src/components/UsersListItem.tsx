import { GoTrashcan } from 'react-icons/go';

import { useThunk } from '../hooks/use-thunk';
import { User } from '../store/slices/usersSlice';
import { removeUser } from '../store/thunks/usersThunk';
import AlbumsList from './AlbumsList';
import Button from './Button';
import ExpandablePanel from './ExpandablePanel';

type UsersListItemProps = {
  user: User;
};

const UsersListItem = ({ user }: UsersListItemProps) => {
  const [doRemoveUser, isLoading, error] = useThunk(removeUser);

  const handleClick = () => {
    doRemoveUser(user);
  };

  const header = (
    <>
      <Button className="mr-3" loading={isLoading} onClick={handleClick}>
        <GoTrashcan />
      </Button>
      {error && <div>Error deleting user.</div>}
      {user.name}
    </>
  );

  return (
    <ExpandablePanel header={header}>
      <AlbumsList user={user} />
    </ExpandablePanel>
  );
};

export default UsersListItem;
