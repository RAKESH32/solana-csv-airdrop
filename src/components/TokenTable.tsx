import React, { useEffect, useState } from 'react'
import MaterialTable from 'material-table'
import { state } from '../State';
import { Button } from '@material-ui/core';

 function TokenTable(props: any) {

    
    const columns=[
        {title:"Token Name",field:"TName",emptyValue:()=><em>null</em>},
        {title:"Token Account",field:"TAcc",emptyValue:()=><em>null</em>},
        // {title:"Supply",field:"Supply",emptyValue:()=><em>null</em>},
        {title:"Balance",field:"Balance",emptyValue:()=><em>null</em>}
    ];

    const [selectedRow, setSelectedRow] = useState("");

    function afterRowClick(id:string,tokenName:string){

        setSelectedRow(id);
        state.selectedToken = tokenName;

    }

    return (props.trigger) ? (
        <div>
            <MaterialTable columns={columns} data ={state.walletData}  onRowClick={((evt, selectedRow) => afterRowClick(selectedRow.tableData.id,selectedRow.TName))} options={{search:false, paginationType:"stepped", showFirstLastPageButtons: false, paginationPosition:"bottom", addRowPosition:"first",
        rowStyle: rowData => ({
          backgroundColor: (selectedRow === rowData.tableData.id) ? '#EEE' : '#FFF'
        })}}  />
        
        </div>
    ) : <div></div>;
}

export default TokenTable
