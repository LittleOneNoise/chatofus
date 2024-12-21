export class ChatMessage {
    content: string;
    channel: Channel;
    date: Date;
    sender_character_id: number;
    sender_account_id: number;
    sender_prefix: string;
    sender_name: string;
    from_admin: boolean;
    object: ObjectItemInventory[];
    origin_server_id?: number;
}

export enum Channel {
	GLOBA,
	TEAM,
	GUILD,
	ALLIANCE,
	PARTY,
	SALES,
	SEEK,
	NOOB,
	ADMIN,
	ARENA,
	PRIVATE,
	INFO,
	FIGHT_LOG,
	ADS,
	EVENT,
	EXCHANGE
}

class ObjectItemInventory {
    position: number;
	item: ObjectItem;
	favorite: boolean;
	tag_storage_uuids: string[];
}

class ObjectItem {
    uid: number;
	quantity: number
	gid: number;
	effects?: any[] // flemme d'aller plus loin pour l'instant
}