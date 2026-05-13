$(document).ready(function () {
    var suggestionsContainer = $("#suggestionsContainer");
    var VehicleName = $("#VehicleName");
    VehicleName.on('input', function () {
        var searchTerm = $(this).val();
        if (searchTerm.length >= 2) {
            console.log(searchTerm);
            $.ajax({
                url: "/Customer/Autocomplete",
                type: "GET",
                data: { term: searchTerm },
                success: function (data) {
                    console.log(data);
                    suggestionsContainer.empty();
                    if (data.length > 0) {
                        var suggestionsList = $("<ul>");
                        data.forEach(function (vehicleName) {
                            var listItem = $("<li>").text(vehicleName);
                            suggestionsList.append(listItem);
                        });
                        suggestionsContainer.append(suggestionsList);
                        $("li", suggestionsList).on("click", function () {
                            var selectedValue = $(this).text();
                            VehicleName.val(selectedValue);
                            suggestionsContainer.empty();
                            GetVehicleInfoByName();
                        });
                    }
                }
            });
        } else {
            suggestionsContainer.empty();
        }
    });
    $(document).on("click", function (event) {
        if (!$(event.target).closest(VehicleName).length && !$(event.target).closest(suggestionsContainer).length) {
            suggestionsContainer.empty();
        }
    });
    suggestionsContainer.on("click", function (event) {
        event.stopPropagation();
    });


    var NameSuggestionsContainer = $("#CustomerNamesuggestionsContainer");
    var CustomerName = $("#CustomerName");
    CustomerName.on('input', function () {
        var searchTerm = $(this).val();
        document.getElementById("CID").value = "";
        if (searchTerm.length >= 2) {
            console.log(searchTerm);
            $.ajax({
                url: "/Customer/CustomersName",
                type: "GET",
                data: { term: searchTerm },
                success: function (data) {
                    NameSuggestionsContainer.empty();
                    if (data.length > 0) {
                        var namesuggestionsLists = $("<ul>");

                        data.forEach(function (customer) {
                            var listItem = $("<li>")
                                .text(customer.firstName)
                                .data("customerId", customer.customerId);

                            namesuggestionsLists.append(listItem);
                        });

                        NameSuggestionsContainer.append(namesuggestionsLists);

                        $("li", namesuggestionsLists).on("click", function () {
                            var selectedCustomerId = $(this).data("customerId");
                            var selectedValue = $(this).text();
                            CustomerName.val(selectedValue);
                            NameSuggestionsContainer.empty();
                            GetCustomerInfoById(selectedCustomerId);
                        });
                    }
                }

            });
        } else {
            NameSuggestionsContainer.empty();
        }
    });
    $(document).on("click", function (event) {
        if (!$(event.target).closest(VehicleName).length && !$(event.target).closest(NameSuggestionsContainer).length) {
            NameSuggestionsContainer.empty();
        }
    });
    NameSuggestionsContainer.on("click", function (event) {
        event.stopPropagation();
    });


});

var GetCustomerInfoById = function (selectedCustomerId) {
    alert(selectedCustomerId);
    $.ajax({
        type: "post",
        url: "/Customer/Customersinfo?id=" + selectedCustomerId, 
        contentType: "application/json",
        success: function (data) {
            console.log(data);
            document.getElementById("CID").value = data.customerId;
            document.getElementById("EmailAddress").value = data.emailAddress;
            PaymentCalculate();
        }
    });
};
var GetVehicleInfoByName = function (item) {
    var VehicleName = $("#VehicleName").val();
    $.ajax({
        type: "post",
        url: "/Customer/GetVehecleInfoDetailByProductName?VehicleName=" + VehicleName,
        contentType: "application/json",
        success: function (data) {
            vehicleListArray = data;
            var len = vehicleListArray.length;
            document.getElementById("ModelNo").value = data.modelNo;
            document.getElementById("Color").value = data.color;
            document.getElementById("FuelType").value = data.fuelType;
            document.getElementById("Year").value = data.year;
            document.getElementById("Mileage").value = data.mileage;
            document.getElementById("Amount").value = data.price;
            PaymentCalculate();
        }
    });
};