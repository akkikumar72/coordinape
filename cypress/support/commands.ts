// load type definitions that come with Cypress module
/// <reference types="cypress" />

// ***********************************************
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
import { JsonRpcProvider } from '@ethersproject/providers';

import { mintToken } from '../../src/utils/testing/mint';
import '@cypress/code-coverage/support';

const provider = new JsonRpcProvider(
  `http://localhost:${Cypress.env('HARDHAT_GANACHE_PORT')}`
);

Cypress.Commands.add('login', () => {
  cy.contains('Metamask').click();
});

// Cypress doesn't allow top-level callbacks to be async
// so we need to wrap anything we're waiting on into
// Cypress' async context
Cypress.Commands.add('mintErc20', (...args) => {
  cy.then(async () => {
    await mintToken(...args, provider);
  });
});

Cypress.Commands.add('multiClick', { prevSubject: true }, multiClick);

function multiClick(subject, count: number) {
  if (count <= 0) return subject;
  Cypress.log({
    $el: subject,
    name: `click`,
    message: '',
  });
  return multiClick(subject.click(), count - 1);
}

Cypress.Commands.add('getInputByLabel', (label, options) => {
  return cy
    .contains('label', label, options)
    .invoke('attr', 'for')
    .then(id => cy.get('#' + id));
});
