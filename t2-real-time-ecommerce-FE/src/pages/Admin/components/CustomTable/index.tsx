import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import {
    ColDef,
    ColGroupDef,
    GridReadyEvent,
  } from 'ag-grid-community';
  
import './styles.css';
import { Button } from 'reactstrap';
import { orderDetailsUpdateStatus } from 'slice/user/action'
import { useDispatch } from 'react-redux';
import { AppDispatch, useAppSelector } from 'state/store';

const CustomTable = ({
  orderDetailsByUserList,
  setOrderDetailsByUserList
}: {
  orderDetailsByUserList: any,
  setOrderDetailsByUserList: any,
}) => {
    const dispatch = useDispatch<AppDispatch>()
    const { loading, orderDetailsItem } = useAppSelector((state) => state.user.orderDetailsItem)
    const gridRef = useRef<AgGridReact<any>>(null);
    const containerStyle = useMemo(() => ({ width: '100%', marginTop: 150, height: '70%' }), []);
    const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
    const [rowData, setRowData] = useState<any[]>(orderDetailsByUserList);
    const [columnDefs, setColumnDefs] = useState<(ColDef | ColGroupDef)[]>([
          { field: 'id', minWidth:120, headerName: 'OrderID' },
          { field: 'order.user.id', minWidth:120, headerName: 'CustomerID' },
          { field: 'order.user.name', minWidth:120, headerName: 'Customer Name' },
          { field: 'product.id', minWidth:120, headerName: 'ProductID' },
          { field: 'product.name', minWidth:120, headerName: 'Product Name' },
          { field: 'product.product_color.name', minWidth:120, headerName: 'Product Color' },
          { field: 'is_completed', minWidth:120, headerName: 'Order Status', cellRenderer: (params: any) => params.value ? 'Completed' : 'Open' },
          { field: 'created_at', minWidth:120, headerName: 'Order Date Time' },
          { field: 'is_completed', minWidth: 180, headerName: 'Action', 
            cellRenderer: (params: any) => params.value ? '' : <><Button onClick={() => {
              dispatch(orderDetailsUpdateStatus({orderDetailId: params.data.id, isCompleted: (!params.data.is_completed).toString()}));
              setOrderDetailsByUserList(
                (data: any) =>  data.map((d: any) => d.id === params.data.id ? {...d, is_completed: true} : d) 
              )
            }}  color="success"outline size="sm">Set Completed</Button></> 
              
          },

    ]);
    const defaultColDef = useMemo<ColDef>(() => {
      return {
        sortable: true,
        filter: true,
        resizable: true,
        minWidth: 100,
        flex: 1,
      };
    }, []);
  
    const onBtExport = useCallback(() => {
      gridRef.current!.api.exportDataAsExcel();
    }, []);

    useEffect(() => {
      if (orderDetailsByUserList && !rowData) {
        setRowData(orderDetailsByUserList)
      }
    }, [orderDetailsByUserList])
  
    return (
      <div style={containerStyle}>
        <div className="container">
          <div className='text-right'>
            <Button
                color='primary'
              onClick={onBtExport}
              style={{ marginBottom: '5px', fontWeight: 'bold' }}
            >
              Download Excel
            </Button>
          </div>
          <div className="grid-wrapper">
            <div style={gridStyle} className="ag-theme-alpine">
              <AgGridReact<any>
                pagination
                paginationPageSize={10}
                ref={gridRef}
                rowData={rowData}
                columnDefs={columnDefs}
                defaultColDef={defaultColDef}
                rowHeight={55}
                headerHeight={55}
              ></AgGridReact>
            </div>
          </div>
        </div>
      </div>
    );
  };
  export default CustomTable