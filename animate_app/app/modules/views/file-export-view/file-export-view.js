let fileExportViewController = class {

  constructor(generatorFactory, $rootScope, $scope){
    'ngInject';
    this.filepath = 'choose file';
    this.$rootScope = $rootScope;
    this.$scope = $scope;
    this.generatorFactory = generatorFactory;

    this.minified = false;
    this.writableFileEntry = '';
    this.message = '';
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

    // // embed of code
    // this.$rootScope.$broadcast('EmbedScript', singleLineCode);
  }

  chooseFile(callback) {
    // choose file to save
    chrome
    .fileSystem
    .chooseEntry({
        type: 'saveFile',
        suggestedName: 'animation',
        accepts: [
          {
            description: 'javascript',
            mimeTypes: [
              'text/javascript'
            ],
            extensions: [
              'js'
            ]
          }
        ]
      }, 
      (writableFileEntry) => {
        if (!chrome.runtime.lastError) {
          this.file = writableFileEntry;
          chrome.fileSystem.getDisplayPath(this.file, (path) => {
            this.filepath = path;
            this.$scope.$apply();
          });
        } else {
          // this.message = chrome.runtime.lastError.message;
          this.message = 'No file choosen.';
          this.$scope.$apply();
          delete(chrome.runtime.lastError);
        }
      }
    );
  }

  saveToFile() {
    const code = this.generateCode((code) => {

      if (this.minified) {
        code = this.minifie(code);
      }

      this.file.createWriter((writer) => {
        writer.onerror = (e) => {
          this.message = 'Error writing file: ' + e;
          this.$scope.$apply();
        };
        writer.onwriteend = (e) => {
          this.message = 'Writing file completed.';
          this.$scope.$apply();
        };
        writer.write(new Blob([code]), {type: 'text/javascript'});
      });
    });
  }

  minifie(code) {
   return code.replace(/(\r\n|\n|\r)/gm,"").replace(/\t/gm, '');
  }
}

export default {
  templateUrl: 'modules/views/file-export-view/file-export-view.html',
  controller: fileExportViewController,
  controllerAs: 'ctrl'
}