// Call the dataTables jQuery plugin
$(document).ready(function() {
  $('#dataTable').DataTable( {
  paging: true,
        searching: true,
        dom: 'Bfrtip',
        buttons: [
            'copy', 'csv', 'excel', 'pdf', 'print'
	    // ,{
		// extend: 'pdfHtml5',
		// exportOptions: {
		//     stripHtml: false
		// }
	    // }
        ]
        // ,"columnDefs": [
        //     {
		// "targets": 4,
        //         "data": "QR Code",
        //         "render": function(data, type, row, meta) {
        //             return '<img src="'+data+'" />';
        //         }            
        //     }
        // ]
    })
});
