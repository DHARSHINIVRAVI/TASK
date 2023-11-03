document.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('.element');
    const designArea = document.querySelector('.design-area');
    const saveButton = document.getElementById('save-button');
    const previewButton = document.getElementById('preview-button'); 
    const savedDesign = document.getElementById('saved-design');
    let savedContent = '';
    const clearButton = document.getElementById('clear-button');
     let fontOptionsOpen = false; 
    const settingsIcon = document.querySelector('.settings-icon');
    const fontOptions = document.getElementById('font-options');
    const fontColorInput = document.getElementById('font-color');
    const fontStyleSelect = document.getElementById('font-style');
    const fontSizeInput = document.getElementById('font-size');
     const imageElement = document.querySelector('.element[data-type="image"]');
    const imageInput = document.getElementById('image-upload');


    settingsIcon.addEventListener('click', () => {
        if (fontOptionsOpen) {
            fontOptions.style.display = 'none';
            fontOptionsOpen = false;
        } else {
            fontOptions.style.display = 'block';
            fontOptionsOpen = true;
        }
    });

    saveButton.addEventListener('click', () => {
        if (activeElement) {
            const fontColor = fontColorInput.value;
            const fontStyle = fontStyleSelect.value;
            const fontSize = fontSizeInput.value;

            activeElement.style.color = fontColor;
            activeElement.style.fontStyle = fontStyle;
            activeElement.style.fontSize = fontSize + 'px';

            fontOptions.style.display = 'none';
            fontOptionsOpen = false;
        }
    });

    elements.forEach((element) => {
        element.addEventListener('click', () => {
            const elementType = element.getAttribute('data-type');
            const newElement = document.createElement('div');
            newElement.className = 'design-element draggable';
            newElement.style.left = '10px';
            newElement.style.top = '10px';
            newElement.contentEditable = true;
         
            if (elementType === 'textbox') {
                newElement.innerHTML = '<input type="textbox" class="editable" />textbox';
            } else if (elementType === 'button') {
                newElement.innerHTML = '<input type="button"class="editable"/>Button';
            } else if (elementType === 'label') {
                newElement.textContent = 'Label';
                newElement.contentEditable = true;
            } else if (elementType === 'radio') {
                newElement.innerHTML = '<input type="radio" class="editable" />Radiobutton';
            } else if (elementType === 'checkbox') {
                newElement.innerHTML = '<input type="checkbox" class="editable" /> Checkbox';
            } else if (elementType === 'image') {

                //newElement.innerHTML = '<img src="C:\Users\dhars\Downloads\image.jpg" alt="Image" height="100px"width="100px" class="editable" />';
                imageElement.addEventListener('click', () => {
        imageInput.click();
    });

    imageInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
          const imageURL = URL.createObjectURL(file);
            const newImageElement = document.createElement('div');
            newImageElement.className = 'design-element draggable';
            newImageElement.innerHTML = `<img src="${imageURL}" alt="Image" height="100px" width="100px" class="editable" />`;
        designArea.appendChild(newImageElement);
    }
});

            } else if (elementType === 'navigation') {
                newElement.innerHTML = '<a href="https://example.com" class="editable">Navigation</a>';
            } else if (elementType === 'textbox') {
                newElement.innerHTML = '<input type="text" class="editable" />';
            } else if (elementType === 'dropdown') {
                newElement.innerHTML = '<select class="editable"><option>Vegetarian</option><option>non vegetarian</option></select>';
            } else if (elementType === 'table') {
            newElement.innerHTML = '<table class="editable"><tr><th>Header 1</th><th>Header 2</th></tr><tr><td>Data 1</td><td>Data 2</td></tr></table>';
            }
            else if (elementType === 'layout') {
                newElement.innerHTML = '<div class="grid-layout resizable"></div>';
            }

            newElement.addEventListener('mousedown', (e) => {
                if (e.target.classList.contains('draggable')) {
                    activeElement = e.target;
                    activeElement.style.zIndex = 1000;
                }
            });

            document.addEventListener('mousemove', (e) => {
                if (activeElement) {
                    const x = e.clientX;
                    const y = e.clientY;
                    activeElement.style.left = x - activeElement.offsetWidth / 2 + 'px';
                    activeElement.style.top = y - activeElement.offsetHeight / 2 + 'px';
                }
            });

            document.addEventListener('mouseup', () => {
                activeElement = null;
            });
            


            designArea.appendChild(newElement);
        });
    });

    let activeElement = null;
    //let savedContent = '';

     saveButton.addEventListener('click', () => {
        const designAreaContent = designArea.innerHTML;
        savedContent = designAreaContent;
        alert("Design saved:\n" + designAreaContent);
    });

    /*previewButton.addEventListener('click', () => {
        const savedContent = savedDesign.innerHTML;
        const previewWindow = window.open();
        previewWindow.document.write(savedContent);
    });*/
     previewButton.addEventListener('click', () => {
        if (savedContent) {
            const previewWindow = window.open('', '_blank');
            previewWindow.document.open();
            previewWindow.document.write(savedContent);
            previewWindow.document.close();
        } 
    });
      clearButton.addEventListener('click', () => {
    const designElements = document.querySelectorAll('.design-element');
    designElements.forEach((element) => {
        designArea.removeChild(element);
    });
});
  });
