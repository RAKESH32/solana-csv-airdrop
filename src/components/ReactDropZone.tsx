import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { transfer } from "../helpers/Airdrop";
import * as web3 from "@solana/web3.js";


const Papa = require('papaparse');

function ReactDropZone() {

    var connection = new web3.Connection(web3.clusterApiUrl("devnet"));

    const [fileData, setFileData] = useState<string>("");

    const onDrop = useCallback(
        (acceptedFiles) => {
            acceptedFiles.forEach((file: File) => {
                const reader = new FileReader();
                reader.abort = () => console.log('file reading aborted');
                reader.onerror = () => console.log('file reading failed');
                reader.onload = function (event) {
                    var s = reader.result;
                    var results = Papa.parse(s,{
                        header:true
                    });
                   //console.log(results);
                   console.log(results.data);
                   results.data.forEach(function(obj: { accountNo: string; amount: number; }) {

                transfer("C9A1ocQ4erCTzdCvrFXZknLk3DeaQgtYWGUPvEtMXd4A",(window as any).solana,obj.accountNo,connection,obj.amount);

                   });

                  


                };
                reader.readAsBinaryString(file);

            });
        },
        []
    );

    const { getRootProps, getInputProps, isDragAccept, isDragReject } = useDropzone({
        onDrop,
        multiple: false,
        accept: "application/vnd.ms-excel"
    });

    return (
        <div className="p-4 w-full">
            <div {...getRootProps()} className="h-80 w-full bg-gray-500 rounded-md cursor-pointer focus:outline-none">
                <input {...getInputProps()} />

                <div className={"flex flex-col items-center justify-center border-2 border-dashed border-yellow-light rounded-xl " + (isDragReject === true ? "border-red-500" : "") + (isDragAccept === true ? "border-green-500" : "")}>
                    <img src="/images/folder.png" alt="folder" className="w-16 h-16" />

                    {isDragReject ? <p>Not accepted</p> :
                        <div>
                            <p>Drag and Drop Files Here</p>
                        </div>}

                </div>
            </div>

        </div>
    );
}

export default ReactDropZone
