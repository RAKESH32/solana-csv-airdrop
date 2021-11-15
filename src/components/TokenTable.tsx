import React, { useEffect, useState } from 'react'
import MaterialTable from 'material-table'
import { state } from '../State';

 function TokenTable({selectToken}: any) {

    
    const columns=[
        {title:"Token Name",field:"TName",emptyValue:()=><em>null</em>},
        {title:"Token Account",field:"TAcc",emptyValue:()=><em>null</em>},
        // {title:"Supply",field:"Supply",emptyValue:()=><em>null</em>},
        {title:"Balance",field:"Balance",emptyValue:()=><em>null</em>}
    ];

    const [selectedRow, setSelectedRow] = useState("0");

    function afterRowClick(id:string,tokenName:string){

        setSelectedRow(id);
        state.selectedToken = tokenName;
        selectToken(tokenName);

    }

    return   (
        <div>
            <MaterialTable title="Wallet's Available Token" columns={columns} data ={state.walletData}  onRowClick={((evt, selectedRow) => afterRowClick(selectedRow.tableData.id,selectedRow.TName))} options={{search:false, paginationType:"stepped", showFirstLastPageButtons: false, paginationPosition:"bottom", addRowPosition:"first",
        rowStyle: rowData => ({
          backgroundColor: (selectedRow === rowData.tableData.id) ? '#EEE' : '#FFF'
        })}}  />
        
        </div>
    ) ;
}

export default TokenTable
