'use client';

import React, { useState, useEffect } from 'react';
import { learningManager } from '@/lib/learning-state';

export default function SteganographyLab() {
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState<{tool: string, output: string}[]>([]);

  useEffect(() => {
    learningManager.markLabCompleted('steganography-101');
  }, []);

  const handleToolRun = (toolName: string) => {
    setAnalyzing(true);
    setResults([]);
    
    // Simulate processing delay
    setTimeout(() => {
      let output = '';
      
      switch(toolName) {
        case 'exiftool':
          output = `ExifTool Version Number         : 12.60
File Name                       : classified_logo.png
File Size                       : 45 kB
File Modification Date/Time     : 2024:01:15 09:30:00
File Access Date/Time           : 2024:02:10 14:22:11
File Type                       : PNG
MIME Type                       : image/png
Image Width                     : 800
Image Height                    : 600
Bit Depth                       : 8
Color Type                      : RGB with Alpha
Compression                     : Deflate/Inflate
Filter                          : Adaptive
Interlace                       : Noninterlaced
Comment                         : "Nothing to see here."`;
          break;
        case 'strings':
          output = `IHDR
pHYs
tEXtSoftware
Adobe ImageReadyq
%iTXtXML:com.adobe.xmp
<x:xmpmeta xmlns:x="adobe:ns:meta/" x:xmptk="Adobe XMP Core 5.6-c148 79.164036, 2019/08/13-01:06:57">
...
ZENTRION{h1dd3n_1n_pl41n_s1ght}
...
IEND`;
          break;
        case 'zsteg':
          output = `imagedata           .. text: "\\n\\n\\n\\n\\n\\n"
b1,rgb,lsb,xy       .. text: "This is just random noise mostly..."
b2,r,msb,xy         .. file: empty
b4,g,lsb,xy         .. text: "fgfgfgfgfgf"`;
          break;
      }

      setResults([{ tool: toolName, output }]);
      setAnalyzing(false);
    }, 1500);
  };

  return (
    <div className="flex-1 p-6 font-mono text-sm">
      <div className="max-w-4xl mx-auto space-y-6">
        
        <div className="border border-cyan/30 bg-cyan/5 p-4 rounded-lg">
          <h2 className="text-cyan font-bold text-lg mb-2">Lab Brief: Steganography 101</h2>
          <p className="text-mute mb-2">
            Steganography is the practice of concealing a file, message, image, or video within another file.
            You've intercepted an image file (`classified_logo.png`) that is suspected to contain a hidden flag.
          </p>
          <p className="text-mute">
            Use the simulated forensics toolkit below to analyze the file and extract the flag.
          </p>
        </div>

        <div className="grid md:grid-cols-[250px_1fr] gap-6">
          <div className="space-y-4">
            <div className="border border-line bg-surface/50 p-4 rounded-lg text-center">
              <div className="w-24 h-24 mx-auto bg-gradient-to-br from-gray-800 to-black border-2 border-dashed border-gray-600 rounded-lg flex items-center justify-center mb-3">
                <span className="text-xs text-mute">classified_logo.png</span>
              </div>
              <p className="text-xs text-white font-bold">Target File Loaded</p>
            </div>

            <div className="border border-line bg-surface/50 p-4 rounded-lg flex flex-col gap-2">
              <h3 className="font-bold text-xs uppercase tracking-wider text-mute mb-2">Forensics Tools</h3>
              
              <button 
                onClick={() => handleToolRun('exiftool')}
                disabled={analyzing}
                className="w-full btn-ghost text-xs py-2 text-left justify-start border border-line"
              >
                &gt; Run ExifTool (Metadata)
              </button>
              
              <button 
                onClick={() => handleToolRun('strings')}
                disabled={analyzing}
                className="w-full btn-ghost text-xs py-2 text-left justify-start border border-line"
              >
                &gt; Run Strings (Text Extraction)
              </button>
              
              <button 
                onClick={() => handleToolRun('zsteg')}
                disabled={analyzing}
                className="w-full btn-ghost text-xs py-2 text-left justify-start border border-line"
              >
                &gt; Run zsteg (LSB Analysis)
              </button>
            </div>
          </div>

          <div className="border border-line bg-void p-0 rounded-lg overflow-hidden flex flex-col h-[500px]">
            <div className="bg-surface border-b border-line p-3 flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="ml-2 text-xs text-mute font-bold">Terminal - Analysis Output</span>
            </div>
            
            <div className="p-4 flex-1 overflow-auto bg-black text-green-400 font-mono text-xs whitespace-pre-wrap">
              {analyzing ? (
                <div className="animate-pulse">[*] Analyzing file... please wait...</div>
              ) : results.length > 0 ? (
                <div>
                  <div className="text-white mb-2">$ {results[0].tool} classified_logo.png</div>
                  <div>{results[0].output}</div>
                  
                  {results[0].output.includes('ZENTRION{') && (
                    <div className="mt-6 text-cyan font-bold p-2 border border-cyan/30 bg-cyan/10 rounded inline-block">
                      [+] FLAG FOUND: The extracted output contains a valid CTF flag!
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-mute">
                  Ready. Select a tool from the left to begin analysis.
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
