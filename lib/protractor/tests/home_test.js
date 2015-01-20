describe('Launch web app',function(){


  it('should click on login',function(done){
    browser.get('http://localhost:5555/');
    var randomText = 'Text';
    element(by.model('inputText')).sendKeys(randomText).then(function(){
      expect(element(by.model('inputText')).getText()).toEqual(randomText); 
      done();      
    });
    
    //browser.waitForAngular().then(function() {
     
      // element(by.id('login')).click();
      // browser.driver.wait(function(){

      //   return browser.driver.getCurrentUrl(function(){
      //     done();
      //   }).then(function() {
      //            done();
      //           });
      // }).then(function(){

      //   console.log(arguments);
      //   // element(by.id('Email')).sendKeys('godson.ukpere@andela.co');
      //   // element(by.id('Passwd')).sendKeys('johnson');
      //   // element(by.id('signIn')).click();
      //   done();
      // });
      // element(by.id('inputText')).sendKeys(randomText);
      // expect(element(by.binding('inputText')).getText()).toEqual(randomText); 
      // //element(by.id('login')).click();
      // done();
   // }); 
  });
});

// describe('angularjs homepage', function() {
//   it('should greet the named user', function() {
//     browser.get('http://www.angularjs.org');

//     element(by.model('yourName')).sendKeys('Julie');

//     var greeting = element(by.binding('yourName'));

//     expect(greeting.getText()).toEqual('Hello Julie!');
//   });

//   describe('todo list', function() {
//     var todoList;

//     beforeEach(function() {
//       browser.get('http://www.angularjs.org');

//       todoList = element.all(by.repeater('todo in todos'));
//     });

//     it('should list todos', function() {
//       expect(todoList.count()).toEqual(2);
//       expect(todoList.get(1).getText()).toEqual('build an angular app');
//     });

//     it('should add a todo', function() {
//       var addTodo = element(by.model('todoText'));
//       var addButton = element(by.css('[value="add"]'));

//       addTodo.sendKeys('write a protractor test');
//       addButton.click();

//       expect(todoList.count()).toEqual(3);
//       expect(todoList.get(2).getText()).toEqual('write a protractor test');
//     });
//   });
// });