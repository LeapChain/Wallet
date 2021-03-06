import {useCallback} from 'react';
import {getFailChannel, getSuccessChannel, IpcChannel} from 'shared/ipc';
import {GenericVoidFunction} from 'shared/types';
import {useIpcEffect} from './utils';

function useReadIpc({
  channel,
  failCallback,
  successCallback,
}: {
  channel: IpcChannel;
  failCallback?: GenericVoidFunction;
  successCallback?: GenericVoidFunction;
}) {
  useIpcEffect(getSuccessChannel(channel), successCallback);
  useIpcEffect(getFailChannel(channel), failCallback);

  return useCallback(() => window.electron.ipcRenderer.send(channel), [channel]);
}

export default useReadIpc;
