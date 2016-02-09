using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Umbraco.Web.Mvc;
using WLabs.Days.UI.Models;

namespace WLabs.Days.UI.Controllers
{
	public class DaysReservationFormController : SurfaceController
	{
		/// <summary>
		/// Renders the Reservation Form
		/// @Html.Action("Index","DaysReservationForm");
		/// </summary>
		/// <returns></returns>
		public ActionResult Index()
		{
			//Return a partial view DaysReservationForm.cshtml in /views/DaysReservationForm/DaysReservationForm.cshtml
			//With an empty/new ContactFormViewModel
			return PartialView("DaysReservationForm", new DaysReservationFormViewModel());
		}

		[HttpPost]
		[ValidateAntiForgeryToken]
		public ActionResult SaveForm(DaysReservationFormViewModel model)
		{
			//Check if the dat posted is valid (All required's & email set in email field)
			if (!ModelState.IsValid)
			{
				//Not valid - so lets return the user back to the view with the data they entered still prepopulated
				return CurrentUmbracoPage();
			}

			////Generate an email message object to send
			//MailMessage email = new MailMessage(model.Email, "you@yoursite.co.uk");
			//email.Subject = "Contact Form Request";
			//email.Body = model.Message;

			//try
			//{
			//	//Connect to SMTP credentials set in web.config
			//	SmtpClient smtp = new SmtpClient();

			//	//Try & send the email with the SMTP settings
			//	smtp.Send(email);
			//}
			//catch (Exception ex)
			//{
			//	//Throw an exception if there is a problem sending the email
			//	throw ex;
			//}

			//Update success flag (in a TempData key)
			TempData["IsSuccessful"] = true;

			//All done - lets redirect to the current page & show our thanks/success message
			return RedirectToCurrentUmbracoPage();
		}
	}
}