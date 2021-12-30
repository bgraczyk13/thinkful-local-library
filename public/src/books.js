const authors = require("../data/authors.js");
const accounts = require("../data/accounts.js");
const books = require("../data/books.js");

function findAuthorById(authors, id) {
  // returns the author object that has the matching id
  return authors.find((author) => author.id === id);
}

function findBookById(books, id) {
  // returns book object with matching id (SAME AS ABOVE!!!)
  return books.find((book) => book.id === id);
}

function partitionBooksByBorrowedStatus(books) {
  let booksReturned = books.filter((book) =>
    book.borrows.every((borrow) => borrow.returned === true)
  );
  let booksBorrowed = books.filter((book) =>
    book.borrows.some((borrow) => borrow.returned === false)
  );
  return [[...booksBorrowed], [...booksReturned]];
}

function getBorrowersForBook(book, accounts) {
  const { borrows } = book;

  const bookBorrowers = borrows.map(({ id, returned }) => {
    // find account that matches borrower's id
    const account = accounts.find((account) => account.id === id);
    // use spread operator to return matching account + `returned` info
    return {
      ...account,
      returned,
    };
  });

  return bookBorrowers
    .sort((borrowerA, borrowerB) => {
      const companyA = borrowerA.company;
      const companyB = borrowerB.company;
      // The localeCompare() method returns a number indicating whether a reference string comes before, or after
      return companyA.localeCompare(companyB);
    })
    .slice(0, 10);
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
