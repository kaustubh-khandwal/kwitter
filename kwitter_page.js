//YOUR FIREBASE LINKS
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

user_name = localStorage.getItem("username");
room_name = localStorage.getItem("roomname");

function getData() {
      firebase.database().ref("/" + room_name).on('value', function (snapshot) {
            document.getElementById("output").innerHTML = "";
            snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key;
                  childData = childSnapshot.val();
                  if (childKey != "purpose") {
                        firebase_message_id = childKey;
                        message_data = childData;
                        console.log(firebase_message_id);
                        console.log(message_data);
                        name = message_data['name'];
                        message = message_data['message'];
                        like = message_data['like'];
                        name_with_tag = "<h4> " + name + "<img class='user_tick' src='tick.png'>";
                        message_with_tag = "<h4 class='message_h4'>" + message + "</h4>";
                        like_button = "<button class='btn btn-warning' id=" + firebase_message_id + " value=" + like + " onclick='updateLike(this.id)'>";
                        span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'>Like: " + like + "</span></button><hr>";
                        row = name_with_tag + message_with_tag + like_button + span_with_tag;
                        document.getElementById("output").innerHTML += row;
                  }
            });
      });
}
getData();

function send() {
      var msg = document.getElementById("msg").value;
      firebase.database().ref(room_name).push({
            name: user_name,
            message: msg,
            like: 0
      });
      document.getElementById("msg").value = "";

}

function updateLike(messageid) {
    buttonid = messageid;
    likes = document.getElementById(buttonid).value;
    updatelikes = Number(likes) + 1;

    firebase.database().ref(room_name).child(messageid).update({
          like:updatelikes
    });
}

function logout() {
      localStorage.removeItem("roomname");
      localStorage.removeItem("username");
      window.location = "index.html";
}