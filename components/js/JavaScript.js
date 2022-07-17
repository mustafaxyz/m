// CLOSE BUTTON

$(".closeBtn").click(function () {
	$("body").css("overflow-y", "scroll"),
		$("#weatherForm, #mailForm").css("visibility", "hidden"),
		$("#main, #about, #projects, #games, #contact").css("filter", "blur(0rem)");
});

// WEATHER FORM

$("#weatherBtn").click(function () {
	$("body").css("overflow-y", "hidden"),
		$("#weatherForm").css("visibility", "visible"),
		$("#main, #about, #projects, #games, #contact").css(
			"filter",
			"blur(0.3rem)"
		);
});

$("#weatherFormSubmit").click(function () {
	var city = $("#cityInput").val();

	if (city != "") {
		toastr.info("Please wait. . ."),
			$(".submitBtn, .closeBtn").attr("disabled", "disabled"),
			$("#weatherLoadGIF").css("visibility", "visible");

		fetch(
			"https://api.openweathermap.org/data/2.5/weather?q=" +
				city +
				"&appid=2603d983da89b879f75afba68808e810"
		)
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				$("#cityName").html("City: " + data["name"]);

				if (data["cod"] == "404") {
					Swal.fire({
						icon: "error",
						title: "Failed!",
						text: "Enter a valid city name!",
					});

					$("#cityTemp").html("Temperature: -"),
						$("#cityTempDesc").html("Description: -");
				} else {
					$("#cityTemp").html(
						"Temperature: " + (data["main"]["temp"] - 273.15).toFixed(2) + "° C"
					),
						$("#cityTempDesc").html(
							"Description: " +
								data["weather"]["0"]["description"] +
								"<img src='http://openweathermap.org/img/w/" +
								data["weather"]["0"]["icon"] +
								".png'>"
						);
				}

				$("#weatherFormSubmit, .closeBtn").removeAttr("disabled"),
					$("#weatherLoadGIF").css("visibility", "hidden");
			});
	} else {
		Swal.fire({
			icon: "error",
			title: "Failed!",
			text: "Enter the City name first!",
		});
	}
});

// GAME MESSAGE

$(".playBtn").click(function () {
	Swal.fire({
		icon: "error",
		title: "Oops!",
		text: "The game is underdevelopment phase. . .",
	});
});

// MAIL FORM

$("#mailBtn").click(function () {
	$("#mailForm").css("visibility", "visible"),
		$("body").css("overflow-y", "hidden"),
		$("#main, #about, #projects, #games, #contact").css(
			"filter",
			"blur(0.3rem)"
		);
});

$("#mailFormSubmit").click(function () {
	var mailContent = {
		SName: $("#senderName").val(),
		SOrg: $("#senderOrg").val(),
		SEmail: $("#senderEmail").val(),
		SMsg: $("#senderMessage").val(),
	};

	var gCaptchaResponse = grecaptcha.getResponse();

	if (gCaptchaResponse.length == 0) {
		Swal.fire({
			icon: "error",
			title: "Failed!",
			text: "Please verify that you're not a robot!",
		});
	} else {
		if (
			mailContent.SName != "" &&
			mailContent.SEmail != "" &&
			mailContent.SMsg != ""
		) {
			toastr.info("Please wait. . ."),
				$("#mailLoadGIF").css("visibility", "visible"),
				$("#mailFormSubmit .closeBtn").attr("disabled", "disabled");

			emailjs
				.send(
					"service_a616s4m",
					"template_3595q8j",
					mailContent,
					"7xsQ4RwbNlJqp1Ddn"
				)
				.then(
					function (response) {
						Swal.fire(
							"Success!",
							"Your message was sent successfully!",
							"success"
						);

						$("#mailForm")[0].reset(),
							$("#mailFormSubmit, .closeBtn").removeAttr("disabled"),
							$("#mailLoadGIF").css("visibility", "hidden");
					},
					function (error) {
						Swal.fire({
							icon: "error",
							title: "Failed!",
							text: "Something went wrong!",
						});

						console.log(error);

						$("#mailFormSubmit, .closeBtn").removeAttr("disabled"),
							$("#mailLoadGIF").css("visibility", "hidden");
					}
				);
		}
	}
});

// TAWK.TO

var Tawk_API = Tawk_API || {},
	Tawk_LoadStart = new Date();
(function () {
	var s1 = document.createElement("script"),
		s0 = document.getElementsByTagName("script")[0];
	s1.async = true;
	s1.src = "https://embed.tawk.to/6292c69d7b967b117991c3f7/1g46mfguh";
	s1.charset = "UTF-8";
	s1.setAttribute("crossorigin", "*");
	s0.parentNode.insertBefore(s1, s0);
})();
