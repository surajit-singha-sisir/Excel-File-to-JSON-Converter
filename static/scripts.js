const pdfFileInput = document.getElementById('pdf-file-input');
const progressBar = document.getElementById('progress-bar');
const submitButton = document.getElementById('submit-button');

pdfFileInput.addEventListener('change', (event) => {
  const fileName = event.target.files[0].name;
  const fileSize = event.target.files[0].size;
  const fileReader = new FileReader();
  const fileData = new FormData();

  fileData.append('pdfFile', event.target.files[0]);

  // hide drag text and show file name
  const dragText = document.getElementById('dragText');
  dragText.innerHTML = fileName.slice(0, 80); 

  // add class to input to indicate file is uploaded
  pdfFileInput.classList.add('has-file');

  // change input box color to green
  progressBar.classList.add('progress-bar-fill');

  // handle progress bar fill
  fileReader.onloadstart = function() {
    progressBar.style.display = 'block';
  }

  fileReader.onprogress = function(event) {
    const progress = (event.loaded / fileSize) * 100;
    progressBar.style.width = progress + '%';
  }

  fileReader.onloadend = function() {
    progressBar.style.display = 'none';
  }

  // send file data to server
  submitButton.addEventListener('click', (event) => {
    event.preventDefault();
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/upload-pdf', true);
    xhr.upload.onprogress = function(event) {
      const progress = (event.loaded / event.total) * 100;
      progressBar.style.width = progress + '%';
    };
    
    xhr.onreadystatechange = function() {
      if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
        console.log('File uploaded successfully');
        // add any success message or redirect to another page
      }
    };
    
    xhr.send(fileData);
  });
});

submitButton.addEventListener('click', () => {
  // handle submit button click event
});