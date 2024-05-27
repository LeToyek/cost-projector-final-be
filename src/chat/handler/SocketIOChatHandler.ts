// src/chat/services/SocketIOChatService.ts
import { Socket, Server as SocketIOServer } from "socket.io";
import { MessageUseCases } from "../../application/use-cases/MessageUseCases";

export class SocketIOChatHandler {
  constructor(
    private readonly io: SocketIOServer,
    private readonly messageUseCase: MessageUseCases
  ) {}

  public init(): void {
    this.io.on("connection", (socket: Socket) => {
      console.log("A user connected");

      socket.on("chat message", async (msg: any) => {
        console.log("message: " + msg);
        this.io.emit("chat message", msg);

        // Send the message to Telegram
        const groqRes = await this.messageUseCase.createMessage(msg) // Replace with actual chat ID
        this.io.emit("chat message", groqRes);
      });

      socket.on("disconnect", () => {
        console.log("User disconnected");
      });
    });
  }
}
