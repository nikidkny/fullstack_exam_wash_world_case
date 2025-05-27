import React from 'react';
import { render } from '@testing-library/react-native';
import { Text } from './index';

describe('Text Component', () => {
  it('renders correctly with default props', () => {
    const { getByText } = render(<Text>Sample Text</Text>);
    expect(getByText('Sample Text')).toBeTruthy();
  });
});
