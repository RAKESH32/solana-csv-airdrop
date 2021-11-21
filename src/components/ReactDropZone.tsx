import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { transfer } from "../helpers/Airdrop";
import { state } from "../State";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

const Papa = require("papaparse");

function ReactDropZone({ enableResult }: any) {
  var connection = state.connection;

  const [fileStatus, setFileStatus] = useState<string>("");
  const [fileProgress, setFileProgress] = useState(0);
  const [airdropBtn, setAirdropBtn] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<string>("");
  const [progress, setProgress] = useState(0);

  const onDrop = useCallback((acceptedFiles) => {
    console.log(acceptedFiles);
    state.instructions = [];
    state.sumTokenAmt = 0;
    state.iteratedCases = 0;
    state.totalCases = 0;
    acceptedFiles.forEach((file: File) => {
      const reader = new FileReader();
      reader.abort = () => setFileStatus("File Reading Aborted");
      reader.onerror = () => setFileStatus("File Reading Failed");
      reader.onload = function (event) {
        var s = reader.result;
        setFileProgress(30);
        var results = Papa.parse(s, {
          header: true,
        });
        //console.log(results);
        state.totalCases = results.data.length;
        console.log(results.data);
        setProgress(5);
        // console.log(results.data.length());
        state.transferResult = [];

        results.data.forEach(async function (obj: {
          accountNo: string;
          amount: number;
        }) {
          setProgress(10);

          await transfer(
            state.selectedToken,
            (window as any).solana,
            obj.accountNo,
            connection,
            obj.amount * 1000000000,
            callback
          );
          state.sumTokenAmt = state.sumTokenAmt + obj.amount;

          setProgress((prevProgress) =>
            prevProgress >= 100
              ? 0
              : (state.iteratedCases / state.totalCases) * 100
          );

          if (
            state.selectedToken != "" &&
            state.iteratedCases == state.totalCases
          ) {
            setAirdropBtn(true);
            enableResult(true);
          }
        });

        console.log("File Reading Done");

        // if(state.sumTokenAmt > state.selectedTokenAmt && state.selectedToken !="" )
        // {
        //     alert("Oops you are short by "+(state.sumTokenAmt-state.selectedTokenAmt)+" tokens to initiate the airdrop. Reduce tokens from file or mint more tokens.");
        //     setAirdropBtn(false);
        // }
      };

      reader.readAsBinaryString(file);
      console.log(resultData);
      setUploadedFile(file.name);
    });
  }, []);

  const { getRootProps, getInputProps, isDragAccept, isDragReject } =
    useDropzone({
      onDrop,
      multiple: false,
      accept: "application/vnd.ms-excel,text/plain,text/x-csv,text/csv",
    });

  return (
    <div>
      <div {...getRootProps()}>
        <input {...getInputProps()} />

        <div
          className={
            "h-2/4 flex flex-col items-center justify-center border-2 border-dashed rounded-xl shadow-inner p-14 bg-indigo-100" +
            (isDragReject === true ? "m bg-red-100 " : "") +
            (isDragAccept === true ? "m bg-green-100 " : "")
          }
        >
          <img
            src="/images/upload-icon.png"
            alt="upload"
            className="w-20 h-20"
          />

          {isDragReject ? (
            <p>File Format is not accepted</p>
          ) : (
            <div>
              <p>Drag and Drop Files Here</p>
            </div>
          )}
        </div>

        <div
          className={
            "mt-4 shadow-2xl w-full h-16 flex items-center justify-center bg-indigo-100 " +
            (airdropBtn === true ? " " : " hidden")
          }
        >
          <img src="/images/csv1.png" alt="csv" className="w-9 h-9" />{" "}
          <span className="pl-7 ">
            {" "}
            File <b> {uploadedFile} </b>Uploaded{" "}
            <div>
              {state.iteratedCases}/{state.totalCases} cases processed.
            </div>
          </span>
        </div>
      </div>
      <Box sx={{ width: "100%" }}>
        <LinearProgress variant="determinate" value={progress} />
      </Box>
    </div>
  );
}

export default ReactDropZone;
function resultData(resultData: any) {
  throw new Error("Function not implemented.");
}

function callback(
  accountNo: string,
  amount: number,
  result: string,
  error: string
) {
  state.transferResult.push({
    ReceiverAcc: accountNo,
    Amt: amount / 1000000000,
    Result: result,
    Error: error,
  });

  state.iteratedCases = state.iteratedCases + 1;
}
