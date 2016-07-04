let fileViewController = class {
  constructor(generatorFactory, $log, $rootScope){
    'ngInject';
    this.$log = $log;
    this.$rootScope = $rootScope;
    this.generatorFactory = generatorFactory;
  } 

  generateCode() {

    const timeline1 = {
      name: 'testtimeline1',
      attributes: {
        repeat: -1, 
        repeatDelay: 1
      },
      element: {
        name: 'testobject1',
        selector: '#wrap',
        keyframes: [
          {
            time: 1,
            attributes: {
              left: '10vw', 
              backgroundColor: 'blue'
            }
          },
          {
            time: 1,
            attributes: {
              top: '10vw', 
              backgroundColor: 'red'
            }
          }, 
          {
            time: 1, 
            attributes: {
              left: '0vw', 
              backgroundColor: 'blue'
            }
          },
          {
            time: 1,
            attributes: {
              top: '0vw', 
              backgroundColor: 'red'
            }
          }
        ]
      }
    }

    const timelines = [
      timeline1
    ]

    // code
    const code = this.generatorFactory.generateCode(timelines);
    this.$log.warn(code);
    // code for injection
    const singleLineCode = code.replace(/(\r\n|\n|\r)/gm,"").replace(/\t/gm, '');
    // embed of code
    this.$rootScope.$broadcast('EmbedScript', singleLineCode);

    // save to file
    chrome.fileSystem.chooseEntry({type: 'saveFile'}, function(writableFileEntry) {
      writableFileEntry.createWriter(function(writer) {
        writer.onerror = (e) => {console.log('error writing file', e)};
        writer.onwriteend = (e) => {console.log('writing file completed')};
        writer.write(new Blob([code]), {type: 'text/plain'});
      });
    });
  }
}

export default {
  templateUrl: 'modules/views/file-view/file-view.html',
  controller: fileViewController,
  controllerAs: 'ctrl'
}