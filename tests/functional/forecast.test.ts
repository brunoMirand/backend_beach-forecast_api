describe('Starting Functional Tests', () => {

  describe('Beach forecast functional tests', () => {
    it('should return a forecast with just a few times', async () => {
      const { body } = await global.testRequest.get('/forecast');

      expect(body).toEqual({'message': 'Beach now, ever!'});
    });
  });
});
