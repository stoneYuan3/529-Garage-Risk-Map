var form_base=`
	<section class="flex section-report">
	<section class="flex flex-column section-report-form">

	<div class="flex flex-row section-formTitle">
	<h1></h1>
	<button id="button-form-quit">Quit</button>
	</div>

	<div id="form">

	</div>

	</section>
	</section>	
`;
var form_bikeDetail=`    

	<a class="link-report-login" href=""><em>Reporting a registered bike? Log in</em></a>

	<form id="bike-detail" method="POST" class="flex flex-column">
	<label for="nickname">Nickname</label>
	<input id="nickname" type="text" name="nickname">
	<label for="brand">Brand *</label>
	<input id="brand" type="text" name="brand">
	<label for="model">Model *</label>
	<input id="model" type="text" name="model">     

	<label for="serial">Serial Number</label>
	<input id="serial" type="text" name="serial">

	<label for="type">Type</label>
	<input id="type" type="text" name="type">	

	<label for="value">Value</label>
	<input id="value" type="text" name="value">

	<p class="p-notify">Note: Inputs marked with * have to be filled</p>

	<button id="button-submit" type="submit">Next</button>
	</form>


`;
var form_bikeImage=`  

        <form id="bike-image" method="POST" class="flex flex-column">
          <p>It is optional. Report with image tend to get more views.</p>
          <input type="file" id="img" name="img" accept="image/*" >

          <button id="button-submit" type="submit">Next</button>
        </form>
`;
var form_bikeTheftDetail=`  

        <form id="bike-theftReport" method="POST" class="flex flex-column">
          <label for="reportTime">When</label>
          <input id="reportTime" type="date" name="reportTime">
          
          <label for="reportLocation">Where *(Postal Code)</label>
          <input id="reportLocation" type="text" name="reportLocation">

          <label for="reportDesc">description</label>
          <input id="reportDesc" type="textarea" name="reportDesc">     

          <label for="reportParking">parking lot ID (if applicable)</label>
          <input id="reportParking" type="text" name="reportParking">
          
          <p class="p-notify">Note: Inputs marked with * have to be filled</p>

          <button id="button-submit" type="submit">Submit</button>
        </form>
`;

var form_success = `
	<h1>Success!</h1>
	<button id="button-submit">Back to map</button>
`;