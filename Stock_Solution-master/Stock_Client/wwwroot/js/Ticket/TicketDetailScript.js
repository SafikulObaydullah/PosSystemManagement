var redirecttoHome = function () { window.location.href = '/all-tickets'; };
String.format = function (format) {
    var args = Array.prototype.slice.call(arguments, 1);
    return format.replace(/{(\d+)}/g, function (match, number) {
        return typeof args[number] != 'undefined'
            ? args[number]
            : match
            ;
    });
};
function editEvent(val) {
    alert(val)
}
var DeleteTicket = function (id) {
    if ($("#ticketstatusid").val() == 'Closed') {
        OpenErrorMessageNew('Sorry Closed Ticket Can not be deleted!', '');
    }
    else {
        OpenConfirmationMessageNew('Are you sure?', 'This ticket will be deleted ', function () {
            $.ajax({
                type: "post",
                url: '/Ticket/DeleteTicket?id=' + id,
                success: function (data) {
                    if (data == true) {
                        OpenSuccessMessageNew('Congrats!', 'Deleted Successfully', redirecttoHome);

                    }
                    else {
                        OpenErrorMessageNew('Error!', 'Sorry this can not be done this moment')
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log(errorThrown);
                    OpenErrorMessageNew("Error!", "Sorry, but this page didn't load properly. Please try again.")
                }
            });
        });
    }
}
var DownloadDocument = function (id) {
    window.location.href = '/Ticket/DownloadTicketDocument?id=' + id;

}
var StopTicket = function (id,isnewstart) {
    $.ajax({
        type: "post",
        url: '/Ticket/StopRunningTicket?tid=' + id + '&sns=' + isnewstart,
        success: function (data) {
            if (data == true) {
                if (!isnewstart) {
                    OpenSuccessMessageNew('Congrats!', 'Stopped Successfully');
                }
                window.location.reload()
            }
            else {
                OpenErrorMessageNew('Ooops!', 'Sorry this can not be done this moment')
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(errorThrown);
            OpenErrorMessageNew("Error!", "Sorry, but this page didn't load properly. Please try again.")
        }
    });
}
var ImagePopUp = function (id) {
    var classname = '.ufd_img_' + id;
    $(classname).find('.welcome_popup_cont').show();
    $('#main-content').css('z-index', 'unset');
    $('.sticky-top').css('z-index', 'unset');
    $('.main-sidebar').css('z-index', 'unset');
}
var ImageClose = function (id, ev) {    
    var classname = '.ufd_img_' + id;
    $(classname).find('.welcome_popup_cont').css('display', 'none');
    ev.stopPropagation();
    ev.cancelBubble = true;
    $('#main-content').css('z-index', '9');
    $('.sticky-top').css('z-index', '1020');
    $('.main-sidebar').css('z-index', '99');
}
var ClickToUploadReply = function () {
    $("#click_to_upload_reply").click();
}

var storedfilename = [];
var storedfilepath = [];
var UploadFileToReply = function (fd) {
    var url = '/Ticket/UploadFileWithFolderName';
    $.ajax({
        url: url,
        type: 'post',
        data: fd,
        contentType: false,
        processData: false,
        success: function (data) {
            console.log(data);
            if (data.isUploaded == true) {

                for (var i = 0; i < data.fileNames.length; i++) {
                    var template = '<span class="repliedfileclassreply" id="uploadedfile_' + data.fileNames[i].serial + '" >'
                        + data.originalnames[i]
                        + '<span class="crossbuttonred" onclick="RemoveFile(' + data.fileNames[i].serial + ',this, event)"> <i class="fa fa-close"></i> </span > '
                        + '</span>'
                    $('#uploaded_docs_reply').append(template);
                    
                    storedfilename.push(String(data.fileNames[i].ticketFile));
                    storedfilepath.push(String(data.fileNames[i].filepath));
                    console.log(storedfilename);
                    console.log(storedfilepath);
                }
            }
            else {
                alert("not ok")
            }
        },
        error: function (exr) {
            if (typeof exr.statusText != 'undefined') {
                console.log('Function Status : ' + exr.statusText);
            }
        }
    });
}
var RemoveFile = function (id, item, ev) {
    var index = $(item).parent().index();
    console.log(index);
    $(".repliedfileclassreply")[index].remove();
    console.log(storedfilename.length);
    console.log(index);
    var lng = index;
    storedfilename.splice(lng, 1);
    storedfilepath.splice(lng, 1);
}
var UpdateTicket = function () {
    var requestInfo = {
        Id: $('#Id').val(),
        AssignedTo: $('#AssignedTo').val(),
        TicketTitle: $('#TicketTitle').val(),
        TStatus: $('#TStatus').val(),
        PriorityPoint: $('#PriorityPoint').val(),
        TicketDescription: tinyMCE.get('TicketDescription').getContent(),
    }
    if (CommonUiValidation()) {
        $.ajax({
            url: '/Ticket/SaveTicket',
            type: 'post',
            data: requestInfo,
            success: function () {
                OpenSuccessMessageNew('Success', 'Ticket created successfully!', function () {
                    TicketGrid.Reset()
                });
            },
            error: function (exr) {
                if (typeof exr.statusText != 'undefined')
                    console.log(exr.statusText);
            }
        });
    }
}
function strFormat() {
    var args = Array.prototype.slice.call(arguments, 1);
    return arguments[0].replace(/\{(\d+)\}/g, function (match, index) {
        return args[index];
    });
}
var TicketDetail = {
    CurrentPage: 1,
    picker: null,
    picker2: null,
    LoaderAjax: null,
    TotalCount: -1,
    CurrentLogPage: 1,
    LoaderAjaxLog: null,
    TotalCountLog: -1,
    Reset: function () {
        TicketDetail.CurrentPage = 1;
        TicketDetail.TotalCount = -1;
        TicketDetail.LoadTicketReplyGrid()
    },
    SaveTicketReply: function () {
        $(".ticketreplybutton").attr("disabled", 'disabled');
        console.log(storedfilename)
        console.log(storedfilepath)
        var requestInfo = {
            TicketIntId: $('#Id').val(),
            TicketReply: tinyMCE.get('reply_tckt').getContent(),
            TicketReplyFilePath: $("#filepath").val(),
            TicketReplyFileName: $("#filename").val(),
        }
        if (requestInfo.TicketReply !== '') {
            POSModal.Show();
            $.ajax({
                url: '/Ticket/SaveTicketReply',
                type: 'post',
                data: ({ ticket: requestInfo, filenames: storedfilename, filepaths: storedfilepath }),
                success: function () {
                    OpenSuccessMessageNew('Success', 'Replied successfully!');
                    $(".ticketreplybutton").removeAttr('disabled');
                    $('.repliedfileclassreply').remove();
                    tinymce.activeEditor.setContent('');
                    storedfilename = [];
                    storedfilepath = [];
                    TicketDetail.Reset();
                    POSModal.Hide();
                },
                error: function (exr) {
                    POSModal.Hide();
                    if (typeof exr.statusText != 'undefined')
                        console.log(exr.statusText);
                }
            });
        } else {
            OpenCautionMessageNew('Warning!', 'Write a reply!', function () {
                $(".ticketreplybutton").removeAttr('disabled');
            });
        }
    },
    TicketGridChangeStatus: function () {
        var stat = $('#TStatus').val();
        if (stat != '-1') {
            OpenConfirmationMessageNew('Are you sure?', 'This ticket will be marked as ' + stat, function () {
                $.ajax({
                    type: "post",
                    url: '/Ticket/ChangeTicketStatus',
                    data: { id: $('#Id').val(), status: stat },
                    success: function (data) {
                        if (data) {
                            OpenSuccessMessageNew('Congrats!', 'Saved Successfully!')
                        } else {
                            OpenErrorMessageNew('Error!', 'Sorry this can not be done this moment')
                        }
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        console.log(errorThrown);
                        OpenErrorMessageNew("Error!", "Sorry, but this page didn't load properly. Please try again.")
                    }
                });
            }, function () {
                window.location.reload()
            })
        }
    },
    TicketGridChangePriority: function () {
        var stat = $('#PriorityPoint').val();
        var txt = $('#PriorityPoint option:selected').text();
        if (stat != '-1') {
            OpenConfirmationMessageNew('Are you sure?', 'This ticket will be marked as ' + txt, function () {
                $.ajax({
                    type: "post",
                    url: '/Ticket/ChangeTicketPriority',
                    data: { id: $('#Id').val(), status: stat },
                    success: function (data) {
                        if (data) {
                            OpenSuccessMessageNew('Congrats!', 'Saved Successfully!')
                        } else {
                            OpenErrorMessageNew('Error!', 'Sorry this can not be done this moment')
                        }
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        console.log(errorThrown);
                        OpenErrorMessageNew("Error!", "Sorry, but this page didn't load properly. Please try again.")
                    }
                });
            }, function () {
                window.location.reload()
            })
        }
    },
    TicketGridAssign: function () {
        var stat = $('#AssignedTo').val();
        var txt = $('#AssignedTo option:selected').text();
        if (stat != '-1') {
            OpenConfirmationMessageNew('Are you sure?', 'This ticket will be assigned to ' + txt, function () {
                $.ajax({
                    type: "post",
                    url: '/Ticket/ChangeAssignedTicket',
                    data: { id: $('#Id').val(), status: stat },
                    success: function (data) {
                        if (data.success) {
                            OpenSuccessMessageNew('Congrats!', 'Saved Successfully!')
                            var template = 
                                '<li id="meem_{0}"><label>'
                                +'<input class="meem_{0}" onchange="RemoveMember({0})" value="{0}" type="checkbox" checked /><span>[{0}]</span> {1} {2}'
                            +'</label>'
                                + '</li>';
                            var fnTemp = strFormat(template, (data.list.length), data.list[data.list.length - 1].firstName, data.list[data.list.length - 1].lastName)
                            $('.project_mem_list').append(fnTemp)
                        } else {
                            OpenErrorMessageNew('Error!', 'Sorry this can not be done this moment')
                        }
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        console.log(errorThrown);
                        OpenErrorMessageNew("Error!", "Sorry, but this page didn't load properly. Please try again.")
                    }
                });
            }, function () {
                window.location.reload()
            })
        }
    },
    LoadTicketReplyGrid: function () {
        if (TicketDetail.LoaderAjax && TicketDetail.LoaderAjax.readyState != 4) {
            return;
        }
        if (TicketDetail.TotalCount == $("tr.data").length) {
            return;
        }
        var FromDateTime = $("#ReviewFilterStartDate").val();
        var ToDateTime = $("#ReviewFilterEndDate").val();
        var SearchTxt = $("#SearchOrder").val();

        var paramlite = {
            StartDate: FromDateTime,
            EndDate: ToDateTime,
            PageNo: TicketDetail.CurrentPage,
            Searchtext: SearchTxt,
            ID: $('#Id').val(),
            Priority: $('#PriorityPoint').val(),
        };
        TicketDetail.LoaderAjax = $.ajax({
            type: "post",
            url: '/Ticket/TicketReplyGrid',
            data: paramlite,
            cache: false,
            success: function (data) {
                var dataa = JSON.parse(data.data);
                console.log(dataa)
                var TotalCount = dataa.TotalCount;
                TicketDetail.TotalCount = TotalCount[0].TotalCount;
                var empTemplate = $("#ticketreplytemplate").html();
                var sourceHtml = Handlebars.compile(empTemplate);
                if (TicketDetail.CurrentPage == 1) {
                    if (TicketDetail.TotalCount == 0) {
                        $(".load_ticket_reply_list_data").html('<div class="no_reply_div">Not replied yet!</div>');
                    } else {
                        $(".load_ticket_reply_list_data").html(sourceHtml(dataa));
                    }
                } else {
                    $(".load_ticket_reply_list_data").append(sourceHtml(dataa));
                }
                $(".load_ticket_list_data").show(500);
                TicketDetail.CurrentPage++;
                setTimeout(function () {
                    $(".til_assign_info .assignedReply").each(function () {
                        var ticketid = $(this).attr('ticketid');
                        var assignedPics = "";
                        var filetemplate = "";
                        $(dataa.ReplyData).each(function () {
                            console.log("ticketid from dataa.ReplyData :" + dataa.ReplyData.TicketActivityReplyId);
                            if (ticketid == this.TicketActivityReplyId) {
                                var FileName = this.TicketFile
                                console.log(FileName);
                                if (FileName != null && FileName != "" && FileName != "undefined") {
                                    var extension2 = FileName.substring(FileName.lastIndexOf('.') + 1);
                                    var extension = extension2.toLowerCase();
                                    if (extension == "pdf") {
                                        filetemplate += '<div class="uploaded_file_div" onclick="DownloadDocument(' + this.Id + ')">'
                                            + '<i class="fa-regular fa-file-pdf"></i>'
                                            + '</div>'
                                    }
                                    if (extension == "txt") {
                                        filetemplate += '<div class="uploaded_file_div" onclick="DownloadDocument(' + this.Id + ')">'
                                            + '<i class="fa-regular fa-file-text"></i>'
                                            + '</div>'
                                    }
                                    if (extension == "doc" || extension == "docx") {
                                        filetemplate += '<div class="uploaded_file_div" onclick="DownloadDocument(' + this.Id + ')">'
                                            + '<i class="fa-regular fa-file-word"></i>'
                                            + '</div>'
                                    }
                                    if (extension == ".ppt" || extension == ".pptx"|| extension == ".pptm") {
                                        filetemplate += '<div class="uploaded_file_div" onclick="DownloadDocument(' + this.Id + ')">'
                                            + '<i class="fa-regular fa-file-powerpoint"></i>'
                                            + '</div>'
                                    }
                                    if (extension == "jpg" || extension == "png" || extension == "jpeg" || extension == "JPG" || extension == "JPEG" || extension == "PNG") {
                                        //filetemplate += '<a class="uploaded_file_div" href="' + this.Filepath + '" target="_blank">'
                                        //    + '<img src="' + this.Filepath + '" />'
                                        //    + '</a>'
                                        filetemplate += '<div class="uploaded_file_div ufd_img_' + this.Id + '" onclick="ImagePopUp(' + this.Id + ')">'
                                            + '<img src="' + this.Filepath + '" />'
                                            + '<div class="welcome_popup_cont">'
                                            + '  <div class="welcome_popup_bg">'

                                            +'   </div>'
                                            +'  <div class="welcome_popup_img">'
                                            + '   <i class="fa fa-times wp_close" onclick="ImageClose(' + this.Id + ', event)"></i>'
                                            + ' <img src="' + this.Filepath + '" />'
                                               + '</div>'
                                            + '</div>'
                                            + '</div>'
                                    }
                                }
                                else {
                                    filetemplate = "";
                                }

                            }

                        });
                        $(this).html(filetemplate);
                    });
                }, 1000)
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(errorThrown);
                OpenErrorMessageNew("Error!", "Sorry, but this page didn't load properly. Please try again.")
            }
        });
    },
    LoadTicketLogGrid: function () {
        if (TicketDetail.LoaderAjaxLog && TicketDetail.LoaderAjaxLog.readyState != 4) {
            return;
        }
        if (TicketDetail.TotalCountLog == $("li.data").length) {
            return;
        }

        var paramlite = {
            PageNo: TicketDetail.CurrentLogPage,
            TicketID: $('#ticketiid').val(),
        };
        TicketDetail.LoaderAjaxLog = $.ajax({
            type: "post",
            url: '/Ticket/TicketLogGrid',
            data: paramlite,
            cache: false,
            success: function (data) {
                var dataa = JSON.parse(data.data);
                var TotalCount = dataa.TotalCount;
                TicketDetail.TotalCountLog = TotalCount[0].TotalCount;
                var empTemplate = $("#ticketlogtemplate").html();
                var sourceHtml = Handlebars.compile(empTemplate);
                if (TicketDetail.CurrentLogPage == 1) {
                    if (TicketDetail.TotalCountLog == 0) {
                        $(".log_tkt").html('<div class="no_reply_div">Not log yet!</div>');
                    } else {
                        $(".log_tkt").html(sourceHtml(dataa));
                    }
                } else {
                    $(".log_tkt").append(sourceHtml(dataa));
                }
                $(".log_tkt").show(500);
                TicketDetail.CurrentLogPage++;
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(errorThrown);
                OpenErrorMessageNew("Error!", "Sorry, but this page didn't load properly. Please try again.")
            }
        });
    },
    LoadTktReplyGridCustom: function () {
        if (TicketDetail.LoaderAjax && TicketDetail.LoaderAjax.readyState !== 4) {
            return;
        }
        if (TicketDetail.TotalCount == $("tr.data").length) {
            return;
        }
        var FromDateTime = $("#ReviewFilterStartDate").val();
        var ToDateTime = $("#ReviewFilterEndDate").val();
        var SearchTxt = $("#SearchOrder").val();
        var paramlite = {
            StartDate: FromDateTime,
            EndDate: ToDateTime,
            PageNo: TicketDetail.CurrentPage,
            Searchtext: SearchTxt,
            TicketID: $('#ticketiid').val(),
            ID: $('#Id').val(),
            Priority: $('#PriorityPoint').val(),
        };
        TicketDetail.LoaderAjax = $.ajax({
            type: 'post',
            url: '/Ticket/TicketReplyGridView',
            data: paramlite,
            cache: false,
            success: function (data) {
                if (TicketDetail.CurrentPage === 1) {
                    $(".load_ticket_reply_list_data").html('');
                    $(".load_ticket_reply_list_data").html(data);
                    TicketDetail.TotalCount = totalcount;
                } else {
                    $(".load_ticket_reply_list_data").append(data);
                }
                $(".load_ticket_reply_list_data").show(500);
                TicketDetail.CurrentPage++;
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(errorThrown);
                OpenErrorMessageNew("Error!", "Sorry, but this page didn't load properly. Please try again.")
            }
        });
    }
}
$(document).ready(function () {
    $("#click_to_upload_reply").change(function (event) {
        var fd = new FormData();
        const files = event.target.files;
        if (files.length > 0) {
            for (var i = 0; i < files.length; i++) {
                fd.append('file', files[i]);
            }
            console.log(fd);
            event.target.value = "";
        }
        UploadFileToReply(fd);
    });
     
    $(".collapse_details_show").click(function () {
        $(".ted_rep_main_details").show(400);
        $(".collapse_details_hide").show(400);
        $(".collapse_details_show").hide(400);
    });
    $(".collapse_details_hide").click(function () {
        $(".ted_rep_main_details").hide(400);
        $(".collapse_details_hide").hide(400);
        $(".collapse_details_show").show(400);
    });

    $(".tdet_height").height(window.innerHeight - 150);
    $(".tdet_height_right").height(window.innerHeight - 150);
    // device detection
    if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
        || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4))) {
        isMobile = true;
    }
    tinymce.init({
        selector: '#reply_tckt'
    });
    TicketDetail.LoadTktReplyGridCustom()
    /*TicketDetail.LoadTicketLogGrid()*/
    $('#TStatus').change(function () {
        TicketDetail.TicketGridChangeStatus()
    })
    $('#PriorityPoint').change(function () {
        TicketDetail.TicketGridChangePriority()
    })
    $('#AssignedTo').change(function () {
        TicketDetail.TicketGridAssign()
    })

});
//$('.tdet_height').scroll(function () {
//    /*window.innerHeight - 100 + $(".tdet_height").scrollTop() > $("tr.data:last").position().top + 100 && TicketDetail.LoadTicketReplyGrid();*/
//    TicketDetail.LoadTicketReplyGrid();
    
//});
TicketReplGridOnScroll = function () {
    TicketDetail.LoadTktReplyGridCustom();
};
$(window).resize(function () {
    $(".tdet_height").height(window.innerHeight - 150);
    $(".tdet_height_right").height(window.innerHeight - 150);
});
function confirmExit() {
    return 'The page you are working on has not been saved. If you navigate away from this page the changes you made will be lost.';
}
//$(window).unload(function () {
    
//    confirmExit()
//});
//window.onbeforeunload = function (event) {
//    event.preventDefault();
//    event.returnValue = '-1';
//    alert('Please save your work before closing! You may loose your KPI !!!')
//};
//$(window).unload(function () {
//    var answer = confirm("Are you sure you want to leave?");
//    if (answer) {
//        //ajax call here
//    }
//});
$(window).on('beforeunload', function () {
    confirm('Please save your work before closing! You may loose your KPI !!!')
});