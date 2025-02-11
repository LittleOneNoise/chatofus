import {Injectable} from '@angular/core';

export interface Segment {
  type: 'text' | string; // 'text' pour le texte simple ou un nom de token (ex: 'monsterGroup')
  content?: string;      // contenu textuel pour les segments de texte
  data?: any;            // données du token pour les segments dynamiques
}

@Injectable({
  providedIn: 'root'
})
export class ChatTokenizerService {

  /**
   * Analyse le message et retourne un tableau de segments.
   */
  tokenize(message: string): Segment[] {
    message = message.replace(/\\u200b/g, '');
    const segments: Segment[] = [];
    const regex = /\{([^}]+)\}/g; // détecte les tokens délimités par { }
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    // Liste des types de tokens reconnus
    const recognizedTokens = [
      'monsterGroup',
      'chatachievement',
      'subArea',
      'map',
      'guild',
      'chatitem'
    ];

    while ((match = regex.exec(message)) !== null) {
      // Ajoute le texte précédent le token
      if (match.index > lastIndex) {
        segments.push({
          type: 'text', content: message.substring(lastIndex, match.index)
        });
      }
      // Traitement du token
      const tokenContent = match[1]; // par exemple "monsterGroup,linkColor:#E2ACECFF,6,13,1,0,-20001;0;4x5086x190|3x3567x191|1x3568x185|5x3569x197,Sans Visage"
      const parts = tokenContent.split(',');
      const tokenType = parts[0].trim();


      // Si le token n'est pas reconnu, on le traite comme du texte brut
      if (!recognizedTokens.includes(tokenType)) {
        segments.push({
          type: 'text',
          content: match[0]  // le token complet, ex: "{tokenInconnu, param1, param2}"
        });
      } else {
        // Traitement spécifique selon le type reconnu

        const tokenData: any = {};

        console.log(`tokenType détecté : ${tokenType}`);

        // {monsterGroup,linkColor:#E2ACECFF,6,13,1,0,-20001;0;4x5086x190|3x3567x191|1x3568x185|5x3569x197,Sans Visage}
        if (tokenType === 'monsterGroup') {
          tokenData.position_x = parts[2];
          tokenData.position_y = parts[3]
          tokenData.label = parts[parts.length - 1];
          console.log(`tokenData.position_x : ${tokenData.position_x}`);
          console.log(`tokenData.position_y : ${tokenData.position_y}`);
          console.log(`tokenData.label : ${tokenData.label}`);
        }
        // {chatachievement,linkColor:#E2ACECFF,6263}
        else if (tokenType === 'chatachievement') {
          tokenData.achievementId = parts[2];
          console.log(`tokenData.achievementId : ${tokenData.achievementId}`);
        }
        // {subArea,13}
        else if (tokenType === 'subArea') {
          tokenData.subareaId = parts[1];
          console.log(`tokenData.areaId : ${tokenData.subareaId}`);
        }
        // {map,linkColor:#E2ACECFF,-65,-61,1,Portail vers la dimension Enutrosor ,True}
        // {map,-56,16,10}
        else if (tokenType === 'map') {
          tokenData.position_x = parts.length > 4 ? parts[2] : parts[1];
          tokenData.position_y = parts.length > 4 ? parts[3] : parts[2];
          tokenData.label = parts.length > 4 ? parts[5] : undefined;
          console.log(`tokenData.position_x : ${tokenData.position_x}`);
          console.log(`tokenData.position_y : ${tokenData.position_y}`);
          console.log(`tokenData.label : ${tokenData.label}`);
        }
        // {guild,28812,Akattsuki,True,True}
        else if (tokenType === 'guild') {
          tokenData.label = parts[2];
          console.log(`tokenData.label : ${tokenData.label}`);
        }
        // {chatitem,8034198::[Amulette du Strigide]}
        else if (tokenType === 'chatitem') {
          tokenData.label = null;
          const regex = /::\[(.*?)\]/;
          console.log(`parts[1] : ${parts[1]}`);
          const itemName = parts[1].match(regex);
          console.log(itemName);
          if (itemName) {
            tokenData.label = itemName[1];
          }
          console.log(`tokenData.label : ${tokenData.label}`);
        }
        // Ajoute le segment de token au tableau
        segments.push({
          type: tokenType, data: tokenData
        });
      }

      lastIndex = regex.lastIndex;
    }

    // Ajoute le texte restant après le dernier token
    if (lastIndex < message.length) {
      segments.push({
        type: 'text', content: message.substring(lastIndex)
      });
    }

    return segments;
  }

}
