/*
var chosenEntry = null;
var openLocalFile = document.querySelector('#open_local');
var chooseFileButton = document.querySelector('#choose_file');
var chooseCurrentTab = document.querySelector('#current_tab')

var saveFileButton = document.querySelector('#save_file');
var output = document.querySelector('output');
var textarea = document.querySelector('textarea');
var urlarea = document.querySelector('#url');

var currentUrl = document.querySelector('#locationform');

var websiteWebview = document.querySelector('#websiteWebview');

function errorHandler(e) {
    console.error(e);
}

document.querySelector('#location-form').onsubmit = function(e) {
    e.preventDefault();
    navigateTo(document.querySelector('#location').value);
};


chooseCurrentTab.addEventListener('click', function(e) {
    readAsText(currentUrl, function(url){
        urlarea.value = url;
    });
});

function displayEntryData(theEntry) {
    if (theEntry.isFile) {
        chrome.fileSystem.getDisplayPath(theEntry, function(path) {
            document.querySelector('#file_path').value = path;
        });
        theEntry.getMetadata(function(data) {
            document.querySelector('#file_size').textContent = data.size;
        });
    }
    else {
        document.querySelector('#file_path').value = theEntry.fullPath;
        document.querySelector('#file_size').textContent = "N/A";
    }
}

function readAsText(fileEntry, callback) {
    fileEntry.file(function(file) {
        var reader = new FileReader();

        reader.onerror = errorHandler;
        reader.onload = function(e) {
            callback(e.target.result);
        };

        reader.readAsText(file);
    });
}

function writeFileEntry(writableEntry, opt_blob, callback) {
    if (!writableEntry) {
        output.textContent = 'Nothing selected.';
        return;
    }

    writableEntry.createWriter(function(writer) {

        writer.onerror = errorHandler;
        writer.onwriteend = callback;

        // If we have data, write it to the file. Otherwise, just use the file we
        // loaded.
        if (opt_blob) {
            writer.truncate(opt_blob.size);
            waitForIO(writer, function() {
                writer.seek(0);
                writer.write(opt_blob);
            });
        }
        else {
            chosenEntry.file(function(file) {
                writer.truncate(file.fileSize);
                waitForIO(writer, function() {
                    writer.seek(0);
                    writer.write(file);
                });
            });
        }
    }, errorHandler);
}

function waitForIO(writer, callback) {
    // set a watchdog to avoid eventual locking:
    var start = Date.now();
    // wait for a few seconds
    var reentrant = function() {
        if (writer.readyState===writer.WRITING && Date.now()-start<4000) {
            setTimeout(reentrant, 100);
            return;
        }
        if (writer.readyState===writer.WRITING) {
            console.error("Write operation taking too long, aborting!"+
                " (current writer readyState is "+writer.readyState+")");
            writer.abort();
        }
        else {
            callback();
        }
    };
    setTimeout(reentrant, 100);
}

// for files, read the text content into the textarea
function loadFileEntry(_chosenEntry) {
    chosenEntry = _chosenEntry;
    chosenEntry.file(function(file) {
        readAsText(chosenEntry, function(result) {
            textarea.value = result;
        });
        // Update display.
        saveFileButton.disabled = false; // allow the user to save the content
        displayEntryData(chosenEntry);
    });
}


openLocalFile.addEventListener('click', function openLocalInUrl(){

    document.querySelector('#location').value = document.querySelector('#file_path').value;

//    websiteWebview.src = "test.html";
//    websiteWebview.src = document.querySelector('#file_path').value;
//    websiteWebview.loadDataWithBaseUrl = document.querySelector('#file_path').value;
    websiteWebview.setAttribute('src', decodeURIComponent(document.querySelector('#file_path').value));


});

// for files, read the text content into the websiteWebview
function loadFileToWebview(_chosenEntry) {
    chosenEntry = _chosenEntry;
    chosenEntry.file(function(file) {
        readAsText(chosenEntry, function(result) {
            websiteWebview.value = result;
        });
        // Update display.
        saveFileButton.disabled = false; // allow the user to save the content
        displayEntryData(chosenEntry);
    });
}

function loadInitialFile(launchData) {
    if (launchData && launchData.items && launchData.items[0]) {
        loadFileEntry(launchData.items[0].entry);
        loadFileToWebview(launchData.items[0].entry);
    }
    else {
        // see if the app retained access to an earlier file or directory
        chrome.storage.local.get('chosenFile', function(items) {
            if (items.chosenFile) {
                // if an entry was retained earlier, see if it can be restored
                chrome.fileSystem.isRestorable(items.chosenFile, function(bIsRestorable) {
                    // the entry is still there, load the content
                    console.info("Restoring " + items.chosenFile);
                    chrome.fileSystem.restoreEntry(items.chosenFile, function(chosenEntry) {
                        if (chosenEntry) {
                            chosenEntry.isFile ? loadFileEntry(chosenEntry) : loadDirEntry(chosenEntry);
                            chosenEntry.isFile ? loadFileToWebview(chosenEntry) : loadDirEntry(chosenEntry);
                        }
                    });
                });
            }
        });
    }
}

chooseFileButton.addEventListener('click', function(e) {
    var accepts = [{
        mimeTypes: ['text/!*'],
        extensions: ['js', 'css', 'txt', 'html', 'xml', 'tsv', 'csv', 'rtf']
    }];
    chrome.fileSystem.chooseEntry({type: 'openFile', accepts: accepts}, function(theEntry) {
        if (!theEntry) {
            output.textContent = 'No file selected.';
            return;
        }
        // use local storage to retain access to this file
        chrome.storage.local.set({'chosenFile': chrome.fileSystem.retainEntry(theEntry)});
        loadFileEntry(theEntry);
        loadFileToWebview(theEntry);
    });
});



saveFileButton.addEventListener('click', function(e) {
    var config = {type: 'saveFile', suggestedName: chosenEntry.name};
    chrome.fileSystem.chooseEntry(config, function(writableEntry) {
        var blob = new Blob([textarea.value], {type: 'text/plain'});
        writeFileEntry(writableEntry, blob, function(e) {
            output.textContent = 'Write complete!';
        });
    });
});

// Support dropping a single file onto this app.
var dnd = new DnDFileController('body', function(data) {
    chosenEntry = null;
    for (var i = 0; i < data.items.length; i++) {
        var item = data.items[i];
        if (item.kind == 'file' &&
            item.type.match('text/!*') &&
            item.webkitGetAsEntry()) {
            chosenEntry = item.webkitGetAsEntry();
            break;
        }
    };

    if (!chosenEntry) {
        output.textContent = "Sorry. That's not a text file.";
        return;
    }
    else {
        output.textContent = "";
    }

    readAsText(chosenEntry, function(result) {
        textarea.value = result;
    });
    // Update display.
    saveFileButton.disabled = false;
    displayEntryData(chosenEntry);
});

loadInitialFile(launchData);*/
