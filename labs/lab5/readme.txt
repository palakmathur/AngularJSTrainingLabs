things to try

disable submit until valid:

<input type="submit" id="submitDonation" 
				ng-disabled="giveForm.$invalid" value="Help now!">

--------------
or

wait until submitting to validate

<div class="error"
	ng-messages="giveForm.giverName.$error && form.submitted"
	ng-messages-multiple>
	<div ng-message="required">*Required</div>
	<div ng-message="minlength">Name must be longer than 3</div>
</div>

------------
or
wait until input loses focus to validate

http://jsbin.com/cuciti/1/edit?html,js,output