import FirebaseLib from 'firebase';
import merge from 'lodash/merge';
import { setUser, setInvoice, setFirebaseInstance } from '../actions';

export default class Firebase {
  constructor(store) {
    this.ref = new FirebaseLib('https://invoice-generator.firebaseio.com');
    this.store = store;
    this.startAuth();
  }

  startAuth() {
    this.ref.onAuth(this.onAuth.bind(this));
  }

  onAuth(user) {
    this.store.dispatch(setUser(user));

    if (!user) return;

    this.ref.child('users').child(user.uid).set({
      provider: user.provider,
      name: user.facebook.displayName,
    });

    this.ref.child('invoices').child(user.uid).child('__latest').once('value', (snapshot) => {
      const data = snapshot.val();
      this.store.dispatch(setInvoice(data));
    });
  }

  login() {
    this.ref.authWithOAuthPopup('facebook', (error, authData) => {
      if (error) {
        console.log('Login Failed!', error);
        return
      }
    });
  }

  save() {
    const { app: { user }, invoice } = this.store.getState();

    const toSave = merge({}, invoice);

    if (toSave.invoiceItems && toSave.invoiceItems.length) {
      toSave.invoiceItems = toSave.invoiceItems.filter(item => item.calculatedAmount && item.description);
      toSave.invoiceItems.forEach((item) => {
        if (!item.calculatedRate) delete item.calculatedRate;
      })
    }

    this.ref.child('invoices').child(user.uid).child('__latest').set(toSave);
    this.ref.child('invoices').child(user.uid).child(toSave.invoiceId).set(toSave);

    this.ref.child('invoices').once('value', function(snapshot) {
      console.log('omg!');
      const data = snapshot.val();
      console.log('Got data!', data)
    });
  }
}
