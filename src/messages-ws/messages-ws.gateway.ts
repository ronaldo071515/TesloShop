import { JwtService } from '@nestjs/jwt';
import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';

import { MessagesWsService } from './messages-ws.service';
import { NewMessageDto } from './dtos/new-message.dto';

import { JwtPayload } from '../auth/interface';

@WebSocketGateway({ cors: true })
export class MessagesWsGateway implements OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer() wsServer: Server;

  constructor(
    private readonly messagesWsService: MessagesWsService,
    private readonly jwtService: JwtService) 
  {}

  
  async handleConnection(client: Socket) {
    const token = client.handshake.headers.autentication as string;
    let payload: JwtPayload;
    try {
      
      payload = this.jwtService.verify( token );
      await this.messagesWsService.registerClient( client, payload.id );

    } catch (error) {
      client.disconnect();
      return;
    }

    // console.log({ payload });
    this.wsServer.emit('clients-updated', this.messagesWsService.getConnectedClients());
    
  }
  
  handleDisconnect(client: Socket) {
    this.messagesWsService.removeClient( client.id );

    this.wsServer.emit('clients-updated', this.messagesWsService.getConnectedClients());
  
  }

  //Escuchar el cliente
  @SubscribeMessage('message-from-client')
  async handleMessageFromClient(cliente: Socket, payload: NewMessageDto) {
    
    //! emite unicamente al cliente
    /* cliente.emit('message-from-server', {
      fullName: 'Ronaldo',
      message: payload.message || 'No message'
    }); */

    //! emitir a todos menos al cliente inicial
    /* cliente.broadcast.emit('message-from-server', {
      fullName: 'Ronaldo',
      message: payload.message || 'No message'
    }); */

    //! para todos todos!
    this.wsServer.emit('message-from-server', {
      fullName: this.messagesWsService.getUserFullNameBySocketId( cliente.id ),
      message: payload.message || 'No message'
    });

  }

}
