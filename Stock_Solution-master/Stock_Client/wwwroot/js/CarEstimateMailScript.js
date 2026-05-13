$(document).ready(function () {
    POSModal.Hide();
    tinymce.init({
        selector: '#InvoiceEmailBodyText'
    });
});
$('.ep_print').on('click', function () {
    if (CommonUiValidation()) {
        var requestInfo = {
            FromName: $('#FromName').val(),
            FromEmail: $('#FromEmail').val(),
            ToEmail: $('#ToEmail').val(),
            CcEmail: $('#CcEmail').val(),
            Subject: $('#Subject').val(),
            Attachment: $('#Attachment').val(),
            EmailBody: tinyMCE.get('InvoiceEmailBodyText').getContent(),

        }
        $.ajax({
            url: '/Customer/SendEmailToCustomer',
            type: 'post',
            data: ({ customerEmail: requestInfo }),
            success: function (data) {
                if (data.success == false) {
                    OpenSuccessMessageNew('Error', data.message);
                }
                else {
                    OpenSuccessMessageNew('Success', data.message);
                }
                CloseTopToBottomModal();
                POSModal.Hide();
            },
            error: function (exr) {
                POSModal.Hide();
                
            }
        });
    }
});