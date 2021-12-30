const accounts = require("../data/accounts.js");
const books = require("../data/books.js");
const authors = require("../data/authors.js");

function findAccountById(accounts, id) {
  // return account object that has matching ID
  return accounts.find((account) => account.id === id);
}

function sortAccountsByLastName(accounts) {
  // returns array of objects sorted alphabetically by last name
  return accounts.sort((a, b) => (a.name.last > b.name.last ? 1 : -1));
}

function getTotalNumberOfBorrows(account, books) {
  // returns # of times account's ID appears in any book `borrows` array
  let totalBorrows = 0;

  books.forEach((book) => {
    book.borrows.forEach((user) => {
      if (user.id === account.id) {
        totalBorrows++;
      }
    });
  });
  return totalBorrows;
}

function getBooksPossessedByAccount(account, books, authors) {
  // empty array for books
  const checkedOut = [];

  // loop through books
  books.forEach((book) => {
    // borrows equal to most recently checked out
    let borrows = book.borrows[0];
    // checking to see if borrows id is currently checked out by an account id
    if (borrows.returned === false && borrows.id === account.id) {
      // destructure books
      let { id, title, genre, authorId, author, borrows } = book;

      author = authors.find((author) => author.id === book.authorId);
      // push to checkedOut array
      checkedOut.push({ id, title, genre, authorId, author, borrows });
    }
  });
  return checkedOut;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
