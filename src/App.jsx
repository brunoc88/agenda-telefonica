import { useState, useEffect } from "react"
import { Filter, Msj, Form, List } from "./components/persons";
import { getAll, create, deletePerson } from "./services/personsServices";

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [newContact, setNewContact] = useState({ nombre: '', phone: '' });
  const [filter, setFilter] = useState('');
  const [msj, setMensaje] = useState({ exito: '', error: '' });

  useEffect(() => {
    getAll()
      .then(prev => setContacts(prev))
      .catch(error => console.log(error));
  }, []);

  const handlerFilter = (event) => {
    setFilter(event.target.value);
  };

  const handlerName = (event) => {
    setNewContact({ ...newContact, nombre: event.target.value });
  };

  const handlerPhone = (event) => {
    setNewContact({ ...newContact, phone: event.target.value });
  };

  const addContact = (event) => {
    event.preventDefault();

    const nombre = newContact.nombre.trim();
    const phone = newContact.phone.trim();

    if (!nombre || !phone) {
      alert('Debe agregar un nombre y un número telefónico!');
      return;
    }

    const nombreDuplicado = contacts.some(value => value.nombre.toLowerCase() === nombre.toLowerCase());
    const phoneDuplicado = contacts.some(value => value.phone.toLowerCase() === phone);

    if (nombreDuplicado) {
      alert('Ya existe ese nombre en la agenda!');
      return;
    }

    if (phoneDuplicado) {
      alert('Ya existe ese número de teléfono en la agenda!');
      return;
    }

    create({ nombre, phone })
      .then(prev => {
        setContacts([...contacts, prev]);
        setNewContact({ nombre: "", phone: "" });
        setMensaje({ exito: "¡Contacto agendado!", error: "" });

        setTimeout(() => {
          setMensaje({ exito: "", error: "" });
        }, 4000);
      })
      .catch(() => {
        setMensaje({ exito: "", error: "¡Error al agendar contacto!" });

        setTimeout(() => {
          setMensaje({ exito: "", error: "" });
        }, 4000);
      });
  };

  // 🔹 FILTRAR CONTACTOS BASADO EN EL NOMBRE
  const buscarContacto = contacts.filter(p =>
    p.nombre.toLowerCase().includes(filter.toLowerCase())
  );

  const deleteContact = (id) => {
    deletePerson(id)
      .then(() => {
        setContacts(prevContacts => prevContacts.filter(contact => contact.id !== id));
        setMensaje({ exito: "Contacto eliminado", error: "" });

        setTimeout(() => {
          setMensaje({ exito: "", error: "" });
        }, 4000);
      })
      .catch(() => {
        setMensaje({ exito: "", error: "Hubo un problema al eliminar el contacto" });

        setTimeout(() => {
          setMensaje({ exito: "", error: "" });
        }, 4000);
      });
  };

  return (
    <div>
      <h1>Agenda Telefónica!</h1>
      <Filter handler={handlerFilter} filter={filter} />
      <Msj msj={msj} />
      <h3>Agrega un contacto</h3>
      <Form handlerName={handlerName} handlerPhone={handlerPhone} add={addContact} newContact={newContact} />
      <List list = {filter ? buscarContacto : contacts} deleteContact={deleteContact}/>
    </div>
  );
};

export default App;