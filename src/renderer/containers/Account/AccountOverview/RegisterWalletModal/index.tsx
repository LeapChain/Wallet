import {useState} from 'react';

import {REQUIRED_FIELD_ERROR} from 'renderer/constants/form-validation';
import Modal from 'renderer/components/Modal';
import yup from 'renderer/utils/forms/yup';
import {ALPHANUMERIC} from 'renderer/utils/regex';
import {displayToast, ToastType} from 'renderer/utils/toast';
import {SFC} from 'shared/types';

import RegisterWalletModalFields, {initialValues, FormValues} from './RegisterWalletModalFields';
import RegisterWalletModalTable from './RegisterWalletModalTable';

const MINMAX = 'Must be 4 - 16 characters';
const validationSchema = yup.object().shape({
  sufficientFunds: yup.boolean().oneOf([true], 'You have insufficient coins.'),
  username: yup
    .string()
    .required(REQUIRED_FIELD_ERROR)
    .matches(ALPHANUMERIC, 'Special characters are not allowed')
    .min(4, MINMAX)
    .max(16, MINMAX),
});

export interface RegisterWalletModalProps {
  close(): void;
}

const RegisterWalletModal: SFC<RegisterWalletModalProps> = ({className, close}) => {
  const [submitting, setSubmitting] = useState<boolean>(false);

  const handleSubmit = async ({username}: FormValues): Promise<void> => {
    try {
      setSubmitting(true);
      displayToast(username, ToastType.success);
    } catch (error) {
      displayToast('An error occurred', ToastType.error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal
      className={className}
      close={close}
      header="Register Wallet"
      initialValues={initialValues}
      onSubmit={handleSubmit}
      submitButton="Register"
      submitting={submitting}
      validationSchema={validationSchema}
    >
      <RegisterWalletModalFields />
      <RegisterWalletModalTable />
    </Modal>
  );
};

export default RegisterWalletModal;
