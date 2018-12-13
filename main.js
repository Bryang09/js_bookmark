// Listen for form submit
document.getElementById("myForm").addEventListener("submit", saveBookmark);

function saveBookmark(e) {
  // Get form values
  var siteName = document.getElementById("siteName").value;
  var siteUrl = document.getElementById("siteUrl").value;

  if (!validateForm(siteName, siteUrl)) {
    return false;
  }

  var bookmark = {
    name: siteName,
    url: siteUrl
  };

  // TEST IF BOOKMARK IS NULL
  if (localStorage.getItem("bookmarks") === null) {
    // INIT ARRAY
    var bookmarks = [];
    bookmarks.push(bookmark);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  } else {
    // GET BOOKMARKS FROM LOCAL STORAGE
    var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    // ADD BOOKMARKS TO ARRAY
    bookmarks.push(bookmark);
    // RESET BACK TO LOCAL STORAGE
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }

  // CLEAR FORM
  document.getElementById("myForm").reset();

  // Refetch Bookmarks
  fetchBookmarks();

  e.preventDefault();
}

//  DELETET BOOKMARK

function deleteBookmark(url) {
  // GET BOOKMARKS FROM LOCAL STORAGE
  var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));

  // LOOP BOOKMARKS
  for (var i = 0; i < bookmarks.length; i++) {
    if (bookmarks[i].url === url) {
      // Remove from array
      bookmarks.splice(i, 1);
    }
  }
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

  // Refetch Bookmarks
  fetchBookmarks();
}

// FETCH BOOKMARS
function fetchBookmarks() {
  var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));

  // GET OUTPUT ID
  var bookmarkResults = document.getElementById("bookmarksResults");

  // Build Output
  bookmarkResults.innerHTML = "";

  for (var i = 0; i < bookmarks.length; i++) {
    var name = bookmarks[i].name;
    var url = bookmarks[i].url;

    bookmarksResults.innerHTML +=
      '<div class="card card-block bg-faded">' +
      "<h3>" +
      name +
      ' <a class="btn btn-default" target="_blank" href="' +
      url +
      '">Visit</a> ' +
      " <a onclick=\"deleteBookmark('" +
      url +
      '\')" class="btn btn-danger" href="#">Delete</a> ' +
      "</h3>" +
      "</div>";
  }
}

// VALIDATE FORM
function validateForm(siteName, siteUrl) {
  if (!siteName || !siteUrl) {
    alert("Please Fill in Form");
    return false;
  }

  var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  var regex = new RegExp(expression);

  if (!siteUrl.match(regex)) {
    alert("Please Use a Valid Url");
    return false;
  }

  return true;
}
