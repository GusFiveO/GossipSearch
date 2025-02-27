import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { SearchBar } from '../components/SearchBar';

test('renders search bar and handles input', () => {
    render(<SearchBar />);
    const inputElement = screen.getByPlaceholderText(/Search something.../i);
    fireEvent.change(inputElement, { target: { value: 'test query' } });
    expect(inputElement.value).toBe('test query');
});
