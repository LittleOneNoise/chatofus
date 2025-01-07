import { ChatChannelMessageEvent } from '../dto/chatChannelMessageEvent';

/**
 * Helper function to convert protobuf JSON to DTO
 */
export function jsonToDTO(json: any): ChatChannelMessageEvent {
  return {
    content: json.content,
    channel: json.channel,
    date: json.date,
    senderCharacterId: json.senderCharacterId,
    senderAccountId: json.senderAccountId,
    senderPrefix: json.senderPrefix,
    senderName: json.senderName,
    fromAdmin: json.fromAdmin,
    object: json.object?.map((obj: any) => ({
      position: obj.position,
      item: {
        uid: obj.item?.uid,
        quantity: obj.item?.quantity,
        gid: obj.item?.gid,
        effects: obj.item?.effects,
      },
      favorite: obj.favorite,
      tagStorageUuids: obj.tagStorageUuids,
    })),
    originServerId: json.originServerId,
  };
}
