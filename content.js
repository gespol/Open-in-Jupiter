console.debug("Solana Jupiter Address Detector: content script carregado.");

const solanaAddressRegex = /\b[1-9A-HJ-NP-Za-km-z]{32,44}\b/g;

function processTextNode(textNode) {
  try {
    if (!textNode || !textNode.parentNode) return;

    const parentElement = textNode.parentElement;
    if (!parentElement) return;

    if (["SCRIPT", "STYLE", "TEXTAREA", "INPUT"].includes(parentElement.tagName)) return;
    if (parentElement.classList.contains('solana-address-container')) return;
    if (textNode.textContent.trim().length < 32) return;

    const textContent = textNode.textContent;
    const matches = [...textContent.matchAll(solanaAddressRegex)];
    if (matches.length === 0) return;

    const fragment = document.createDocumentFragment();
    let lastIndex = 0;

    for (const match of matches) {
      const index = match.index;
      const matchedStr = match[0];

      const textBefore = textContent.substring(lastIndex, index);
      if (textBefore) {
        fragment.appendChild(document.createTextNode(textBefore));
      }

      const span = document.createElement('span');
      span.className = 'solana-address-container';
      span.style.marginRight = '4px';

      span.appendChild(document.createTextNode(matchedStr));
      span.appendChild(document.createTextNode(' '));

      const button = document.createElement('button');
      button.className = 'open-jupiter-button';
      button.textContent = 'Trade in Jupiter';
      button.title = 'Open in Jupiter (swap SOL -> token)';

      // 👉 Estilo personalizado
      button.style.backgroundColor = '#ffffff';
      button.style.color = '#000000';
      button.style.border = '2px solid #000000';
      button.style.borderRadius = '5px';
      button.style.padding = '4px 8px';
      button.style.marginLeft = '6px';
      button.style.cursor = 'pointer';
      button.style.fontSize = '12px';
      button.style.fontWeight = 'bold';

      button.addEventListener('click', () => {
        const jupiterUrl = `https://jup.ag/tokens/${matchedStr}`;
        window.open(jupiterUrl, '_blank');
      });

      span.appendChild(button);
      fragment.appendChild(span);

      lastIndex = index + matchedStr.length;
    }

    const textAfter = textContent.substring(lastIndex);
    if (textAfter) {
      fragment.appendChild(document.createTextNode(textAfter));
    }

    parentElement.replaceChild(fragment, textNode);
  } catch (e) {
    console.error("Erro ao processar nó de texto para endereços Solana:", e);
  }
}

function scanNodeTree(rootNode) {
  const walker = document.createTreeWalker(rootNode, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      if (!node.textContent || node.textContent.trim() === '') return NodeFilter.FILTER_SKIP;
      const tag = node.parentElement?.tagName;
      if (["SCRIPT", "STYLE", "TEXTAREA", "INPUT"].includes(tag)) return NodeFilter.FILTER_SKIP;
      return NodeFilter.FILTER_ACCEPT;
    }
  });

  let textNode;
  while ((textNode = walker.nextNode())) {
    processTextNode(textNode);
  }
}

// Primeira varredura
scanNodeTree(document.body);

// Observador dinâmico
const observer = new MutationObserver((mutations) => {
  for (const mutation of mutations) {
    if (mutation.type === 'childList') {
      mutation.addedNodes.forEach(node => {
        if (node.nodeType === Node.TEXT_NODE) {
          processTextNode(node);
        } else if (node.nodeType === Node.ELEMENT_NODE) {
          scanNodeTree(node);
        }
      });
    } else if (mutation.type === 'characterData') {
      processTextNode(mutation.target);
    }
  }
});

observer.observe(document.body, {
  childList: true,
  characterData: true,
  subtree: true
});

console.debug("Solana Jupiter Address Detector: observador de mutações ativo.");