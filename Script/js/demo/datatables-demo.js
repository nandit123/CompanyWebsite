// Call the dataTables jQuery plugin
$(document).ready(function() {
  $('#dataTable').DataTable( {
  paging: true,
        searching: true,
        dom: 'Bfrtip',
        buttons: [
            'copy', 'csv', 'excel', 'pdf', 'print'
        ],
        "columnDefs": [
            {
                "data": "QR Code",
                "render": function(data, type, row) {
                    return '<img src="'+data+'" />';
                }            
            }
        ]
    })
});
