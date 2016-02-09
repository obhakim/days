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
	}
}