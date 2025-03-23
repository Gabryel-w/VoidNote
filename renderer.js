import Konva from 'konva';

// Criar o stage (quadro infinito)
const stage = new Konva.Stage({
  container: 'container',
  width: window.innerWidth,
  height: window.innerHeight,
  draggable: true, // Permite arrastar o quadro
});

// Criar camada
const layer = new Konva.Layer();
stage.add(layer);

// Criar função para adicionar um bloco de texto
function addTextNode(x, y) {
  const textNode = new Konva.Text({
    x: x,
    y: y,
    text: 'Clique para editar...',
    fontSize: 18,
    draggable: true,
    fill: 'black',
    padding: 10,
    width: 200,
    align: 'center',
    backgroundColor: 'yellow'
  });

  layer.add(textNode);
  layer.draw();

  // Evento de clique para edição
  textNode.on('dblclick', () => {
    const textPosition = textNode.getAbsolutePosition();
    const stageBox = stage.container().getBoundingClientRect();

    // Criar input HTML
    const input = document.createElement('input');
    input.type = 'text';
    input.value = textNode.text();
    input.style.position = 'absolute';
    input.style.top = `${textPosition.y + stageBox.top}px`;
    input.style.left = `${textPosition.x + stageBox.left}px`;
    input.style.fontSize = '18px';
    input.style.width = `${textNode.width()}px`;
    input.style.border = '1px solid black';
    input.style.padding = '5px';

    document.body.appendChild(input);
    input.focus();

    // Salvar novo valor ao pressionar Enter ou sair do input
    function saveText() {
      textNode.text(input.value);
      document.body.removeChild(input);
      layer.draw();
    }

    input.addEventListener('blur', saveText);
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        saveText();
      }
    });
  });
}

// Adicionar texto ao clicar no quadro
stage.on('click', (e) => {
  if (e.target === stage) {
    const pointer = stage.getPointerPosition();
    addTextNode(pointer.x, pointer.y);
  }
});
