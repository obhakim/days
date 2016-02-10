using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace WLabs.Days.UI.Models
{
	public class DaysReservationFormViewModel
	{
		[Required]
		public string Start { get; set; }

		[Required]
		public string Destination { get; set; }

		[Required]
		public DateTime StartAt { get; set; }

		[Required]
		public string VehicleType { get; set; }

		public string Name { get; set; }

		[Required]
		public string Email { get; set; }

		[Required]
		public string Phone { get; set; }

		public int Number1 { get { return (new Random()).Next(10); } }
		public int Number2 { get { return (new Random()).Next(10); } }
		
		[Required]
		public int Captcha { get; set; }
	}
}