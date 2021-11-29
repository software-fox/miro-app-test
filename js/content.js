const images = [
    {src: 'img/animals_date.png', width: 256, height: 256},
    {src: 'img/animals_dave.png', width: 256, height: 256},
    {src: 'img/animals_toba.png', width: 256, height: 256},
    {src: 'img/logo_512.png', width: 256, height: 256},
  ]
  
  function getImage(img) {
    return `<div class="draggable-item image-box">
                          <img src="${img.src}" data-image-url="https://software-fox.github.io/miro-app-test/${img.src}">
              </div>`
  }
  
  function addImages(container) {
    container.innerHTML += images.map((i) => getImage(i)).join('')
  }
  
  function createImage(canvasX, canvasY, url) {
    return miro.board.widgets.create({
      type: 'image',
      url: url,
      x: canvasX,
      y: canvasY,
    })
  }
  
  function bootstrap() {
    const container = document.getElementById('container')

    // console.log(miro.board.widgets.get({type: 'image'}))
  //   if(images.length > 0){
  //   images.forEach(i => {
  //   console.log('#########all widgets: ' + i)
  //   });
  // }else{
  //   console.log('######### no images at all')
  // }

  const printWidgets = async () => {
    const images = await miro.board.widgets.get({type: 'image'})
    images.forEach(i => {
      console.log(i)
      });
  };
  printWidgets();

    addImages(container)
  
    let currentImageUrl
    const imageOptions = {
      draggableItemSelector: 'img',
      onClick: async (targetElement) => {
        const url = targetElement.getAttribute('data-image-url')
        const widget = (await createImage(0, 0, url))[0]
        //miro.board.viewport.zoomToObject(widget)

        //console.log('click')
      },
      getDraggableItemPreview: (targetElement) => {
        //drag-started
        currentImageUrl = targetElement.getAttribute('data-image-url')

        //console.log('drag')
        return {
          width: 100,
          height: 100,
          url: currentImageUrl,
        }
      },
      onDrop: (canvasX, canvasY, targetElement) => {
        //console.log('onDrop 1')
        createImage(canvasX, canvasY, currentImageUrl)
      },
    }
    miro.board.ui.initDraggableItemsContainer(container, imageOptions)
  }
  
  miro.onReady(bootstrap)