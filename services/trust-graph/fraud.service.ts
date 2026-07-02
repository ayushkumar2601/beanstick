import { runQuery, getNeo4jDriver } from './neo4j';

export interface FraudInsights {
  riskScore: number;
  reasons: string[];
}

export class FraudService {
  async evaluateFraudRisk(wallet: string): Promise<FraudInsights> {
    if (!getNeo4jDriver()) {
      return { riskScore: 0, reasons: [] };
    }

    let riskScore = 0;
    const reasons: string[] = [];

    try {
      // 1. High Failure Rate Check
      const failureQuery = `
        MATCH (lp:LiquidityProvider {wallet: $wallet})
        RETURN lp.failCount as failCount, lp.successCount as successCount
      `;
      const fails = await runQuery(failureQuery, { wallet });
      if (fails.length > 0) {
        const { failCount, successCount } = fails[0];
        const total = failCount + successCount;
        if (total > 5 && failCount / total > 0.3) {
          riskScore += 40;
          reasons.push('High rate of failed settlements (>30%)');
        }
      }

      // 2. Circular Trading Detection (A -> B -> A)
      const circularQuery = `
        MATCH (lp:LiquidityProvider {wallet: $wallet})<-[:TRADED_WITH]-(u:User)-[:TRADED_WITH]->(other:LiquidityProvider)
        WHERE lp.wallet <> other.wallet
        WITH lp, other, count(u) as sharedUsers
        WHERE sharedUsers > 5
        RETURN sharedUsers
      `;
      const circular = await runQuery(circularQuery, { wallet });
      if (circular.length > 0) {
        riskScore += 30;
        reasons.push('Suspicious clustering detected (high density of shared counterparty trading)');
      }
      
    } catch (err) {
      console.error('[FraudService] Error evaluating risk:', err);
    }

    // Cap risk score at 100
    riskScore = Math.min(riskScore, 100);

    return { riskScore, reasons };
  }
}
