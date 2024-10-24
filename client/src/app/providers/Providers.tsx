import { Theme, ThemeProvider } from '@emotion/react';
import { ConfigProvider } from 'antd';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n';
import { theme } from '@/shared/styles';
import { antdTheme } from '../styles';
import NotificationProvider from './NotificationProvider';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from '@/shared/libs/apollo';
import { ErrorHandler } from '@/shared/ui/Commons/ErrorHandler';

interface ProvidersProps {
  readonly children: JSX.Element;
}

export const Providers = ({ children }: ProvidersProps) => {
  return (
    <ApolloProvider client={apolloClient}>
      <I18nextProvider i18n={i18n}>
        <ThemeProvider theme={theme as Theme}>
          <ConfigProvider theme={antdTheme}>
            <BrowserRouter>
              <NotificationProvider>
                <ErrorHandler />
                {children}
              </NotificationProvider>
            </BrowserRouter>
          </ConfigProvider>
        </ThemeProvider>
      </I18nextProvider>
    </ApolloProvider>
  );
};
