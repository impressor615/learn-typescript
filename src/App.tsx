import React, { useState } from 'react';

import Item from './components/Item';

const App: React.FC = () => {
  const [itemList, updateItem] = useState<Item[]>([]);
  const [showAll, setOption] = useState<boolean>(false);
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
                      text: newState[index].text,
                      isCompleted: e.currentTarget.checked,
                    };
                    updateItem(newState);
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
            onChange={(e) => setOption(e.currentTarget.checked)}
          />
          모든 Item 보기
        </label>
        <div>
          <button type="button" onClick={() => updateItem([...itemList, { text: 'item1', isCompleted: false }])}>
            add item
          </button>
        </div>
      </footer>
    </>
  );
}

export default App;
