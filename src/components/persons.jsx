
const Filter = ({ handler, filter }) => {
    return (
        <div>Filtrar por nombre:<input value ={filter} onChange={handler} /></div>
    )
}

const Form = ({ handlerName, handlerPhone, add, newContact }) => {
    return (
      <div>
        <form onSubmit={add} method="post">
          <div>
            Nombre:
            <input type="text" value={newContact.nombre} onChange={handlerName} />
          </div>
          <div>
            Teléfono:
            <input type="text" value={newContact.phone} onChange={handlerPhone} />
          </div>
          <button type="submit">Enviar</button>
        </form>
      </div>
    );
};
  
const List = ({ list, deleteContact }) => {
    if (list.length === 0) {
        return <div>No hay contactos que coincidan con la búsqueda</div>;
    }
    return (
        <div>
            <Person list={list} deleteContact={deleteContact} />
        </div>
    );
};


const Person = ({ list, deleteContact }) => {
    return (
        <div>
            <ol>
                {list.map(value => (
                    <li key={value.id}>
                        {value.nombre} {value.phone} 
                        <button onClick={() => deleteContact(value.id)}>Eliminar</button>
                    </li>
                ))}
            </ol>
        </div>
    );
};

const Msj = ({ msj }) => {
    if (!msj || (!msj.exito && !msj.error)) {
        return null; // No muestra nada si no hay mensaje
    }

    if (msj.exito) {
        return <div className="success">{msj.exito}</div>;
    }

    if (msj.error) {
        return <div className="error">{msj.error}</div>;
    }
};

export { Filter, Msj, Form, List };
