import neo4j, { Driver } from 'neo4j-driver';

let driver: Driver | null = null;

export function getNeo4jDriver(): Driver | null {
  if (driver) return driver;

  const uri = process.env.NEO4J_URI;
  const user = process.env.NEO4J_USERNAME;
  const password = process.env.NEO4J_PASSWORD;

  if (!uri || !user || !password) {
    return null;
  }

  try {
    driver = neo4j.driver(uri, neo4j.auth.basic(user, password));
    return driver;
  } catch (error) {
    console.error('[Web TrustGraph] Failed to initialize Neo4j driver:', error);
    return null;
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
    console.error('[Web TrustGraph] Query execution failed:', error);
    return [];
  } finally {
    await session.close();
  }
}
