const axios = require('axios');
const {hasuraAPI, headers} = require('../lib/hasura')


// Ví dụ: Tạo một bản ghi mới
async function create_authors(id, name, age) {
    try {
      const response = await axios.post(
        hasuraAPI,
        {
          query: `
            mutation {
              insert_authors(objects: {
                id: ${id},
                name: "${name}",
                age: ${age}
              }) {
                returning{
                    id
                    name
                    age
                }
              }
            }
          `,
        },
        { headers }
      );
  
      console.log('Bản ghi đã được tạo:', response.data.data.insert_authors);
    } catch (error) {
      console.error('Lỗi:', error);
    }
  }
  
  // Ví dụ: Đọc danh sách các bản ghi
  async function read_author() {
    try {
      const response = await axios.post(
        hasuraAPI,
        {
          query: `
            query {
              authors {
                id
                name
                age
              }
            }
          `,
        },
        { headers }
      );
  
      console.log('Danh sách các bản ghi:', response.data.data.authors);
    } catch (error) {
      console.error('Lỗi:', error);
    }
  }

  //tìm 1 author thông qua id or tên.

  async function find_author(idOrName) {
    try {
      let query;
      if (isNaN(idOrName)) {
        // Nếu idOrName không phải là một số, giả sử nó là tên
        query = `
          query {
            authors(where: {name: {_eq: "${idOrName}"}}) {
              id
              name
              age
            }
          }
        `;
      } else {
        // Nếu idOrName là một số, giả sử nó là ID
        query = `
          query {
            authors(where: {id: {_eq: ${idOrName}}}) {
              id
              name
              age
            }
          }
        `;
      }
  
      const response = await axios.post(
        hasuraAPI,
        {
          query,
        },
        { headers }
      );
  
      const authors = response.data.data.authors;
      if (authors.length === 0) {
        console.log('Không tìm thấy tác giả phù hợp.');
      } else {
        console.log('Thông tin tác giả:', authors[0]);
      }
    } catch (error) {
      console.error('Lỗi:', error);
    }
  }
  
  
  
  // Ví dụ: Cập nhật một bản ghi
  async function update_author(id, newName, newAge) {
    try {
      let setClause = " ";
      console.log(newName, newAge);
      if (newName !== undefined && newAge !== undefined) {
        setClause = `_set: { name: "${newName}", age: ${newAge} }`;
      } else if (newName !== undefined) {
        setClause = `_set: { name: "${newName}" }`;
      } else if (newAge !== undefined) {
        setClause = `_set: { age: ${newAge} }`;
      } else {
        console.log("Không có thông tin mới để cập nhật.");
        return;
      }
  
      const response = await axios.post(
        hasuraAPI,
        {
          query: `
            mutation {
              update_authors_by_pk(
                pk_columns: { id: "${id}" },
                ${setClause}
              ) {
                id
                name
                age
              }
            }
          `,
        },
        { headers }
      );
  
      console.log("Bản ghi đã được cập nhật:", response.data.data.update_authors_by_pk);
    } catch (error) {
      console.error("Lỗi:", error);
    }
  }
  
  
  // Ví dụ: Xóa một bản ghi
  async function delete_author(id) {
    try {
      const response = await axios.post(
        hasuraAPI,
        {
          query: `
            mutation {
              delete_authors_by_pk(id: ${id}) {
                id
              }
            }
          `,
        },
        { headers }
      );
  
      console.log('Bản ghi đã bị xóa:', response.data.data.delete_authors_by_pk);
    } catch (error) {
      console.error('Lỗi:', error);
    }
  }
  
  // Gọi các ví dụ
  // create_authors(5, "The Lu", 102);
  // read_author();
  // find_author(2) 
  // update_author(4,'The Lu', 102);
  // delete_author(5);

  module.exports = {read_author, create_authors, update_author, delete_author}
