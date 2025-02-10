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
    const segments: Segment[] = [];
    const regex = /\{([^}]+)\}/g; // détecte les tokens délimités par { }
    let lastIndex = 0;
    let match: RegExpExecArray | null;

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
      // {monsterGroup,linkColor:#E2ACECFF,6,13,1,0,-20001;0;4x5086x190|3x3567x191|1x3568x185|5x3569x197,Sans Visage}
      else if (tokenType === 'chatachievement') {
        tokenData.achievementId = parts[2];
        console.log(`tokenData.achievementId : ${tokenData.achievementId}`);
      }
      // {subArea,13}
      else if (tokenType === 'subArea') {
        tokenData.areaId = parts[1];
        console.log(`tokenData.areaId : ${tokenData.areaId}`);
      }
      // {map,linkColor:#E2ACECFF,-65,-61,1,Portail vers la dimension Enutrosor ,True}
      else if (tokenType === 'map') {
        tokenData.position_x = parts[2];
        tokenData.position_y = parts[3];
        tokenData.label = parts[5]
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
