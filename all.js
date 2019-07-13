let name;
let age;
let email;
let city;
let photo;
let thumbnail;
const listObj = [];

function loadNewPerson() {
  $.ajax({
    url: "https://randomuser.me/api/",
    dataType: "json",
    error: function(xhr) {
      console.log("error message:" + xhr);
    },
    success: function(data) {
      let result = data["results"];
      console.log(data);
      console.log(result);
      console.log(result[0]["gender"]);
      console.log(result[0]["email"]);
      email = result[0]["email"];
      let nameObj = result[0]["name"];
      let firstName = nameObj["first"];
      let lastName = nameObj["last"];
      console.log(nameObj["first"]);
      console.log(nameObj["last"]);
      name = firstName + " " + lastName;
      name = name.toLowerCase().replace(/\b[a-z]/g, function(letter) {
        return letter.toUpperCase();
      });
      console.log(name);
      let pictureUrlObj = result[0]["picture"];
      thumbnail = pictureUrlObj["thumbnail"];
      console.log(pictureUrlObj["large"]);
      let dobObj = result[0]["dob"];
      age = dobObj["age"];
      console.log(age);
      let location = result[0]["location"];
      city = location["city"];
      $(".imagebox img").attr("src", pictureUrlObj["large"]);
      $(".infobox h2").text(name);
    }
  });
}

function recordData() {
  let tempObj = {
    name: name,
    age: age,
    email: email,
    city: city,
    thumbnail: thumbnail
  };
  listObj.push(tempObj);
}

function drawList() {
  $(".listbox ul").prepend(
    '<li><img src="' + thumbnail + '"><p>' + name + "</p></li>"
  );
}

$(document).ready(function() {
  loadNewPerson();

  $(".yesBn").click(function() {
    loadNewPerson();
    recordData();
    drawList();
  });

  $(".noBn").click(function() {
    loadNewPerson();
  });

  $(".iconbox .name-link").hover(function() {
    $(".infobox h2").text(name);
  });
  $(".iconbox .birth-link").hover(function() {
    $(".infobox h2").text(age);
  });
  $(".iconbox .mail-link").hover(function() {
    $(".infobox h2").text(email);
  });
  $(".iconbox .loc-link").hover(function() {
    $(".infobox h2").text(city);
  });
});
