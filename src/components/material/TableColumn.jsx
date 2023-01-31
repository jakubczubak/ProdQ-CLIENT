export const TableColumn = (type) => {
  if (type == 'Plate') {
    return [
      {
        Header: 'Thickness (mm)',

        accessor: 'z' // accessor is the "key" in the data
      },

      {
        Header: 'Width (mm)',

        accessor: 'x'
      },

      {
        Header: 'Height (mm)',

        accessor: 'y'
      },

      {
        Header: 'Quantity',

        accessor: 'quantity'
      },

      {
        Header: 'Minimum quantity',

        accessor: 'min_quantity'
      },

      {
        Header: 'Inventory date',

        accessor: 'inventory_date'
      },

      {
        Header: 'Action',
        accessor: 'id',
        Cell: ({ cell }) => (
          <button onClick={() => console.log(cell.row.values.id)}>{cell.row.values.id}</button>
        )
      }
    ];
  } else if (type == 'Tube') {
    return [
      {
        Header: 'Diameter (mm)',

        accessor: 'diameter' // accessor is the "key" in the data
      },

      {
        Header: 'Thickness (mm)',

        accessor: 'thickeness' // accessor is the "key" in the data
      },

      {
        Header: 'Length (mm)',

        accessor: 'length'
      },

      {
        Header: 'Quantity',

        accessor: 'quantity'
      },

      {
        Header: 'Minimum quantity',

        accessor: 'min_quantity'
      },

      {
        Header: 'Inventory date',

        accessor: 'inventory_date'
      },

      {
        Header: 'Action',
        accessor: 'id',
        Cell: ({ cell }) => (
          <button onClick={() => console.log(cell.row.values.id)}>{cell.row.values.id}</button>
        )
      }
    ];
  } else if (type == 'Rod') {
    return [
      {
        Header: 'Diameter (mm)',

        accessor: 'diameter' // accessor is the "key" in the data
      },

      {
        Header: 'Length (mm)',

        accessor: 'length'
      },

      {
        Header: 'Quantity',

        accessor: 'quantity'
      },

      {
        Header: 'Minimum quantity',

        accessor: 'min_quantity'
      },

      {
        Header: 'Inventory date',

        accessor: 'inventory_date'
      },

      {
        Header: 'Action',
        accessor: 'id',
        Cell: ({ cell }) => (
          <button onClick={() => console.log(cell.row.values.id)}>{cell.row.values.id}</button>
        )
      }
    ];
  }
};
