var assert = require('assert');
describe('MyApp Test',function(){
  beforeEach(function(){
    console.log('spec.js BEGIN!!!!');
  });

  describe('Run tests here',function(){

    it('should be done',function(done){
      assert.equal(1,1);
      done();
    })
  });

  afterEach(function(){
    console.log('spec.js DONE!!!!');
  });
});