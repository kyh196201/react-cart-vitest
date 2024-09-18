import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('제목이 노출된다.', () => {
    render(<App />);

    expect(screen.getByText('your bag')).toBeInTheDocument();
  });
});
