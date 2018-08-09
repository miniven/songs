import React, { Component, Fragment } from 'react';

// Components //

import Modal from 'react-responsive-modal';
import SongList from '~/components/SongList/SongList';
import TopLine from '~/components/TopLine/TopLine';
import Button from '~/components/Button/Button';
import NewSongForm from '~/components/NewSongForm/NewSongForm';
import EditSongForm from '~/components/EditSongForm/EditSongForm';
import ConfirmSongDelete from '~/components/ConfirmSongDelete/ConfirmSongDelete';

class SongListPage extends Component {
  state = {
    isModalOpen: false,
    actionType: null,
    selectedSong: null,
  }

  openModal = () => {
    this.setState({ isModalOpen: true });
  }

  closeModal = () => {
    this.setState({ isModalOpen: false, selectedSong: null });

    setTimeout(() => this.setState({ actionType: null }), 500); // Чтобы контент менялся после закрытия модального окна, а не во время
  }

  setActionType = (actionType, id) => {
    this.setState({ isModalOpen: true, selectedSong: id, actionType });
  }

  render() {
    const { isModalOpen } = this.state;

    const renderModalContent = () => {
      switch (this.state.actionType) {
        case 'edit':
          return <EditSongForm songID={this.state.selectedSong} submitCallback={this.closeModal} />;
        case 'showSuccess':
          return (
            <Fragment>
              <p className='text text--white text--center text--semibold'>Выбранные песни добавлены в историю</p>
              <div className="modal__footer">
                <Button className='modal__button' mods={['white']} onClick={this.closeModal}>Понятно</Button>
                <Button className='modal__button' mods={['white']} to='/history'>Перейти к истории</Button>
              </div>
            </Fragment>
          );
        case 'delete':
          return <ConfirmSongDelete songID={this.state.selectedSong} submitCallback={this.closeModal} />;
        default:
          return <NewSongForm submitCallback={this.closeModal} />;
      }
    };

    return (
      <div className='container'>
        <TopLine>
          <h2 className='top-line__title title'>Список песен</h2>
          <Button className='top-line__button' mods={['filled-purple']} onClick={this.openModal}>Добавить песню</Button>
        </TopLine>
        <SongList setActionType={this.setActionType} />
        <Modal
          classNames={{
            overlay: 'modal',
            modal: `modal__box modal__box--wide modal__box--left ${this.state.actionType === 'delete' ? 'modal__box--orange' : ''} ${this.state.actionType === 'showSuccess' ? 'modal__box--green' : ''}`,
            closeButton: 'modal__close',
            closeIcon: 'modal__close-icon--secondary'
          }}
          open={isModalOpen}
          onClose={this.closeModal}
          center
        >
          <div className='modal__content'>
            { renderModalContent() }
          </div>
        </Modal>
      </div>
    );
  }
};

export default SongListPage;