import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ColorGeneratorService {
  private colorCache: Map<string, string> = new Map();

  private colors: string[] = [
    // Rouges
    '#FF4A4A', '#FF6B6B', '#FF8585', '#FF9999', '#FFB3B3', '#FF7675',

    // Oranges
    '#FF8B3D', '#FFA552', '#FFB347', '#FFC168', '#FFD08A', '#FFAE64',

    // Jaunes
    '#FAA61A', '#FFD93D', '#FFF3B2', '#FFE16B', '#FFD700', '#FFED4A',

    // Verts
    '#2AC075', '#4CD137', '#A8E6CF', '#3DC795', '#44BD32', '#68C151',
    '#98FB98', '#00B894', '#55EFC4', '#00D2A0', '#20E3B2', '#2ED573',

    // Cyans
    '#54C8FF', '#00CEC9', '#81ECEC', '#7AD3F0', '#48DBFB', '#0ABDE3',

    // Bleus
    '#4CA3DD', '#74B9FF', '#6C5CE7', '#A4B0FC', '#4834D4', '#686DE0',
    '#4834D4', '#45AAF2', '#2980B9', '#3498DB', '#2E86DE', '#54A0FF',

    // Violets
    '#9146FF', '#A55EEA', '#8C7AE6', '#B19CD9', '#D6A2E8', '#BF55EC',
    '#A364E7', '#9B59B6', '#8E44AD', '#CC99FF', '#B794F4', '#7E57C2',

    // Roses
    '#FF6B81', '#FF7AC6', '#FF9FF3', '#F78FB3', '#FF66AA', '#FF69B4',
    '#FF77CC', '#FF85E0', '#FFA6D5', '#FF92BB', '#FFB6C1', '#FF99CC',

    // Tons chauds
    '#E17055', '#E27802', '#FF9F43', '#EE5253', '#FF8A5C', '#FF785B',
    '#F19066', '#FFB8B8', '#FF9F1C', '#FFAF40', '#FA8231', '#FD9644',

    // Tons froids
    '#B4B4FF', '#778BEB', '#786FA6', '#7B8788', '#99AAAB', '#87A4E7',
    '#4B7BEC', '#45AAF2', '#2F89FC', '#2B8ED4', '#3867D6', '#4B6584'
  ];

  getColorForUsername(username: string): string {
    if (this.colorCache.has(username)) {
      return this.colorCache.get(username)!;
    }

    const index = this.hashString(username) % this.colors.length;
    const color = this.colors[index];

    this.colorCache.set(username, color);

    return color;
  }

  private hashString(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return Math.abs(hash);
  }
}
