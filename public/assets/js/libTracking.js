// Generate a pseudo-guid
function s4() {
  const rand = (1 + Math.random()) * 0x10000;
  return (rand | 0).toString(16).substring(1);
}

function createGuid() {
  return `${s4()}${s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;
}

// Get date and time like '2019-04-08 04:32:15 UTC'
function getDateTime() {
  let today = new Date();
  let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  return date+' '+time;
}

// Get or create a new GUID into localStorage
function getOrCreateGuid() {
  if (localStorage.guid) {
    return localStorage.guid
  }
  else {
    let guid = createGuid()
    localStorage.setItem('guid', guid);
    return guid
  }
}

// Create object to send to application Rails
function createTracking() {
  const guid = getOrCreateGuid();
  const visitedPage = window.location;
  const visitedDateTime = getDateTime();

  return { guid, visitedPage, visitedDateTime }
}

// Send data tracking to Rails Application
function sendTracking() {
  let object = createTracking();

  $.ajax({
    type: 'POST',
    url: 'http://localhost:3000/tracks',
    data: {
      guid: object.guid,
      visited_page: object.visitedPage.href,
      visited_datetime: object.visitedDateTime
    },
    dataType: 'JSON'
  });
}
