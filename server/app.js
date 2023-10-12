const express = require('express');
const { axiosConfig } = require('./lib/hasura'); // Thêm import cho hàm read_author
const cors = require('cors');
const bodyParser = require('body-parser');

const {read_author, create_authors, update_author, delete_author} = require('./models/authors');

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/authors', (req, res) => {
  try {
    // Gọi hàm read_author để lấy danh sách tác giả từ authors.js
    read_author()
      .then(authors => {
        // Trả về danh sách tác giả dưới dạng JSON
        res.json(authors);
      })
      .catch(error => {
        console.error('Lỗi:', error);
        res.status(500).json({ error: 'Lỗi server' });
      });
  } catch (error) {
    console.error('Lỗi:', error);
    res.status(500).json({ error: 'Lỗi server' });
  }
});

app.post('/add_author', async (req, res) => {
  try {
    // Trích xuất dữ liệu tác giả từ request body
    const { id, name, age } = req.body;

    // Gọi hàm create_authors để thêm tác giả
    await create_authors(id, name, age);

    // Trả về thông báo thành công
    res.json({ message: 'Tác giả đã được thêm thành công' });
  } catch (error) {
    console.error('Lỗi:', error);
    res.status(500).json({ error: 'Lỗi server' });
  }
});

app.delete('/delete_author/:id', (req, res) => {
  const id = req.params.id;
  console.log(req.params.id);
  // Gọi hàm delete_author để xóa tác giả
  delete_author(id)
    .then(() => {
      res.status(200).json({ message: 'Xóa tác giả thành công' });
    })
    .catch((error) => {
      console.error('Lỗi:', error);
      res.status(500).json({ error: 'Lỗi server' });
    });
});


app.put('/update_author/:id', (req, res) => {
  const id = req.params.id;
  const { name, age } = req.body;

  // Gọi hàm update_author để cập nhật tác giả
  update_author(id, name, age)
    .then(() => {
      res.status(200).json({ message: 'Cập nhật tác giả thành công' });
    })
    .catch((error) => {
      console.error('Lỗi:', error);
      res.status(500).json({ error: 'Lỗi server' });
    });
});



// Định tuyến cho /books
app.get('/books', (req, res) => {
  // Xử lý yêu cầu để lấy danh sách sách
  // Ví dụ: gọi hàm từ models/books để lấy danh sách sách từ cơ sở dữ liệu
  // Sau đó, trả về danh sách sách dưới dạng JSON
  const books = []; // Thay bằng mã xử lý thực tế để lấy danh sách sách
  res.json(books);
});

const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});