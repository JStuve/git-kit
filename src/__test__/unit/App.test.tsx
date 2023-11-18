import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../../App';
import { UnitTestHelper } from './unit-test-helper';


describe('App', () => {

  UnitTestHelper.setupBeforeAndAfter();

  test('renders learn react link', () => {
    render(<App />);
    const linkElement = screen.getByText(/This Github tab currently has no features./i);
    expect(linkElement).toBeInTheDocument();
  });

})

