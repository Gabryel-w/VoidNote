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
    text: 'Digite aqui...',
    fontSize: 18,
    draggable: true,
    fill: 'white',
    padding: 10,
    width: 200,
    align: 'center',
    fontFamily: 'Arial',
    fontStyle: 'bold',
  });

  // Criar um retângulo de fundo para destacar o texto
  const background = new Konva.Rect({
    x: x - 5,
    y: y - 5,
    width: textNode.width() + 10,
    height: textNode.height() + 10,
    fill: 'rgba(0, 0, 0, 0.7)',
    cornerRadius: 8,
    draggable: true,
  });

  // Sincronizar posição do retângulo e texto
  textNode.on('dragmove', () => {
    background.position(textNode.position());
    layer.batchDraw();
  });

  background.on('dragmove', () => {
    textNode.position(background.position());
    layer.batchDraw();
  });

  layer.add(background);
  layer.add(textNode);
  layer.draw();

  // Evento de duplo clique para edição do texto
  textNode.on('dblclick', () => {
    const textPosition = textNode.getAbsolutePosition();
    const stageBox = stage.container().getBoundingClientRect();

    // Criar input HTML estilizado
    const input = document.createElement('textarea');
    input.value = textNode.text();
    input.style.position = 'absolute';
    input.style.top = `${textPosition.y + stageBox.top}px`;
    input.style.left = `${textPosition.x + stageBox.left}px`;
    input.style.fontSize = '18px';
    input.style.width = `${textNode.width()}px`;
    input.style.height = 'auto';
    input.style.minHeight = '40px';
    input.style.padding = '10px';
    input.style.borderRadius = '8px';
    input.style.background = 'rgba(0, 0, 0, 0.8)';
    input.style.color = 'white';
    input.style.outline = 'none';
    input.style.border = '1px solid #fff';
    input.style.resize = 'none';

    document.body.appendChild(input);
    input.focus();

    function saveText() {
      textNode.text(input.value);
      document.body.removeChild(input);
      layer.draw();
    }

    input.addEventListener('blur', saveText);
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        saveText();
      }
    });
  });
}

// Adicionar bloco de texto **somente ao dar duplo clique**
stage.on('dblclick', (e) => {
  if (e.target === stage) {
    const pointer = stage.getPointerPosition();
    addTextNode(pointer.x, pointer.y);
  }
});

// Garantir que o tamanho do quadro se ajuste ao redimensionar a tela
window.addEventListener('resize', () => {
  stage.width(window.innerWidth);
  stage.height(window.innerHeight);
});
