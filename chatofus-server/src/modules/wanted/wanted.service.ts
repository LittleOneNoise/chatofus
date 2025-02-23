import { Injectable, Logger } from '@nestjs/common';
import { ChatChannelMessageEvent } from '../chat/dto/chatChannelMessageEvent';
import { PrismaService } from '../../common/prisma/prisma.service';
import { Wanted, wantedDataset } from './dataset/wanted-dataset';
import { Match } from './dto/match';
import { GroupedMatch } from './dto/grouped-match';
import { Searcher } from 'fast-fuzzy';
import { WantedAnalyzerResult } from './dto/wanted-analyzer-result';

@Injectable()
export class WantedService {
  private readonly logger = new Logger(WantedService.name);

  constructor(private readonly prismaService: PrismaService) {}

  /**
   * Fonction principale d'analyse du message.
   * Elle fait appel à différentes méthodes en fonction de plusieurs scénarios. Cela permet notamment d'optimiser
   * l'indice de confiance du résultat.
   * @param chatChannelMessageEvent L'objet contenant le message
   */
  analyzeMessage(chatChannelMessageEvent: ChatChannelMessageEvent) {
    const chatChannelMessage = chatChannelMessageEvent?.content;
    if (!chatChannelMessage) return;

    // check 1 : monsterGroup avec nom avis de recherche (pos ne doit pas être temple des justiciers : [4,4])
    const analyzeMonsterGroupCase =
      this.analyzeMonsterGroupCase(chatChannelMessage);
    if (analyzeMonsterGroupCase) {
      this.addDevWantedDataset(analyzeMonsterGroupCase).then();
      return;
    }
    // check 2 : map (pos ne doit pas être temple des justiciers : [4,4]) + nom avis de recherche (regex doit autoriser faute d'orthographe et/ou un seul nom si nom composé)
    const analyzeMapCase = this.analyzeMapCase(chatChannelMessage);
    if (analyzeMapCase) {
      this.addDevWantedDataset(analyzeMapCase).then();
      return;
    }
    // check 3 : nom avis de recherche (regex doit autoriser faute d'orthographe et/ou un seul nom si nom composé) + mot clés pertinents : recrute, avis, recherché, pos/position, trouvé
    // const analyzeOtherCases = this.analyzeOtherCases(chatChannelMessage);
    // if (analyzeOtherCases) {
    //   this.addDevWantedDataset(analyzeOtherCases);
    // }
  }

  /**
   * Fonction d'analyse du message MONSTERGROUP.
   * Elle extrait le token, vérifie le type "monsterGroup", contrôle la position et lance l'analyse fuzzy.
   * @param chatChannelMessage Le message à analyser
   */
  analyzeMonsterGroupCase(chatChannelMessage: string): WantedAnalyzerResult {
    // Extraction du token depuis le contenu du message
    const tokenData = this.parseBracedToken(chatChannelMessage);

    // Si aucun pattern accolades n'est détecté ou que le token n'est pas de type "monsterGroup", on arrête.
    if (!tokenData || tokenData.type !== 'monsterGroup') {
      return null;
    }

    const parts = tokenData.parts;
    // Si ce match cible la base des justiciers [4,4], on ne poursuit pas le traitement.
    if (parts[2] === '4' && parts[3] === '4') {
      return null;
    }

    // Récupère le nom du mob principal du groupe de mobs
    this.logger.log('Pattern monsterGroup détecté et pas [4,4]');
    const mobName = parts[parts.length - 1];
    this.logger.log(`Mob : ${mobName}`);

    // Recherche dans le dataset si ce nom correspond à un avis de recherche
    const wanted: Wanted | undefined = this.getWantedByName(mobName);
    if (wanted) {
      this.logger.log(`It's a match !`);
      return {
        mobName: wanted.nom.fr,
        message: chatChannelMessage,
        confidenceIndex: 100,
        correspondanceList: '',
      };
    } else {
      this.logger.warn(
        `${mobName} n'est pas un avis de recherche présent dans le dataset`,
      );
      return null;
    }
  }

  /**
   * Fonction d'analyse du message MAP.
   * Elle extrait le token, vérifie le type "map", contrôle la position et lance l'analyse fuzzy.
   * @param chatChannelMessage Le message à analyser
   */
  analyzeMapCase(chatChannelMessage: string): WantedAnalyzerResult {
    const tokenData = this.parseBracedToken(chatChannelMessage);

    // Si aucun pattern accolade n'est détecté
    if (!tokenData) {
      this.logger.warn('Pas de match de braces');
      return null;
    }

    // Si le token n'est pas de type "map", on arrête l'analyse
    if (tokenData.type !== 'map') {
      return;
    }

    const mapToken = this.processMapToken(tokenData.parts);
    if (!mapToken) {
      this.logger.warn('Token map invalide');
      return null;
    }

    const { posX, posY } = mapToken;
    // Si ce match cible la base des justiciers [4,4], ne pas continuer
    if (posX === '4' && posY === '4') {
      return null;
    }

    // Extraire la liste des noms candidats
    const candidateNames = this.getCandidateNames();

    this.logger.log(
      "Début d'analyse pour trouver match nom avis de recherche...",
    );
    const start = performance.now();

    // Créer une instance de FastFuzzy avec un seuil adapté
    const searcher = new Searcher(candidateNames, {
      threshold: 0.85,
      returnMatchData: true,
    });

    // Découper le message en mots
    const tokens = chatChannelMessage
      .replaceAll(`'`, ' ')
      .split(/\s+/)
      .filter((item) => item.length >= 3);

    // Rechercher parmi les tokens
    const correspondanceList: string[] = [];
    const results = tokens.flatMap((token) => {
      // Recherche des correspondances pour le token
      const tokenResults = searcher.search(token);

      // Filtrer les résultats en vérifiant que la longueur du match est cohérente
      const filteredResults = tokenResults.filter((result) => {
        const { index, length } = result.match;
        const fullWord = this.getFullMatchedWord(result.item, index, length);
        const matchedSubstring = result.item.substring(index, index + length);
        // Filtre les termes qui ont trop d'écart de taille et apportent des faux positifs
        return this.checkWordLengthMatch(fullWord, matchedSubstring);
      });

      if (filteredResults.length > 0) {
        this.logger.log('---------------');
        this.logger.log(`Mot [${token}]`);
        filteredResults.forEach((result) => {
          const { index, length } = result.match;
          // Encadrer la sous-chaîne matchée avec des crochets
          const correspondance =
            result.item.substring(0, index) +
            `[${result.item.substring(index, index + length)}]` +
            result.item.substring(index + length);
          this.logger.log(`Correspondance trouvée : ${correspondance}`);
          correspondanceList.push(correspondance);

          const fullWord = this.getFullMatchedWord(result.item, index, length);
          this.logger.log(`Mot complet trouvé : ${fullWord}`);
        });
      }
      return filteredResults;
    });

    const groupedData = this.groupMatches(results);
    this.logger.log(groupedData);

    const finalMatch = this.getBestMatch(groupedData);
    this.logger.log('finalMatch:');
    this.logger.log(finalMatch);

    const end = performance.now();
    this.logger.log(`Analyse effectuée en ${end - start} ms.`);

    const wantedFrenchName = this.getWantedByName(finalMatch?.item);

    if (finalMatch && wantedFrenchName) {
      this.logger.log(`It's a match !`);
      return {
        mobName: wantedFrenchName.nom.fr,
        message: chatChannelMessage,
        confidenceIndex: finalMatch.score * 100,
        correspondanceList: correspondanceList.toString(),
      };
    } else {
      this.logger.warn(
        `Pas de match avec un avis de recherche présent dans le dataset`,
      );
      return null;
    }
  }

  async addDevWantedDataset(wantedAnalyzerResult: WantedAnalyzerResult) {
    await this.prismaService.devWantedDataset.create({
      data: {
        wantedName: wantedAnalyzerResult.mobName,
        messageChat: wantedAnalyzerResult.message,
        confidenceIndex: wantedAnalyzerResult.confidenceIndex,
        correspondanceList: wantedAnalyzerResult.correspondanceList,
      },
    });
  }

  /**
   * Retourne le mot complet dans la chaîne de référence en étendant la sous-chaîne matchée
   * aux caractères alphanumériques adjacents.
   *
   * @param reference La chaîne dans laquelle chercher le mot complet.
   * @param index L'index de départ de la sous-chaîne qui a matché.
   * @param length La longueur de la sous-chaîne qui a matché.
   * @returns Le mot complet trouvé dans la référence.
   */
  getFullMatchedWord(reference: string, index: number, length: number): string {
    // Expression régulière unique pour les caractères alphanumériques
    const wordCharRegex = /\w/;
    const refLength = reference.length;

    // Recherche du début du mot en reculant tant que le caractère précédent est alphanumérique
    let start = index;
    while (start > 0 && wordCharRegex.test(reference[start - 1])) {
      start--;
    }

    // Recherche de la fin du mot en avançant tant que le caractère courant est alphanumérique
    let end = index + length;
    while (end < refLength && wordCharRegex.test(reference[end])) {
      end++;
    }

    return reference.substring(start, end);
  }

  /**
   * Vérifie que la longueur de la sous-chaîne matchée est cohérente avec celle du mot complet.
   * La tolérance dépend de la longueur du mot complet :
   * - 4 caractères ou moins : la sous-chaîne doit être exactement de la même longueur.
   * - Entre 5 et 8 caractères : une différence d'un caractère est tolérée.
   * - Plus de 8 caractères : une différence de deux caractères est tolérée.
   *
   * @param fullWord Le mot complet obtenu.
   * @param substring La sous-chaîne matchée.
   * @returns true si la longueur de la sous-chaîne respecte la tolérance autorisée, false sinon.
   */
  checkWordLengthMatch(fullWord: string, substring: string): boolean {
    const fullLen = fullWord.length;
    const subLen = substring.length;

    // Définition de la tolérance en fonction de la longueur du mot complet
    let allowedDiff = 0;
    if (fullLen > 4 && fullLen <= 8) {
      allowedDiff = 1;
    } else if (fullLen > 8) {
      allowedDiff = 2;
    }

    const lengthCheckOk =
      subLen === fullLen || subLen === fullLen - allowedDiff;

    if (!lengthCheckOk) {
      this.logger.warn(
        `Le mot de référence [${fullWord}](l:${fullLen}) et la substring [${substring}](l:${subLen}) ont une différence de taille trop importante`,
      );
    }

    return lengthCheckOk;
  }

  /**
   * Extrait le contenu entre accolades dans le message.
   * @param message Le message à analyser
   * @returns Un objet contenant le type et la liste des parties du token ou null si non trouvé
   */
  parseBracedToken(message: string): { type: string; parts: string[] } | null {
    const regex = /\{([^}]+)\}/; // détecte les tokens délimités par { }
    const match = regex.exec(message);
    if (!match) {
      return null;
    }
    const parts = match[1].split(',').map((part) => part.trim());
    return { type: parts[0], parts };
  }

  /**
   * Traite le token de type "map" et en extrait les positions.
   * @param parts Les parties extraites du token
   * @returns Un objet contenant posX et posY ou null si les données sont insuffisantes
   */
  processMapToken(parts: string[]): { posX: string; posY: string } | null {
    let posX: string, posY: string;
    if (parts.length > 4) {
      // Cas où le token contient plus de 4 éléments
      posX = parts[2];
      posY = parts[3];
    } else if (parts.length >= 3) {
      // Cas standard
      posX = parts[1];
      posY = parts[2];
    } else {
      return null;
    }
    return { posX, posY };
  }

  /**
   * Extrait la liste des noms candidats depuis le dataset voulu.
   * Ici, on utilise les noms en français, anglais et espagnol.
   */
  getCandidateNames(): string[] {
    return wantedDataset.flatMap((item) => [
      item.nom.fr,
      item.nom.en,
      item.nom.es,
    ]);
  }

  /**
   * Recherche dans le dataset si le nom (en minuscules) correspond à un avis de recherche.
   * @param mobName Le nom du mob à rechercher
   * @returns L'avis de recherche correspondant ou undefined
   */
  getWantedByName(mobName: string): Wanted | undefined {
    if (!mobName) return null;
    return wantedDataset.find(
      (item) =>
        item.nom.fr.toLowerCase() === mobName.toLowerCase() ||
        item.nom.en.toLowerCase() === mobName.toLowerCase() ||
        item.nom.es.toLowerCase() === mobName.toLowerCase(),
    );
  }

  /**
   * Groupe les résultats de recherche afin de compter les occurrences pour chaque correspondance.
   * @param matches Liste des correspondances trouvées
   * @returns Tableau des correspondances groupées
   */
  groupMatches(matches: Match[]): GroupedMatch[] {
    const groupedMap = new Map<string, GroupedMatch>();

    for (const m of matches) {
      // Construire une clé unique à partir de "item" et "score"
      const compositeKey = `${m.item}|${m.score}`;
      if (groupedMap.has(compositeKey)) {
        // Si le groupe existe déjà, on incrémente le compteur
        groupedMap.get(compositeKey)!.occurrence++;
      } else {
        // Sinon, on ajoute le nouvel élément avec occurrence initialisée à 1
        groupedMap.set(compositeKey, { ...m, occurrence: 1 });
      }
    }

    // Retourne un tableau contenant les éléments groupés
    return Array.from(groupedMap.values());
  }

  /**
   * Retourne la meilleure correspondance en triant d'abord par occurrence décroissante,
   * puis par score décroissant en cas d'égalité.
   * @param groupedMatches Liste des correspondances groupées
   * @returns La meilleure correspondance ou undefined si aucune correspondance n'est trouvée
   */
  getBestMatch(groupedMatches: GroupedMatch[]): GroupedMatch | null {
    if (groupedMatches.length === 0) {
      return null;
    }
    groupedMatches.sort((a, b) => {
      if (b.occurrence !== a.occurrence) {
        return b.occurrence - a.occurrence;
      }
      return b.score - a.score;
    });
    return groupedMatches[0];
  }
}
