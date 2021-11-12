import MaterialTable from 'material-table';
import React, { forwardRef, useState } from 'react'
import { state } from '../State';


const ResultTable = (props:any) => {

    
  

    const columns=[
        {title:"Destination Address",field:"ReceiverAcc",emptyValue:()=><em>null</em>},
        {title:"Amount",field:"Amt",emptyValue:()=><em>null</em>},
        {title:"Result",field:"Result",emptyValue:()=><em>null</em>},
        {title:"Error",field:"Error",emptyValue:()=><em>null</em>}
    ];

    const [selectedRow, setSelectedRow] = useState("");

  
    return (props.trigger) ? (
        <div>
            <link
  rel="stylesheet"
  href="https://fonts.googleapis.com/icon?family=Material+Icons"
/>
            <MaterialTable columns={columns} data ={state.transferResult} options={{search:false, paginationType:"stepped", showFirstLastPageButtons: false, paginationPosition:"bottom", addRowPosition:"first", exportButton:true,
        rowStyle: rowData => ({
          backgroundColor: (selectedRow === rowData.tableData.id) ? '#EEE' : '#FFF'
        })}}  />
        
        </div>
    ) : <div></div>;
}

export default ResultTable
