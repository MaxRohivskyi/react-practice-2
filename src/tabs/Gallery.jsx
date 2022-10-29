import { Component } from 'react';

import * as ImageService from 'service/image-service';
import { Button, SearchForm, Grid, GridItem, Text, CardItem } from 'components';
import { MdStarHalf } from 'react-icons/md';

export class Gallery extends Component {
  state = {
    query: '',
    page: 1,
    images: [],
    isVisible: false,
    error: null,
    isLoading: false,
    isEmpty: false,
  };
  onHandlerSubmit = value => {
    this.setState({ query: value, error: null });
  };

  componentDidUpdate(prevProps, prevState) {
    const { query, page } = this.state;

    if (prevState.query !== query || prevState.page !== page) {
      this.getPhotos(query, page);
    }
  }
  getPhotos = async (query, page) => {
    if (!query) {
      return;
    }
    this.setState({ isLoading: true });

    try {
      const {
        photos,
        per_page,
        total_result,
        page: currentPage,
      } = await ImageService.getImages(query, page);
      console.log(photos);

      if (photos.length === 0) {
        this.setState({ isEmpty: true });
      }

      if (photos.length === 0) {
        this.setState({
          images: [],
          isVisible: false,
        });
      }
      this.setState(prevState => ({
        images: [...prevState.images, ...photos],
        isVisible: photos.length === 0 ? false : true,
      }));
    } catch (error) {
      console.log(error);
      this.setState({ error: error.message });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  onLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };
  render() {
    const { isVisible, images, isLoading, error, isEmpty } = this.state;
    return (
      <>
        <SearchForm onSubmit={this.onHandlerSubmit} />
        {isEmpty && (
          <Text textAlign="center">❌ We do not find images, try again</Text>
        )}
        {error && <Text textAlign="center">❌ Something go wrong...</Text>}
        <Grid>
          {images.length > 0 &&
            images.map(({ id, avg_color, alt, src }) => (
              <GridItem key={id}>
                <CardItem>
                  <img src={src.large} alt={alt} />
                </CardItem>
              </GridItem>
            ))}
        </Grid>
        {isVisible && (
          <Button onClick={this.onLoadMore} type="button">
            {isLoading ? 'Loading...' : 'Load More'}
          </Button>
        )}

        {/* <Text textAlign="center">Sorry. There are no images ... 😭</Text> */}
      </>
    );
  }
}
