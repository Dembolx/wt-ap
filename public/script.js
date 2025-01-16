// Konfiguracja Firebase
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
};

// Inicjalizacja Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Obsługa formularza
document
  .getElementById("responseForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    const response = e.target.querySelector('button[type="submit"]:focus')
      .dataset.response;
    const confirmationMessage =
      response === "yes" ? "Dziękuję! Czekam na Ciebie!" : "Rozumiem, szkoda!";
    document.getElementById("confirmation").textContent = confirmationMessage;

    // Zapisz odpowiedź w Firestore
    db.collection("responses")
      .add({
        response: response,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        console.log("Odpowiedź została zapisana");
      })
      .catch((error) => {
        console.error("Błąd zapisywania odpowiedzi: ", error);
      });
  });
