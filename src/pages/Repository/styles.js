import styled from 'styled-components/native';
import { ActivityIndicator } from 'react-native';
import WebView from 'react-native-webview';

export const Browser = styled(WebView).attrs({
  startInLoadingState: true,
})`
  flex: 1;
  align-items: center;
  align-content: center;
  justify-content: center;
`;

export const Loader = styled(ActivityIndicator).attrs({
  size: 'large',
  color: '#7159c1',
})`
  flex: 1;
  align-items: center;
  align-content: center;
  justify-content: center;
`;
