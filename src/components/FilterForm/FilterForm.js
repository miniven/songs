import React, { Component } from 'react';
import { connect } from 'react-redux';

// Components //

import Select from 'react-select';

// Actions //

import { setSorting } from '~/actions/sort';

class FilterForm extends Component {
  handleSelect = (name, option) => {
    switch (name) {
      case 'genre':
        this.props.handleInput({ target: { name, value: option ? option.value : 'all' } });
        break;
      default:
        this.props.setSorting(option ? option.value : 'TITLE');
        break;
    }
  }

  render() {
    const { genres, handleInput, values, sorting } = this.props;

    return (
      <form className='form'>
        <div className='row'>
          <div className='col-xs-12 col-sm-6 col-md-6'>
            <label className='form__field'>
              <p className='form__label'>Название</p>
              <input
                className='form__input'
                type='text'
                name='title'
                placeholder='Someone Like You'
                value={values.title}
                autoComplete='off'
                onChange={handleInput}
              />
            </label>
          </div>
          <div className='col-xs-12 col-sm-6 col-md-3'>
            <label className='form__field'>
              <p className='form__label'>Настроение</p>
              <Select
                className='form__select'
                name='genre'
                searchable={false}
                value={values.genre}
                onChange={(option) => this.handleSelect('genre', option)}
                options={[
                  { value: 'all', label: 'Любое' },
                  ...Object.keys(genres).map(key => ({ value: key, label: genres[key] }))
                ]}
              />
            </label>
          </div>
          <div className='col-xs-12 col-sm-6 col-md-3'>
            <label className='form__field'>
              <p className='form__label'>Сортировать по</p>
              <Select
                className='form__select'
                name='sorting'
                searchable={false}
                value={sorting}
                onChange={(option) => this.handleSelect('sorting', option)}
                options={[
                  { value: 'TITLE', label: 'Название' },
                  { value: 'CREATED', label: 'Дата создания' },
                  { value: 'DATE', label: 'Дата исполнения' },
                ]}
              />
            </label>
          </div>
        </div>
      </form>
    );
  }
};

const mapStateToProps = state => ({
  genres: state.genres,
  sorting: state.sorting,
})

export default connect(mapStateToProps, { setSorting })(FilterForm);