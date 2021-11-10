import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { transfer } from "../helpers/Airdrop";
import * as web3 from "@solana/web3.js";


const Papa = require('papaparse');

function ReactDropZone() {

    var connection = new web3.Connection(web3.clusterApiUrl("devnet"));

    const [fileStatus, setFileStatus] = useState<string>("");
    const [fileProgress, setFileProgress] = useState(0);

    const onDrop = useCallback(
        (acceptedFiles) => {
            acceptedFiles.forEach((file: File) => {
                const reader = new FileReader();
                reader.abort = () => setFileStatus("File Reading Aborted");
                reader.onerror = () => setFileStatus("File Reading Failed");
                reader.onload = function (event) {
                    var s = reader.result;
                    setFileProgress(30);
                    var results = Papa.parse(s,{
                        header:true
                    });
                   //console.log(results);
                   console.log(results.data);
                   setFileProgress(50);
                   results.data.forEach(function(obj: { accountNo: string; amount: number; }) {
                    setFileProgress(70);
                transfer("C9A1ocQ4erCTzdCvrFXZknLk3DeaQgtYWGUPvEtMXd4A",(window as any).solana,obj.accountNo,connection,obj.amount);
                setFileStatus("File Reading Done");
                setFileProgress(100);
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
        <div className="pt-28 flex justify-center h-5/6" >
            <div {...getRootProps()} className="w-80 bg-gray-200 rounded-md cursor-pointer focus:outline-none flex justify-center shadow-2xl">
                <input {...getInputProps()} />

                <div className={"h-2/4 flex flex-col items-center justify-center border-2 border-dashed rounded-xl mt-14 p-14 shadow-inner bg-indigo-100" + (isDragReject === true ? "border-red-500 bg-red-50" : "") + (isDragAccept === true ? "border-green-500 bg-green-50" : "")}>
                    <img src="/images/upload-icon.png" alt="upload" className="w-20 h-20" />

                    {isDragReject ? <p>File Format is not accepted</p> :
                        <div>
                            <p>Drag and Drop Files Here</p>
                        </div>}

                </div>
            </div>

        </div>
    );
}

export default ReactDropZone
