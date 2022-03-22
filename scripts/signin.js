let signUpButton = document.getElementById("signup");
let signInButton = document.getElementById("signInButton");

signUpButton.addEventListener("click", (e) => {
  window.open("https://mymoondeal.com/signup", "_blank");
});

signInButton.addEventListener("click", async (e) => {
  e.preventDefault();

  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;

  try {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    let urlencoded = new URLSearchParams();
    urlencoded.append("username", username);
    urlencoded.append("password", password);

    let requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };

    let res = await fetch(
      "https://www.api.mymoondeal.com/api/signin",
      requestOptions
    );

    let resJson = await res.json();
    if (resJson.success) {
      localStorage.setItem("token", resJson.token);
      chrome.runtime.sendMessage({greeting: "addToken", token: resJson.token}, (response) => {
          console.log(response.farewell)
      })
      window.location.href = '/background.html'
    } else {
        document.getElementById('error').innerHTML = "Incorrect username or password";
        document.getElementById("username").value = ""; 
        document.getElementById("password").value = ""; 
    }
  } catch (err) {
    document.getElementById('error').value = "An error has occurred"
  }
  
});
