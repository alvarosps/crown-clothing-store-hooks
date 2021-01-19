import React, { useEffect } from 'react';
import './App.css';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import { setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selector';
import CheckoutPage from './pages/checkout/checkout.component';

import { auth, createUserProfileDocument } from './firebase/firebase.utils';

const App = ({ currentUser }) => {
	useEffect(() => {
		const unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
		if (userAuth) {
			const userRef = await createUserProfileDocument(userAuth);

			userRef.onSnapshot(snapShot => {
				setCurrentUser({
					id: snapShot.id,
					...snapShot.data()
				});
			});
		}

		setCurrentUser(userAuth);
		});

		return () => {
			unsubscribeFromAuth();
		}
	}, []);

	return (
		<div>
			<Header />
			<Switch>
				<Route exact path='/' component={HomePage} />
				<Route path='/shop' component={ShopPage} />
				<Route exact path='/signin' render={() => currentUser ? (<Redirect to='/' />) : (<SignInAndSignUpPage />)} />
				<Route exact path='/checkout' component={CheckoutPage} />
			</Switch>
		</div>
	);
}

const mapStateToProps = createStructuredSelector({
	currentUser: selectCurrentUser
});

export default connect(mapStateToProps)(App);
