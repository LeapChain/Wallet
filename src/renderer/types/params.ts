import {ProtocolType} from '@renderer/types/network';

export interface AccountNumberParams {
  accountNumber: string;
}

export interface AddressParams {
  ipAddress: string;
  port: string;
  protocol: ProtocolType;
}

export enum AccountSection {
  overview = 'overview',
  transaction = 'transaction',
}

export type SectionParams<T> = {
  section: T;
};
