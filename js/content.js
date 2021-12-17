const images1 = [
    {src: 'img/Challenge_Kunde_1_1@2.png', width: 256, height: 256},
    {src: 'img/Challenge_Partner_1_1@2.png', width: 256, height: 256}
  ]

const images2 = [
    {src: 'img/Insp_1_1_Bitcoin@2.png', width: 256, height: 256},
    {src: 'img/Insp_1_1_Interferenz@2.png', width: 256, height: 256},
    {src: 'img/Insp_1_1_Wolke@2.png', width: 256, height: 256}
]

  const images3 = [
    {src: 'img/Abdecker_PartyFrage@2.png', width: 256, height: 256},
    {src: 'img/Mitspieler_Clean@2.png', width: 256, height: 256},
    {src: 'img/Start_Kopf@2x.png', width: 256, height: 256}
  ]
    
function getImage(img) {
  return `<div class="draggable-item image-box">
                          <img src="${img.src}" data-image-url="https://software-fox.github.io/miro-app-test/${img.src}">
              </div>`
}

function addImages(container, images) {
  console.log(images)
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

//(
  function bootstrap() {
  // const container1 = document.getElementById('container1')
  const container2 = document.getElementById('container2')
  // const container3 = document.getElementById('container3')

  // console.log(miro.board.widgets.get({type: 'image'}))
  //   if(images.length > 0){
  //   images.forEach(i => {
  //   console.log('#########all widgets: ' + i)
  //   });
  // }else{
  //   console.log('######### no images at all')
  // }

  // const printWidgets = async () => {
  //   const images = await miro.board.widgets.get({type: 'image'})
  //   images.forEach(i => {
  //     console.log(i)
  //     });
  // };
  // printWidgets();

  // addImages(container1, images1)
  addImages(container2, images2)
  // addImages(container3, images3)

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
// )();

miro.onReady(bootstrap)