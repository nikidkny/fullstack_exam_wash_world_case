import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { store } from '@/store/store'; // Adjust the import path if necessary
import SignupScreen from './SignupScreen';

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <Provider store={store}>
      <NavigationContainer>{ui}</NavigationContainer>
    </Provider>
  );
};

describe('SignupScreen', () => {
  it('renders the Signup button', () => {
    const { getByText } = renderWithProviders(<SignupScreen />);
    expect(getByText('Signup')).toBeTruthy();
  });

  it('validates email input', () => {
    const { getByPlaceholderText, getByText } = renderWithProviders(<SignupScreen />);
    const emailInput = getByPlaceholderText('you@example.com');
    fireEvent.changeText(emailInput, 'invalid-email');
    fireEvent.press(getByText('Next'));
    expect(getByText('Please enter a valid email address.')).toBeTruthy();
  });
});
