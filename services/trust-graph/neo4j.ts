import neo4j, { Driver } from 'neo4j-driver';
import 'dotenv/config';

let driver: Driver | null = null;

export function getNeo4jDriver(): Driver | null {
  if (driver) return driver;

  const uri = process.env.NEO4J_URI;
  const user = process.env.NEO4J_USERNAME;
  const password = process.env.NEO4J_PASSWORD;

  if (!uri || !user || !password) {
    console.warn('[TrustGraph] Neo4j credentials missing. Graph Intelligence disabled. System will degrade gracefully.');
    return null;
  }

  try {
    driver = neo4j.driver(uri, neo4j.auth.basic(user, password));
    console.log('[TrustGraph] Neo4j driver initialized successfully.');
    return driver;
  } catch (error) {
    console.error('[TrustGraph] Failed to initialize Neo4j driver:', error);
    return null;
  }
}

export async function closeNeo4jDriver() {
  if (driver) {
    await driver.close();
    driver = null;
    console.log('[TrustGraph] Neo4j driver closed.');
  }
}

export async function runQuery<T = any>(query: string, params: any = {}): Promise<T[]> {
  const d = getNeo4jDriver();
  if (!d) return [];

  const session = d.session();
  try {
    const result = await session.run(query, params);
    return result.records.map(record => record.toObject()) as T[];
  } catch (error) {
    console.error('[TrustGraph] Query execution failed:', error);
    return [];
  } finally {
    await session.close();
  }
}
