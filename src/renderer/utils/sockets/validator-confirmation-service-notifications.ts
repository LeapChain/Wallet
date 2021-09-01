import {setValidatorConfirmationServiceNotification} from '@renderer/store/notifications';
import {AppDispatch} from '@renderer/types';
import {displayToast, ToastType} from '@renderer/utils/toast';
import {generateUuid} from '@renderer/utils/local';

const handleValidatorConfirmationServiceNotifications = async (
  bankSocketAddress: string,
  dispatch: AppDispatch,
  notification: any,
): Promise<void> => {
  try {
    dispatch(
      setValidatorConfirmationServiceNotification({
        data: notification.payload,
        id: generateUuid(),
        timestamp: new Date().getTime(),
        type: notification.notification_type,
      }),
    );

    displayToast(`Your bank purchased a validator confirmation service`, ToastType.success);
  } catch (err) {
    displayToast('An error occurred', ToastType.error);
  }
};

export default handleValidatorConfirmationServiceNotifications;
