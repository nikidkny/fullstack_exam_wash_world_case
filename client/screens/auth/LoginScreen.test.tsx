import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import LoginScreen from './LoginScreen';


jest.mock('@/components/ui/input', () => {
    const React = require('react');
    const { TextInput } = require('react-native');

    return {
        Input: ({ children }: any) => <>{children}</>,
        InputField: (props: any) => <TextInput {...props} />,
    };
});

jest.mock('@/components/ui/form-control', () => {
  const { Text } = require('react-native');
  return {
    FormControl: ({ children }: any) => <>{children}</>,
    FormControlLabel: ({ children }: any) => <>{children}</>,
    FormControlLabelText: ({ children }: any) => <>{children}</>,
    FormControlError: ({ children }: any) => <>{children}</>,
    FormControlErrorText: ({ children }: any) => <Text>{children}</Text>,
  };
});

jest.mock('@/components/ui/button', () => ({
    Button: ({ children, onPress }: any) => (
        <button onClick={onPress}>{children}</button>
    ),
}));

jest.mock('@react-navigation/native', () => {
    return {
        useNavigation: () => ({
            navigate: jest.fn(),
        }),
    };
});

const mockLogin = jest.fn();

jest.mock('./users/useLogin', () => ({
    useLogin: () => ({
        login: mockLogin,
    }),
}));

describe('LoginScreen logic', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('shows error for invalid email format', async () => {
        const { getByPlaceholderText, getByText, queryByText } = render(<LoginScreen />);

        fireEvent.changeText(getByPlaceholderText('you@example.com'), 'invalid-email');
        fireEvent.changeText(getByPlaceholderText('••••••••'), 'password123');

        fireEvent.press(getByText('LoginButton'));

        await waitFor(() => {
            expect(getByText('Please enter a valid email address.')).toBeTruthy();
        });

        expect(mockLogin).not.toHaveBeenCalled();
    });

    it('shows error for empty password', async () => {
        const { getByPlaceholderText, getByText } = render(<LoginScreen />);

        fireEvent.changeText(getByPlaceholderText('you@example.com'), 'user@example.com');
        fireEvent.changeText(getByPlaceholderText('••••••••'), '');

        fireEvent.press(getByText('LoginButton'));

        await waitFor(() => {
            expect(getByText('Password cannot be empty.')).toBeTruthy();
        });

        expect(mockLogin).not.toHaveBeenCalled();
    });

    it('calls loginUser with trimmed input', async () => {
        mockLogin.mockResolvedValueOnce({ success: true });

        const { getByPlaceholderText, getByText } = render(<LoginScreen />);

        fireEvent.changeText(getByPlaceholderText('you@example.com'), '  user@example.com  ');
        fireEvent.changeText(getByPlaceholderText('••••••••'), '  pass123  ');

        fireEvent.press(getByText('LoginButton'));

        await waitFor(() => {
            expect(mockLogin).toHaveBeenCalledWith({
                email: 'user@example.com',
                password: 'pass123',
            });
        });
    });

    it('shows login error when login fails', async () => {
        mockLogin.mockResolvedValueOnce({
            success: false,
            error: 'User with email does not exist',
        });

        const { getByPlaceholderText, getByText } = render(<LoginScreen />);

        fireEvent.changeText(getByPlaceholderText('you@example.com'), 'user@example.com');
        fireEvent.changeText(getByPlaceholderText('••••••••'), 'wrongpass');

        fireEvent.press(getByText('LoginButton'));

        await waitFor(() => {
            expect(getByText('Invalid Credentials. Please try again.')).toBeTruthy();
        });
    });
});
