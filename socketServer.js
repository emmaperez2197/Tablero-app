const socket = (io) => {

    let connectedUsers = 0;

    io.on('connection', (socket) => {
        connectedUsers++;
        console.log(`Total connected users: ${connectedUsers}`);
        
        socket.on('login', (data) => {
              console.log(`Usuario ${data.nombre} inicio sesion`);
        
        });
              
          
        // Escucha el evento 'chat message'
        socket.on('chat:message', (data) => {
          io.sockets.emit('chat:message', data)
          
    
        });
    
        // escuchar el evento cuando alguien esta escrbiendo
        socket.on('chat:typing', (data) => {
          socket.broadcast.emit('chat:typing', data)
        })
    
        //mostrar tickets
        socket.on('ticketAgregado', (data) => {
          console.log(data  );
            socket.broadcast.emit('ticketAgregado', data)
          });
        

    
        // Escuchar el evento 'disconnect'
        socket.on('disconnect', () => {
            connectedUsers--;
            io.emit('update online users', connectedUsers);
            console.log(`User disconnected: ${socket.id}.Total connected users: ${connectedUsers} `);
        });
    
    });   
}

module.exports = socket;