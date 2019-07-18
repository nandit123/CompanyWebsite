// Call the dataTables jQuery plugin
$(document).ready(function() {
  $('#dataTable').DataTable( {
  paging: false,
        searching: false,
        dom: 'Bfrtip',
        buttons: [
            'copy', 'csv', 'excel', 'pdf', 'print'
        ]
    })
});
