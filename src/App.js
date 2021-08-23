import React, { Component } from 'react';
import shortid from 'shortid';

import './App.css';
import ContactForm from './components/ContactForm';
import ContactsList from './components/ContactsList';
import Section from './components/Section';
import Filter from './components/Filter';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
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

  onFilterChange = e => {
    this.setState({
      filter: e.currentTarget.value,
    });
  };

  getFilteredContacts = () => {
    const { contacts, filter } = this.state;
    const normalizeFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizeFilter),
    );
  };

  render() {
    const { filter } = this.state;
    return (
      <>
        <Section>
          <h1>Phonebook</h1>
          <ContactForm onSubmit={this.addContact} />
        </Section>
        <Section title="Contacts">
          <Filter value={filter} onChange={this.onFilterChange} />
          {this.state.contacts.length > 0 ? (
            <ContactsList
              contacts={this.getFilteredContacts()}
              onDeleteContact={this.onDeleteContact}
            />
          ) : null}
        </Section>
      </>
    );
  }
}

export default App;
