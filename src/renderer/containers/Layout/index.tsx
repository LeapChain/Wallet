import React from 'react';
import {useSelector} from 'react-redux';
import {Redirect, Route, Switch} from 'react-router-dom';

import Account from '@renderer/containers/Account';
import Bank from '@renderer/containers/Bank';
import PurchaseConfirmationServices from '@renderer/containers/PurchaseConfirmationServices';
import Validator from '@renderer/containers/Validator';

import {AccountProvider} from '@renderer/context';
import {getActiveBankConfig} from '@renderer/selectors';
import {SFC} from '@renderer/types';
import {formatPathFromNode} from '@renderer/utils/address';

import * as S from './Styles';

export const Layout: SFC = ({className}) => {
  const activeBankConfig = useSelector(getActiveBankConfig);

  return (
    <S.Container className={className}>
      <S.TopNav />
      <S.LeftMenu />
      <S.Right>
        <Switch>
          <Route path="/" exact>
            {activeBankConfig ? <Redirect to={`/bank/${formatPathFromNode(activeBankConfig)}/overview`} /> : null}
          </Route>
          <Route path="/main_window" exact>
            {activeBankConfig ? <Redirect to={`/bank/${formatPathFromNode(activeBankConfig)}/overview`} /> : null}
          </Route>
          <Route path="/account/:accountNumber/:section">
            <AccountProvider>
              <Account />
            </AccountProvider>
          </Route>
          <Route path="/bank/:protocol/:ipAddress/:port">
            <Bank />
          </Route>
          <Route path="/purchase-confirmation-services/:protocol?/:ipAddress?/:port?">
            <PurchaseConfirmationServices />
          </Route>
          <Route path="/validator/:protocol/:ipAddress/:port">
            <Validator />
          </Route>
          <Route path="/reload" />
        </Switch>
      </S.Right>
    </S.Container>
  );
};

export default Layout;
