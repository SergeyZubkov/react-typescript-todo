import React, { useState } from 'react';

import List from './List';
import { User, Todo } from './types';
import UserItem from './UserItem';
import TodoList from './Todos';
import useFetch from './hooks/useFetch';
import Load from './Load';
import SelectableList from './SelectableList';

function App() {
  const {data: users, error: usersError} = useFetch<User[]>('https://jsonplaceholder.typicode.com/users')
  const [userId, setUserId] = useState<string>()

  const {data: todos, error: todosError} = useFetch<Todo[]>('https://jsonplaceholder.typicode.com/user/' + userId + '/todos')

  
  const handleUserClick = (id: string) => setUserId(id)

  const getUserName = (userId: string|undefined) => users?.find(user => user.id === userId)?.name

  return (
    <div style={{
      margin: "0 auto",
      width: 960
    }}>
      <List
        data={users}
        renderItem={(item) => <UserItem key={item.id} data={item} onClick={handleUserClick} />}
      />
      <SelectableList
        data={users}
        renderItem={(item) =>  <UserItem key={item.id} data={item} onClick={handleUserClick} />}
      />
      {
        (todosError&&`Error ${todosError}`)
        ||
        (!todos&&'loading')
        ||
        <TodoList
          data={todos||[]}
          userId={userId}
          userName={getUserName(userId)}
        />
      }
      <Load
        <Todo[]>
        url={`https://jsonplaceholder.typicode.com/user/${userId}/todos`}
        renderData={
          (data) => (
            <TodoList 
              data={data} 
              userId={userId} 
              userName={getUserName(userId)}
            />
          )
        }
        renderError={(error) => <span>Произошла ошибка: ${error}</span>}
        renderLoader={<span>Загрузка ...</span>}
        
      />
    </div>
  );
}

export default App;
