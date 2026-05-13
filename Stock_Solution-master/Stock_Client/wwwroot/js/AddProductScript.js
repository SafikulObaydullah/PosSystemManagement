var pVAT = 0;
var pdiscount = 0;

var ProductInventoryWarehouse = {
    InventoryWarehouseSearchKeyUp: function (PageNo) {
        var parm = {
            PageNo: PageNo,
            EquipmentId: $("#equipmentGuidId").val(),
        }
        $.ajax({
            url: '/Product/ProductInventoryWarehouseGrid',
            type: 'post',
            data: JSON.stringify(parm),
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            beforeSend: function () {
                $(".warehouse-history").html(loaderLayout);
            },
            success: function (data) {
                data.result.List = JSON.parse(data.result.listString);
                console.log(data.result.List);
                var advanceTemplate = $("#product-inventory-warehouse-template").html();
                var sourceHtml = Handlebars.compile(advanceTemplate);
                $("#warehouse-history").html(sourceHtml(data.result));
                //$(".grid-list-exc-page").html(data.paged.result);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        });
    }
}
var SaveProduct = function () {
    var url = "/Product/SaveProduct ";
    //var list = [];
    //$('.wslineitem').each(function () {
    //    list.push({
    //        ProductUnitInt: $(this).find(".ProductUnitInt").val(),
    //        UnitName: $(this).find("#unitlist").val(),
    //        UnitPrice: $(this).find(".UnitPrice").val(),
    //        UnitDiscount: $(this).find(".UnitDiscount").val(),
    //        WholeSalePrice: $(this).find(".WholeSalePrice").val(),
    //        UnitDiscountPercentage: $(this).find("#UnitDiscountPercentage").val(),
    //        UnitDiscountType: $(this).find("#UnitdiscountType").val(),
    //        IsWholeSale: $(this).find(".IsWholeSale:checked").val()
    //    });
    //});
    console.log('UP SIDE');
    var param = {
        Id: $("#Id").val(),
        Name: $("#Name").val(),
        CategoryId: $("#CategoryId").val(),
        VendorId: $("#VendorId").val(),
        Code: $("#Code").val(),
        ProductForm: $("#ProductForm").val(),
        ProductGenerics: $("#ProductGenerics").val(),
        ProductGroup: $("#ProductGroup").val(),
        SubGroup: $("#SubGroup").val(),
        PurchaseUnit: $("#PurchaseUnit").val(),
        PurchasePrice: $("#PurchasePrice").val(),
        SalesPrice: $(".SalesPriceProduct").val(),
        PrimaryUnit: $("#PrimaryUnit").val(),
        PrimaryPrice: $("#PrimaryPrice").val(),
        SecondaryUnitInt: $("#SecondaryUnitInt").val(),
        SecondaryUnit: $("#SecondaryUnit").val(),
        SecondaryPrice: $("#SecondaryPrice").val(),
        TertiaryUnitInt: $("#TertiaryUnitInt").val(),
        TertiaryUnit: $("#TertiaryUnit").val(),
        TertiaryPrice: $("#TertiaryPrice").val(),
        Alias: $("#Alias").val(),
        ReOrderPoint: $("#ReOrderPoint").val(),
        FileLoc: $("#productpicture").val(),
        Description: $("#Description").val(),
        DiscountType: $("#discountType").val(),
        DiscountPercent: $("#DiscountAmount").val(),
        DiscountAmount:  $("#DiscountAmount").val(),
        VATType: $("#VATType").val(),
        VATAmount: pVAT, //$("#VATAmount").val()
        VATPercent: $("#VATAmount").val(),
        WholesaleDiscountType: $("#tertiarywholesalediscountType").val(),
        WholesaleDiscountPercent: $("#TertiaryWholesaleDiscountAmount").val(),
        WholesaleDiscountAmount: $("#TertiaryWholesaleDiscountAmount").val(),
        WholeSaleSecondaryPrice: $("#WholeSaleSecondaryPrice").val(),
        WholeSaleTertiaryPrice: $("#WholeSaleTertiaryPrice").val(),
        
        IsSalesable: $("#IsSalesable:checked").val(),
        VehicleName: $(".VehicleName").val(),
        ChasisNo: "",
        EngineNo: "",
        ModelNo: $(".ModelNo").val(),
        FuelType: $(".FuelType").val(),
        Color: $(".Color").val(),
        Lot: $(".Lot").val(),
        Year: $(".Year").val(),
        Mileage: $(".Mileage").val(),
        ProductType: "Product",
        /*SelectedList: list*/
    }
        $.ajax({
            url: url,
            type: 'post',
            data: param,
            success: function (data) {
                console.log('IN SIDE');
                $(".close-div").trigger("click");
                if (data.result == true)
                    OpenSuccessMessageNew("Success!", data.message, "");
                ProductListGrid.Reset()
            },
            error: function (exr) {
                if (typeof exr.statusText != 'undefined') {
                    console.log('Function Status : ' + exr.statusText);
                }
            }
        });
    
}
var SaveService = function () {
    console.log('Ser UP SIDE');
    var url = "/Product/SaveProduct";
    var param = {
        Id: $("#Id").val(),
        Name: $("#CName").val(),
        Category: $(".Category").val(),
        Code: $(".Code").val(),
        Description: $(".Description").val(),
        SalesPrice: $(".SalesPrice").val(),
        PrimaryPrice: $(".SalesPrice").val(),
        PurchasePrice: $(".SalesPrice").val(),
        DiscountType: $("#DIScountType").val(),
        DiscountAmount: pdiscount,
        DiscountPercent: $("#DIScountAmount").val(),
        VATType: $("#vatType").val(),
        VATAmount: pVAT,
        VATPercent: $("#vatAmount").val(),
        Alias: $(".Alias").val(),
        ProductType:"Service"
    }
    console.log(param)
    $.ajax({
        url: url,
        type: 'post',
        data: param,
        success: function (data) {
            console.log('Ser IN SIDE');
            $(".close-div").trigger("click");
            MerchantAccountList.CurrentPage = 1;
            MerchantAccountList.TotalCount = -1;
            MerchantAccountList.LoadMerchantAccountList();
            if (data.result == true)
                OpenSuccessMessageNew("Success!", data.message, "");
        },
        error: function (exr) {
            if (typeof exr.statusText != 'undefined') {
                console.log('Function Status : ' + exr.statusText);
            }
        }
    });

}
var CalculateProDiscountAmount = function () {
    var distype = $("#discountType").val();
    var pdiscount = parseFloat($("#DiscountAmount").val());
    var saletotal = parseFloat($(".SalesPriceProduct").val());
    if (isNaN(pdiscount)) { pdiscount = 0; }
    if (isNaN(saletotal)) { saletotal = 0; }
    console.log(distype)
    if (distype == 'percent') {
        pdiscount = ((pdiscount * saletotal) / 100);
       
    }
}
var CalculateTertiaryWholesaleDiscountAmount = function () {
    var terwholedistype = $("#tertiarywholesalediscountType").val();
    var terwhdiscount = parseFloat($("#TertiaryWholesaleDiscountAmount").val());
    var terwhsaletotal = parseFloat($("#WholeSaleSecondaryPrice").val());
    if (isNaN(terwhdiscount)) { terwhdiscount = 0; }
    if (isNaN(terwhsaletotal)) { terwhsaletotal = 0; }
    console.log(terwholedistype)
    if (terwholedistype == 'percent') {
        terwhdiscount = ((terwhdiscount * terwhsaletotal) / 100);
        console.log(terwhdiscount)
    }
}

var CalculateServiceDiscountAmount = function () {
    var distype = $("#DIScountType").val();
    pdiscount = parseFloat($("#DIScountAmount").val());
    var saletotal = parseFloat($(".SalesPrice").val());
    if (isNaN(pdiscount)) { pdiscount = 0; }
    if (isNaN(saletotal)) { saletotal = 0; }
    console.log(distype)
    if (distype == 'percent') {
        pdiscount = ((pdiscount * saletotal) / 100);
        console.log(pdiscount)
    }
}
var CalculateProVATAmount = function () {
    var VATtype = $("#VATType").val();
     pVAT = parseFloat($("#VATAmount").val());
    var saletotal = parseFloat($(".SalesPriceProduct").val());
    if (isNaN(pVAT)) { pVAT = 0; }
    if (isNaN(saletotal)) { saletotal = 0; }
    console.log(VATtype)
    if (VATtype == 'percent') {
        pVAT = ((pVAT * saletotal) / 100);
        console.log('hi '+pVAT)
    }
}
var CalculateServiceVATAmount = function () {
    var VATtype = $("#vatType").val();
    pVAT = parseFloat($("#vatAmount").val());
    var saletotal = parseFloat($(".SalesPrice").val());
    if (isNaN(pVAT)) { pVAT = 0; }
    if (isNaN(saletotal)) { saletotal = 0; }
    if (isNaN(saletotal)) { saletotal = 0; }
    console.log(VATtype)
    if (VATtype == 'percent') {
        pVAT = ((pVAT * saletotal) / 100);
        console.log(VATtype)
    }
}

$(".profile_pic_close").click(function () {
    var id = $(this).attr('data-id');
    $(".profile_pic").attr("src", '');
    $("#productpicture").val('')
    /*OpenConfirmationMessageNew("Do you want to remove this file?", function () {*/ 
        $.ajax({
            url: '/Product/DeleteProductPicFile?Id=' + id,
            type: 'post',
            success: function (data) {
                if (data.success) {
                   
                }
            }
        })
    /*})*/
})
var SaveProductPicture = function (fd, isadd) {
    var url = "";
    url = '/Product/UpdateProductImage';
    $.ajax({
        url: url,
        type: 'post',
        data: fd,
        headers: { ID: "", FolderName: "Employee" },
        dataType: 'json',
        contentType: false,
        processData: false,
        success: function (data) {
            if (data.success == true) {
                $("#productpicture").val(data.result)
                $(".profile_pic").attr("src", data.result);
            }
        },
        error: function (exr) {
            if (typeof exr.statusText != 'undefined') {
                console.log('Function Status : ' + exr.statusText);
            }
        }
    });
}
$(document).ready(function () {
    $(".ttb_inner_height").height(window.innerHeight - 87);
    if (flag == "Service") {
        $("#Product").hide();
        $("#Service").show();
        $("#SERVICE").attr('checked', 'checked');
        $("#Name").val("");
        $("#Strength").val("");
        $("#ManufactureCompany").val("");
        $("#Category").val("");
        $("#ProductGenerics").val("");
        $("#ProductForm").val("");
        $("#Code").val("");
        $("#SubGroup").val("");
        $("#Description").val("");
        $("#PurchasePrice").val("");
        $("#SalesPrice").val("");
        $("#PrimaryUnit").val("");
        $("#SecondaryUnit").val("");
        $("#SecondaryConversionFactor").val("");
        $("#Alias").val("");
        $("#productpicture").val("");
        $("#discountType").val("");
        $("#DiscountAmount").val("");
        $(".Discountper").val("");
        $("#VATType").val("");
        $("#VATAmount").val("");
        $(".VATper").val("");
        $("#tertiarywholesalediscountType").val("");
        $("#TertiaryWholesaleDiscountAmount").val("");
        //$("#tertiarydiscountType").val("");
        //$("#TertiaryDiscountAmount").val("");
        //$("#secondarywholesalediscountType").val("");
        //$("#SecondaryWholeSaleDiscountAmount").val("");
        //$("#secondarydiscountType").val("");
        //$("#SecondaryDiscountAmount").val("");
        $("#WholeSaleSecondaryPrice").val("");
        $("#WholeSaleTertiaryPrice").val("");

    }
    if (flag == "Product") {
        $("#Product").show();
        $("#Service").hide();
        $(".CName").val("");
        $(".Category").val("");
        $(".Code").val("");
        $(".Description").val("");
        $(".SalesPrice").val("");
        $(".Alias").val("");
        $("#DIScountType").val("");
        $("#DIScountAmount").val("");
        $(".discountper").val("");
        $("#vatType").val("");
        $("#vatAmount").val("");
        $(".vatper").val("");
    }
    $("#SERVICE").click(function () {
        if (flag != "Product") {
            $("#Product").hide();
            $("#Service").show();
            $("#Name").val("");
            $("#Strength").val("");
            $("#ManufactureCompany").val("");
            $("#Category").val("");
            $("#ProductGenerics").val("");
            $("#ProductForm").val("");
            $("#Code").val("");
            $("#SubGroup").val("");
            $("#Description").val("");
            $("#PurchasePrice").val("");
            $("#SalesPrice").val("");
            $("#PrimaryUnit").val("");
            $("#SecondaryUnit").val("");
            $("#SecondaryConversionFactor").val("");
            $("#Alias").val("");
            $("#productpicture").val("");
            $("#discountType").val("");
            $("#DiscountAmount").val("");
            $(".Discountper").val("");
            $("#VATType").val("");
            $("#VATAmount").val("");
            $(".VATper").val("");
            $("#tertiarywholesalediscountType").val("");
            $("#TertiaryWholesaleDiscountAmount").val("");
            //$("#tertiarydiscountType").val("");
            //$("#TertiaryDiscountAmount").val("");
            //$("#secondarywholesalediscountType").val("");
            //$("#SecondaryWholeSaleDiscountAmount").val("");
            //$("#secondarydiscountType").val("");
            //$("#SecondaryDiscountAmount").val("");
            $("#WholeSaleSecondaryPrice").val("");
            $("#WholeSaleTertiaryPrice").val("");
        }
        else {
            $("#Product").hide();
            $("#Service").show();
        }
    })
    $("#PRODUCT").click(function () {
        if (flag != "Service") {
            $(".CName").val("");
            $(".Category").val("");
            $(".Code").val("");
            $(".Description").val("");
            $(".SalesPrice").val("");
            $(".Alias").val("");
            $("#DIScountType").val("");
            $("#DIScountAmount").val("");
            $(".discountper").val("");
            $("#vatType").val("");
            $("#vatAmount").val("");
            $(".vatper").val("");
            $("#Service").hide();
            $("#Product").show();
        }
        else {
            $("#Service").hide();
            $("#Product").show();
        }
    })
    $("#add-Product").click(function () {
        var product = $("input[type='radio'][id='PRODUCT']:checked").val();
        if (product) {
            if (CommonUiValidation()) {
                CalculateProVATAmount();
                SaveProduct();
            }
        }
        else {
            if (CommonUiValidation()) {
                CalculateServiceVATAmount();
            SaveService();
            }
         
        }
    });
    $('#uploadproductpiclogo').change(function (event) {
        var fd = new FormData();
        const files = event.target.files;
        if (files.length > 0) {
            for (var i = 0; i < files.length; i++) {
                fd.append('File', files[i]);
                event.target.value = "";
            }
            OpenConfirmationMessageNew("Warning", "Are you sure?", function () {
                SaveProductPicture(fd)
            })
        }
    });
    $("#add_product_pic").click(function () {
        $("#uploadproductpiclogo").click()
    })
});
