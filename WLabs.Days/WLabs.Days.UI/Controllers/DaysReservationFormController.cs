using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Helpers;
using System.Web.Mvc;
using Umbraco.Core.Models;
using Umbraco.Core.Services;
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
			//if (!ModelState.IsValid ||
			//	(model.Captcha != model.Number1 + model.Number2))	// TODO : Add comprehensive message here
			if (!ModelState.IsValid)
			{
				//Not valid - so lets return the user back to the view with the data they entered still prepopulated
				return CurrentUmbracoPage();
			}

			//IPublishedProperty targetFolder = Umbraco.AssignedContentItem.GetProperty("reservationsstore");
			//IPublishedProperty targetFolder = CurrentPage.GetProperty("reservationsstore");
			IHtmlString targetDocType = Umbraco.Field("reservationdocumenttype");
			IPublishedProperty targetFolder = Umbraco.AssignedContentItem.GetProperty("reservationsstore");

			// Umbraco content API - get the content type of the form
			IContentService contentService = Services.ContentService;
			IContentTypeService contentTypeService = Services.ContentTypeService;
			IContentType dt = contentTypeService.GetContentType(targetDocType.ToString());

			if (dt == null)
			{
				ModelState.AddModelError("Model", "Your form cannot be created as no document type has been selected.");
				return CurrentUmbracoPage();
			}


			// folder in content tree where form submissions will be stored
			//var folderId = CurrentPage.StorageFolder;
			//if (String.IsNullOrEmpty(folderId)) {folderId = root.Id;}
			int folderId = (int)targetFolder.Value;

			// get admin email from the root node
			//IPublishedContent root = CurrentPage.AncestorOrSelf(1);
			//string contactEmail = (string)root.GetPropertyValue("contactEmail");
			//if (string.IsNullOrEmpty(contactEmail)) { contactEmail = "chris.isnt@gmail.com"; }

			// page properties
			string title = Umbraco.Field("title", altFieldAlias: "pageName").ToString();
			string bodyText = Umbraco.Field("bodyText").ToString();

			IEnumerable<PropertyGroup> tabs = dt.PropertyGroups;
			IEnumerable<PropertyType> properties = dt.CompositionPropertyTypes.OrderBy(x => x.SortOrder);

			// save the information as a content node with the specified doc type
			SaveContentItem(contentService, properties, targetDocType.ToString(), folderId, title);

			//// open table for email data
			//StringBuilder sbFormData = new StringBuilder();
			//sbFormData.Append("<table>");

			//foreach (PropertyGroup pg in tabs)
			//{
			//		foreach (PropertyType pt in pg.PropertyTypes.OrderBy(x => x.SortOrder))
			//		{
			//				// get the name and value
			//				var fieldName = pt.Alias + pt.Id;
			//				string fieldValue = FieldValue(pt.PropertyEditorAlias, fieldName);

			//				// override on/off check box values
			//				if (pt.PropertyEditorAlias == "Umbraco.TrueFalse") { fieldValue = (fieldValue == "1" ? "True" : "False"); }

			//				// save it for the email
			//				sbFormData.Append("<tr><td>" + pt.Alias + "</td><td>" + fieldValue + "</td></tr>");

			//				<div class=" form-group" style="clear:both;">
			//						<label for="@fieldName" class="control-label ">@pt.Name :</label>
			//						<div class="">
			//								@fieldValue
			//						</div>
			//				</div>
			//		}
			//}

			//// close table for email data
			//sbFormData.Append("</table>");

			//// send an email
			//if(!string.IsNullOrEmpty(contactEmail))
			//{
			//		@SendEmail(contactEmail, doctype, title, sbFormData.ToString())
			//}

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

		private void SaveContentItem(IContentService contentService, IEnumerable<PropertyType> properties, string doctype, int folderId, string title)
		{
			var ct = contentService.CreateContent(doctype + " : " + title + " : " + DateTime.Now.ToString("yyyy/MM/dd HH:mm:ss"), folderId, doctype, 0);

			foreach (PropertyType pt in properties)
			{
				var fieldName = pt.Alias + pt.Id;
				var fieldValue = Request.Form[fieldName];
				//// override on/off check box values
				//if (pt.PropertyEditorAlias == "Umbraco.TrueFalse") { fieldValue = (fieldValue == "on" ? "1" : "0"); }
				ct.SetValue(pt.Alias, fieldValue);
			}

			contentService.Save(ct);
		}

		private void SendEmail(string contactEmail, string doctype, string title, string formData)
		{
			string to = contactEmail;
			string subj = "Form submission : " + doctype + " : " + title;

			try
			{
				string smtpServer = System.Configuration.ConfigurationManager.AppSettings["smtpServer"];
				string smtpPort = System.Configuration.ConfigurationManager.AppSettings["smtpPort"];
				string userName = System.Configuration.ConfigurationManager.AppSettings["smtpUserName"];
				string password = System.Configuration.ConfigurationManager.AppSettings["smtpPassword"];
				string adminEmail = System.Configuration.ConfigurationManager.AppSettings["adminEmail"];

				// Initialize WebMail helper
				WebMail.SmtpServer = smtpServer;
				WebMail.SmtpPort = Convert.ToInt32(smtpPort);
				WebMail.UserName = userName;
				WebMail.Password = password;
				WebMail.From = contactEmail;

				// Send email
				WebMail.Send(to: to,
						cc: adminEmail,
						subject: subj,
						body: formData
				);
			}
			catch (Exception ex)
			{
				// display failure message
				formData = ex.Message;
			}

		}
	}
}