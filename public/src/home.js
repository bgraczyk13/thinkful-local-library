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

// HELPER FUNCTION LOCATED WITHIN THIS PROBLEM BELOW

function getMostPopularAuthors(books, authors) {
  // set empty array for the result
  let mostPopAuthors = [];
  // loop through book objects
  for (let book of books) {
    // loop through authors
    for (let author of authors) {
      // destructure book object
      let { borrows, authorId } = book;
      // assign authors
      let fullName = `${author.name.first} ${author.name.last}`;
      // check if id of book matches author id
      if (authorId === author.id) {
        // push to results array
        mostPopAuthors.push({ name: `${fullName}`, count: borrows.length });
      }
    }
  }
  // sort result from highest to lowest
  mostPopAuthors.sort((a, b) => (a.count > b.count ? -1 : 1));
  //return top 5 entries
  return mostPopAuthors.slice(0, 5);
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
