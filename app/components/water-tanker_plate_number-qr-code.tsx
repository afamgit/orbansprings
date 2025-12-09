'use client'

import {QRCodeSVG} from 'qrcode.react';
import {useRef} from 'react';

function downloadStringAsFile(data: string, filename: string) {
  let a = document.createElement('a');
  a.download = filename;
  a.href = data;
  a.click();
}

function WaterTankerPlateNumberQrCode({platenumber}: {platenumber:string}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  function onCanvasButtonClick() {
    const node = canvasRef.current;
    if (node == null) {
      return;
    }
    // For canvas, we just extract the image data and send that directly.
    const dataURI = node.toDataURL('image/png');

    downloadStringAsFile(dataURI, 'qrcode-canvas.png');
  }

  function onSVGButtonClick() {
    const node = svgRef.current;
    if (node == null) {
      return;
    }

    // For SVG, we need to get the markup and turn it into XML.
    // Using XMLSerializer is the easiest way to ensure the markup
    // contains the xmlns. Then we make sure it gets the right DOCTYPE,
    // encode all of that to be safe to be encoded as a URI (which we
    // need to stuff into href).
    const serializer = new XMLSerializer();
    const fileURI =
      'data:image/svg+xml;charset=utf-8,' +
      encodeURIComponent(
        '<?xml version="1.0" standalone="no"?>' +
          serializer.serializeToString(node)
      );

    downloadStringAsFile(fileURI, 'qrcode-svg.svg');
  }

  return (
    <>

      <div className="my-3 py-2">
        {/* <div>
          <QRCodeCanvas ref={canvasRef} value="hello world" />
          <button onClick={onCanvasButtonClick} style={{display: 'block'}}>
            download canvas
          </button>
        </div> */}
        <div>
          <QRCodeSVG ref={svgRef} value={`${platenumber}`} />
          {/* <button onClick={onSVGButtonClick} style={{display: 'block'}}>
            download svg
          </button> */}
        </div>
      </div>
    </>
  );
}

export default WaterTankerPlateNumberQrCode;