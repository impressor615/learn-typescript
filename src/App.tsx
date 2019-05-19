import React, { useReducer } from 'react';

import Item from './components/Item';
import Form from './components/Form';


const initialState = {
  showAll: false,
  itemList: [],
  newItemTitle: '',
}

interface Item {
  id: number;
  text: string;
  isCompleted: boolean;
}

type Action =
  | { type: 'type_new_title', payload: string }
  | { type: 'add_item', payload: Item }
  | { type: 'delete_item', payload: number }
  | { type: 'toggle_item', payload: number }
  | { type: 'change_show_option', payload: boolean }

interface AppState {
  showAll: boolean;
  itemList: Item[];
  newItemTitle: string;
}

const reducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case 'add_item':
      return {
        ...state,
        newItemTitle: '',
        itemList: [...state.itemList, action.payload]
      }
    case 'delete_item':
      return {
        ...state,
        itemList: state.itemList.filter(item => item.id !== action.payload)
      }
    case 'toggle_item':
      return {
        ...state,
        itemList: state.itemList.map(item => {
          if (item.id === action.payload) {
            item.isCompleted = !item.isCompleted
            return item;
          }
          return item;
        })
      }
    case 'change_show_option':
      return {
        ...state,
        showAll: action.payload,
      };
    case 'type_new_title':
      return {
        ...state,
        newItemTitle: action.payload,
      };
    default:
      return state;
  }
}


const App: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { itemList, showAll, newItemTitle } = state;


  return (
    <>
      <header>
        <h1>To-do App</h1>
      </header>
      <main>
        <ul>
          {itemList.map((item, index) => {
            if (!showAll && item.isCompleted) return null;
            return (
              <li key={index.toString()}>
                <Item
                  checked={item.isCompleted}
                  onChange={(e) => {
                    const newState = [...itemList];
                    newState[index] = {
                      id: index,
                      text: newState[index].text,
                      isCompleted: e.currentTarget.checked,
                    };
                    dispatch({ type: 'toggle_item', payload: index });
                  }}
                >
                  {item.text}
                </Item>
              </li>
            )
          })}
        </ul>
      </main>
      <hr />
      <footer>
        <label htmlFor="showAll">
          <input
            id="showAll"
            type="checkbox"
            checked={showAll}
            onChange={(e) => dispatch({ type: 'change_show_option', payload: e.currentTarget.checked })}
          />
          모든 Item 보기
        </label>
        <Form
          value={newItemTitle}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            dispatch({
              type: "type_new_title",
              payload: e.currentTarget.value
            })
          }}
          onSubmit={(e: React.FormEvent) => {
            e.preventDefault()
            dispatch({
              type: 'add_item',
              payload: {
                id: itemList.length,
                text: newItemTitle,
                isCompleted: false,
              }})
          }}
        />
      </footer>
    </>
  );
}


export default App;
