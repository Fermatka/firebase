import { useEffect, useState } from "react";
import { db } from "./api/firebase";
import { collection, onSnapshot, doc } from "firebase/firestore";

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

  useEffect(() => {
    onSnapshot(studentsCollection, (querySnapshot) => {
      const Students = getStudents(querySnapshot);
      setStudents(Students);
      console.log(Students);
    });
  }, []);
  return (
    <>
      <h1>Students list!</h1>
      <ul>
        {Students.map(({ id, firstName, lastName, age, yearOfStudies }) => (
          <li data-id={id} id={id}>
            <>
              <p>Imię: {firstName}</p>
              <p>Nazwisko:{lastName}</p>
              <p>Wiek:{age}</p>
              <p>Rok studiów:{yearOfStudies}</p>
            </>
          </li>
        ))}
      </ul>
    </>
  );
};
