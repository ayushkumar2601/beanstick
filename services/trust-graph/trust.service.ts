import { ReputationService } from './reputation.service';
import { FraudService } from './fraud.service';
import { getNeo4jDriver } from './neo4j';

export interface TrustEvaluation {
  trustScore: number;
  reputation: any;
  fraud: any;
}

export class TrustService {
  private repService = new ReputationService();
  private fraudService = new FraudService();

  async calculateTrustScore(lpWallet: string): Promise<TrustEvaluation> {
    if (!getNeo4jDriver()) {
      // Graceful fallback for Fiat Agent if Neo4j is offline
      return {
        trustScore: 100, // perfect score to fall back to purely price-based logic
        reputation: { successRate: 100, settlementCount: 0, volume: 0 },
        fraud: { riskScore: 0, reasons: [] }
      };
    }

    const rep = await this.repService.getLiquidityProviderReputation(lpWallet);
    const fraud = await this.fraudService.evaluateFraudRisk(lpWallet);

    // Formula:
    // 40% Settlement Reliability (successRate)
    // 25% Volume (normalized, simplified for now: 100 points if volume > 1000)
    // 20% Network Reputation (stubbed to 100 for now, could be connected to TRUSTS edges)
    // 15% Fraud Risk (inverse of riskScore)

    const volumeScore = Math.min((rep.volume / 1000) * 100, 100);
    const networkScore = 100; // Baseline network trust
    
    // Invert fraud risk (0 risk = 100 points, 100 risk = 0 points)
    const fraudScore = 100 - fraud.riskScore;

    const trustScore = 
      (rep.successRate * 0.40) + 
      (volumeScore * 0.25) + 
      (networkScore * 0.20) + 
      (fraudScore * 0.15);

    return {
      trustScore,
      reputation: rep,
      fraud
    };
  }
}
