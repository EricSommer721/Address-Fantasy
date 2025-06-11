export interface Card {
  id: string;
  name: string;
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary';
  score: number;
  imageUrl: string;
  metadata: {
    description: string;
    attributes: Record<string, string | number>;
    createdAt: string;
    updatedAt: string;
  };
}

export interface CardPack {
  id: string;
  name: string;
  price: number; // in SOL
  dropRates: {
    Common: number;
    Rare: number;
    Epic: number;
    Legendary: number;
  };
  totalCards: number;
  isActive: boolean;
  startTime?: string;
  endTime?: string;
}

export interface User {
  id: string;
  walletAddress: string;
  inventory: {
    cards: Card[];
    cardPacks: CardPack[];
  };
  purchaseHistory: {
    timestamp: string;
    type: 'CARD_PACK' | 'CARD';
    itemId: string;
    amount: number;
    transactionHash: string;
  }[];
  createdAt: string;
  lastLoginAt: string;
}

export interface Event {
  id: string;
  name: string;
  type: 'WHITELIST_SALE' | 'AIRDROP' | 'SEASON_REWARD' | 'FLASH_EVENT';
  startTime: string;
  endTime: string;
  status: 'DRAFT' | 'ACTIVE' | 'ENDED';
  rules: {
    eligibility?: string[];
    rewards?: Record<string, any>;
    conditions?: Record<string, any>;
  };
  participants?: string[];
  createdAt: string;
  updatedAt: string;
} 