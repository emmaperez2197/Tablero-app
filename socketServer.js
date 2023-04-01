const {decode} = require('./helpers/JwtToken')

const usuarios = {}
const socketConnection = (io) => {

    let connectedUsers = 0;

    return io.on('connection', (socket) => {


      connectedUsers++;
      socket.join("chat");
      socket.join("ticket");

      console.log(`Total connected users: ${connectedUsers}`);
        
      socket.on('login', (data) => {
              
          console.log(`Usuario ${data.token} inicio sesion`);

          try {
            const verify = decode(data.token);

            socket.usuario = verify;
           
          } catch(error) {
            return  socket.emit('loginResponse', null) ;
          }
          usuarios[socket.usuario._id.toString()] = socket;

          socket.on('disconnect', () => {
          
            delete usuarios[socket.usuario._id.toString()]
        });
    
        socket.emit('loginResponse', socket.usuario)

        socket.on('chat:message', (data) => {
          if (socket.usuario) {
            io.to('chat').emit('chat:message', data);
          }
        });
    

        socket.on('chat:typing', (data) => {
          socket.broadcast.emit('chat:typing', data)
        })

        

        });

        socket.on('moveTicket', (ticket)=>{
          io.emit('movedTicket', `me ejecute, ${ticket}`)
        })


        ticketMessages({nombre:'emma'})

        // Escuchar el evento 'disconnect'
        socket.on('disconnect', () => {

            connectedUsers--;

            io.emit('update online users', connectedUsers);
            console.log(`User disconnected: ${socket.id}.Total connected users: ${connectedUsers} `);
        });
    
    });   


  }
  
  // const messagesTochat = (messages)=>{
  //   io.to("chat").emit("chatMessages", messages);
  
  // }
  
  const ticketMessages = (obj)=>{
    io.to("ticket").emit("ticketChanges",obj);
  }


const getDataTicket =  ticket => ticket

module.exports = {
  socketConnection,
  usuarios,
//   messagesTochat,
//   ticketMessages,
};