import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { executeInst, transfer } from "../helpers/Airdrop";
import * as web3 from "@solana/web3.js";
import { state } from "../State";

const Papa = require('papaparse');

function ReactDropZone() {

    var connection = state.connection;

    const [fileStatus, setFileStatus] = useState<string>("");
    const [fileProgress, setFileProgress] = useState(0);
    const [airdropBtn,setAirdropBtn] = useState(false);
    const [uploadedFile,setUploadedFile] = useState<string>("");

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
                   const resultData =[];
                   results.data.forEach(async function(obj: { accountNo: string; amount: number; }) {
                    setFileProgress(70);
                
                state.transferResult=[];
                transfer("C9A1ocQ4erCTzdCvrFXZknLk3DeaQgtYWGUPvEtMXd4A",(window as any).solana,obj.accountNo,connection,obj.amount,callback);
                
                setFileStatus("File Reading Done");
                setAirdropBtn(true);
                
            });
                };
                reader.readAsBinaryString(file);
                console.log(resultData);
                setUploadedFile(file.name);
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
        
        <div  >
           
            <div {...getRootProps()} >
                <input {...getInputProps()} />

                <div className={"h-2/4 flex flex-col items-center justify-center border-2 border-dashed rounded-xl shadow-inner p-14 bg-indigo-100" + (isDragReject === true ? "m bg-red-100 " : "") + (isDragAccept === true ? "m bg-green-100 "  : "")}>
                    <img src="/images/upload-icon.png" alt="upload" className="w-20 h-20" />

                    {isDragReject ? <p>File Format is not accepted</p> :
                        <div>
                            <p>Drag and Drop Files Here</p>
                        </div>}

                </div>
                <div className={"mt-4 shadow-2xl w-full h-16 flex items-center justify-center bg-indigo-100 "+(airdropBtn === true ? " ":" hidden")}><img src="/images/csv1.png" alt="csv" className="w-9 h-9" /> <span className="pl-7 "> File <b> {uploadedFile} </b>Uploaded</span></div>
 
                
                </div>
                <div className="flex justify-center pt-7 rounded">
                <a onClick={() => executeInst((window as any).solana,state.connection)} className={"  text-white py-2 px-4 inline-flex items-center rounded cursor-pointer shadow-2xl   " +(airdropBtn === true ? "bg-indigo-600 hover:bg-indigo-700 ":"bg-gray-400 pointer-events-none") }>Initiate Airdrop</a>
            </div>

        </div>
    );
}

export default ReactDropZone
function resultData(resultData: any) {
    throw new Error("Function not implemented.");
}

function callback(accountNo:string,amount:number,result:string,error:string) {

    state.transferResult.push({
        ReceiverAcc: accountNo,
        Amt:amount,
        Result: result,
        Error: error
    });
    
}
