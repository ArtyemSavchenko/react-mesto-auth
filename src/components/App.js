import { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch, useHistory } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import CardDeletePopup from './CardDeletePopup';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import { api } from '../utils/api';
import * as auth from '../utils/authApi';
import { CurrentUserInfo } from '../contexts/CurrentUserContext';
import ProtectedRoute from './ProtectedRoute';
import Login from './Login';
import Registration from './Registration';
import NotFoundPage from './NotFoundPage';
import InfoTooltip from './InfoTooltip';

export default function App() {
  const history = useHistory();

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [registrationStatus, setRegistrationStatus] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [deletingCard, setDeletingCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('')

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userData, cards]) => {
        setCurrentUser(userData);
        setCards(cards);
      })
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    checkToken();
  }, [history]);

  const checkToken = () => {
    const token = localStorage.getItem('jwt');
    if (token) {
      auth.checkToken(token)
      .then(res => {
        setUserEmail(res.data.email);
        setLoggedIn(true);
        history.push('/');
      })
      .catch(err => {
        console.log(err);
      });
    }
  };

  const handleSignOut = () => {
    setLoggedIn(false);
    localStorage.removeItem('jwt');
    setUserEmail('');
    history.push('/sign-in');
  }

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };
  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };
  const handleCardClick = card => {
    setSelectedCard(card);
  };

  const handleCardLike = card => {
    const isLiked = card.likes.some(like => like._id === currentUser._id);
    const likePromise = !isLiked
      ? api.putLike(card._id)
      : api.deleteLike(card._id);
    likePromise
      .then(newCard => {
        setCards(cards => cards.map(c => (c._id === card._id ? newCard : c)));
      })
      .catch(err => console.log(err));
  };

  const handleCardDelete = () => {
    setIsLoading(true);
    api
      .delCard(deletingCard._id)
      .then(() => {
        setCards(cards => cards.filter(c => c._id !== deletingCard._id));
        closeAllPopups();
      })
      .catch(err => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleUpdateUser = userData => {
    setIsLoading(true);
    api
      .patchUserInfo(userData.name, userData.about)
      .then(newUserData => {
        setCurrentUser(newUserData);
        closeAllPopups();
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleUpdateAvatar = url => {
    setIsLoading(true);
    api
      .patchAvatar(url)
      .then(userInfo => {
        setCurrentUser(userInfo);
        closeAllPopups();
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleAddPlaceSubmit = cardData => {
    setIsLoading(true);
    api
      .postCard(cardData.name, cardData.link)
      .then(newCard => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleLogin = (email, password) => {
    auth
      .authorize(email, password)
      .then(data => {
        localStorage.setItem('jwt', data.token);
        setUserEmail(email);
        setLoggedIn(true);
        history.push('/');
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleRegistration = (email, password) => {
    auth
      .register(email, password)
      .then(() => {
        setRegistrationStatus(true);
        setIsInfoTooltipOpen(true);
        history.push('/sign-in');
      })
      .catch(err => {
        setRegistrationStatus(false);
        setIsInfoTooltipOpen(true);
        console.log(err);
      });
  };

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({});
    setDeletingCard({});
    setIsInfoTooltipOpen(false);
  };

  return (
    <div className="page">
      <CurrentUserInfo.Provider value={currentUser}>
        <Header loggedIn={loggedIn} onSignOut={handleSignOut} userEmail={userEmail} />
        <Switch>
          <Route path="/sign-in">
            <Login onLogin={handleLogin} />
          </Route>
          <Route path="/sign-up">
            <Registration onRegistration={handleRegistration} />
          </Route>
          <ProtectedRoute
            loggedIn={loggedIn}
            component={Main}
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onCardLike={handleCardLike}
            onCardDelete={setDeletingCard}
            onCardClick={handleCardClick}
            selectedCard={selectedCard}
            isEditAvatarPopupOpen={isEditAvatarPopupOpen}
            isEditProfilePopupOpen={isEditProfilePopupOpen}
            isAddPlacePopupOpen={isAddPlacePopupOpen}
            closeAllPopups={closeAllPopups}
            cards={cards}
            path="/"
          />
          <Route path="*">
            <NotFoundPage />
          </Route>
        </Switch>

        <Footer />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={isLoading}
        />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isLoading={isLoading}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          isLoading={isLoading}
        />
        <CardDeletePopup
          onCardDelete={handleCardDelete}
          onClose={closeAllPopups}
          isLoading={isLoading}
          deletingCard={deletingCard}
        />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          success={registrationStatus}
          onClose={closeAllPopups}
        ></InfoTooltip>
      </CurrentUserInfo.Provider>
    </div>
  );
}
