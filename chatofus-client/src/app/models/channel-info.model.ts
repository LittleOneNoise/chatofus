import {Channel} from '../dto/chatChannelMessageEvent';

export interface ChannelInfo {
  name: string;
  color: string;
  bgClass: string;
}

export const CHANNEL_CONFIG: Record<Channel, ChannelInfo> = {
  [Channel.GLOBAL]: { name: 'Global', color: 'text-slate-400', bgClass: 'bg-slate-900/20' },
  [Channel.TEAM]: { name: 'Team', color: 'text-green-400', bgClass: 'bg-green-900/20' },
  [Channel.GUILD]: { name: 'Guilde', color: 'text-purple-400', bgClass: 'bg-purple-900/20' },
  [Channel.ALLIANCE]: { name: 'Alliance', color: 'text-indigo-400', bgClass: 'bg-indigo-900/20' },
  [Channel.PARTY]: { name: 'Groupe', color: 'text-emerald-400', bgClass: 'bg-emerald-900/20' },
  [Channel.SALES]: { name: 'Ventes', color: 'text-amber-400', bgClass: 'bg-amber-900/20' },
  [Channel.SEEK]: { name: 'Recherche', color: 'text-pink-400', bgClass: 'bg-pink-900/20' },
  [Channel.NOOB]: { name: 'Débutant', color: 'text-lime-400', bgClass: 'bg-lime-900/20' },
  [Channel.ADMIN]: { name: 'Admin', color: 'text-red-400', bgClass: 'bg-red-900/20' },
  [Channel.ARENA]: { name: 'Arène', color: 'text-orange-400', bgClass: 'bg-orange-900/20' },
  [Channel.PRIVATE]: { name: 'Privé', color: 'text-blue-400', bgClass: 'bg-blue-900/20' },
  [Channel.INFO]: { name: 'Info', color: 'text-sky-400', bgClass: 'bg-sky-900/20' },
  [Channel.FIGHT_LOG]: { name: 'Combat', color: 'text-rose-400', bgClass: 'bg-rose-900/20' },
  [Channel.ADS]: { name: 'Annonces', color: 'text-yellow-400', bgClass: 'bg-yellow-900/20' },
  [Channel.EVENT]: { name: 'Événement', color: 'text-violet-400', bgClass: 'bg-violet-900/20' },
  [Channel.EXCHANGE]: { name: 'Échange', color: 'text-teal-400', bgClass: 'bg-teal-900/20' }
} as const;
