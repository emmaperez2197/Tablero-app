    const socket = io();


    let username = document.getElementById('username');
    let mensajes = document.getElementById('messages');
    let boton = document.getElementById('send');
    let salidaDeMensajes = document.getElementById('salida');
    let acciones = document.getElementById('acciones');
    let ticket = document.getElementById('ticket');


    boton.addEventListener('click', ()=>{
      socket.emit('chat:message', {
        username: username.value,
        mensajes: mensajes.value,

      });
    });

    socket.on('chat:message', (data) => {
      acciones.innerHTML = ''
      mensajes.value = ''
      salidaDeMensajes.innerHTML +=`<p>
      <strong>${data.username}</strong>: ${data.mensajes}
      </p>`
    });

    
    // Escuchar el evento 'chat message' y agregar el mensaje a la lista de mensajes
    mensajes.addEventListener('keypress', ()=>{
      socket.emit('chat:typing', username.value)
    })

    socket.on('chat:typing', (data) => {
      acciones.innerHTML = `<p> ${data} esta escribiendo....</p>`
    });


    socket.on('update online users', (connectedUsers) => {
      // Actualizar el contador de usuarios en línea en tu interfaz de usuario
      const onlineUsersElement = document.getElementById('online-users');
      onlineUsersElement.textContent = `Usuarios en línea: ${connectedUsers}`;
    });



  

    // socket.on('ticketAgregado', (data)=>{
    //     console.log(data);
    // })



