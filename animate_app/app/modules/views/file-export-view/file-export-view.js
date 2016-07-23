let fileExportViewController = class {

  constructor(generatorFactory, $rootScope, $scope){
    'ngInject';
    this.filepath = 'choose file';
    this.$rootScope = $rootScope;
    this.$scope = $scope;
    this.generatorFactory = generatorFactory;

    this.writableFileEntry = '';
    console.log($rootScope);
  } 

  generateCode(callback) {

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
    callback(this.generatorFactory.generateCode(timelines));

    // console.log(code);
    // // code for injection
    // const singleLineCode = code.replace(/(\r\n|\n|\r)/gm,"").replace(/\t/gm, '');
    // // embed of code
    // this.$rootScope.$broadcast('EmbedScript', singleLineCode);
  }

  chooseFile(callback) {
    // choose file to save
    chrome
    .fileSystem
    .chooseEntry({
        type: 'saveFile'
      }, 
      (writableFileEntry) => {
        if (!chrome.runtime.lastError) {
          this.file = writableFileEntry;
          this.filepath = this.file.fullPath;
          this.$scope.$apply();
        } else {
          console.log(chrome.runtime.lastError.message);
          delete(chrome.runtime.lastError);
        }
      }
    );
  }

  saveToFile() {
    const code = this.generateCode((code) => {
      this.file.createWriter(function(writer) {
        writer.onerror = (e) => {console.log('error writing file', e)};
        writer.onwriteend = (e) => {console.log('writing file completed')};
        writer.write(new Blob([code]), {type: 'text/plain'});
      });
    });
  }
}

export default {
  templateUrl: 'modules/views/file-export-view/file-export-view.html',
  controller: fileExportViewController,
  controllerAs: 'ctrl'
}