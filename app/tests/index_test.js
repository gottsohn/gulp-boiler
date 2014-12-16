console.log(1212);
describe('My App Test',function(){
  
    beforeEach(function(){
      module('MyApp');
    })

    var Settings,
    Authorization,
    Athentication,
    Refs;
    
    beforeEach(inject(function($injector){
      Refs = $injector.get('Refs');
    }));
    
    // beforeEach(function(done){
    //   done();
    // });

    describe('MyApp Test',function(){

        // it('should pass test',function(done){
        //   expect(Refs).toBeDefined();
        //   done();
        // });

        it('should pass this 1',function(){
          expect(1).toBe(1);
        });
    });
});