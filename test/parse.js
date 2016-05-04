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

  describe('attributes', () => {

    it('should be undefined when there are no attributes', () => {
      expect(parse('body')).to.not.have.property('attributes');
      expect(parse('#app')).to.not.have.property('attributes');
      expect(parse('.hero-panel')).to.not.have.property('attributes');
      expect(parse('body#app.hero-panel')).to.not.have.property('attributes');
    });

    it('should be undefined when the operator is invalid', () => {
      expect(parse('[content!=foobar]')).to.not.have.property('attributes'); //TODO: should we allow invalid operators?
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
      expect(parse('[disabled][content*=foobar]'))
        .to.have.property('attributes')
        .to.be.an('array')
        .to.have.property('length').to.be.equal(2)
      ;
    });

    it('should have a name', () => {
      expect(parse('[disabled]').attributes[0]).to.have.property('name').to.be.equal('disabled');
      expect(parse('[content=foobar]').attributes[0]).to.have.property('name').to.be.equal('content');
    });

    it('should have an operator', () => {
      expect(parse('[content=foobar]').attributes[0]).to.have.property('operator').to.be.equal('=');
      expect(parse('[content~=foobar]').attributes[0]).to.have.property('operator').to.be.equal('~=');
      expect(parse('[content|=foobar]').attributes[0]).to.have.property('operator').to.be.equal('|=');
      expect(parse('[content^=foobar]').attributes[0]).to.have.property('operator').to.be.equal('^=');
      expect(parse('[content$=foobar]').attributes[0]).to.have.property('operator').to.be.equal('$=');
      expect(parse('[content*=foobar]').attributes[0]).to.have.property('operator').to.be.equal('*=');
    });

    it('should not have an operator', () => {
      expect(parse('[disabled]').attributes[0]).to.not.have.property('operator');
    });

    it('should have a value', () => {
      expect(parse('[content=foobar]').attributes[0]).to.have.property('value').to.be.equal('foobar');
      expect(parse('[content="foobar"]').attributes[0]).to.have.property('value').to.be.equal('foobar');
      expect(parse('[content=\'foobar\']').attributes[0]).to.have.property('value').to.be.equal('foobar');
    });

    it('should not have a value', () => {
      expect(parse('[disabled]').attributes[0]).to.not.have.property('value');
    });


  });

});
