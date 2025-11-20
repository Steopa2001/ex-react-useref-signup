import { useMemo, useState, useRef } from "react";

const letters = "abcdefghijklmnopqrstuvwxyz";
const numbers = "0123456789";
const symbols = "!@#$%^&*()-_=+[]{}|;:'\",.<>?/`~";

function App() {
  //Campi controllati
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [description, setDescription] = useState("");

  //Campi Non Controllati useRef()
  const fullNameRef = useRef();
  const specializationRef = useRef();
  const experienceYearsRef = useRef();

  //Validazione
  const isUsernameValid = useMemo(() => {
    const charsValid = username
      .split("")
      .every(
        (char) => letters.includes(char.toLowerCase()) || numbers.includes(char)
      );

    return charsValid && username.trim().length >= 6;
  }, [username]);

  const isPasswordValid = useMemo(() => {
    return (
      password.trim().length >= 8 &&
      password.split("").some((char) => letters.includes(char)) &&
      password.split("").some((char) => numbers.includes(char)) &&
      password.split("").some((char) => symbols.includes(char))
    );
  }, [password]);

  const isDescriptionValid = useMemo(() => {
    return (
      description.trim().length >= 100 && description.trim().length <= 1000
    );
  }, [description]);

  const handleSubmit = (e) => {
    e.preventDefault();

    //Valori non controllati
    const fullName = fullNameRef.current.value;
    const specialization = specializationRef.current.value;
    const experienceYears = experienceYearsRef.current.value;

    if (
      !fullName.trim() ||
      !username.trim() ||
      !password.trim() ||
      !specialization.trim() ||
      !experienceYears.trim() ||
      experienceYears <= 0 ||
      !description.trim() ||
      !isUsernameValid ||
      !isPasswordValid ||
      !isDescriptionValid
    ) {
      alert("Errore: Compilare tutti i campi correttamente.");
      return;
    }
    console.log("Submit effettuto:", {
      fullName,
      username,
      password,
      specialization,
      experienceYears,
      description,
    });
    // RESET DEI CAMPI
    fullNameRef.current.value = "";
    setUsername("");
    setPassword("");
    specializationRef.current.value = "";
    experienceYearsRef.current.value = "";
    setDescription("");
  };

  return (
    <div>
      <h1>Web Developer Signup</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Nome Completo</p>
          <input type="text" ref={fullNameRef} />
        </label>
        <label>
          <p>Username</p>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {username.trim() && (
            <p style={{ color: isUsernameValid ? "green" : "red" }}>
              {isUsernameValid
                ? "Username valido"
                : "Deve avere almeno 6 caratteri alfanumerici"}
            </p>
          )}
        </label>
        <label>
          <p>Password</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {password.trim() && (
            <p style={{ color: isPasswordValid ? "green" : "red" }}>
              {isPasswordValid
                ? "Password valida"
                : "Deve avere almeno 8 caratteri, 1 lettera, 1 numero, 1 simbolo"}
            </p>
          )}
        </label>
        <label>
          <p>Specializzazione</p>
          <select ref={specializationRef}>
            <option value="">Seleziona Specializzazione</option>
            <option value="Full Stack">Full Stack</option>
            <option value="Front-end">Front-end</option>
            <option value="Back-end">Back-end</option>
          </select>
        </label>
        <label>
          <p>Anni di esperienza</p>
          <input type="number" ref={experienceYearsRef} />
        </label>
        <label>
          <p>Descrizione</p>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          {description.trim() && (
            <p style={{ color: isDescriptionValid ? "green" : "red" }}>
              {isDescriptionValid
                ? "Descrizione valida"
                : `Deve avere tra 100 e 1000 caratteri (${
                    description.trim().length
                  })`}
            </p>
          )}
        </label>
        <button type="submit">Registrati</button>
      </form>
    </div>
  );
}

export default App;

// 📌 Milestone 1: Creare un Form con Campi Controllati

//     Crea un form di registrazione con i seguenti campi controllati (gestiti con useState):

//     ✅ Nome completo (input di testo)

//     ✅ Username (input di testo)

//     ✅ Password (input di tipo password)

//     ✅ Specializzazione (select con opzioni: "Full Stack", "Frontend", "Backend")

//     ✅ Anni di esperienza (input di tipo number)

//     ✅ Breve descrizione sullo sviluppatore (textarea)

//     Aggiungi una validazione al submit, verificando che:
//         Tutti i campi siano compilati
//         L'input Anni di esperienza sia un numero positivo
//         La Specializzazione sia selezionata

//     Al submit, se il form è valido, stampa in console i dati.

// 📌 Milestone 2: Validare in tempo reale

//     Aggiungere la validazione in tempo reale dei seguenti campi:

//     ✅ Username: Deve contenere solo caratteri alfanumerici e almeno 6 caratteri (no spazi o simboli).

//     ✅ Password: Deve contenere almeno 8 caratteri, 1 lettera, 1 numero e 1 simbolo.

//     ✅ Descrizione: Deve contenere tra 100 e 1000 caratteri (senza spazi iniziali e finali).

//     Suggerimento: Per semplificare la validazione, puoi definire tre stringhe con i caratteri validi e usare .includes() per controllare se i caratteri appartengono a una di queste categorie:

// const letters = "abcdefghijklmnopqrstuvwxyz";

// const numbers = "0123456789";

// const symbols = "!@#$%^&*()-_=+[]{}|;:'\\",.<>?/`~";

//     Per ciascuno dei campi validati in tempo reale, mostrare un messaggio di errore (rosso) nel caso non siano validi, oppure un messaggio di conferma (verde) nel caso siano validi.

// 📌 Milestone 3: Convertire i Campi Non Controllati

// Non tutti i campi del form necessitano di essere aggiornati a ogni carattere digitato. Alcuni di essi non influenzano direttamente l’interfaccia mentre l’utente li compila, quindi è possibile gestirli in modo più efficiente.

//     Analizza il form: Identifica quali campi devono rimanere controllati e quali invece possono essere non controllati senza impattare l’esperienza utente.
//     Converti i campi non controllati: Usa useRef() per gestirli e recuperare il loro valore solo al momento del submit.
//     Assicurati che la validazione continui a funzionare: Anche se un campo non è controllato, deve comunque essere validato correttamente quando l’utente invia il form.
