import {useMemo, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';

import {connectAndStoreLocalData} from 'renderer/dispatchers/app';
import Modal from 'renderer/components/Modal';
import {formatPathFromNode} from 'renderer/utils/address';
import {getIpAddressField, getNicknameField, getPortField, getProtocolField} from 'renderer/utils/forms/fields';
import yup from 'renderer/utils/forms/yup';
import {displayErrorToast, displayToast, ToastType} from 'renderer/utils/toast';
import {getManagedBanks} from 'renderer/selectors';
import {AppDispatch, ProtocolType, SFC} from 'shared/types';

import ChangeActiveBankModalFields from './ChangeActiveBankModalFields';

const initialValues = {
  form: '',
  ipAddress: '',
  nickname: '',
  port: '80',
  protocol: 'http' as ProtocolType,
};

type FormValues = typeof initialValues;

export interface ChangeActiveBankModalProps {
  close(): void;
}

const ChangeActiveBankModal: SFC<ChangeActiveBankModalProps> = ({className, close}) => {
  const [submitting, setSubmitting] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const history = useHistory();
  const managedBanks = useSelector(getManagedBanks);

  const handleSubmit = async ({ipAddress, nickname, port, protocol}: FormValues): Promise<void> => {
    try {
      setSubmitting(true);
      const bankAddressData = {
        ip_address: ipAddress,
        port: parseInt(port, 10),
        protocol,
      };
      const response = await dispatch(connectAndStoreLocalData(bankAddressData, nickname));
      if (response?.error) {
        displayErrorToast(response.error);
        setSubmitting(false);
        return;
      }
      if (response?.bankConfig) {
        history.push(`/bank/${formatPathFromNode(response.bankConfig)}/overview`);
      }
      close();
    } catch (error) {
      displayToast('An error occurred', ToastType.error);
      setSubmitting(false);
    }
  };

  const validationSchema = useMemo(
    () =>
      yup.object().shape({
        // form: getAddressFormField(managedBanks, 'This address is already a managed bank'),
        ipAddress: getIpAddressField(),
        nickname: getNicknameField(managedBanks),
        port: getPortField(),
        protocol: getProtocolField(),
      }),
    [managedBanks],
  );

  return (
    <Modal
      className={className}
      close={close}
      header="Change Active Bank"
      initialValues={initialValues}
      onSubmit={handleSubmit}
      submitButton="Connect"
      submitting={submitting}
      validationSchema={validationSchema}
    >
      <ChangeActiveBankModalFields />
    </Modal>
  );
};

export default ChangeActiveBankModal;
