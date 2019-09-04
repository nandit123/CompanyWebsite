// Call the dataTables jQuery plugin
$(document).ready(function() {
  $('#dataTable').DataTable( {
  paging: true,
        searching: true,
        dom: 'Bfrtip',
        buttons: [
            'copy', 'csv', 'excel', 'pdf', 'print', 'pdfHtml5'
        ]
    })
});
