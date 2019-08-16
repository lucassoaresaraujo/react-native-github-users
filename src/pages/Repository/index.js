import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Loader, Browser } from './styles';

export default class Repository extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
      getParam: PropTypes.func,
    }).isRequired,
  };

  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('repository').name,
  });

  render() {
    const { navigation } = this.props;
    const repository = navigation.getParam('repository');

    return (
      <Browser
        source={{ uri: repository.html_url }}
        renderLoading={() => <Loader />}
      />
    );
  }
}
