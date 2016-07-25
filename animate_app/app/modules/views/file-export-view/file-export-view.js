let fileExportViewController = class {

  constructor(generatorFactory, $rootScope, $scope, projectFactory){
    'ngInject';
    this.filepath = 'choose file';
    this.$rootScope = $rootScope;
    this.$scope = $scope;
    this.generatorFactory = generatorFactory;
    this.projectFactory = projectFactory;

    this.minified = false;
    this.writableFileEntry = '';
    this.message = '';
  } 

  generateCode(callback) {
    // code
    callback(
      this.generatorFactory.generateCode(
        this.projectFactory.getTimelinesForGeneration()
      )
    );
  }

  chooseFile() {
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

    this.generateCode((code) => {
      if (this.minified) {
        code = this.generatorFactory.minifie(code);
      }

      this.file.createWriter((writer) => {
        writer.onerror = (e) => {
          this.message = 'Error writing file: ' + e;
          this.$scope.$apply();
        };
        writer.onwriteend = () => {
          this.message = 'Writing file completed.';
          this.$scope.$apply();
        };
        writer.write(new Blob([code]), {type: 'text/javascript'});
      });
    });
  }
}

export default {
  templateUrl: 'modules/views/file-export-view/file-export-view.html',
  controller: fileExportViewController,
  controllerAs: 'ctrl'
}