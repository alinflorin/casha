class DbService {
  async init() {
    console.log('DB Init not needed');
    await Promise.resolve();
  }
}

export const dbService = new DbService();
export default dbService;