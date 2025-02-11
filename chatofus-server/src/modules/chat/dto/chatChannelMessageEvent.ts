// Enums
export enum Channel {
  GLOBAL = 0,
  TEAM = 1,
  GUILD = 2,
  ALLIANCE = 3,
  PARTY = 4,
  SALES = 5,
  SEEK = 6,
  NOOB = 7,
  ADMIN = 8,
  ARENA = 9,
  PRIVATE = 10,
  INFO = 12,
  FIGHT_LOG = 13,
  ADS = 14,
  EVENT = 15,
  EXCHANGE = 16,
}

// Common types needed for ObjectItemInventory
export interface ObjectEffect {
  action: number;
  valueString?: string;
  valueInt?: number;
  minMax?: {
    min: number;
    max: number;
  };
  dice?: {
    num: number;
    side: number;
    const: number;
  };
  date?: {
    year: number;
    month: number;
    day: number;
    hour: number;
    minute: number;
  };
  durationMinute?: number;
  creatureFamily?: number;
  monsterCount?: {
    creatureFamily: number;
    count: number;
  };
  mount?: {
    certificateId: number;
    dateExpiration: string;
    modelId: number;
    mountName: string;
    ownerName: string;
    mountLevel: number;
    mountGender: number;
    rideable: boolean;
    impregnated: boolean;
    impregnateReady: boolean;
    reproductionCount: number;
    reproductionMax: number;
    effect: ObjectEffect[];
    capacity: number[];
  };
}

export interface ObjectItem {
  uid: number;
  quantity: number;
  gid: number;
  effects: ObjectEffect[];
}

export interface ObjectItemInventory {
  position: number;
  item: ObjectItem;
  favorite: boolean;
  tagStorageUuids: string[];
}

// Main ChatChannelMessageEvent interface
export interface ChatChannelMessageEvent {
  content: string;
  channel: string;
  date: string;
  senderCharacterId: number;
  senderAccountId: number;
  senderPrefix: string;
  senderName: string;
  fromAdmin: boolean;
  object: ObjectItemInventory[];
  originServerId?: number;
}
