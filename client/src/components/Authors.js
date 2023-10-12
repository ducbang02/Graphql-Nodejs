import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL_SERVER = process.env.REACT_APP_API_BASE_URL_SERVER;
const hasura_Secret = process.env.REACT_APP_API_AUTH_TOKEN
const hasura_url = process.env.REACT_APP_API_BASE_URL



function Authors() {
  const [authors, setAuthors] = useState([]);
  const [newName, setNewName] = useState(''); // Định nghĩa biến newName
  const [newAge, setNewAge] = useState('');   // Định nghĩa biến newAge

  useEffect(() => {
    fetchAuthors();
  }, []);

 
  const fetchAuthors = async () => {
    console.log('hasura_Secret:', hasura_Secret);
    console.log('hasura_url:', hasura_url);

    try {
      const hasuraSecret = hasura_Secret; // Thay 'your_secret_here' bằng secret của bạn
      const response = await axios.post(
        hasura_url,
        {
          query: `
            query GetAuthors {
              authors {
                id
                name
                age
              }
            }
          `
        },
        {
          headers: {
            'x-hasura-admin-secret': hasuraSecret
          }
        }
      );
  
      if (response.data.data && response.data.data.authors) {
        setAuthors(response.data.data.authors);
      
      } else {
        setAuthors([]);
      }
    } catch (error) {
      console.error('Lỗi:', error);
    }
  };
  

  const createAuthor = async (id, name, age) => {
    try {
      console.log(API_BASE_URL_SERVER);
      await axios.post(`${API_BASE_URL_SERVER}/add_author`, {
        id,
        name,
        age
      });
      fetchAuthors();
    } catch (error) {
      console.error('Lỗi:', error);
    }
  };

  const updateAuthor = async (id, newName, newAge) => {
    try {
      await axios.put(`${API_BASE_URL_SERVER}/update_author/${id}`, {
        name: newName,
        age: newAge,
      });
      fetchAuthors();
    } catch (error) {
      console.error('Lỗi:', error);
    }
  };

  const deleteAuthor = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL_SERVER}/delete_author/${id}`);
      fetchAuthors();
    } catch (error) {
      console.error('Lỗi:', error);
    }
  };

  const renderAuthors = () => {
    return (
      <ul>
        {authors.map((author) => (
          <li key={author.id}>
            {author.id} - {author.name} - {author.age} tuổi
            <button onClick={() => updateAuthor(author.id, newName, newAge)}></button>
            <button onClick={() => deleteAuthor(author.id)}>Xóa</button>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div>
      <h1>Danh sách tác giả</h1>
      {renderAuthors()}

      <h1>Thêm tác giả</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const id = e.target.id.value;
          const name = e.target.name.value;
          const age = e.target.age.value;
          createAuthor(id, name, age);
          e.target.reset();
        }}
      >
        <input type="text" name="id" placeholder="ID" required />
        <input type="text" name="name" placeholder="Tên tác giả" required />
        <input type="number" name="age" placeholder="Tuổi" required />
        <button type="submit">Thêm</button>
      </form>

      <h1>Cập nhật tác giả</h1>
      <form
  onSubmit={(e) => {
    e.preventDefault();
    const id = e.target.id.value;
    const newName = e.target.name.value; // Lấy tên mới
    const newAge = e.target.age.value;   // Lấy tuổi mới
    updateAuthor(id, newName, newAge);   // Gọi hàm cập nhật với ID, tên và tuổi mới
    e.target.reset();
  }}
>
  <input type="text" name="id" placeholder="ID" required />
  <input type="text" name="name" placeholder="Tên tác giả mới" required /> {/* Thêm trường tên mới */}
  <input type="number" name="age" placeholder="Tuổi mới" required /> {/* Thêm trường tuổi mới */}
  <button type="submit">Cập nhật</button>
</form>

    </div>
  );
}

export default Authors;