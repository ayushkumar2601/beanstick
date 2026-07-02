import { runQuery, getNeo4jDriver } from './neo4j';

export interface ProviderReputation {
  wallet: string;
  successRate: number;
  settlementCount: number;
  volume: number;
}

export class ReputationService {
  async getLiquidityProviderReputation(wallet: string): Promise<ProviderReputation> {
    if (!getNeo4jDriver()) {
      // Fallback
      return { wallet, successRate: 100, settlementCount: 0, volume: 0 };
    }

    const query = `
      MATCH (lp:LiquidityProvider {wallet: $wallet})
      RETURN lp.successRate as successRate, 
             (lp.successCount + lp.failCount) as settlementCount,
             lp.totalVolume as volume
    `;

    try {
      const results = await runQuery(query, { wallet });
      if (results.length > 0) {
        return {
          wallet,
          successRate: results[0].successRate || 0,
          settlementCount: results[0].settlementCount || 0,
          volume: results[0].volume || 0
        };
      }
    } catch (err) {
      console.error('[ReputationService] Error fetching reputation:', err);
    }

    return { wallet, successRate: 100, settlementCount: 0, volume: 0 };
  }
}
