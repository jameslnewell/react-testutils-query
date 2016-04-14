import parse from '../src/parse';

parse('[disabled][content=foobar]')

describe('parse', () => {

  describe('attributes', () => {

    it('should be undefined when there are no attribute selectors', () => {
      expect(parse('body')).to.not.have.property('attributes');
      expect(parse('#app')).to.not.have.property('attributes');
      expect(parse('.hero-panel')).to.not.have.property('attributes');
      expect(parse('body#app.hero-panel')).to.not.have.property('attributes');
    });

    it('should be an array when there are one or more attribute selectors', () => {
      expect(parse('[disabled]'))
        .to.have.property('attributes')
        .to.be.an('array')
        .to.have.property('length').to.be.equal(1)
      ;
      expect(parse('[content=foobar]'))
        .to.have.property('attributes')
        .to.be.an('array')
        .to.have.property('length').to.be.equal(1)
      ;
      expect(parse('[disabled][content=foobar]'))
        .to.have.property('attributes')
        .to.be.an('array')
        .to.have.property('length').to.be.equal(2)
      ;
    });

    it('should be ', () => {
      expect(parse('[disabled]')).to.have.property('attributes');
      expect(parse('[content=foobar]')).to.have.property('attributes');
    });

  });

});
