function getTotalBooksCount(books) {
  // returns the number of book objects inside of the array
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.reduce((acc, account) => {
    account ? (acc += 1) : null;
    return acc;
  }, 0);
}

function getBooksBorrowedCount(books) {
  const borrowedCount = books.reduce((count, book) => {
    if (book.borrows[0].returned == false) {
      count++;
    }
    return count;
  }, 0);
  return borrowedCount;
}

function getMostCommonGenres(books) {
  // set commonGenre variable + turn into object w/ name and count keys
  const getCommonGenres = books.reduce((acc, book) => {
    let { genre } = book;

    // if genre does not exist, object name + count = 0; else add to genre.count
    if (acc[genre] === undefined) {
      acc[genre] = { name: `${genre}`, count: 1 };
    } else {
      acc[genre].count++;
    }
    return acc;
  }, {});
  // Object.values() returns array w object values so that the count is accessible
  const allTotalGenres = Object.values(getCommonGenres);
  allTotalGenres.sort((a, b) => (a.count > b.count ? -1 : 1));
  // use slice to return 0-5 indexed genres
  return allTotalGenres.slice(0, 5);
}

function getMostPopularBooks(books) {
  // use map to count how many borrows of object w title
  const borrows = books.map((book) => {
    // each object returned has 2 keys
    return (mostPopular = {
      name: book.title,
      count: book.borrows.length,
    });
  });

  borrows.sort((a, b) => (a.count < b.count ? 1 : -1));
  // returns an array containing five objects or fewer even if tie
  return borrows.slice(0, 5);
}

function getMostPopularAuthors(books, authors) {
  // reduce authors array
  let popularAuthors = authors.reduce((acc, author) => {
    const {
      id,
      name: { first, last },
    } = author;

    let authorInfo = { name: `${first} ${last}`, count: 0 };
    // filter boks and see if book.authorId === id given, then add to count
    books.filter((book) =>
      book.authorId === id ? (authorInfo.count += book.borrows.length) : null
    );
    acc.push(authorInfo);

    return acc;
  }, []);
  // sort author popularity from highest count to lowest
  popularAuthors.sort((author1, author2) =>
    author1.count > author2.count ? -1 : 1
  );

  // return top 5 using slice
  return popularAuthors.slice(0, 5);
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
