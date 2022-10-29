import { Component } from 'react';

import { FiSearch } from 'react-icons/fi';
import { FormBtn, InputSearch, SearchFormStyled } from './SearchForm.styled';

export class SearchForm extends Component {
  state = {
    query: '',
  };

  hendlerInput = e => {
    this.setState({ query: e.currentTarget.value });
  };
  handlerSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.query);

    this.setState({ query: '' });
  };
  render() {
    const { query } = this.state;
    return (
      <SearchFormStyled onSubmit={this.handlerSubmit}>
        <FormBtn type="submit">
          <FiSearch size="16px" />
        </FormBtn>
        <InputSearch
          placeholder="What do you want to write?"
          name="search"
          required
          autoFocus
          value={query}
          onChange={this.hendlerInput}
        />
      </SearchFormStyled>
    );
  }
}
