import { useEffect, useState } from "react";

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
        });
    
        phantom?.on("disconnect", () => {
          setConnected(false);
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
            <button onClick={connectHandler}>Connect to Phantom</button>
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
