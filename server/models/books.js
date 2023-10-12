const axios = require('axios');

const {hasuraAPI, headers} = require('../lib/hasura')
// Tạo một sách mới

async function create_books(id, name, genre, author_id) {
  try {
    const response = await axios.post(
      hasuraAPI,
      {
        query: `
          mutation {
            insert_books(objects: {
              id: ${id},
              name: "${name}",
              genre: "${genre}",
              author_id: ${author_id}
            }) {
              returning {
                id
                name
                genre
                author_id
              }
            }
          }
        `,
      },
      { headers }
    );

    console.log('Sách đã được tạo:', response.data.data.insert_books);
  } catch (error) {
    console.error('Lỗi:', error);
  }
}

// Đọc danh sách các sách
async function read_books() {
  try {
    const response = await axios.post(
      hasuraAPI,
      {
        query: `
          query {
            books {
              id
              name
              genre
              author_id
            }
          }
        `,
      },
      { headers }
    );

    console.log('Danh sách các sách:', response.data.data.books);
  } catch (error) {
    console.error('Lỗi:', error);
  }
}

// Cập nhật một sách
async function update_books(id, name, genre, author_id) {
  try {
    const response = await axios.post(
      hasuraAPI,
      {
        query: `
          mutation {
            update_books_by_pk(
              pk_columns: { id: ${id} },
              _set: {
                name: "${name}",
                genre: "${genre}",
                authorId: ${author_id}
              }
            ) {
              id
              name
              genre
              author_id
            }
          }
        `,
      },
      { headers }
    );

    console.log('Sách đã được cập nhật:', response.data.data.update_books_by_pk);
  } catch (error) {
    console.error('Lỗi:', error);
  }
}

// Xóa một sách
async function delete_books(id) {
  try {
    const response = await axios.post(
      hasuraAPI,
      {
        query: `
          mutation {
            delete_books_by_pk(id: ${id}) {
              id
            }
          }
        `,
      },
      { headers }
    );

    console.log('Sách đã bị xóa:', response.data.data.delete_books_by_pk);
  } catch (error) {
    console.error('Lỗi:', error);
  }
}


//   create_books(8,'Hello','Vui nhon',1)
  // read_books()
//   update_books
  // delete_books(7)

