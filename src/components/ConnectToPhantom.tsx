import { useEffect, useState } from "react";
import { getTokenDetails } from "../helpers/Airdrop";
import { state } from '../State';

type Event = "connect" | "disconnect";

interface Phantom {
    connect: () => Promise<void>;
    disconnect: () => Promise<void>;
    on: (event: Event, callback: () => void) => void;
}


const ConnectToPhantom = () => {
    const [phantom,setPhantom] = useState<Phantom | null>(null);

    useEffect(() => {
        if ("solana" in window) {
            const provider = (window as any).solana;
            if (provider.isPhantom) {
              setPhantom(provider);
            }
        }
    }, []);

    const [connected,setConnected] = useState(false);

    useEffect(() => {
        phantom?.on("connect", () => {
          setConnected(true);
          state.connected = true;
          getTokenDetails((window as any).solana);

        });
    
        phantom?.on("disconnect", () => {
          setConnected(false);
          state.connected = false;
        });
      }, [phantom]);

    const connectHandler = () => {
        phantom?.connect();
    }
    const disconnectHandler = () => {
        phantom?.disconnect();
    }

    if(phantom)
    {
        if(connected)
        {
            return(
                <button onClick={disconnectHandler}>Disconnect from Phantom</button>
            );
        }


        return(
          <a onClick={connectHandler} className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded inline-flex items-center rounded-full cursor-pointer mt-4 shadow-2xl">
          <svg className="mr-3" width="32pt" height="32pt" viewBox="0 0 640.000000 640.000000"
           preserveAspectRatio="xMidYMid meet">
          <g transform="translate(0.000000,640.000000) scale(0.100000,-0.100000)"
          fill="#000000" stroke="none">
          <path d="M2845 6384 c-704 -79 -1362 -390 -1864 -878 -526 -512 -840 -1123
          -952 -1851 -30 -189 -37 -577 -15 -785 106 -1001 669 -1888 1530 -2410 416
          -252 879 -405 1361 -450 161 -15 464 -12 633 5 707 74 1373 385 1881 879 526
          512 840 1123 952 1851 30 189 37 577 15 785 -76 718 -384 1379 -880 1889 -512
          526 -1121 839 -1851 953 -176 27 -620 34 -810 12z m210 -1144 c555 -62 1063
          -328 1406 -739 303 -361 462 -762 495 -1248 l7 -102 331 -3 c321 -3 332 -4
          373 -25 88 -48 150 -138 160 -235 10 -94 -59 -305 -158 -483 -368 -665 -1289
          -1245 -2191 -1381 -142 -21 -513 -30 -663 -15 -558 54 -1076 306 -1475 717
          -542 558 -736 1249 -550 1961 195 750 820 1346 1585 1513 211 46 482 62 680
          40z"/>
          <path d="M1614 3822 c-70 -25 -124 -71 -160 -134 l-29 -53 0 -305 0 -305 30
          -54 c92 -166 316 -199 449 -65 79 79 81 90 81 424 0 279 -1 297 -21 341 -61
          130 -218 199 -350 151z"/>
          <path d="M2620 3831 c-51 -16 -108 -51 -138 -86 -68 -76 -67 -71 -70 -393 -3
          -247 -1 -301 13 -341 46 -139 208 -220 350 -176 73 23 144 87 176 157 23 52
          24 59 24 338 0 279 -1 286 -24 338 -56 124 -210 200 -331 163z"/>
          </g>
          </svg>
            Connect to Phantom
          </a>
        );
    }

    return (
    <a
      href="https://phantom.app/"
      target="_blank"
      className="bg-purple-500 px-4 py-2 border border-transparent rounded-md text-base font-medium text-white"
    >
      Get Phantom
    </a>
  );
}

export default ConnectToPhantom;
