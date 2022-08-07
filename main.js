const profiles = [];

// https://api.github.com/repos/facebook/react/commits/e09097a75da040f428ca335e9d181186a61247d1
function renderPics() {
  $('.faces').empty();
  profiles.forEach((elem) => {
    const source = $('#profile-template').html();
    const template = Handlebars.compile(source);
    const newHTML = template({
      name: elem.user,
      imgSource: elem.url,
    });
    $('.faces').append(newHTML);
  });
}

const fetch = function (query) {
  $.ajax({
    method: 'GET',
    url: `https://api.github.com/repos/facebook/react/commits/${query}`,
    dataType: 'json',
    success(data) {
      console.log(data.author.login, data.author.avatar_url);
      profiles.push({
        user: data.author.login,
        url: data.author.avatar_url,
      });
      renderPics();
    },
    error(jqXHR, textStatus, errorThrown) {
      console.log(textStatus);
    },
  });
};

$('.search').on('click', () => {
  const input = $('#search').val();
  fetch(input);
});
