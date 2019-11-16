<?php
// Check for empty fields
   
$name = $_POST['name'];
$email_address = $_POST['email'];
$phone = $_POST['phone'];
$address = $_POST['address'];
$company = $_POST['companyName'];
$size = $_POST['employeeSize'];
$infomessage = $_POST['clientMessage'];

echo "I am in the mail section";
echo " message $infomessage";
   
// Create the email and send the message
$to = 'praneeth@eruditeworks.com'; // Add your email address inbetween the '' replacing yourname@yourdomain.com - This is where the form will send a message to.
$email_subject = "Website Contact Form:  $name";
$email_body = "You have received a new message from your website contact form.\n\n"."Here are the details:\n\n
Name: $name\n\n
Email: $email_address\n\n
Phone: $phone\n\n
Message:$infomessage\n\n
Address:$address\n\n
Employee Size:$size\n\n
Company Name:$company\n\n";
$headers = "From: HRD@eruditeworks.com\n"; // This is the email address the generated message will be from. We recommend using something like noreply@yourdomain.com.
$headers .= "Reply-To: $email_address";   
mail($to,$email_subject,$email_body,$headers);
return true;       
?>