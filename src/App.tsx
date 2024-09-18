import { useState } from 'react';
import './App.css';
import data from './data';

function App() {
  const [cart, setCart] = useState(data);
  const total = cart
    .reduce((acc, item) => {
      return acc + item.amount * item.price;
    }, 0)
    .toFixed(2);

  const increase = (id: number) => {
    setCart((cart) =>
      cart.map((it) => {
        if (it.id !== id) return it;

        return {
          ...it,
          amount: it.amount + 1,
        };
      })
    );
  };

  const decrease = (id: number) => {
    setCart((cart) =>
      cart.map((it) => {
        if (it.id !== id) return it;

        return {
          ...it,
          amount: it.amount - 1,
        };
      })
    );
  };

  return (
    <div>
      <h1>your bag</h1>

      {cart.length ? (
        <ul>
          {cart.map((item) => (
            <li key={item.id}>
              <div>
                <span>{item.title}</span>
                <button
                  type="button"
                  onClick={() => {
                    setCart((cart) => cart.filter((it) => it.id !== item.id));
                  }}
                >
                  remove
                </button>
              </div>

              <div>
                <button
                  type="button"
                  aria-label="increase"
                  onClick={() => increase(item.id)}
                >
                  +
                </button>
                <span data-testid="amount">{item.amount}</span>
                <button
                  type="button"
                  aria-label="decrease"
                  onClick={() => decrease(item.id)}
                >
                  -
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>장바구니에 상품을 담아주세요.</p>
      )}

      <div>
        <span>total</span>
        <span>{total}</span>
      </div>

      <button
        type="button"
        onClick={() => setCart([])}
      >
        clear cart
      </button>
    </div>
  );
}

export default App;
