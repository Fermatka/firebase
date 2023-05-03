import { useEffect, useState } from "react";
import { db } from "./api/firebase";
import { collection, onSnapshot, addDoc } from "firebase/firestore";

console.log(db);
export const App = () => {
  const [Students, setStudents] = useState([]);
  const studentsCollection = collection(db, "Students");

  const getStudents = (querySnapshot) => {
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  };

  const getFormData = (event) => {
    event.preventDefault();
    const { firstName, lastName, age, yearOfStudies } =
      event.currentTarget.elements;
    const student = {
      firstName: firstName.value,
      lastName: lastName.value,
      age: Number(age.value),
      yearOfStudies: Number(yearOfStudies.value),
    };
    event.currentTarget.reset();
    return student;
  };

  const handleSubmit = (event) => {
    addDoc(studentsCollection, getFormData(event));
  };

  useEffect(() => {
    onSnapshot(studentsCollection, (querySnapshot) => {
      const Students = getStudents(querySnapshot);
      setStudents(Students);
      console.log(Students);
    });
  }, []);
  return (
    <>
      <h1>Students list</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="firstName">Podaj imię</label>
          <input type="text" name="firstName" id="firstName"></input>
        </div>
        <div>
          <label htmlFor="lastName">Podaj nazwisko</label>
          <input type="text" name="lastName" id="lastName"></input>
        </div>
        <div>
          <label htmlFor="age">Podaj wiek</label>
          <input type="number" name="age" id="age"></input>
        </div>
        <div>
          <label htmlFor="yearOfStudies">Podaj rok studiów </label>
          <input type="number" name="yearOfStudies" id="yearOfStudies"></input>
        </div>
        <button>Dodaj studenta</button>
      </form>
      <ul>
        {Students.map(({ id, firstName, lastName, age, yearOfStudies }) => (
          <li data-id={id} id={id}>
            <>
              <p>Imię: {firstName}</p>
              <p>Nazwisko: {lastName}</p>
              <p>Wiek: {age}</p>
              <p>Rok studiów: {yearOfStudies}</p>
            </>
          </li>
        ))}
      </ul>
    </>
  );
};
