import {
  Channel,
  ChatChannelMessageEvent,
} from '../dto/chatChannelMessageEvent';

interface ValidationError {
  field: string;
  expected: string;
  received: string | undefined;
}

interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

/**
 * Type guard to check if a JSON object matches the ChatChannelMessageEvent interface
 * Returns detailed information about any validation errors found
 */
export function validateChatChannelMessageEvent(obj: any): ValidationResult {
  const errors: ValidationError[] = [];

  if (!obj) {
    return {
      isValid: false,
      errors: [{ field: 'root', expected: 'object', received: typeof obj }],
    };
  }

  // Helper function to check field type
  const validateField = (
    fieldName: string,
    expectedType: string,
    value: any,
  ) => {
    const actualType = Array.isArray(value) ? 'array' : typeof value;
    if (actualType !== expectedType) {
      errors.push({
        field: fieldName,
        expected: expectedType,
        received: actualType,
      });
    }
  };

  // Required fields validation
  validateField('content', 'string', obj.content);
  validateField('channel', 'number', obj.channel);
  validateField('date', 'string', obj.date);
  validateField('senderCharacterId', 'number', obj.senderCharacterId);
  validateField('senderAccountId', 'number', obj.senderAccountId);
  validateField('senderPrefix', 'string', obj.senderPrefix);
  validateField('senderName', 'string', obj.senderName);
  validateField('fromAdmin', 'boolean', obj.fromAdmin);
  validateField('object', 'array', obj.object);

  // Additional validation for channel enum values
  if (
    typeof obj.channel === 'number' &&
    !Object.values(Channel).includes(obj.channel)
  ) {
    errors.push({
      field: 'channel',
      expected: `enum value (${Object.keys(Channel).join(', ')})`,
      received: `${obj.channel}`,
    });
  }

  // Validate object array items if present
  if (Array.isArray(obj.object)) {
    obj.object.forEach((item, index) => {
      if (!item || typeof item !== 'object') {
        errors.push({
          field: `object[${index}]`,
          expected: 'ObjectItemInventory',
          received: typeof item,
        });
        return;
      }

      // Validate ObjectItemInventory structure
      validateField(`object[${index}].position`, 'number', item.position);
      validateField(`object[${index}].favorite`, 'boolean', item.favorite);
      validateField(
        `object[${index}].tagStorageUuids`,
        'array',
        item.tagStorageUuids,
      );

      // Validate nested ObjectItem
      if (!item.item || typeof item.item !== 'object') {
        errors.push({
          field: `object[${index}].item`,
          expected: 'ObjectItem',
          received: typeof item.item,
        });
      } else {
        validateField(`object[${index}].item.uid`, 'number', item.item.uid);
        validateField(
          `object[${index}].item.quantity`,
          'number',
          item.item.quantity,
        );
        validateField(`object[${index}].item.gid`, 'number', item.item.gid);
        validateField(
          `object[${index}].item.effects`,
          'array',
          item.item.effects,
        );
      }
    });
  }

  // Optional field validation
  if ('originServerId' in obj && obj.originServerId !== undefined) {
    validateField('originServerId', 'number', obj.originServerId);
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Type guard function that uses the validator
 */
export function isChatChannelMessageEvent(
  obj: any,
): obj is ChatChannelMessageEvent {
  const validationResult = validateChatChannelMessageEvent(obj);
  return validationResult.isValid;
}

/**
 * Helper function to convert protobuf JSON to DTO
 */
export function jsonToDTO(json: any): ChatChannelMessageEvent {
  // Validate input
  // if (!isChatChannelMessageEvent(json)) {
  //   throw new Error('Invalid ChatChannelMessageEvent format');
  // }

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
