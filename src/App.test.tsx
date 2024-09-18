import { fireEvent, render, screen, within } from '@testing-library/react';
import App from './App';
import data from './data';

describe('App', () => {
  it('장바구니 화면이 노출된다.', () => {
    render(<App />);

    expect(screen.getByText(/your bag/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', {
        name: /clear cart/i,
      })
    ).toBeInTheDocument();
  });

  it('장바구니에 담긴 상품 목록이 노출된다.', () => {
    const { getAllByRole, getByText } = render(<App />);

    expect(getAllByRole('listitem').length).toBe(data.length);

    data.forEach(({ title }) => {
      expect(getByText(title)).toBeInTheDocument();
    });
  });

  it('장바구니에 담긴 상품의 총 합이 노출된다.', () => {
    render(<App />);

    const total = data
      .reduce((acc, item) => {
        return acc + item.amount * item.price;
      }, 0)
      .toFixed(2);

    expect(screen.getByText(total)).toBeInTheDocument();
  });

  it('"clear cart" 버튼을 클릭하면, 장바구니가 비워진다.', () => {
    render(<App />);

    const clearButton = screen.getByRole('button', {
      name: /clear cart/i,
    });

    fireEvent.click(clearButton);

    expect(screen.queryByText('장바구니에 상품을 담아주세요.')).toBeInTheDocument();
    expect(screen.getByText(/0.00/)).toBeInTheDocument();
  });

  it('장바구니에 담긴 개별 상품을 삭제할 수 있다.', () => {
    render(<App />);

    const removeButtons = screen.getAllByRole('button', {
      name: /remove/i,
    });

    expect(removeButtons).toHaveLength(data.length);

    fireEvent.click(removeButtons[0]);

    expect(
      screen.getAllByRole('button', {
        name: /remove/i,
      })
    ).toHaveLength(data.length - 1);
  });

  it('장바구니에 담긴 상품의 개수를 변경할 수 있다.', () => {
    render(<App />);

    const liElement = screen.getAllByRole('listitem')[0];

    const increaseButton = within(liElement).getByRole('button', {
      name: /increase/i,
    });
    const decreaseButton = within(liElement).getByRole('button', {
      name: /decrease/i,
    });
    const amount = within(liElement).getByTestId('amount');

    expect(increaseButton).toBeInTheDocument();
    expect(amount).toHaveTextContent('1');

    fireEvent.click(increaseButton);
    fireEvent.click(increaseButton);

    expect(amount).toHaveTextContent('3');

    fireEvent.click(decreaseButton);

    expect(amount).toHaveTextContent('2');
  });
});
