import { Injectable } from '@nestjs/common';
import { Channel, ChatMessage } from 'src/dto/chatMessage';

@Injectable()
export class ChatService {

    // Simule un message reçu en prenant un message random dans la liste
    addChatMessage(): void {
        const chatMessageRandom = this.chatMessages[Math.floor(Math.random() * this.chatMessages.length)];
        console.log("Message récupéré :");
        console.log(chatMessageRandom);
    }

    
    chatMessages: ChatMessage[] = [
        {
        content: "Cherche groupe pour dj mansot royal svp",
        channel: Channel.SEEK,
        date: new Date(),
        sender_character_id: 48894848646,
        sender_account_id: 89748544648,
        sender_prefix: '',
        sender_name: "Xx__Exterminator__xX",
        from_admin: false,
        object: []
    },
    {
        content: "Vend pack ocre : 250/260 archis, all boss // 140M no nego me mp",
        channel: Channel.SALES,
        date: new Date(),
        sender_character_id: 478417484,
        sender_account_id: 235198484,
        sender_prefix: '',
        sender_name: "Une_semaine_et_on_verra",
        from_admin: false,
        object: []
    },
    {
        content: "Vend {chatitem, 312598001::[Scapula de Ben le Ripate]} 480.000k",
        channel: Channel.SALES,
        date: new Date(),
        sender_character_id: 237867896786,
        sender_account_id: 7578578578,
        sender_prefix: '',
        sender_name: "Keph",
        from_admin: false,
        object: [
            {
                item: {
                    uid: 312598001,
                    quantity: 1,
                    gid: 11322
                },
                position: 0,
                favorite: false,
                tag_storage_uuids: []
            }
        ]
    },
    {
        content: "Qui est chaud pour dj eternel conflit {chatachievement,linkColor:#A66AEEFF,813} 3/x",
        channel: Channel.SALES,
        date: new Date(),
        sender_character_id: 65252426023,
        sender_account_id: 56329582,
        sender_prefix: '',
        sender_name: "Snoupyners",
        from_admin: false,
        object: []
    }];

}
