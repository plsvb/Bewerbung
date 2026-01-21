
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

/**
 * Generiert ein PDF aus einer Liste von HTML-Elementen.
 */
export const generatePDF = async (elements: HTMLElement[], filename: string = 'lebenslauf.pdf') => {
  try {
    // Ensure all fonts are loaded before capturing
    if ('fonts' in document) {
      await (document as any).fonts.ready;
    }

    const applyUppercaseWorkaround = (root: HTMLElement, doc: Document) => {
      const view = doc.defaultView;
      if (!view) return;

      const walker = doc.createTreeWalker(root, NodeFilter.SHOW_TEXT, null);
      const textNodes: Text[] = [];
      while (walker.nextNode()) {
        textNodes.push(walker.currentNode as Text);
      }

      for (const node of textNodes) {
        const parent = node.parentElement;
        if (!parent || !node.textContent) continue;
        const style = view.getComputedStyle(parent);
        if (style.textTransform === 'uppercase') {
          node.textContent = node.textContent.toLocaleUpperCase('de-DE');
          parent.style.textTransform = 'none';
        }
      }
    };

    // PDF Initialization
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];
      if (!element) continue;

      const captureAttr = 'data-pdf-capture-target';
      const previousAttr = element.getAttribute(captureAttr);
      element.setAttribute(captureAttr, 'true');

      const captureWidth = element.offsetWidth;
      const captureHeight = element.offsetHeight;

      let canvas: HTMLCanvasElement | undefined;
      try {
        // Capture element with higher scale for print quality
        canvas = await html2canvas(element, {
          scale: 2,
          useCORS: true,
          allowTaint: false,
          backgroundColor: '#ffffff',
          logging: false,
          imageTimeout: 15000,
          removeContainer: true,
          width: captureWidth,
          height: captureHeight,
          windowWidth: captureWidth,
          windowHeight: captureHeight,
          scrollX: 0,
          scrollY: 0,
          onclone: (clonedDoc) => {
            const clonedElement = clonedDoc.body.querySelector(`[${captureAttr}="true"]`) as HTMLElement | null;
            const target = clonedElement ?? clonedDoc.body;
            if (target instanceof HTMLElement) {
              applyUppercaseWorkaround(target, clonedDoc);
              const images = target.querySelectorAll('img');
              images.forEach((img) => {
                img.style.width = '100%';
                img.style.height = '100%';
                img.style.objectFit = 'contain';
                img.style.objectPosition = 'center';
                img.style.backgroundColor = '#ffffff';
                img.style.display = 'block';
              });
              const pages = target.querySelectorAll('.a4-page');
              pages.forEach((page) => {
                (page as HTMLElement).style.transform = 'none';
                (page as HTMLElement).style.boxShadow = 'none';
                (page as HTMLElement).style.margin = '0';
                (page as HTMLElement).style.width = '210mm';
                (page as HTMLElement).style.height = '297mm';
              });
              const cvPages = target.querySelectorAll('.cv-page');
              cvPages.forEach((page) => {
                (page as HTMLElement).style.height = 'auto';
                (page as HTMLElement).style.minHeight = '297mm';
                (page as HTMLElement).style.overflow = 'visible';
              });
            }
          }
        });
      } finally {
        if (previousAttr === null) {
          element.removeAttribute(captureAttr);
        } else {
          element.setAttribute(captureAttr, previousAttr);
        }
      }

      if (!canvas) {
        throw new Error(`Seite ${i + 1} konnte nicht korrekt erfasst werden.`);
      }
      
      const imgData = canvas.toDataURL('image/png');
      
      // Basic check for empty output
      if (imgData === 'data:,' || imgData.length < 100) {
        throw new Error(`Seite ${i + 1} konnte nicht korrekt erfasst werden.`);
      }

      const imgWidth = pdfWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const scale = imgHeight > pdfHeight ? pdfHeight / imgHeight : 1;
      const finalWidth = imgWidth * scale;
      const finalHeight = imgHeight * scale;

      if (i > 0) {
        pdf.addPage();
      }

      pdf.addImage(imgData, 'PNG', 0, 0, finalWidth, finalHeight, undefined, 'MEDIUM');
    }
    
    pdf.save(filename);
  } catch (error) {
    console.error('PDF Generation Error:', error);
    throw error;
  }
};
