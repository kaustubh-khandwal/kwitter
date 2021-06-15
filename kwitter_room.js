var firebaseConfig = {
    apiKey: "AIzaSyBnIU5dzYNKN0Kb1l8Ss1uijsbSymWLnrQ",
    authDomain: "kwitter2-o.firebaseapp.com",
    databaseURL: "https://kwitter2-o-default-rtdb.firebaseio.com",
    projectId: "kwitter2-o",
    storageBucket: "kwitter2-o.appspot.com",
    messagingSenderId: "432899930216",
    appId: "1:432899930216:web:3975829826caf0daaaa3dd",
    measurementId: "G-VK2X5DDN8E"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

var username = localStorage.getItem("username");
document.getElementById("username").innerHTML = "Welcome " + username + " !";


function redirectToRoomName(name) {
      console.log(name);
      localStorage.setItem("roomname", name);
      window.location = "kwitter_page.html";
}

function getData() {
      firebase.database().ref("/").on('value', function (snapshot) {
            document.getElementById("output").innerHTML = "";
            snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key;
                  Room_names = childKey;
                  //Start code
                  console.log(Room_names);
                  row = "<div class='room_name' id=" + Room_names + " onclick='redirectToRoomName(this.id)' >#" + Room_names + "</div><hr>";
                  document.getElementById("output").innerHTML += row;
                  console.log(row)
                  //End code
            });
      });
}
getData();

function addroom() {
      Room_name = document.getElementById("roomname").value;
      firebase.database().ref("/").child(Room_name).update({
            porpose: "adding room name"
      });
      localStorage.setItem("roomname", Room_name);
      window.location = "kwitter_page.html";
}



function logout() {
      localStorage.removeItem("roomname");
      localStorage.removeItem("username");
      window.location = "index.html";
}