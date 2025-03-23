import Konva from 'konva';

// Criar o stage (quadro infinito)
const stage = new Konva.Stage({
  container: 'container',
  width: window.innerWidth,
  height: window.innerHeight,
  draggable: true,
});

// Criar camada
const layer = new Konva.Layer();
stage.add(layer);

// Variável para armazenar a última nota clicada
let selectedNote = null;

// Criar função para adicionar uma nota de texto
function addTextNode(x, y) {
  const textNode = new Konva.Text({
    x: x,
    y: y,
    text: 'Clique duas vezes...',
    fontSize: 18,
    draggable: true,
    fill: 'white',
    padding: 10,
    width: 200,
    align: 'left',
    fontFamily: 'Arial',
  });

  const background = new Konva.Rect({
    x: x - 5,
    y: y - 5,
    width: textNode.width() + 20,
    height: textNode.height() + 20,
    fill: 'rgba(0, 0, 0, 0.8)',
    cornerRadius: 10,
    draggable: true,
  });

  textNode.on('dragmove', () => {
    background.position(textNode.position());
    layer.batchDraw();
  });

  background.on('dragmove', () => {
    textNode.position(background.position());
    layer.batchDraw();
  });

  background.on('click', () => {
    selectedNote = { textNode, background };
  });
  textNode.on('click', () => {
    selectedNote = { textNode, background };
  });

  layer.add(background);
  layer.add(textNode);
  layer.draw();

  textNode.on('dblclick', () => editTextNode(textNode, background));
}

// Função para editar um texto
function editTextNode(textNode, background) {
  const textPosition = textNode.getAbsolutePosition();
  const stageBox = stage.container().getBoundingClientRect();

  // Criar input HTML
  const input = document.createElement('textarea');
  input.value = textNode.text();
  input.classList.add('text-input');
  input.style.top = `${textPosition.y + stageBox.top}px`;
  input.style.left = `${textPosition.x + stageBox.left}px`;
  input.style.width = `${textNode.width()}px`;
  input.style.height = `${textNode.height()}px`;

  document.body.appendChild(input);
  input.focus();

  function updateText() {
    let textValue = input.value.trim();
    
    // Verifica se há um título dentro de `#`
    const titleMatch = textValue.match(/#(.*?)#/);
    
    if (titleMatch) {
      textValue = textValue.replace(titleMatch[0], '');
      textNode.text(`${titleMatch[1]}\n${textValue.trim()}`);
      textNode.fontSize(18);
      textNode.fill('white');
    } else {
      textNode.text(textValue);
      textNode.fontSize(18);
      textNode.fill('white');
    }

    // Manter o tamanho do input após o resize
    textNode.width(input.offsetWidth);
    textNode.height(input.offsetHeight);

    background.width(textNode.width() + 20);
    background.height(textNode.height() + 20);

    document.body.removeChild(input);
    layer.draw();
  }

  input.addEventListener('input', () => {
    // Remover ajuste automático de tamanho
    // input.style.width = `${input.scrollWidth}px`;
    // input.style.height = `${input.scrollHeight}px`;
  });

  input.addEventListener('blur', updateText);
}

// Adicionar texto ao clicar duas vezes no quadro
stage.on('dblclick', (e) => {
  if (e.target === stage) {
    const pointer = stage.getPointerPosition();
    addTextNode(pointer.x, pointer.y);
  }
});

// Deletar notas ao pressionar "Delete"
window.addEventListener('keydown', (e) => {
  if (e.key === 'Delete' && selectedNote) {
    selectedNote.textNode.destroy();
    selectedNote.background.destroy();
    selectedNote = null;
    layer.draw();
  }
});

// Ajustar tamanho do quadro ao redimensionar a tela
window.addEventListener('resize', () => {
  stage.width(window.innerWidth);
  stage.height(window.innerHeight);
});
