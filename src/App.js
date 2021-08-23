import React, { Component } from 'react';
import shortid from 'shortid';

import './App.css';
import Form from './components/Form';
import ContactsList from './components/ContactsList';
import Section from './components/Section';

class App extends Component {
  state = {
    contacts: [],
  };

  addContact = ({ name, number }) => {
    const contact = {
      id: shortid.generate(),
      name,
      number,
    };

    this.setState(prevState => ({
      contacts: [...prevState.contacts, contact],
    }));
  };

  onDeleteContact = id => {
    this.setState({
      contacts: this.state.contacts.filter(contact => contact.id !== id),
    });
  };

  render() {
    return (
      <>
        <Section title="Phonebook">
          <Form onSubmit={this.addContact} />
        </Section>
        <Section title="Contacts">
          {this.state.contacts.length > 0 ? (
            <ContactsList
              contacts={this.state.contacts}
              onDeleteContact={this.onDeleteContact}
            />
          ) : null}
        </Section>
      </>
    );
  }
}

export default App;
