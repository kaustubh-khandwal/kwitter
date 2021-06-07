var firebaseConfig = {
      apiKey: "AIzaSyCkhvA_s4hEWWEAI1LEjJuYz3GWuB2vA78",
      authDomain: "kwitter-7853b.firebaseapp.com",
      databaseURL: "https://kwitter-7853b-default-rtdb.firebaseio.com",
      projectId: "kwitter-7853b",
      storageBucket: "kwitter-7853b.appspot.com",
      messagingSenderId: "641918939723",
      appId: "1:641918939723:web:6792d7060ce6a0405c13ce"
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