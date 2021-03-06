import {useMemo} from 'react';
import DropdownMenuButton, {DropdownMenuDirection, DropdownMenuOption} from 'renderer/components/DropdownMenuButton';
import AddFriendModal from 'renderer/containers/AddFriendModal';
import {useAccountContext, useToggle} from 'renderer/hooks';
import {AccountType, SFC} from 'shared/types';

import DeleteAccountModal from './DeleteAccountModal';
import DeleteFriendModal from './DeleteFriendModal';
import EditAccountNicknameModal from './EditAccountNicknameModal';

const AccountHeaderDropdownContainer: SFC = ({className}) => {
  const {accountNumber, type} = useAccountContext();
  const [addFriendModalIsOpen, toggleAddFriendModal] = useToggle(false);
  const [deleteAccountModalIsOpen, toggleDeleteAccountModal] = useToggle(false);
  const [deleteFriendModalIsOpen, toggleDeleteFriendModal] = useToggle(false);
  const [editModalIsOpen, toggleEditModal] = useToggle(false);

  const options = useMemo<DropdownMenuOption[]>(() => {
    const editMenuOption: DropdownMenuOption = {
      label: 'Edit Nickname',
      onClick: toggleEditModal,
    };

    if (type === AccountType.managedAccount) {
      return [
        editMenuOption,
        {
          label: 'Delete Account',
          onClick: toggleDeleteAccountModal,
        },
      ];
    }

    if (type === AccountType.managedFriend) {
      return [
        editMenuOption,
        {
          label: 'Remove Friend',
          onClick: toggleDeleteFriendModal,
        },
      ];
    }

    return [
      {
        label: 'Add as Friend',
        onClick: toggleAddFriendModal,
      },
    ];
  }, [toggleAddFriendModal, toggleDeleteAccountModal, toggleDeleteFriendModal, toggleEditModal, type]);

  return (
    <>
      <DropdownMenuButton className={className} direction={DropdownMenuDirection.left} options={options} />
      {addFriendModalIsOpen ? <AddFriendModal accountNumberToAdd={accountNumber} close={toggleAddFriendModal} /> : null}
      {deleteAccountModalIsOpen ? <DeleteAccountModal close={toggleDeleteAccountModal} /> : null}
      {deleteFriendModalIsOpen ? <DeleteFriendModal close={toggleDeleteFriendModal} /> : null}
      {editModalIsOpen ? <EditAccountNicknameModal close={toggleEditModal} /> : null}
    </>
  );
};

export default AccountHeaderDropdownContainer;
