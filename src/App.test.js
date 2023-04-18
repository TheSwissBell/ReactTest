import { render, screen } from '@testing-library/react';
import App from './App';
import '@testing-library/jest-dom/extend-expect';
import TodoTable from './TodoTable';
import { fireEvent } from '@testing-library/react';

test('renders todotable', () => {
  const row = [
    {
      desc: 'Go to coffee',
      date: '24.01.2021'
    }
  ];
  render(< TodoTable todos={row} />);
  const tablecell = screen.getByText(/go to coffee/i);
  expect(tablecell).toBeInTheDocument();
});

test('add todo', () => {
  render(<App />);
  const desc = screen.getByPlaceholderText('Description');
  fireEvent.change(desc, { target: { value: 'Go to coffee' } });
  const date = screen.getByPlaceholderText('Date');
  fireEvent.change(date, { target: { value: '29.01.2021' } })
  const button = screen.getByText('Add');
  fireEvent.click(button);
  const tablecell = screen.getByText(/go to coffee/i);
  expect(tablecell).toBeInTheDocument();
})

test('clear todos', () => {
  const res = render(<App />);
  const table = res.container.querySelector('table');
  const desc = screen.getByPlaceholderText('Description');
  fireEvent.change(desc, { target: { value: 'Go to coffee' } });
  const date = screen.getByPlaceholderText('Date');
  fireEvent.change(date, { target: { value: '18.04.2023' } })
  const button = screen.getByText('Add');
  fireEvent.click(button);
  fireEvent.change(desc, { target: { value: 'Go to tea' } });
  fireEvent.change(date, { target: { value: '22.04.2023' } })
  fireEvent.click(button);

  expect(table.rows.length).toBe(2);

  const tablecell = screen.getByText(/go to tea/i);
  expect(tablecell).toBeInTheDocument();

  const clearButton = screen.getByText(/Clear/i);
  fireEvent.click(clearButton);

  expect(table.rows.length).toBe(0);
  expect(tablecell).not.toBeInTheDocument();
  


})