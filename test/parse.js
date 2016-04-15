import parse from '../src/parse';

describe('parse', () => {

  describe('classes', () => {

    it('should be undefined when there are no class names', () => {
      expect(parse('body')).to.not.have.property('classes');
      expect(parse('#app')).to.not.have.property('classes');
      expect(parse('[disabled]')).to.not.have.property('classes');
      expect(parse('body#app[disabled]')).to.not.have.property('classes');
    });

    it('should be an array when there are one or more class names', () => {
      expect(parse('.hero-panel'))
        .to.have.property('classes')
        .to.be.an('array')
        .to.have.property('length').to.be.equal(1)
      ;
      expect(parse('.hero-panel__title'))
        .to.have.property('classes')
        .to.be.an('array')
        .to.have.property('length').to.be.equal(1)
      ;
      expect(parse('.hero-panel__title.title.title--2'))
        .to.have.property('classes')
        .to.be.an('array')
        .to.have.property('length').to.be.equal(3)
      ;
    });

  });

  describe.skip('attributes', () => {

    it('should be undefined when there are no attributes', () => {
      expect(parse('body')).to.not.have.property('attributes');
      expect(parse('#app')).to.not.have.property('attributes');
      expect(parse('.hero-panel')).to.not.have.property('attributes');
      expect(parse('body#app.hero-panel')).to.not.have.property('attributes');
    });

    it('should be an array when there are one or more attributes', () => {
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
