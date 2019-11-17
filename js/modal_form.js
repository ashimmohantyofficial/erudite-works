$(function() {

    $("#modalForm input,#modalForm textarea").jqBootstrapValidation({
      preventSubmit: true,
      submitError: function($form, event, errors) {
        // additional error messages or events
      },
      submitSuccess: function($form, event) {
        event.preventDefault(); // prevent default submit behaviour
        // get values from FORM
        var name = $("input#name_modal").val();
        var email = $("input#email_modal").val();
        var phone = $("input#phone_modal").val();
        var address = $("input#address_modal").val();
        var companyName = $("input#company_modal").val();
        var employeeSize = $("input#size_modal").val();
        var clientMessage = $("input#message_modal").val();
        var firstName = name; // For Success/Failure Message
        // Check for white space in name for Success/Fail message
        if (firstName.indexOf(' ') >= 0) {
          firstName = name.split(' ').slice(0, -1).join(' ');
        }
        $this = $("#modalSubmitButton");
        $this.prop("disabled", true); // Disable submit button until AJAX call is complete to prevent duplicate messages
        $.ajax({
          url: "././mail/contact_me.php",
          type: "POST",
          data: {
            name: name,
            phone: phone,
            email: email,
            address : address,
            companyName : companyName,
            employeeSize: employeeSize,
            clientMessage: clientMessage
          },
          cache: false,
          success: function() {
            // Success message
            $('#modal_success').html("<div class='alert alert-success'>");
            $('#modal_success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
              .append("</button>");
            $('#modal_success > .alert-success')
              .append("<strong>Your message has been sent. </strong>");
            $('#modal_success > .alert-success')
              .append('</div>');
            //clear all fields
            $('#modalForm').trigger("reset");
          },
          error: function() {
            // Fail message
            $('#modal_success').html("<div class='alert alert-danger'>");
            $('#modal_success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
              .append("</button>");
            $('#modal_success > .alert-danger').append($("<strong>").text("Sorry " + firstName + ", it seems that my mail server is not responding. Please try again later!"));
            $('#modal_success > .alert-danger').append('</div>');
            //clear all fields
            $('#modalForm').trigger("reset");
          },
          complete: function() {
            setTimeout(function() {
              $this.prop("disabled", false); // Re-enable submit button when AJAX call is complete
            }, 1000);
          }
        });
      },
      filter: function() {
        return $(this).is(":visible");
      },
    });
  
    $("a[data-toggle=\"tab\"]").click(function(e) {
      e.preventDefault();
      $(this).tab("show");
    });
  });
  
  /*When clicking on Full hide fail/success boxes */
  $('#name').focus(function() {
    $('#modal_success').html('');
  });
  
  $('#portfolioModal1').on('hidden.bs.modal', function(e) {
    $(this).find('#modalForm')[0].reset();
    $(this).find('#name_error').html("");
    $(this).find('#email_error').html("");
    $(this).find('#address_error').html("");
    $(this).find('#company_error').html("");
    $(this).find('#size_error').html("");
    $(this).find('#phone_error').html("");
    
               });
  