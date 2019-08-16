import React, { Component } from 'react';
import PropTypes from 'prop-types';
import api from '../../services/api';
import {
  Container,
  Header,
  Avatar,
  Name,
  Bio,
  Stars,
  Starred,
  OwnerAvatar,
  Infos,
  Author,
  Title,
  Loader,
  LoaderMore,
} from './styles';

export default class User extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
      getParam: PropTypes.func,
    }).isRequired,
  };

  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('user').name,
  });

  state = {
    stars: [],
    loading: true,
    loadingMore: false,
    refreshing: false,
    page: 1,
  };

  async componentDidMount() {
    const { navigation } = this.props;
    const user = navigation.getParam('user');
    this.setState({ loading: true });
    const response = await api.get(`/users/${user.login}/starred`);
    this.setState({
      stars: response.data,
      loading: false,
    });
  }

  load = async (page = 1) => {
    const { stars } = this.state;
    const { navigation } = this.props;
    const user = navigation.getParam('user');

    const response = await api.get(`/users/${user.login}/starred`, {
      params: { page },
    });

    this.setState({
      stars: page >= 2 ? [...stars, ...response.data] : response.data,
      page,
      loading: false,
      loadingMore: false,
      refreshing: false,
    });
  };

  loadMore = () => {
    const { page } = this.state;
    const nextPage = page + 1;

    this.setState({ loadingMore: true }, () => this.load(nextPage));
  };

  refreshList = () => {
    this.setState({ refreshing: true, stars: [] }, this.load);
  };

  handleNavigate = repository => {
    const { navigation } = this.props;
    navigation.navigate('Repository', { repository });
  };

  render() {
    const { navigation } = this.props;
    const { stars, loading, loadingMore, refreshing } = this.state;

    const user = navigation.getParam('user');

    return (
      <Container>
        <Header>
          <Avatar source={{ uri: user.avatar }} />
          <Name>{user.name}</Name>
          <Bio>{user.bio}</Bio>
        </Header>

        {loading ? (
          <Loader />
        ) : (
          <Stars
            data={stars}
            refreshing={refreshing}
            onRefresh={this.refreshList}
            onEndReachedThreshold={0.4}
            onEndReached={this.loadMore}
            keyExtractor={star => String(star.id)}
            renderItem={({ item: repository }) => (
              <Starred onPress={() => this.handleNavigate(repository)}>
                <OwnerAvatar source={{ uri: repository.owner.avatar_url }} />
                <Infos>
                  <Title>{repository.name}</Title>
                  <Author>{repository.owner.login}</Author>
                </Infos>
              </Starred>
            )}
          />
        )}
        {loadingMore ? <LoaderMore /> : null}
      </Container>
    );
  }
}
